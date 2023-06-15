import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, useParams } from "react-router-dom";
import "../styles/Form.css"
import { getHangoutDetails, updateHangout } from "../../modules/hangoutManager";

export default function EditHangout() {
  const navigate = useNavigate();
  const {id} = useParams();

  const [currentHangout, setCurrentHangout] = useState(false);

    
  useEffect(() => {
      getHangoutDetails(id).then(setCurrentHangout);
  }, [])

  const handleInputChange = (evt) => {
    let value = evt.target.value;
    if(value == "true") {
        value = true
    }
    else if(value == "false")
    {
        value = false
    }
    const key = evt.target.id;
    const hangoutCopy = { ...currentHangout };
    hangoutCopy[key] = value;
    setCurrentHangout(hangoutCopy);
};

  const editHangoutSubmit = (e) => {
    e.preventDefault();

    updateHangout(currentHangout).then(navigate(`../hangoutDetails/${id}`))
  };
  
  return (
    <>
    <div className="form">
      <h2>Edit Your Hangout</h2>
      <Form onSubmit={editHangoutSubmit}>
        <fieldset>
          <FormGroup>
            <Label for="name">Hangout Name</Label>
            <Input
              id="name"
              type="text"
              placeholder={currentHangout.name}
              value={currentHangout.name}
              autoFocus
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="streetAddress">Hangout Street Address</Label>
            <Input
              id="streetAddress"
              type="text"
              placeholder={currentHangout.streetAddress}
              value={currentHangout.streetAddress}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="city">Hangout City</Label>
            <Input
              id="city"
              type="text"
              placeholder={currentHangout.city}
              value={currentHangout.city}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="state">Hangout State</Label>
            <Input
              id="state"
              type="text"
              placeholder={currentHangout.state}
              value={currentHangout.state}
              onChange={handleInputChange}
            >
              </Input>
          </FormGroup>
          
          <FormGroup>
            <Button>Edit Your Hangout</Button>
          </FormGroup>
        </fieldset>
      </Form>
    </div>
    
    </>
    
  );
}