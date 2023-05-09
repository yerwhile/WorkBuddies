import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, Link, useParams } from "react-router-dom";
import { updateBuddy } from "../../modules/buddyManager";

export default function EditProfile() {
  const navigate = useNavigate();
  const {id} = useParams();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [image, setImage] = useState("");
  const [about, setAbout] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [companyIndustry, setCompanyIndustry] = useState("");
  const [companyRole, setCompanyRole] = useState("");
  const [email, setEmail] = useState("");

  const editProfileSubmit = (e) => {
    e.preventDefault();

    const buddy = {
        id: parseInt(id),
        firstName,
        lastName,
        city,
        state,
        image,
        about,
        gender,
        age,
        companyName,
        companyIndustry,
        companyRole,
        email
    }

    updateBuddy(buddy).then(navigate(`/`))
  };
  
  return (
    <>
    <h2>Edit Your Profile</h2>
    <Form onSubmit={editProfileSubmit}>
      <fieldset>
        <FormGroup>
          <Label for="firstName">First Name</Label>
          <Input
            id="firstName"
            type="text"
            autoFocus
            onChange={(e) => setFirstName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="lastName">Last Name</Label>
          <Input
            id="lastName"
            type="text"
            onChange={(e) => setLastName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="city">City</Label>
          <Input
            id="City"
            type="text"
            onChange={(e) => setCity(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="state">State</Label>
          <Input
            id="state"
            type="text"
            onChange={(e) => setState(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="image">Image URL</Label>
          <Input
            id="image"
            type="text"
            onChange={(e) => setImage(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="about">About Me</Label>
          <Input
            id="about"
            type="text"
            onChange={(e) => setAbout(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="age">Age</Label>
          <Input
            id="age"
            type="number"
            onChange={(e) => setAge(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="gender">Gender</Label>
          <Input
            id="gender"
            type="text"
            onChange={(e) => setGender(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="companyName">Company Name</Label>
          <Input
            id="companyName"
            type="text"
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="companyIndustry">Company Industry</Label>
          <Input
            id="companyIndustry"
            type="text"
            onChange={(e) => setCompanyIndustry(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="companyRole">Company Role</Label>
          <Input
            id="companyRole"
            type="text"
            onChange={(e) => setCompanyRole(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email Address</Label>
          <Input
            id="email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Button>Edit Your profile</Button>
        </FormGroup>
      </fieldset>
    </Form>
    </>
    
  );
}