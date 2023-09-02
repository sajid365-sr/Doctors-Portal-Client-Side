import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckOutForm = ({ booking }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState();
  const [success, setSuccess] = useState();
  const [transactionId, setTransactionId] = useState();
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const { price, email, patientName, phone, _id } = booking;

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    // Get client secret from backend by fetch api
    fetch(
      "https://doctors-portal-server-sajid365-sr.vercel.app/create-payment-intent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
        },
        body: JSON.stringify({ price }),
      }
    )
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setCardError(error.message);
    } else {
      setCardError("");
    }

    setSuccess("");
    setProcessing(true);
    // Get client secret from backend
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: patientName,
            email,
            phone,
          },
        },
      });
    if (confirmError) {
      setCardError(confirmError);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const payment = {
        // make payment object for save to db if payment is successful.
        price,
        TnxId: paymentIntent.id,
        email,
        bookingId: _id,
      };

      // Store payment info in the database.........
      fetch("https://doctors-portal-server-sajid365-sr.vercel.app/payments", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            setSuccess("Congrats! your payment completed");
            setTransactionId(paymentIntent.id);
          }
        });
    }

    setProcessing(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-sm mt-4 btn-primary"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
      </form>
      <p className="text-error">{cardError}</p>
      {success && (
        <div>
          <p className="text-success">{success}</p>
          <p>
            Your Transaction ID:{" "}
            <span className="font-bold">{transactionId}</span>
          </p>
        </div>
      )}
    </>
  );
};

export default CheckOutForm;
