import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import bg from "../assets/images/bg-svg-f.svg";
import Register from "../pages/Register";
import Login from "../pages/Login";

function Banner() {
  const [login, setLogin] = useState(true);
  return (
    <>
      <section
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          paddingTop: "130px",
          paddingBottom: "170px",
        }}
      >
        <Container>
          <Row>
            <Col>
              <div
                className="rounded bg-white shadow "
                sm={12}
                md={6}
                style={{
                  height: "460px",
                }}
              >
                <div
                  style={{
                    color: "#721c24",
                    backgroundColor: "#f8d7da",
                    borderColor: " #f5c6cb",
                  }}
                  className={`rounded-top mb-3 text-center  ${
                    alert && "py-2"
                  } `}
                >
                  {alert}
                </div>
                {login ? (
                  <Login toggle={setLogin} />
                ) : (
                  <Register toggle={setLogin} />
                )}
              </div>
            </Col>
            <Col sm={12} md={6}>
              <div className="pt-5 px-4">
                <small style={{ color: "#f6912b" }}>About</small>
                <h1 className="mb-4"> Evangadi Networks </h1>
                <p
                  style={{
                    lineHeight: "30px",
                    width: "75%",
                  }}
                >
                  No matter what stage of life you are in, whether you’re just
                  starting elementary school or being promoted to CEO of a
                  Fortune 500 company, you have much to offer to those who are
                  trying to follow in your footsteps.
                  <br />
                  <br />
                  Wheather you are willing to share your knowledge or you are
                  just looking to meet mentors of your own, please start by
                  joining the network here.
                </p>
                <Button
                  style={{
                    backgroundColor: "#f6912b",
                    border: "none",
                  }}
                >
                  HOW IT WORKS
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
export default Banner;
