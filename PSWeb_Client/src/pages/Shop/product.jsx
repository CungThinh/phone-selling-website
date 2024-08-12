import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import './Product.css'; // Đảm bảo đường dẫn đến file CSS là đúng
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils";

export const Product = (props) => {
  const { id, name, price, image, rating, category, inventory, discount, selled, description } = props.data;
  const { addToCart, cartItems } = useContext(ShopContext);
  const user = useSelector((state) => state.user);
  const cartItemCount = cartItems[id] || 0;
  const navigate = useNavigate();

  // Tạo ra các ngôi sao dựa trên đánh giá
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>⭐</span>
      );
    }
    return stars;
  };

  const handleAddToCartClick = (e) => {
    if (user?.id) {
      e.stopPropagation(); // Prevent event propagation
      addToCart(id);
    } else {
      handleNavigateLogin();
    }
  };

  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };

  return (
    <div className="product">
      {discount > 0 && <div className="discount">{discount}% OFF</div>}
      <img src={image} alt={name} />
      <div className="description">
        <p><b>{name}</b></p>
        <p className="price" style={{ color: 'red' }}>{discount > 0 ? (
          <>
            <span style={{ textDecoration: 'line-through', marginRight: '5px', color: 'black' }}>
              {formatPrice(price * 100 / (100 - discount))}
            </span> 
            {formatPrice(price)}
          </>
        ) : (
          <>{formatPrice(price)}</>
        )}</p>
        <p className="rating">{renderStars()}</p>
      </div>
      <button className="addToCartBttn" onClick={handleAddToCartClick}>
        Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
      </button>
    </div>
  );
};