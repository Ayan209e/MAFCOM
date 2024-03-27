import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
import { login } from "../../../auth/Action";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const LoginForm = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  // const jwt = localStorage.getItem("jwt")

  // const { auth } = useSelector(store => store)

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    await delay(500);

    const userData = {
      email: `${inputUsername}`,
      password: `${inputPassword}`
    }
    const data = await dispatch(login(userData));
    // console.log(data);
    // console.log(userData, jwt);
    if(data!=null){
      window.location.href='/';
    }
    if (data==null) {
      setShow(true);
    }
    setLoading(false);
  };

  // const handlePassword = () => {};

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  return (
    <Box id="LoginForm" sx={style}> 
      {/* Form */}
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        {/* Header */}
        <img
        id="mafLogin"
          className="img-thumbnail "
            src='data:image/png;base64,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'
          alt="logo"
        />
        <div className="h4 my-2 text-center">SIGN IN</div>
        {/* ALert */}
        {show ? (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
          >
            Incorrect Email or Password.
          </Alert>
        ) : (
          <div />
        )}
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={inputUsername}
            placeholder="Email"
            onChange={(e) => setInputUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={inputPassword}
            placeholder="Password"
            onChange={(e) => setInputPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="checkbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>
        {!loading ? (
          <Button id="loginButton" className="w-100" variant="primary" type="submit">
            LOGIN
          </Button>
        ) : (
          <Button style={{backgroundColor:"green"}} className="w-100" variant="primary" type="submit" disabled>
            Logging In...
          </Button>
        )}
        <div className="d-grid justify-content-end">

        <Link to={"/signup"} id="signupChange">
            <Button >SIGNUP</Button>
        </Link>
        </div>
      </Form>
    </Box>
  );
};

export default LoginForm;
