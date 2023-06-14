import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, useParams } from "react-router-dom";
import { getPackDetails, updatePack } from "../../modules/packManager";
import "../styles/Form.css"

export default function EditPack() {
  const navigate = useNavigate();
  const {id} = useParams();

  const [currentPack, setCurrentPack] = useState(false);

    
  useEffect(() => {
      getPackDetails(id).then(setCurrentPack);
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
    const packCopy = { ...currentPack };
    packCopy[key] = value;
    setCurrentPack(packCopy);
};

  const editPackSubmit = (e) => {
    e.preventDefault();

    updatePack(currentPack).then(navigate(`../packDetails/${id}`))
  };
  
  return (
    <>
    <div className="form">
      <h2>Edit Your Pack</h2>
      <Form onSubmit={editPackSubmit}>
        <fieldset>
          <FormGroup>
            <Label for="name">Pack Name</Label>
            <Input
              id="name"
              type="text"
              placeholder={currentPack.name}
              value={currentPack.name}
              autoFocus
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Pack Description</Label>
            <Input
              id="description"
              type="text"
              placeholder={currentPack.description}
              value={currentPack.description}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="schedule">Pack Schedule</Label>
            <Input
              id="schedule"
              type="text"
              placeholder={currentPack.schedule}
              value={currentPack.schedule}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="isOpen">Open to New Members?</Label>
            <Input
              id="isOpen"
              type="select"
              placeholder="Open to members?"
              value={currentPack.isOpen}
              onChange={handleInputChange}
            >
              <option value="false">Closed</option>
              <option value="true">Open</option>
              </Input>
          </FormGroup>
          <FormGroup>
            <Label for="image">Image URL</Label>
            <Input
              id="image"
              type="text"
              placeholder={currentPack.image}
              value={currentPack.image}
              onChange={handleInputChange}
            />
          </FormGroup>
          
          <FormGroup>
            <Button>Edit Your Pack</Button>
          </FormGroup>
        </fieldset>
      </Form>
    </div>
    
    </>
    
  );
}