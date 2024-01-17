import React, { useContext, useRef } from "react";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { AppState } from "../App";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";


function AskQuestion() {
  const { user } = useContext(AppState);
  const token = localStorage.getItem("token");
  const titleDom = useRef();
  const descriptionDom = useRef();
  const navigate = useNavigate();

  // useEffect(() => {
  // 	if (token) {
  // 		checkLogedIn();
  // 	} else {
  // 		navigate("/");
  // 	}
  // }, []);

  async function postQuestion(e) {
    e.preventDefault();
    const titleValue = titleDom.current.value;
    const descriptionValue = descriptionDom.current.value;
    const questionid = uuidv4();

    if (!titleValue || !descriptionValue) {
      alert("please provide all required information!!");
      return;
    }
    try {
      await axios.post(
        "/question/ask-question",
        {
          questionid: questionid,
          title: titleValue,
          description: descriptionValue,
          userid: user.userid,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Question posted!");
      navigate("/home");
    } catch (error) {
      alert(error?.response?.data.msg);
    }
  }

  return (
    <>
    <Container className="my-5">
    <h3 className="text-center my-4 underline">
      Steps to write a good Question
    </h3>
    <ul
      style={{
        width: "50%",
        margin: "0 auto",
        marginBottom: "60px",
        lineHeight: "30px",
      }}
    >
      <li>Summerize your problems in a one-line-title.</li>
      <li>Describe your problem in more detail.</li>
      <li>Describe what you tried and what you expected to happen.</li>
      <li>Review your question and post it to site.</li>
    </ul>

    <h4 className="text-center my-2 underline">Ask a public question</h4>
    <div className="shadow-sm py-3 px-5">
      <Form onSubmit={postQuestion}>
        <Form.Control
          ref={titleDom}
          type="text"
          placeholder="Title"
          className="my-3"
        />
        <Form.Control
          ref={descriptionDom}
          as="textarea"
          rows="4"
          placeholder="Question Description ..."
        ></Form.Control>
        <Button type="submit" className="mt-4">
          Post Your Question
        </Button>
      </Form>
    </div>
  </Container>
  </>

    // <div className="bg-white p-10 rounded-lg shadow-lg w-full">
    //   <form onSubmit={postQuestion} className="max-w-2xl mx-auto">
    //     <h3>Ask a public question</h3>
    //     <label
    //       for="title"
    //       className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
    //     >
    //       Your Question Title
    //     </label>
    //     <input
    //       ref={titleDom}
    //       type="text"
    //       rows="1"
    //       className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //       placeholder="Title..."
    //     ></input>
    //     <label
    //       for="message"
    //       className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
    //     >
    //       Your Question
    //     </label>
    //     <input
    //       ref={descriptionDom}
    //       type="text"
    //       id="message"
    //       rows="4"
    //       className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //       placeholder="Your question..."
    //     ></input>

    //     <button
    //       type="submit"
    //       className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    //     >
    //       Post Question
    //     </button>
    //   </form>
    // </div>
  );
}

export default AskQuestion;
