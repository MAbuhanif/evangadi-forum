import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { AppState } from "../App";
import axios from "../axiosConfig";
import { FaAngleRight, FaUser } from "react-icons/fa6";

function Home() {
  const { user } = useContext(AppState);
  const token = localStorage.getItem("token");
  const [question, setQuestion] = useState([]);
  const [users, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      checkLogedIn();
    } else {
      navigate("/");
    }
  }, []);
  async function checkLogedIn() {
    try {
      const { data } = await axios.get("/users/check", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      // console.log(data);
      setUser(data);
      await fetchAllQuestions();
    } catch (error) {
      console.log(error.response);
      navigate("/");
    }
  }

  const fetchAllQuestions = async () => {
    try {
      const { data } = await axios.get("question/allQuestions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(data.allQuestion);
      setQuestion(data.allQuestion);
    } catch (error) {
      alert("Please log in to your account first.");
      navigate("/");
    }
  };

  return (
    <>
      <Container className="py-5">
        <Row className="my-5">
          <Col sm={12} md={8}>
            <Link to="/ask">
              <Button>Ask Question</Button>
            </Link>
          </Col>
          <Col sm={12} md={4}>
            <h4>
              welcome : {"  "}
              <span className="text-secondary">{user.username}</span>
            </h4>
          </Col>
        </Row>
        <h3 className="my-5">Questions</h3>
        {/* map */}

        {question?.map((el, i) => {
          const { title, username, questionid } = el;
          return (
            <Link
              key={i}
              to={`${questionid}`}
              className="text-decoration-none text-secondary"
            >
              <div className="row question">
                <hr />
                <div className="col-12 col-md-2 user">
                  <div className="avatar">
                    <FaUser />
                  </div>
                  <div className="username">{username}</div>
                </div>
                <div className="col-10 col-md-9 my-md-4">
                  <p className="question title">{title}</p>
                </div>
                <div className="col-2 col-md-1">
                  <div className="angle">
                    <FaAngleRight />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </Container>
    </>
  );
}

export default Home;
