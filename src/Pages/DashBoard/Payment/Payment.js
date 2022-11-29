import React from "react";
import { useLoaderData } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import { loadStripe } from "@stripe/stripe-js";

const Payment = () => {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
  const booking = useLoaderData();
  const { treatment, price, appointmentDate, slot } = booking;

  return (
    <div>
      <h3 className="text-3xl">Payment for {treatment}</h3>
      <p className="text-xl">
        Please pay <strong>${price}</strong> for your appointment on{" "}
        {appointmentDate} at {slot}{" "}
      </p>
      <div className="w-96 my-8">
        <Elements stripe={stripePromise}>
          <CheckOutForm 
          booking={booking}
          />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
