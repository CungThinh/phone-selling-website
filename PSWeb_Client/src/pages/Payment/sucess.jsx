import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import { Navbar } from "../../components/navbar";

const Success = () => {
  return (
    <>
    <Navbar/>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="message-box _success">
            <i className="fa fa-check-circle" aria-hidden="true" />
            <h2> Your payment was successful </h2>
            <p>
              Thank you for your payment. We will <br />
              be in contact with more details shortly.
            </p>
            <Link to="/" className="btn btn-primary mt-3">Continue</Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Success;