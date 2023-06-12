import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, useParams } from "react-router-dom";
import { addVibe } from "../../modules/vibeManager";
import "../styles/Form.css"

export default function CreateVibeFromHangout() {
  const navigate = useNavigate();
  const {id} = useParams();

  const [name, setName] = useState();


  const createVibeSubmit = (e) => {
    e.preventDefault();
    const vibe = {
        name
    }

    addVibe(vibe).then(navigate(`/hangout/editHangoutVibes/${id}`))
  };

  return (
    <>
    <div className="form">
    <h2>Create a Vibe</h2>
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
            <Button>Create Your Vibe</Button>
          </FormGroup>
        </fieldset>
      </Form>
    </div>
    
    </>
    
  );
}