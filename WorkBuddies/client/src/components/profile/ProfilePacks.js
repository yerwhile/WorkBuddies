import { useEffect, useState } from "react";
import { getBuddyCount } from "../../modules/packManager";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

const ProfilePacks = ({pack}) => {

    const [buddyCount, setBuddyCount] = useState(0);

    useEffect(() => {
        getBuddyCount(pack.id).then(setBuddyCount);
    }, [])

    return(
        <tr>
            <td>{pack.name}</td>
            <td>{pack.createDate}</td>
            <td>{buddyCount}</td>
            <td><Link to={`../../pack/packDetails/${pack.id}`}>See Details</Link></td>
        </tr>
    ) 
}

export default ProfilePacks