import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import { Navbar } from "../../components/navbar";

const Fail = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="message-box _success _failed">
              <i className="fa fa-times-circle" aria-hidden="true" />
              <h2> Your payment failed </h2>
              <p> Try again later </p>
              <Link to="/" className="btn btn-primary mt-3">
                Continue
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Fail;
