import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { register } from "../../modules/authManager";
import "../styles/Form.css"

export default function Register() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [email, setEmail] = useState();
  const [image, setImage] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const registerClick = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Do better.");
    } else {
      const buddy = {
        firstName,
        lastName,
        city,
        state,
        image,
        email
      };
      register(buddy, password).then(() => navigate("/"));
    }
  };

  return (
    <div className="form">
        <Form onSubmit={registerClick}>
              <fieldset>
                <FormGroup>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    type="text"
                    onChange={(e) => setCity(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    type="text"
                    maxLength={2}
                    onChange={(e) => setState(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    id="email"
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="image">Profile Image URL</Label>
                  <Input
                    id="image"
                    type="text"
                    onChange={(e) => setImage(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Button>Register</Button>
                </FormGroup>
              </fieldset>
            </Form>
    </div>
    
  );
}