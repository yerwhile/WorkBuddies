import { useEffect, useState } from "react";
import { getBuddyCount } from "../../modules/packManager";

const PackHangouts = ({hangout}) => {


    return(
        <tr>
            <td>{hangout.name}</td>
            <td>{hangout.streetAddress}</td>
            <td>{hangout.city}</td>
            <td>{hangout.state}</td>
        </tr>
    ) 
}

export default PackHangouts