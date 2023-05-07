import { useEffect, useState } from "react";
import { getBuddyCount } from "../../modules/packManager";

const PackBuddies = ({buddy, buddyCount}) => {

    

    return(
        <tr>
            <td>{buddy.firstName} {buddy.lastName}</td>
            <td>{buddy.city}, {buddy.state}</td>
            <td>{buddy.companyName}</td>
        </tr>
    ) 
}

export default PackBuddies