import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, Link, useParams } from "react-router-dom";
import { login } from "../../modules/authManager";
import { addPack } from "../../modules/packManager";
import { addBuddyPack } from "../../modules/buddyManager";

export default function FormPack() {
  const navigate = useNavigate();
  const {id} = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [schedule, setSchedule] = useState("");
  const [image, setImage] = useState("");
  const [founderId, setFounderId] = useState(null);

  useEffect(() => {
    setFounderId(id);
  }, [])

  const formPackSubmit = (e) => {
    e.preventDefault();

    const pack = {
        name,
        description,
        schedule,
        image
    }

    addPack(pack).then((packData) => {
      const buddyPack = {
        buddyId: id,
        packId: packData.id
      }
      return buddyPack
      })
      .then((bP) => {
        return addBuddyPack(bP).then(navigate(`/pack/packDetails/${bP.packId}`))
      })
  };
  
  return (
    <>
    <h2>Form a Pack</h2>
    <Form onSubmit={formPackSubmit}>
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
          <Label for="description">Description</Label>
          <Input
            id="description"
            type="text"
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="schedule">Meet-Up Schedule</Label>
          <Input
            id="schedule"
            type="text"
            onChange={(e) => setSchedule(e.target.value)}
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
          <Button>Form Your Pack</Button>
        </FormGroup>
      </fieldset>
    </Form>
    </>
    
  );
}