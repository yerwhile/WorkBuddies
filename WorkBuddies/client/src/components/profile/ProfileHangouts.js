import { Button } from "reactstrap";

const ProfileHangouts = ({hangout}) => {


    return(
        <tr>
            <td>{hangout.name}</td>
            <td>{hangout.streetAddress}</td>
            <td>{hangout.city}</td>
            <td>{hangout.state}</td>
            <td><Button color="info" href={`../../hangout/hangoutDetails/${hangout.id}`}>See Details</Button></td>
        </tr>
    ) 
}

export default ProfileHangouts