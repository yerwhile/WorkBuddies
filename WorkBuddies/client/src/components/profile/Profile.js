import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBuddyProfile } from "../../modules/buddyManager";
import ProfilePacks from "./ProfilePacks";
import ProfileHangouts from "./ProfileHangouts";
import { Button, Table } from "reactstrap";
import "../styles/Profile.css"

const Profile = ({user}) => {
    const {id} = useParams();

    const [buddy, setBuddy] = useState({});   
    
    useEffect(() => {
        getBuddyProfile(id).then(setBuddy);
    }, [])

 return <>
 <div className="buddy_profile">
    <div className="buddy_profile__left">
        <div className="buddy_profile__main">
            <h2>{buddy.firstName} {buddy.lastName}'s Profile</h2>
            <div className="buddy_profile__image">
                <img className="profileImage" src={buddy.image} />
            </div>
            <div className="buddy_profile__about">{buddy.about}</div>
            <div className="buddy_profile__info">
                <Table>
                    <thead>
                        <tr>
                            <th>Working In</th>
                            <th>Gender</th>
                            <th>Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{buddy.city}, {buddy.state}</td>
                            <td>{buddy.gender}</td>
                            <td>{buddy.age}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
        <div className="buddy_profile__company">
            <Table>
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Industry</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{buddy.companyName}</td>
                        <td>{buddy.companyIndustry}</td>
                        <td>{buddy.companyRole}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
        <div className="buddy_profile__editButton">
            {
                user?.id == id
                    ? <Button color="secondary" href={`../editProfile/${id}`}>Edit Profile</Button>
                    : ""
                
            }
        </div>
    </div>
    <div className="buddy_profile__right">
        <div className="buddy_packs">
            <h4>{buddy.firstName}'s Packs</h4>
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
                    {buddy?.packs?.map((pack) => <ProfilePacks key={pack.id} pack={pack} />
                    
                    )}
                </tbody>
                
            </Table>
        </div>
        <div className="pack_hangouts">
            <h4>{buddy.firstName}'s Hangouts</h4>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Street Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {buddy?.hangouts?.map((hangout) => <ProfileHangouts key={hangout.id} hangout={hangout}/>)}
                </tbody>
            </Table>
        </div>
    </div>

    </div>
                
            
            </>
}

export default Profile