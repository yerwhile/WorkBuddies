import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPackDetails } from "../../modules/packManager";
import PackBuddies from "./PackBuddies";
import PackHangouts from "./PackHangouts";

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
                    {pack?.buddies?.map((buddy) => <PackBuddies key={buddy.id} buddy={buddy} />
                        
                        )}
                </table>
            </div>
            <div className="pack_hangouts">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pack?.hangouts?.map((hangout) => <PackHangouts key={hangout.id} hangout={hangout}/>)}
                    </tbody>
                </table>
            </div>
            </>
        )
    }


}