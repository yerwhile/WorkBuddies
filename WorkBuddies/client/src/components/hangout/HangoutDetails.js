import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBuddyCount, getPackDetails, isBuddyMember } from "../../modules/packManager";
import PackBuddies from "./PackBuddies";
import PackHangouts from "./PackHangouts";
import { Button, Table } from "reactstrap";
import { addBuddyPack, deleteBuddyPack, getUserBuddyPackByPackId } from "../../modules/buddyManager";
import { me } from "../../modules/authManager";
import "../styles/PackDetails.css"

export default function HangoutDetails() {
    const navigate = useNavigate();

    let {id} = useParams();
    
    const [hangout, setHangout] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [buddyCount, setBuddyCount] = useState(0);
    
    useEffect(() => {
        getHangoutDetails(id).then(setHangout);
        me().then(setCurrentUser);
    }, [])

    const handleLeaveButton = () => {
        return <Button color="warning" onClick={() => 
            getUserBuddyPackByPackId(pack.id)
                .then((buddyPack) => {
                    deleteBuddyPack(buddyPack.id)
                    .then(() => {
                        navigate(`/../../buddy/profile/${currentUser.id}`)
                    })
                }) 
            } >Leave Pack</Button>
    }

    const handleJoinButton = () => {
        return <Button color="success" onClick={() => {
                const buddyPack = {
                    buddyId: currentUser.id,
                    packId: pack.id
                }
                addBuddyPack(buddyPack)
                    .then(() => {
                        navigate(`/../../buddy/profile/${currentUser.id}`)
                    })
        }}
        >Join Pack</Button>
    }

    return(
        <>
        <div className="hangout_details">
            <div className="hangout_details__left">
                <div className="hangout_details__main">
                    <h2>{hangout.name}</h2>
                        <div className="hangout_details__info">
                            <Table>
                                <tbody>
                                    <tr>
                                        <tr>{hangout.streetAddress}</tr>
                                        <tr>{hangout.city}</tr>
                                        <tr>{hangout.state}</tr>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                        <div className="hangout_profile__buttons">
                            <div className="pack_profile__edit">
                                {
                                    isMember
                                        ? <Button color="secondary" href={`../editPack/${id}`}>Edit Pack</Button>
                                        : ""
                                    
                                }
                            </div>
                            <div className="pack_profile__joinleave">
                                {
                                    isMember === true
                                        ? handleLeaveButton()
                                        : ""
                                    
                                }
                                {
                                    isMember === false && pack.isOpen
                                        ? handleJoinButton()
                                        : ""
                                    
                                }
                            </div>
                        </div>
                    </div>
                    <div className="pack_vibes">
                        <h4>Pack Vibes</h4>
                        <div className="pack_vibes__list">
                            <Table variant="flush">
                                <tbody>
                                    <tr>
                                        {pack?.vibes?.map((vibe) => {
                                            return <tr key={vibe.id}>{vibe.name}</tr>
                                        })}
                                    </tr>
                                </tbody>
                            </Table>
                            

                        </div>
                        <div className="pack_vibes__button">
                            {
                                isMember == true
                                    ? <>
                                        <Button color="secondary" href={`../editVibes/${id}`}>Edit Vibes</Button>
                                        </>
                                    : ""
                            }
                        </div>
                    </div>
            </div>
                    
            <div className="pack_profile__right">
                <div className="pack_buddies">
                <h4>Buddies in {pack.name}</h4>
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Location</th>
                                <th>Company</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pack?.buddies?.map((buddy) => <PackBuddies key={buddy.id} buddy={buddy} buddyCount={buddyCount} />
                                
                                )}
                        </tbody>
                        
                    </Table>
                </div>
                <div className="pack_hangouts">
                    <div className="pack_hangouts__list">
                    <h4>Hangouts of {pack.name}</h4>
                        <Table striped bordered>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Street Address</th>
                                    <th>City</th>
                                    <th>State</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pack?.hangouts?.map((hangout) => <PackHangouts key={hangout.id} hangout={hangout}/>)}
                            </tbody>
                        </Table>
                    </div>
                    <div className="pack_hangouts__button">
                        {
                            isMember == true
                                ? <>
                                    <Button color="secondary" href={`../editHangouts/${id}`}>Edit Hangouts</Button>
                                    </>
                                : ""
                        }
                    </div>
                </div>
            </div>
            
        </div>
        </>
    )
}