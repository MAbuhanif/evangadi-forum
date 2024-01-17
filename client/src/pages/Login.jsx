import React, { useRef } from "react";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function Login({ toggle }) {
  const navigate = useNavigate();
  const emailDom = useRef();
  const passwordDom = useRef();
  async function handleSubmit(e) {
    e.preventDefault();

    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;
    if (!emailValue || !passwordValue) {
      alert("Please provide all required information!!");
      return;
    }
    try {
      const { data } = await axios.post("/users/login", {
        email: emailValue,
        password: passwordValue,
      });

      localStorage.setItem("token", data.token);

      navigate("/home");
    } catch (error) {
      alert(error?.response?.data.msg);
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <div className="py-5 text-center px-md-1 px-sm-3 mx-md-3">
          <h5>Login to your account</h5>
          <p>
            Don’t have an account?{" "}
            <span
              onClick={() => {
                toggle(false);
              }}
              style={{
                color: "orange",
                cursor: "pointer",
              }}
            >
              {" "}
              Create a new account
            </span>
          </p>
          <div className="px-xl-4 ">
            <Row>
              <Col sm={12} className="my-2">
                <Form.Control
                  ref={emailDom}
                  type="email"
                  placeholder="Email address"
                />
              </Col>

              <Col sm={12} className="my-2 position-relative">
                <Form.Control
                  ref={passwordDom}
                  type="password"
                  placeholder="Password"
                />
                <i
                  className="fa fa-eye-slash"
                  onClick={() => {
                    toggle_password();
                  }}
                  style={{
                    position: "absolute",
                    right: "5%",
                    top: "30%",
                    color: "gray",
                    opacity: "0.3",
                    cursor: "pointer",
                  }}
                ></i>
              </Col>
              <Col
                sm={12}
                className="px-4 d-flex justify-content-center text-center"
              >
                <small>
                  I agree to the <a href=""> privacy policy</a> and{" "}
                  <a href=""> terms of service.</a>
                </small>
              </Col>
              <Col sm={12}>
                <Button type="submit" variant="primary my-4 w-75">
                  Login
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </Form>
    </>
  );
}

export default Login;
