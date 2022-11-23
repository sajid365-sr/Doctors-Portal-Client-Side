import React from "react";
import PrimaryText from "../../../components/PrimaryText/PrimaryText";
import people1 from "../../../assets/images/people1.png";
import people2 from "../../../assets/images/people2.png";
import people3 from "../../../assets/images/people3.png";
import quote from "../../../assets/icons/quote.svg";
import PatientSayCard from "./PatientSayCard";

const PatientSay = () => {
  const Comments = [
    {
      id: 1,
      feedback:
        "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
      img: people1,
      name: "Winson Herry",
      address: "California",
    },
    {
      id: 2,
      feedback:
        "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
      img: people2,
      name: "Nina Nguyen",
      address: "New York",
    },
    {
      id: 3,
      feedback:
        "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
      img: people3,
      name: "Gabriella Cox",
      address: "Los Angels",
    },
  ];

  return (
    <section className="my-24 lg:mx-14">
      <div className="flex items-center justify-between">
        <div>
          <PrimaryText>Testimonial</PrimaryText>
          <h1 className="text-4xl lg:mb-36 mb-9">What Our Patients Says</h1>
        </div>
        <img className="w-[98px] lg:w-[192px]" src={quote} alt="" />
      </div>
      <div className="grid gap-14 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        {Comments.map((comment) => (
          <PatientSayCard key={comment.id} comment={comment}></PatientSayCard>
        ))}
      </div>
    </section>
  );
};

export default PatientSay;
