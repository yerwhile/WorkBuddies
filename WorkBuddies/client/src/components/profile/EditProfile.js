import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, Link, useParams } from "react-router-dom";
import { updateBuddy } from "../../modules/buddyManager";
import { me } from "../../modules/authManager";

export default function EditProfile() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(false);

    
  useEffect(() => {
      me().then(setCurrentUser);
  }, [])

  const handleInputChange = (evt) => {
    const value = evt.target.value;
    const key = evt.target.id;
    const userCopy = { ...currentUser };
    userCopy[key] = value;
    setCurrentUser(userCopy);
};

  const editProfileSubmit = (e) => {
    e.preventDefault();
    updateBuddy(currentUser).then(navigate(`/`))
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
            placeholder={currentUser.firstName}
            value={currentUser.firstName}
            autoFocus
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="lastName">Last Name</Label>
          <Input
            id="lastName"
            type="text"
            placeholder={currentUser.lastName}
            value={currentUser.lastName}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="city">City</Label>
          <Input
            id="City"
            type="text"
            placeholder={currentUser.city}
            value={currentUser.city}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="state">State</Label>
          <Input
            id="state"
            type="text"
            placeholder={currentUser.state}
            value={currentUser.state}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="image">Image URL</Label>
          <Input
            id="image"
            type="text"
            placeholder={currentUser.image}
            value={currentUser.image}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="about">About Me</Label>
          <Input
            id="about"
            type="text"
            placeholder={currentUser.about}
            value={currentUser.about}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="age">Age</Label>
          <Input
            id="age"
            type="number"
            placeholder={currentUser.age}
            value={currentUser.age}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="gender">Gender</Label>
          <Input
            id="gender"
            type="text"
            placeholder={currentUser.gender}
            value={currentUser.gender}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="companyName">Company Name</Label>
          <Input
            id="companyName"
            type="text"
            placeholder={currentUser.companyName}
            value={currentUser.companyName}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="companyIndustry">Company Industry</Label>
          <Input
            id="companyIndustry"
            type="text"
            placeholder={currentUser.companyIndustry}
            value={currentUser.companyIndustry}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="companyRole">Company Role</Label>
          <Input
            id="companyRole"
            type="text"
            placeholder={currentUser.companyRole}
            value={currentUser.companyRole}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email Address</Label>
          <Input
            id="email"
            type="text"
            placeholder={currentUser.email}
            value={currentUser.email}
            onChange={handleInputChange}
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