import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBuddyCount, getPackDetails, isBuddyMember } from "../../modules/packManager";
import PackBuddies from "./PackBuddies";
import PackHangouts from "./PackHangouts";
import { Button, Table } from "reactstrap";
import { addBuddyPack, deleteBuddyPack, getUserBuddyPackByPackId } from "../../modules/buddyManager";
import { me } from "../../modules/authManager";
import "../styles/PackDetails.css"

export default function PackDetails() {
    const navigate = useNavigate();

    let {id} = useParams();
    
    const [pack, setPack] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [isMember, setIsMember] = useState(false);
    const [buddyCount, setBuddyCount] = useState(0);
    
    useEffect(() => {
        getPackDetails(id).then(setPack);
        me().then(setCurrentUser);
    }, [])

    useEffect(() => {
        isBuddyMember(id).then(setIsMember);
    }, [pack])

    useEffect(() => {
        getBuddyCount(id).then(setBuddyCount);
    }, [isMember])

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
        <div className="pack_profile">
            <div className="pack_profile__left">
                <div className="pack_profile__main">
                    <h2>{pack.name}'s Details</h2>
                        <div>
                            <img className="pack_profile__image" src={pack.image} />
                        </div>
                        <div className="pack_profile__info">
                            <Table>
                                <tbody>
                                    <tr>
                                        <tr>{pack.schedule}</tr>
                                        <tr>
                                            {
                                            pack.isOpen === true
                                                ? "Pack is OPEN to new buddies"
                                                : "Pack is CLOSED to new buddies"
                                            }
                                        </tr>
                                        <tr>{pack.description}</tr>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                        <div className="pack_profile__buttons">
                            <div className="pack_profile__edit">
                                {
                                    isMember
                                        ? <Button color="primary" href={`../editPack/${id}`}>Edit Pack</Button>
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
                                    <th>Location</th>
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