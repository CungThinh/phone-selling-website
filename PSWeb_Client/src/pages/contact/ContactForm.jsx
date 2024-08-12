import React from "react";
import "./ContactForm.css";

const TeamMembers = () => {
  return (
    <>
      <div className="container text-center mt-5 mb-2">
        <h1 className="mb-0">Meet our agents</h1>
        <span>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum
        </span>
      </div>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-4">
            <div className="bg-white p-3 text-center rounded box">
              <img
                className="img-responsive rounded-circle"
                src="https://th.bing.com/th?id=OSK.VKQafHqD0e4q5AX5NKrdpQHaLS&w=200&h=200&c=7&rs=1&o=6&dpr=2.5&pid=SANGAM"
                width={90}
                alt="Pham Ngoc Hoang Thien"
              />
              <h5 className="mt-3 name">Pham Ngoc Hoang Thien</h5>
              <span className="work d-block">MSSV: 22012065</span>
              <span className="work d-block">Coder</span>
            </div>
          </div>
          <div className="col-md-4">
            <div className="bg-white p-3 text-center rounded box">
              <img
                className="img-responsive rounded-circle"
                src= "https://th.bing.com/th/id/OIP.SNv95P-Pb2jsG5C3qTLWgwHaHa?w=169&h=180&c=7&r=0&o=5&dpr=2.5&pid=1.7"
                width={90}
                alt="Mac Cung Thinh"
              />
              <h5 className="mt-3 name">Mac Cung Thinh</h5>
              <span className="work d-block">MSSV: 22108514</span>
              <span className="work d-block">Coder</span>
            </div>
          </div>
          <div className="col-md-4">
            <div className="bg-white p-3 text-center rounded box">
              <img
                className="img-responsive rounded-circle"
                src="https://th.bing.com/th/id/OIP.Ags7wTZbqKoWn88PF6iqQQHaHa?w=191&h=185&c=7&r=0&o=5&dpr=2.5&pid=1.7"
                width={90}
                alt="Nguyen Trung Hieu"
              />
              <h5 className="mt-3 name">Nguyen Trung Hieu</h5>
              <span className="work d-block">MSSV: 22012296</span>
              <span className="work d-block">Coder</span>
            </div>
          </div>
          <div className="col-md-4">
            <div className="bg-white p-3 text-center rounded box">
              <img
                className="img-responsive rounded-circle"
                src="https://th.bing.com/th/id/OIP.CTXjqnAwFiKUOZEjMPH6HAHaHa?w=180&h=180&c=7&r=0&o=5&dpr=2.5&pid=1.7"
                width={90}
                alt="Le Hoang Nam"
              />
              <h5 className="mt-3 name">Le Hoang Nam</h5>
              <span className="work d-block">MSSV: 22000587</span>
              <span className="work d-block">Content</span>
            </div>
          </div>
          <div className="col-md-4">
            <div className="bg-white p-3 text-center rounded box">
              <img
                className="img-responsive rounded-circle"
                src="https://th.bing.com/th/id/OIP.zSsIZtw7-jc8IzIS54lONQHaHa?w=183&h=183&c=7&r=0&o=5&dpr=2.5&pid=1.7"
                width={90}
                alt="Pham Anh Tu"
              />
              <h5 className="mt-3 name">Pham Anh Tu</h5>
              <span className="work d-block">MSSV: 22001510</span>
              <span className="work d-block">Content</span>
            </div>
          </div>
          <div className="col-md-4">
            <div className="bg-white p-3 text-center rounded box">
              <img
                className="img-responsive rounded-circle"
                src="https://th.bing.com/th/id/OIP.9Ypz9IZdGGXGy2lyx281rAHaGV?w=234&h=200&c=7&r=0&o=5&dpr=2.5&pid=1.7"
                width={90}
                alt="Phan Hoang Thanh"
              />
              <h5 className="mt-3 name">Phan Hoang Thanh</h5>
              <span className="work d-block">MSSV: 22101102</span>
              <span className="work d-block">Content</span>
            </div>
          </div>
          <div className="col-md-4">
            <div className="bg-white p-3 text-center rounded box">
              <img
                className="img-responsive rounded-circle"
                src = "https://th.bing.com/th/id/OIP.ol1hmXJ9IDCCNaT0IYi-SwHaHa?w=179&h=180&c=7&r=0&o=5&dpr=2.5&pid=1.7"
                width={90}
                alt="Tran Le Kim Bao"
              />
              <h5 className="mt-3 name">Tran Le Kim Bao</h5>
              <span className="work d-block">MSSV: 2193936</span>
              <span className="work d-block">Content</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamMembers;
