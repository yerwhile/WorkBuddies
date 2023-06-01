import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { getAllVibes, getVibeIdsByPack } from "../../modules/vibeManager";
import { addVibeToPack, getPackDetails } from "../../modules/packManager";
import "../styles/Form.css"

export const AddVibeToPackForm = () => {

  const [vibes, setVibes] = useState([]);
  const [packVibes, setPackVibes] = useState([]);
  const [pack, setPack] = useState({});
  const { id } = useParams();

  const navigate = useNavigate()


  useEffect(() => {
    getAllVibes().then(setVibes);
    getVibeIdsByPack(id).then(setPackVibes);
    getPackDetails(id).then(setPack);
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
    <div className="form">
      <h2>Add or Remove Existing Vibes from {pack.name}</h2>
      <div className="form_checkboxes">
        <Form>
          {vibes.map((vibe) => {
            const alreadyChecked = packVibes.includes(vibe.id)
            return (
              <FormGroup check key={vibe.id}>
                <Input
                  type="checkbox"
                  id={vibe.id}
                  name={vibe.name}
                  value={vibe.id}
                  checked={alreadyChecked}
                  onChange={(event) => handleChange(event)}
                />
                <Label>{vibe.name}</Label>
              </FormGroup>
            );
          })}
          <div className="addVibe_buttons">
            <div className="addVibe_update">
              <Button color="success" onClick={(event) => handleSave(event)}>
                Update
              </Button>
            </div>
            <div className="addVibe_cancel">
              <Button color="danger" href={`/pack/packDetails/${id}`}>
                Cancel
              </Button>
            </div>
          </div>
        </Form>
      </div>
      <h5 className="addVibe_create">Can't find the vibe you want to add? <Link to={`../../vibe/createPackVibe/${id}`}>Create a new vibe!</Link></h5>
    </div>
  );
};

export default AddVibeToPackForm