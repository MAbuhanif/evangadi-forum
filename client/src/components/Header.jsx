import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import logo from "../assets/images/evangadi-logo.png";

function Header({ user, removeUser }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  //   const logOut = async () => {
  //     try {
  //       await axios.delete("https://evangadi-form.cyclic.app/api/user/logout", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       localStorage.removeItem("token");

  //       removeUser();
  //       navigate("/");
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };

  return (
    <>
      <Navbar
        bg="light"
        expand="lg"
        className="py-3 shadow-lg position-sticky w-100 "
        style={{
          zIndex: "99",
          top: "0",
        }}
      >
        <Container>
          
          <Link to={"./home"} >
            <img src={logo} alt="" />
            </Link>
        

          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-lg`}
          ></Navbar.Toggle>
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="end"
          >
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 ">
              <Nav.Link to={"./home"} >Home</Nav.Link>
                <Nav.Link href="#">How it works</Nav.Link>
                {token && (
                  <h6
                    style={{
                      cursor: "pointer",
                    }}
                    className="fw-bold py-2 px-3 c-pointer"
                    // onClick={logOut}
                  >
                    Log out
                  </h6>
                )}
              </Nav>
              {!token && (
                <Nav>
                  <Button className="px-5" variant="primary">
                    SIGN IN
                  </Button>
                </Nav>
              )}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}
export default Header;
