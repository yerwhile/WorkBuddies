import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Table } from "reactstrap";
import { me } from "../../modules/authManager";
import "../styles/HangoutDetails.css"
import { getHangoutDetails } from "../../modules/hangoutManager";
import HangoutPacks from "./HangoutPacks";

export default function HangoutDetails() {
    const navigate = useNavigate();

    let {id} = useParams();
    
    const [hangout, setHangout] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    
    useEffect(() => {
        getHangoutDetails(id).then(setHangout);
        me().then(setCurrentUser);
    }, [])

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
                    
            </div>
                    
            <div className="hangout_details__right">
                    <div className="hangout_details__vibes">
                        <h4>{hangout.name} Vibes</h4>
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
                                        <Button color="secondary" href={`../editHangoutVibes/${id}`}>Edit Vibes</Button>
                            }
                        </div>
                    </div>
                <div className="hangout_packs">
                <h4>Packs Associated with {hangout.name}</h4>
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
                            {hangout?.packs?.map((pack) => <HangoutPacks key={pack.id} pack={pack} />
                            
                            )}
                        </tbody>
                    </Table>
                </div>
            </div>
            
        </div>
        </>
    )
}