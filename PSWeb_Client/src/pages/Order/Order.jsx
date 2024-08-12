import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/shop-context";
import { postOrder } from "../../services/OrderService";
import { useSelector } from "react-redux";
import { Navbar } from "../../components/navbar";
import axios from "axios";
import { formatPrice } from "../../utils";
import Footer from "../../components/Footer/Footer";

const Order = () => {
  const user = useSelector((state) => state.user);
  const { cartItems, products, getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    phone: "",
    paymentMethod: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.name || "",
        address: user.address || "",
        city: user.city || "",
        phone: user.phone || "",
        paymentMethod: "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleRadioChange = (e) => {
    setFormData({ ...formData, paymentMethod: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const orderItems = products.filter(product => cartItems[product.id] > 0)
      .map(product => ({
        product_id: product.id, 
        name: product.name,
        quantity: cartItems[product.id],
        price: product.price.toString(), 
      }));
  
    if (orderItems.length === 0) {
      setError("Your cart is empty. Please add products to your cart before placing an order.");
      return;
    }
  
    const orderData = {
      payment_method: formData.paymentMethod,
      total_price: totalAmount.toString(),
      shipping_price: "5.00",
      user_id: user.id,
      is_paid: false,
      paid_at: null,
      is_delivered: false,
      delivered_at: null,
      order_items: orderItems,
      shipping_address: {
        full_name: formData.fullName,
        address: formData.address,
        city: formData.city,
        phone: formData.phone,
      },
    };
  
    console.log("Order data:", orderData); 
  
    try {
      const response = await postOrder(orderData);
      console.log("Order posted successfully:", response);

      const accessToken = localStorage.getItem("accessToken");
      const res = await axios.post(`http://127.0.0.1:8000/api/payment/create-checkout-session/${response.id}/`, {}, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}`},
      });
    
      const checkoutUrl = res.data.url;
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error("Failed to post order:", error);
      if (error.response && error.response.data) {
        console.error("Error details:", error.response.data);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-md-4 order-md-2 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Your cart</span>
              <span className="badge badge-secondary badge-pill">
                {Object.keys(cartItems).reduce((total, item) => total + cartItems[item], 0)}
              </span>
            </h4>
            <ul className="list-group mb-3">
              {products.map((product) => {
                if (cartItems[product.id] > 0) {
                  return (
                    <li key={product.id} className="list-group-item d-flex justify-content-between lh-condensed">
                      <div>
                        <h6 className="my-0">{product.name} x {cartItems[product.id]}</h6>
                      </div>
                      <span className="text-muted ml-2">{formatPrice(product.price)}</span>
                    </li>
                  );
                }
                return null;
              })}
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>${totalAmount}</strong>
              </li>
            </ul>
          </div>
          <div className="col-md-8 order-md-1">
            <h4 className="mb-3">Billing address</h4>
            <form className="needs-validation" noValidate="" onSubmit={handleSubmit}>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="fullName">Full name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                  <div className="invalid-feedback">
                    Valid full name is required.
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    placeholder="123-456-7890"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                  <div className="invalid-feedback">
                    Please enter a valid phone number.
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="1234 Main St"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  Please enter your shipping address.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="city">City</label>
                <select
                  className="custom-select d-block w-100"
                  id="city"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                >
                  <option value={formData.city}>{formData.city}</option>
                  <option value="Ho Chi Minh">Ho Chi Minh</option>
                  <option value="Hanoi">Hanoi</option>
                  <option value="Da Nang">Da Nang</option>
                  <option value="Can Tho">Can Tho</option>
                  <option value="Hai Phong">Hai Phong</option>
                  <option value="Nha Trang">Nha Trang</option>
                  <option value="Vung Tau">Vung Tau</option>
                </select>
                <div className="invalid-feedback">
                  Please select a valid city.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="paymentMethod">Payment Method</label>
                <div className="d-block my-3">
                  <div className="custom-control custom-radio">
                    <input
                      id="credit"
                      name="paymentMethod"
                      type="radio"
                      className="custom-control-input"
                      required
                      value="Credit card"
                      checked={formData.paymentMethod === "Credit card"}
                      onChange={handleRadioChange}
                    />
                    <label className="custom-control-label" htmlFor="credit">
                      Credit card
                    </label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input
                      id="cod"
                      name="paymentMethod"
                      type="radio"
                      className="custom-control-input"
                      required
                      value="COD"
                      checked={formData.paymentMethod === "COD"}
                      onChange={handleRadioChange}
                    />
                    <label className="custom-control-label" htmlFor="cod">
                      Cash on Delivery (COD)
                    </label>
                  </div>
                </div>
                <div className="invalid-feedback">
                  Please select a valid payment method.
                </div>
              </div>
              <hr className="mb-4" />
              <button className="btn btn-primary btn-lg btn-block" type="submit">
                Continue to payment
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Order;