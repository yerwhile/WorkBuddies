import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { getAllVibes, getVibeIdsByPack } from "../../modules/vibeManager";
import { addHangoutToPack, addVibeToPack, getPackDetails } from "../../modules/packManager";
import { getBuddyProfile } from "../../modules/buddyManager";
import { getHangoutIdsByPack, getHangoutsByState } from "../../modules/hangoutManager";
import { me } from "../../modules/authManager";

export const AddHangoutForm = () => {

  const [hangouts, setHangouts] = useState([]);
  const [packHangouts, setPackHangouts] = useState([]);
  const [currentBuddy, setCurrentBuddy] = useState({});
  const [pack, setPack] = useState({});
  const { id } = useParams();

  const navigate = useNavigate()

  useEffect(() => {
    me().then(setCurrentBuddy)
  }, [])


  useEffect(() => {
    getHangoutsByState(currentBuddy.state).then(setHangouts);
    getHangoutIdsByPack(id).then(setPackHangouts);
    getPackDetails(id).then(setPack);
  }, [currentBuddy]);


  const handleChange = (event) => {
    var updatedList = [...packHangouts]
    if (event.target.checked) {
        const integer = parseInt(event.target.value)
        updatedList = [...packHangouts, integer]
    } else {
        const integer = parseInt(event.target.value)
        updatedList.splice(packHangouts.indexOf(integer), 1)
    }
    setPackHangouts(updatedList)
  };

  const handleSave = (event) => {
    event.preventDefault();
    const packHangoutToSend = {
        packId: id,
        hangoutIds: packHangouts
    }
    addHangoutToPack(packHangoutToSend, parseInt(id))
        .then(() => navigate(`/pack/packDetails/${id}`))
  }
  
  return (
    <div className="container">
      <h2>Add or remove existing hangouts from {pack?.name}</h2>
      <Form>
        {hangouts.map((hangout) => {
          const alreadyChecked = packHangouts.includes(hangout.id)
          return (
            <FormGroup check key={hangout.id}>
              <Input
                type="checkbox"
                id={hangout.id}
                name={hangout.name}
                value={hangout.id ? hangout.id : 0}
                checked={alreadyChecked}
                onChange={(event) => handleChange(event)}
              />
              <Label>{hangout.name}</Label>
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
      <h5>Can't find the hangout you want to add? <Link to={`../../hangout/createHangout/${id}`}>Create a new hangout!</Link></h5>
    </div>
  );
};

export default AddHangoutForm