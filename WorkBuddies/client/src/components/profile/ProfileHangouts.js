import { useEffect, useState } from "react";
import { getBuddyCount } from "../../modules/packManager";

const ProfileHangouts = ({hangout}) => {


    return(
        <tr>
            <td>{hangout.name}</td>
            <td>{hangout.streetAddress} -- {hangout.city}, {hangout.state}</td>
        </tr>
    ) 
}

export default ProfileHangouts