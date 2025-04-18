import { Form, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "./client";
import { setCurrentUser } from "./reducer";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const user = await signup({ username, password });
      dispatch(setCurrentUser(user));
      navigate("/Kambaz/Account/Profile");
    } catch (error: any) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="mb-4">Sign up</h3>
      <Form>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Control
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-4" controlId="formVerifyPassword">
          <Form.Control type="password" placeholder="Verify Password" />
        </Form.Group>
        <Button
          variant="primary"
          className="w-100 mb-2"
          onClick={handleSignup}
        >
          Sign up
        </Button>
        <Link to="/Kambaz/Account/Signin">
          <Button variant="link" className="w-100">
            Already have an account? Sign in
          </Button>
        </Link>
      </Form>
    </Container>
  );
}
