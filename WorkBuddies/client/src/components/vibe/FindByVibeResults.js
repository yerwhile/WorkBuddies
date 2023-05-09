import { useEffect, useState } from "react"
import { getBuddyCount, isBuddyMember } from "../../modules/packManager";
import { me } from "../../modules/authManager";
import { Button } from "reactstrap";
import { addBuddyPack, deleteBuddyPack, getUserBuddyPackByPackId } from "../../modules/buddyManager";
import { useNavigate } from "react-router-dom";

const FindByVibeResults = ({pack}) => {
    const navigate = useNavigate();

    const [buddyCount, setBuddyCount] = useState(0);
    const [currentUser, setCurrentUser] = useState({});
    const [isMember, setIsMember] = useState(false);

    useEffect(() => {
        getBuddyCount(pack.id).then(setBuddyCount);
        me().then(setCurrentUser);
        isBuddyMember(pack.id).then(setIsMember);
    }, [])

    const handleLeaveButton = () => {
        return <Button onClick={() => 
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
        return <Button onClick={() => {
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

    return (<tr>
                <td>{pack.name}</td>
                <td>{pack.createDate}</td>
                <td>{buddyCount}</td>
                <td>
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
                </td>
            </tr>
            )
}

export default FindByVibeResults