import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../contexts/cartfunctions/CartFunctions';
import { Card, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

function Cart() {
  const [cart, cartCount, addToCart, updateCartItem, removeCartItem] = useContext(CartContext);
  const [totalCost, setTotalCost] = useState(0);
  const [estimatedDeliveryTime, setEstimatedDeliveryTime] = useState('');
  const [availableCoupons, setAvailableCoupons] = useState([
    { code: 'DISCOUNT10', discount: 10 },
    { code: 'DISCOUNT20', discount: 20 },
    { code: 'FOOD101', discount: 12 },
    { code: 'DELIVERY12', discount: 15 }
  ]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // State for modal
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // Update total cost and estimated delivery time whenever the cart or applied coupon changes
  useEffect(() => {
    let baseCost = cart.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0);
    let discount = appliedCoupon ? (baseCost * appliedCoupon.discount / 100) : 0;
    let costAfterDiscount = baseCost - discount;
    let gst = costAfterDiscount * 0.05;
    let totalCost = costAfterDiscount + gst + 150; // 150 is the delivery charge

    setTotalCost(totalCost);

    const maxDeliveryTime = cart.reduce((maxTime, cartItem) => {
      const time = parseInt(cartItem.deliveryTime.split(' ')[0], 10);
      return time > maxTime ? time : maxTime;
    }, 0);
    setEstimatedDeliveryTime(maxDeliveryTime + ' mins');
  }, [cart, appliedCoupon]);

  const updateCartItemQuantity = (productId, newQuantity) => {
    if (newQuantity >= 0) {
      updateCartItem(productId, newQuantity);
    }
  };

  const applyCoupon = (code) => {
    const coupon = availableCoupons.find(c => c.code === code);
    if (coupon) {
      setAppliedCoupon(coupon);
      setModalMessage(`Coupon ${code} applied! You get ${coupon.discount}% off.`);
      setShowModal(true);
    } else {
      alert('Invalid coupon code');
    }
  };

  const removeAppliedCoupon = () => {
    setAppliedCoupon(null);
    setModalMessage('You removed the Coupon.');
    setShowModal(true);
  };
  const navigate = useNavigate();

  const checkOutOrder =()=>{
    navigate('/checkout-order');
  }

  return (
    <>
      {cart.length === 0 ? (
        <div style={{ textAlign: 'center' }}>
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png"
            width="100px"
            alt="Empty Cart"
          />
          <h5 style={{ color: "#fff" }}>
            Your cart is currently empty. Please add items to proceed. 😊
          </h5>
        </div>
      ) : (
        <>
          <div className="row m-2">
            <h4 className="col-12 col-md-6 text-center heading">Your Cart Items</h4>
            <h4 className="col-12 col-md-6 text-center heading">Available Coupons</h4>
          </div>

          <div className="row">
            <div className="col-12 col-md-6">
              {cart.map((cartFoodItem) => (
                <div className="row" key={cartFoodItem.id}>
                  <div className="col-12">
                    <Card className="w-100 mb-2">
                      <div className="row no-gutters">
                        <div className="col-md-8">
                          <Card.Body className="d-flex flex-column justify-content-between">
                            <div>
                              <Card.Title>{cartFoodItem.name}</Card.Title>
                              <Card.Text>
                                Price: ₹{cartFoodItem.price}<br />
                                Delivery Time: {cartFoodItem.deliveryTime}
                              </Card.Text>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex align-items-center">
                                <Button
                                  variant="danger"
                                  onClick={() => updateCartItemQuantity(cartFoodItem.id, cartFoodItem.quantity + 1)}
                                >
                                  +
                                </Button>
                                <p className="mb-0 mx-2">{cartFoodItem.quantity}</p>
                                <Button
                                  variant="danger"
                                  onClick={() => updateCartItemQuantity(cartFoodItem.id, cartFoodItem.quantity - 1)}
                                >
                                  -
                                </Button>
                              </div>
                              <Button variant="danger" onClick={() => removeCartItem(cartFoodItem.id)}>
                                Remove from Cart
                              </Button>
                            </div>
                          </Card.Body>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-12 col-md-6">
              <Card className="w-100 mb-2">
                <Card.Body>
                  <h5>Available Coupons</h5>
                  {availableCoupons.map(coupon => (
                    <div key={coupon.code}>
                      <Button
                        className='apply-coupon-btn'
                        variant="info"
                        onClick={() => applyCoupon(coupon.code)}
                        disabled={!!appliedCoupon}  // Disable button if a coupon is applied
                      >
                        {coupon.code} - {coupon.discount}% off
                      </Button>
                    </div>
                  ))}
                </Card.Body>
              </Card>
              {appliedCoupon && (
                <Card className="w-100 mb-2">
                  <Card.Body>
                    <h5>Applied Coupon</h5>
                    <p>{appliedCoupon.code} - {appliedCoupon.discount}% off</p>
                    <Button variant="warning" onClick={removeAppliedCoupon}>
                      Remove Coupon
                    </Button>
                  </Card.Body>
                </Card>
              )}
            </div>
          </div>

          <div className="delivery-info">
            <h6 className="total-cost">Total Cost: ₹{totalCost.toFixed(2)}</h6>
            <p className="total-cost">Includes 5% GST and ₹150 delivery charge</p>
            <div className="delivery-info-checkout">
              <h6 className="estimated-delivery-time">Estimated Delivery Time: {estimatedDeliveryTime}</h6>
              <Button variant='success' onClick={checkOutOrder}>Checkout order</Button>
            </div>
          </div>
        </>
      )}

      {/* Modal for coupon applied */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Coupon Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Cart;
