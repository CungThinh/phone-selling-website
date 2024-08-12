import React from "react";

const Footer = () => {
  return (
    // Remove the container if you want to extend the Footer to full width.

    <footer
      className="text-center text-lg-start text-white"
      style={{ backgroundColor: "#45526e" }}
    >
      {/* Grid container */}
      <div className="container p-4 pb-0">
        {/* Section: Links */}
        <section>
          {/* Grid row */}
          <div className="row">
            {/* Grid column */}
            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">
                Group Members
              </h6>
              <p>Nguyen Trung Hieu</p>
              <p>Pham Ngoc Hoang Thien</p>
              <p>Mac Cung Thinh</p>
              <p>Tran Le Kim Bao</p>
              <p>Pham Anh Tu</p>
              <p>Phan Hoang Thanh</p>
              <p>Le Hoang Nam</p>
            </div>
            {/* Grid column */}

            <hr className="w-100 clearfix d-md-none" />

            {/* Grid column */}
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">Products</h6>
              <p>
                <a href="" className="text-white">
                  WebPhone
                </a>
              </p>
            </div>
            {/* Grid column */}

            <hr className="w-100 clearfix d-md-none" />

            {/* Grid column */}
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">
                Subject
              </h6>
              <p>
                <a href="" className="text-white">
                  Software Architecture
                </a>
              </p>
              <h6 className="text-uppercase mb-4 font-weight-bold">
                Lecturers
              </h6>
              <p>
                <a href="" className="text-white">
                Nguyen Ngoc Tu

                </a>
              </p>
            </div>
            {/* Grid column */}

            <hr className="w-100 clearfix d-md-none" />

            {/* Grid column */}
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
              <p>
                <i className="fas fa-home mr-3"></i> HSU, ThanhThai
              </p>
              <p>
                <i className="fas fa-envelope mr-3"></i> info@gmail.com
              </p>
              <p>
                <i className="fas fa-phone mr-3"></i> + 01 234 567 88
              </p>
              <p>
                <i className="fas fa-print mr-3"></i> + 01 234 567 89
              </p>
            </div>
            {/* Grid column */}
          </div>
          {/* Grid row */}
        </section>
        {/* Section: Links */}

        <hr className="my-3" />

        {/* Section: Copyright */}
        <section className="p-3 pt-0">
          <div className="row d-flex align-items-center">
            {/* Grid column */}
            <div className="col-md-7 col-lg-8 text-center text-md-start">
              {/* Copyright */}
              <div className="p-3">
                © 2020 Copyright:
                <a className="text-white" href="https://mdbootstrap.com/">
                  {" "}
                  MDBootstrap.com
                </a>
              </div>
              {/* Copyright */}
            </div>
            {/* Grid column */}

            {/* Grid column */}
            <div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
              {/* Facebook */}
              <a
                className="btn btn-outline-light btn-floating m-1"
                href=""
                role="button"
              >
                <i className="fab fa-facebook-f"></i>
              </a>

              {/* Twitter */}
              <a
                className="btn btn-outline-light btn-floating m-1"
                href=""
                role="button"
              >
                <i className="fab fa-twitter"></i>
              </a>

              {/* Google */}
              <a
                className="btn btn-outline-light btn-floating m-1"
                href=""
                role="button"
              >
                <i className="fab fa-google"></i>
              </a>

              {/* Instagram */}
              <a
                className="btn btn-outline-light btn-floating m-1"
                href=""
                role="button"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
            {/* Grid column */}
          </div>
        </section>
        {/* Section: Copyright */}
      </div>
      {/* Grid container */}
    </footer>
  );
};

export default Footer;
