import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPackDetails } from "../../modules/packManager";

export default function PackDetails() {
    const navigate = useNavigate;
    const {id} = useParams(),
        [pack, setPack] = useState({});
    
    useEffect(() => {
        getPackDetails(id).then(setPack);
    }, [])

    if(pack === null) {
        return <p>404 not found</p>
    }

    else {
        return(
            <>
            <div className="pack_profile">
                <div className="pack_profile__image">
                    <img src={pack.image} />
                </div>
                <div className="pack_profile__schedule">{pack.schedule}</div>
                <div className="pack_profile__open">
                    {
                        pack.isOpen == true
                            ? "Pack is OPEN to new buddies"
                            : "Pack is CLOSED to new buddies"
                        
                    }
                </div>
                <div className="pack_profile__description">{pack.description}</div>
            </div>
            <div className="pack_vibes">
                <ul>
                {pack?.vibes?.map((vibe) => {
                    return <li>{vibe.name}</li>
                })}
                </ul>
            </div>
            <div className="pack_buddies">
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Company</th>
                    </tr>
                    {pack?.buddies?.map((buddy) => {
                    return <tr>
                        <td>{buddy.firstName} {buddy.lastName}</td>
                        <td>{buddy.city}, {buddy.state}</td>
                        <td>{buddy.companyName}</td>
                    </tr>
                })}
                </table>
            </div>
            <div className="pack_hangouts">
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Location</th>
                    </tr>
                        {pack?.hangouts?.map((hangout) => {
                        return <tr>
                            <td>{hangout.name}</td>
                            <td>{hangout.streetAddress} -- {hangout.city}, {hangout.state}</td>
                        </tr>
                        })}
                </table>
            </div>
            </>
        )
    }


}