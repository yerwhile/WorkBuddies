import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBuddyCount, getPackDetails, isBuddyMember } from "../../modules/packManager";
import PackBuddies from "./PackBuddies";
import PackHangouts from "./PackHangouts";
import { Button } from "reactstrap";

export default function PackDetails() {
    const navigate = useNavigate;
    let {id} = useParams();
    const [pack, setPack] = useState({});
    const [isMember, setIsMember] = useState(false);
    const [buddyCount, setBuddyCount] = useState(0);
    
    useEffect(() => {
        getPackDetails(id).then(setPack);
    }, [])

    useEffect(() => {
        isBuddyMember(id).then(setIsMember);
    }, [pack])

    useEffect(() => {
        getBuddyCount(id).then(setBuddyCount);
    }, [isMember])

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
            <div className="pack_vibes__list">
                <ul>
                {pack?.vibes?.map((vibe) => {
                    return <li key={vibe.id}>{vibe.name}</li>
                })}
                </ul>
            </div>
            <div className="pack_vibes__buttons">
                {
                    isMember == true
                        ? <>
                            <Button href={`../addVibe/${id}`}>Edit Vibes</Button>
                            </>
                        : ""
                }
            </div>
        </div>
        <div className="pack_buddies">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Company</th>
                    </tr>
                </thead>
                <tbody>
                    {pack?.buddies?.map((buddy) => <PackBuddies key={buddy.id} buddy={buddy} buddyCount={buddyCount} />
                        
                        )}
                </tbody>
                
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