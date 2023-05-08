import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { getAllVibes, getVibeIdsByPack } from "../../modules/vibeManager";
import { addVibeToPack } from "../../modules/packManager";

export const AddVibeForm = () => {

  const [vibes, setVibes] = useState([]);
  const [packVibes, setPackVibes] = useState([]);
  const { id } = useParams();

  const navigate = useNavigate()


  useEffect(() => {
    getAllVibes().then(setVibes);
    getVibeIdsByPack(id).then(setPackVibes);
  }, []);


  const handleChange = (event) => {
    var updatedList = [...packVibes]
    if (event.target.checked) {
        const integer = parseInt(event.target.value)
        updatedList = [...packVibes, integer]
    } else {
        const integer = parseInt(event.target.value)
        updatedList.splice(packVibes.indexOf(integer), 1)
    }
    setPackVibes(updatedList)
  };

  const handleSave = (event) => {
    event.preventDefault();
    const packVibeToSend = {
        packId: id,
        vibeIds: packVibes
    }
    addVibeToPack(packVibeToSend, parseInt(id))
        .then(() => navigate(`/pack/packDetails/${id}`))
  }
  
  return (
    <div className="container">
      <Form>
        {vibes.map((vibe) => {
          return (
            <FormGroup check>
              <Input
                type="checkbox"
                id={vibe.id}
                name={vibe.name}
                value={vibe.id}
                checked={packVibes.find(packVibeId => packVibeId === vibe.id ? true : false)}
                onChange={(event) => handleChange(event)}
              />
              <Label>{vibe.name}</Label>
            </FormGroup>
          );
        })}
        <Button className="btn btn-primary" onClick={(event) => handleSave(event)}>
          Update
        </Button>
        <Button className="btn btn-danger" href={`/pack/packDetails/${id}`}>
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default AddVibeForm