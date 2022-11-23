
import React from 'react';
import dental from '../../../assets/images/treatment.png'
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';

const DentalCare = () => {
    return (
        <div className="hero my-40 max-w-screen-lg mx-auto">
  <div className="hero-content flex-col gap-24 lg:flex-row">
    <img src={dental} 
    alt='Dental Treatment'
    className='lg:h-[576px] lg:w-[458px] w-10/12 '
    />
    <div>
      <h1 className="text-5xl font-bold">Exceptional Dental Care, on Your Terms</h1>
      <p className="py-6">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
      <PrimaryButton>Get Started</PrimaryButton>
    </div>
  </div>
</div>
    );
};

export default DentalCare;