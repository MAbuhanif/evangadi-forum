import React, { useRef } from "react";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function Register({ toggle }) {
  const navigate = useNavigate();
  const userNameDom = useRef();
  const firstNameDom = useRef();
  const lastNameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();

  async function register(e) {
    e.preventDefault();
    const usernameValue = userNameDom.current.value;
    const firstnameValue = firstNameDom.current.value;
    const lastnameValue = lastNameDom.current.value;
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;
    if (
      !usernameValue ||
      !firstnameValue ||
      !lastnameValue ||
      !emailValue ||
      !passwordValue
    ) {
      alert("please provide all required information!!");
      return;
    }
    try {
      await axios.post("/users/register", {
        username: usernameValue,
        firstname: firstnameValue,
        lastname: lastnameValue,
        email: emailValue,
        password: passwordValue,
      });
      alert("registered successfully, please login!!");
      navigate("/home");
    } catch (error) {
      alert(error.response.data.msg);
    }
  }

  return (
    <>
      <Form onSubmit={register}>
        <div className="py-4 text-center px-md-1 px-sm-3 mx-md-3">
          <h5>Join the network</h5>
          <p>
            Already have an account?{" "}
            <span
              onClick={() => {
                toggle(true);
              }}
              style={{
                color: "orange",
                cursor: "pointer",
              }}
            >
              Sign in
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
              <Col sm={12} className="my-2">
                <Form.Control
                  ref={userNameDom}
                  type="text"
                  placeholder="User name"
                />
              </Col>
              <Col sm={12} md={6} className="my-2">
                <Form.Control
                  ref={firstNameDom}
                  type="text"
                  placeholder="First name"
                />
              </Col>
              <Col sm={12} md={6} className="my-2">
                <Form.Control
                  ref={lastNameDom}
                  type="text"
                  placeholder="Last name"
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
                  Agree and Join
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </Form>
    </>
  );
}

export default Register;
