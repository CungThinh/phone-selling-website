import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../../context/shop-context";
import { Product } from "./product";
import { useNavigate } from "react-router-dom";
import "./shop.css";
import { Navbar } from "../../components/navbar";
import Footer from "../../components/Footer/Footer";

export const Shop = () => {
  const { products, searchKeyword } = useContext(ShopContext);
  const navigate = useNavigate();

  const [displayCount, setDisplayCount] = useState(8);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [products, searchKeyword]);

  const productsToShow = filteredProducts.slice(0, displayCount);

  const handleProductClick = (productId) => {
    navigate(`/product-details/${productId}`);
  };

  const handleLoadMore = () => {
    setDisplayCount(displayCount + 4);
  };

  return (
    <div>
      <Navbar />
      <div className="shop">
        <div className="shopTitle">
          <h1>HyperRaze Shop</h1>
        </div>

        <div className="products">
          {productsToShow.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product.id)}
            >
              <Product data={product} />
            </div>
          ))}
        </div>

        {displayCount < filteredProducts.length && (
          <div className="d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-outline-secondary mb-5"
              data-mdb-ripple-init
              data-mdb-ripple-color="dark"
              onClick={handleLoadMore}
            >
              Load more
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};