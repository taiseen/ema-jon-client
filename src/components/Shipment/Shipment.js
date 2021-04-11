import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';

// npm install --save @stripe/react-stripe-js @stripe/stripe-js

const Shipment = () => {

  const { register, handleSubmit, watch, errors } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [shippingData, setShippingData] = useState(null);

  const onSubmit = data => {
    setShippingData(data);
  };

  const handlePaymentSuccess = paymentId => {

    const savedCart = getDatabaseCart();
    const orderDetails = {
      //...loggedInUser, <=== Without It... Works Fine...
      ...loggedInUser, // <=== With It... error start...
      products: savedCart,
      shipment: shippingData,
      paymentId,
      orderTime: new Date()
    }
    //console.log(orderDetails);

    const url = `https://tranquil-beyond-55017.herokuapp.com/addOrder`;
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderDetails)
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          processOrder();
          alert("Your Order OK...");
        }
      });
  }

  console.log(watch("example")); // watch input value by passing the name of it

  return (

    // .row>.col-md-6*2
    <div className="row">

      <div className="col-md-6" style={{ display: shippingData ? 'none' : 'block' }}>
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
          <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your Name" />
          {errors.name && <span className="error">Name is required</span>}

          <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Your Email" />
          {errors.email && <span className="error">Email is required</span>}

          <input name="address" ref={register({ required: true })} placeholder="Your Address" />
          {errors.address && <span className="error">Address is required</span>}

          <input name="phone" ref={register({ required: true })} placeholder="Your Phone Number" />
          {errors.phone && <span className="error">Phone Number is required</span>}

          <input type="submit" />
        </form>
      </div>

      <div className="col-md-6" style={{ display: shippingData ? 'block' : 'none' }}>
        <h2>Pay For Shopping</h2>
        <ProcessPayment handlePaymentSuccess={handlePaymentSuccess} />
      </div>

    </div>


  );
};

export default Shipment;