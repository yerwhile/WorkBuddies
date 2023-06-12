import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { getAllVibes, getVibeIdsByHangout } from "../../modules/vibeManager";
import "../styles/Form.css"
import { addVibeToHangout, getHangoutDetails } from "../../modules/hangoutManager";

export const AddVibeToHangoutForm = () => {

  const [vibes, setVibes] = useState([]);
  const [hangoutVibes, setHangoutVibes] = useState([]);
  const [hangout, setHangout] = useState({});
  const { id } = useParams();

  const navigate = useNavigate()


  useEffect(() => {
    getAllVibes().then(setVibes);
    getVibeIdsByHangout(id).then(setHangoutVibes);
    getHangoutDetails(id).then(setHangout);
  }, []);


  const handleChange = (event) => {
    var updatedList = [...hangoutVibes]
    if (event.target.checked) {
        const integer = parseInt(event.target.value)
        updatedList = [...hangoutVibes, integer]
    } else {
        const integer = parseInt(event.target.value)
        updatedList.splice(hangoutVibes.indexOf(integer), 1)
    }
    setHangoutVibes(updatedList)
  };

  const handleSave = (event) => {
    event.preventDefault();
    const hangoutVibeToSend = {
        hangoutId: id,
        vibeIds: hangoutVibes
    }
    addVibeToHangout(hangoutVibeToSend, parseInt(id))
        .then(() => navigate(`/hangout/hangoutDetails/${id}`))
  }
  
  return (
    <div className="form">
      <h2>Add or Remove Existing Vibes from {hangout.name}</h2>
      <div className="form_checkboxes">
        <Form>
          {vibes.map((vibe) => {
            const alreadyChecked = hangoutVibes.includes(vibe.id)
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
              <Button color="danger" href={`/hangout/hangoutDetails/${id}`}>
                Cancel
              </Button>
            </div>
          </div>
        </Form>
      </div>
      <h5 className="addVibe_create">Can't find the vibe you want to add? <Link to={`../../vibe/createVibe/${id}`}>Create a new vibe!</Link></h5>
    </div>
  );
};

export default AddVibeToHangoutForm