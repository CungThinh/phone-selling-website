import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import * as message from "../../components/Message/Message";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const mutation = useMutationHooks((data) => UserService.signUpUser(data));

  const { data, isLoading, isSuccess } = mutation;
  useEffect(() => {
    if (isSuccess && data?.status == "OK") {
      message.success("Sign Up Success");
      handleNavigateSignIn();
    } else if (data?.status == "ERR") {
      message.error();
    }
  }, [isSuccess]);

  const handleOnchangName = (event) => {
    setName(event.target.value);
  };
  const handleOnchangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleOnchangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleOnchangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };
  const handleNavigateSignIn = () => {
    navigate("/sign-in");
  };
  const handleSignUp = () => {
    mutation.mutate({ name, email, password, confirmPassword });
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Sign up
                    </p>

                    <form className="mx-1 mx-md-4">
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="text"
                            id="form3Example1c"
                            className="form-control border"
                            value={name}
                            onChange={handleOnchangName}
                          />
                          <label
                            className={`form-label ${name ? "hideLabel" : ""}`}
                            htmlFor="form3Example1c"
                          >
                            Your Name
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="email"
                            id="form3Example3c"
                            className="form-control border"
                            value={email}
                            onChange={handleOnchangeEmail}
                          />
                          <label
                            className={`form-label ${email ? "hideLabel" : ""}`}
                            htmlFor="form3Example3c"
                          >
                            Your Email
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="form3Example4c"
                            className="form-control border"
                            value={password}
                            onChange={handleOnchangePassword}
                          />
                          <label
                            className={`form-label ${
                              password ? "hideLabel" : ""
                            }`}
                            htmlFor="form3Example4c"
                          >
                            Password
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="form3Example4cd"
                            className="form-control border"
                            value={confirmPassword}
                            onChange={handleOnchangeConfirmPassword}
                          />
                          <label
                            className={`form-label ${
                              confirmPassword ? "hideLabel" : ""
                            }`}
                            htmlFor="form3Example4cd"
                          >
                            Repeat your password
                          </label>
                        </div>
                      </div>

                      {data?.status === "ERR" && (
                        <span style={{ color: "red" }}>{data?.message}</span>
                      )}

                      <div className="d-flex justify-content-center mb-5">
                        <p class="text-center text-muted mt-5 mb-0">
                          Have already an account?{" "}
                          <a
                            className="fw-bold text-body"
                            style={{ color: "#393f81", cursor: 'pointer' }}
                            onClick={handleNavigateSignIn}
                          >
                            <u>Login here</u>
                          </a>
                        </p>
                      </div>
                      {/* <Loading isLoading={isLoading}> */}
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="button"
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn btn-primary btn-lg"
                          disabled={
                            !email.length ||
                            !password.length ||
                            !confirmPassword.length
                          }
                          onClick={handleSignUp}
                        >
                          Register
                        </button>
                      </div>
                      {/* </Loading> */}
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
