import React from "react";

const OrderDetail = () => {
  return (
    <section className="h-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-10 col-xl-8">
            <div className="card" style={{ borderRadius: 10 }}>
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <p
                    className="lead fw-normal mb-0"
                    style={{ color: "#a8729a" }}
                  >
                    Receipt
                  </p>
                </div>
                <div className="card shadow-0 border mb-4">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-2">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/13.webp"
                          className="img-fluid"
                          alt="Phone"
                        />
                      </div>
                      <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                        <p className="text-muted mb-0">Samsung Galaxy</p>
                      </div>
                      <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                        <p className="text-muted mb-0 small">White</p>
                      </div>
                      <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                        <p className="text-muted mb-0 small">Capacity: 64GB</p>
                      </div>
                      <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                        <p className="text-muted mb-0 small">Qty: 1</p>
                      </div>
                      <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                        <p className="text-muted mb-0 small">$499</p>
                      </div>
                    </div>
                    <hr
                      className="mb-4"
                      style={{ backgroundColor: "#e0e0e0", opacity: 1 }}
                    />
                    <div className="row d-flex align-items-center">
                      <div className="col-md-2">
                        <p className="text-muted mb-0 small">Track Order</p>
                      </div>
                      <div className="col-md-10">
                        <div
                          className="progress"
                          style={{ height: 6, borderRadius: 16 }}
                        >
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{
                              width: "0%",
                              borderRadius: 16,
                              backgroundColor: "#a8729a",
                            }}
                            aria-valuenow={65}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                        <div className="d-flex justify-content-around mb-1">
                          <p className="text-muted mt-1 mb-0 small ms-xl-5">
                            Out for delivary
                          </p>
                          <p className="text-muted mt-1 mb-0 small ms-xl-5">
                            Delivered
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card shadow-0 border mb-4">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-2">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/1.webp"
                          className="img-fluid"
                          alt="Phone"
                        />
                      </div>
                      <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                        <p className="text-muted mb-0">iPad</p>
                      </div>
                      <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                        <p className="text-muted mb-0 small">Pink rose</p>
                      </div>
                      <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                        <p className="text-muted mb-0 small">Capacity: 32GB</p>
                      </div>
                      <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                        <p className="text-muted mb-0 small">Qty: 1</p>
                      </div>
                      <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                        <p className="text-muted mb-0 small">$399</p>
                      </div>
                    </div>
                    <hr
                      className="mb-4"
                      style={{ backgroundColor: "#e0e0e0", opacity: 1 }}
                    />
                    <div className="row d-flex align-items-center">
                      <div className="col-md-2">
                        <p className="text-muted mb-0 small">Track Order</p>
                      </div>
                      <div className="col-md-10">
                        <div
                          className="progress"
                          style={{ height: 6, borderRadius: 16 }}
                        >
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{
                              width: "0%",
                              borderRadius: 16,
                              backgroundColor: "#a8729a",
                            }}
                            aria-valuenow={20}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                        <div className="d-flex justify-content-around mb-1">
                          <p className="text-muted mt-1 mb-0 small ms-xl-5">
                            Out for delivary
                          </p>
                          <p className="text-muted mt-1 mb-0 small ms-xl-5">
                            Delivered
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between pt-2">
                  <p className="fw-bold mb-0">Order Details</p>
                  <p className="text-muted mb-0">
                    <span className="fw-bold me-4">Total</span> $898.00
                  </p>
                </div>
                <div className="d-flex justify-content-between pt-2">
                  <p className="text-muted mb-0">Order ID : 788152</p>
                  <p className="text-muted mb-0">
                    <span className="fw-bold me-4">Delivery Charges</span> Free
                  </p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="text-muted mb-0">Order Date : 22 Dec,2019</p>
                </div>
                <div className="d-flex justify-content-between mb-5">
                </div>
                
              </div>
              <div
                className="card-footer border-0 px-4 py-5"
                style={{
                  backgroundColor: "#a8729a",
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                }}
              >
                <h5 className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">
                  Total paid: <span className="h2 mb-0 ms-2">$1040</span>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetail;
