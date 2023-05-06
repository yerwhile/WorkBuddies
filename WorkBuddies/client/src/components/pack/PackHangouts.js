import { useEffect, useState } from "react";
import { getBuddyCount } from "../../modules/packManager";

const PackHangouts = ({hangout}) => {


    return(
        <tr>
            <td>{hangout.name}</td>
            <td>{hangout.streetAddress} -- {hangout.city}, {hangout.state}</td>
        </tr>
    ) 
}

export default PackHangouts