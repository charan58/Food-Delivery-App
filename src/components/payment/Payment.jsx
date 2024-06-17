import React, { useState } from 'react';
import './Payment.css'; // Import your CSS file
import { useForm } from 'react-hook-form';
import { Modal, Button, Form } from 'react-bootstrap';

function Payment() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [selectedPayment, setSelectedPayment] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handlePaymentSelection = (event) => {
    setSelectedPayment(event.target.value);
    reset(); // Reset form errors when payment method changes
  };

  const handlePaymentForm = (data) => {
    console.log(data); // Check if the form data is correctly logged
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="center-content">
      <div className="payment-form-container m-3">
        <Form onSubmit={handleSubmit(handlePaymentForm)}>
          <Form.Group>
            <Form.Label>Select Payment Method</Form.Label>
            <Form.Control as="select" value={selectedPayment} onChange={handlePaymentSelection} required>
              <option value="">Select...</option>
              <option value="credit-card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="upi">UPI</option>
              <option value="cod">Cash on Delivery</option>
            </Form.Control>
          </Form.Group>

          {selectedPayment === 'credit-card' && (
            <div>
              <Form.Group>
                <Form.Label>Card Number</Form.Label>
                <Form.Control type="text" {...register('cardNumber', { required: true })} />
                {errors.cardNumber && <span className="error-text">This field is required</span>}
              </Form.Group>
              <Form.Group>
                <Form.Label>Expiration Date</Form.Label>
                <Form.Control type="text" {...register('expirationDate', { required: true })} />
                {errors.expirationDate && <span className="error-text">This field is required</span>}
              </Form.Group>
              <Form.Group>
                <Form.Label>CVV</Form.Label>
                <Form.Control type="text" {...register('cvv', { required: true })} />
                {errors.cvv && <span className="error-text">This field is required</span>}
              </Form.Group>
            </div>
          )}

          {selectedPayment === 'paypal' && (
            <Form.Group>
              <Form.Label>PayPal Email</Form.Label>
              <Form.Control type="email" {...register('paypalEmail', { required: true })} />
              {errors.paypalEmail && <span className="error-text">This field is required</span>}
            </Form.Group>
          )}

          {selectedPayment === 'upi' && (
            <Form.Group>
              <Form.Label>UPI ID</Form.Label>
              <Form.Control type="text" {...register('upi', { required: true })} />
              {errors.upi && <span className="error-text">This field is required</span>}
            </Form.Group>
          )}

          <Button type="submit" variant="primary" className="mt-3">Place Order</Button>
        </Form>
      </div>

      <Modal show={showModal} onHide={closeModal} backdrop="static" keyboard={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Hang Tight! We're preparing your order.</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>Your payment is being processed. You will receive an email confirmation shortly.</p>
          <div className="gif-container">
            <img 
              src="https://media.tenor.com/rcvRJtAOOpgAAAAM/simpsons.gif" 
              alt="Processing GIF"
              className="modal-gif"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Payment;
