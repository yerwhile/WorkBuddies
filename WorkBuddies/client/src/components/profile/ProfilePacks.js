import { useEffect, useState } from "react";
import { getBuddyCount } from "../../modules/packManager";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

const ProfilePacks = ({pack}) => {

    const [buddyCount, setBuddyCount] = useState(0);

    useEffect(() => {
        getBuddyCount(pack.id).then(setBuddyCount);
    }, [])

    const toShortDate = (dateTime) => {
        const year = dateTime.slice(0, 4)
        const month = dateTime.slice(5, 7)
        const day = dateTime.slice(8, 10)
        const shortDate = `${month}/${day}/${year}`
        return shortDate
    }

    return(
        <tr>
            <td>{pack.name}</td>
            <td>{toShortDate(pack.createDate)}</td>
            <td>{buddyCount}</td>
            <td><Button color="info" href={`../../pack/packDetails/${pack.id}`}>See Details</Button></td>
        </tr>
    ) 
}

export default ProfilePacks