import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, useParams } from "react-router-dom";
import { addHangout } from "../../modules/hangoutManager";

export default function CreateHangout() {
  const navigate = useNavigate();
  const {id} = useParams();

  const [name, setName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");


  const createVibeSubmit = (e) => {
    e.preventDefault();
    const hangout = {
        name,
        streetAddress,
        city,
        state
    }

    addHangout(hangout).then(navigate(`/pack/editHangouts/${id}`))
  };

  return (
    <>
    <h2>Create a Hangout</h2>
    <Form onSubmit={createVibeSubmit}>
      <fieldset>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            id="name"
            type="text"
            autoFocus
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="streetAddress">Street Address</Label>
          <Input
            id="streetAddress"
            type="text"
            autoFocus
            onChange={(e) => setStreetAddress(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="city">City</Label>
          <Input
            id="city"
            type="text"
            autoFocus
            onChange={(e) => setCity(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="state">State (Two-letter Abbreviation)</Label>
          <Input
            id="state"
            type="text"
            maxLength={2}
            autoFocus
            onChange={(e) => setState(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Button>Create Your Hangout</Button>
        </FormGroup>
      </fieldset>
    </Form>
    </>
    
  );
}