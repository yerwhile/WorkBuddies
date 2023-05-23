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
                        <div className="hangout_details__buttons">
                            <div className="pack_profile__edit">
                                <Button color="secondary" href={`../editHangout/${id}`}>Edit Hangout</Button>
                            </div>
                        </div>
                    </div>
                    <div className="hangout_details__vibes">
                        <h4>Hangout Vibes</h4>
                        <div className="hangout_details__vibesList">
                            <Table variant="flush">
                                <tbody>
                                    <tr>
                                        {hangout?.vibes?.map((vibe) => {
                                            return <tr key={vibe.id}>{vibe.name}</tr>
                                        })}
                                    </tr>
                                </tbody>
                            </Table>
                            

                        </div>
                        <div className="hangout_details__vibesButton">
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
                    
            <div className="hangout_details__right">
                <div className="hangout_packs">
                <h4>Packs associated with {hangout.name}</h4>
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Formed</th>
                                <th>Buddy Count</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {buddy?.packs?.map((pack) => <ProfilePacks key={pack.id} pack={pack} />
                            
                            )} */}
                        </tbody>
                    </Table>
                </div>
            </div>
            
        </div>
        </>
    )
}