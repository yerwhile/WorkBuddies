import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBuddyProfile } from "../../modules/buddyManager";
import { getBuddyCount } from "../../modules/packManager";
import ProfilePacks from "./ProfilePacks";
import ProfileHangouts from "./ProfileHangouts";

const Profile = ({user}) => {
    const navigate = useNavigate;
    const {id} = useParams();

    const [buddy, setBuddy] = useState({});
    
    
    useEffect(() => {
        getBuddyProfile(id).then(setBuddy);
    }, [])


 return <>
 <div className="buddy_profile">
                <div className="buddy_profile__image">
                    <img src={buddy.image} />
                </div>
                <div className="buddy_profile__name">{buddy.firstName} {buddy.lastName}</div>
                <div className="pack_profile__location">{buddy.city}, {buddy.state}</div>
                <div className="pack_profile__gender">{buddy.gender}</div>
                <div className="pack_profile__age">{buddy.age}</div>
                <div className="pack_profile__about">{buddy.about}</div>
            </div>
            <div className="buddy_company">
                <h4>My Company</h4>
                <div className="buddy_company__name">{buddy.companyName}</div>
                <div className="buddy_company__industry">{buddy.companyIndustry}</div>
                <div className="buddy_company__role">{buddy.companyRole}</div>
            </div>
            <div className="buddy_packs">
                <h4>My Packs</h4>
                <table>
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
                    
                </table>
            </div>
            <div className="pack_hangouts">
                <h4>My Hangouts</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {buddy?.hangouts?.map((hangout) => <ProfileHangouts key={hangout.id} hangout={hangout}/>)}
                    </tbody>
                </table>
            </div></>
}

export default Profile