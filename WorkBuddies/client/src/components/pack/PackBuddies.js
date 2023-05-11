import { Button } from "reactstrap"

const PackBuddies = ({buddy, buddyCount}) => {

    return(
        <tr>
            <td>{buddy.firstName} {buddy.lastName}</td>
            <td>{buddy.city}, {buddy.state}</td>
            <td>{buddy.companyName}</td>
            <td><Button color="info" href={`../../buddy/profile/${buddy.id}`}>See Details</Button></td>
        </tr>
    ) 
}

export default PackBuddies