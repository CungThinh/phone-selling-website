import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import * as message from "../../components/Message/Message";
import "./Login.css";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/Slice/UserSlice";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mutation = useMutationHooks((data) => UserService.loginUser(data));
  const { data, isLoading, isSuccess } = mutation;

  useEffect(() => {
    if (isSuccess && data) {
      if (data?.status === "OK") {
        message.success("Logged in successfully");

        const token = data?.access_token;
        localStorage.setItem("accessToken", token);
        const decoded = jwtDecode(token);
  
        // Kiểm tra xem decoded có phải là một đối tượng hay không
        let uniqueNameData;
        if (typeof decoded === 'object') {
          uniqueNameData = decoded;
        } else if (typeof decoded === 'string') {
          try {
            uniqueNameData = JSON.parse(decoded);
          } catch (error) {
            console.error("Failed to parse JSON:", error);
          }
        }

        if (uniqueNameData?.is_superuser) {
          handleGetDetailsUser(uniqueNameData?.user_id);
          navigate("/system/admin");
        } else {
          handleGetDetailsUser(uniqueNameData?.user_id);
          navigate("/");
        }
      } else {
        message.error("User account or password incorrect");
      }
    }
  }, [isSuccess, data, navigate]);

  const handleGetDetailsUser = async (id) => {
    const res = await UserService.getDetailsUser(id);
    dispatch(updateUser({ ...res}));
  };

  const handleNavigateSignUp = () => {
    navigate("/sign-up");
  };

  const handleOnchangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleOnchangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSignIn = () => {
    mutation.mutate({
      email,
      password,
    });
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#BEBEBE" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-flex align-items-center justify-content-center">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: "1rem 0 0 1rem" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i
                          className="fas fa-cubes fa-2x me-3"
                          style={{ color: "#ff6219" }}
                        ></i>
                        <span className="h3 fw-bold mb-0">WebPhone</span>
                      </div>

                      <h5
                        className="fw-normal mb-3 pb-3"
                        style={{ letterSpacing: "1px" }}
                      >
                        Sign into your account
                      </h5>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          type="email"
                          id="form2Example17"
                          className="form-control form-control-lg border"
                          value={email}
                          onChange={handleOnchangeEmail}
                        />
                        <label
                          className={`form-label ${email ? "hideLabel" : ""}`}
                          htmlFor="form2Example17"
                        >
                          Email address
                        </label>
                      </div>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          type="password"
                          id="form2Example27"
                          className="form-control form-control-lg border"
                          value={password}
                          onChange={handleOnchangePassword}
                        />
                        <label
                          className={`form-label ${
                            password ? "hideLabel" : ""
                          }`}
                          htmlFor="form2Example27"
                        >
                          Password
                        </label>
                      </div>
                      {/* <Loading isLoading={isLoading}> */}
                      <div className="pt-1 mb-4">
                        <button
                          disabled={!email.length || !password.length}
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn btn-dark btn-lg btn-block"
                          type="button"
                          onClick={handleSignIn}
                        >
                          Login
                        </button>
                      </div>
                      {/* </Loading> */}

                      <a className="small text-muted" href="#!">
                        Forgot password?
                      </a>
                      <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                        Don't have an account?{" "}
                        <a
                          className="fw-bold text-body"
                          style={{ color: "#393f81", cursor: 'pointer' }}
                          onClick={handleNavigateSignUp}
                        >
                          Register here
                        </a>
                      </p>
                    </form>
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

export default Login;
