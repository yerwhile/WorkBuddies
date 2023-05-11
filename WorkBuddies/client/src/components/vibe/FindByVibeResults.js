import { useEffect, useState } from "react"
import { getBuddyCount, isBuddyMember } from "../../modules/packManager";
import { me } from "../../modules/authManager";
import { Button } from "reactstrap";
import { addBuddyPack, deleteBuddyPack, getUserBuddyPackByPackId } from "../../modules/buddyManager";
import { Link, useNavigate } from "react-router-dom";

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
    
    const toShortDate = (dateTime) => {
        const year = dateTime.slice(0, 4)
        const month = dateTime.slice(5, 7)
        const day = dateTime.slice(8, 10)
        const shortDate = `${month}/${day}/${year}`
        return shortDate
    }

    return (<tr>
                <td>{pack.name}</td>
                <td>{toShortDate(pack.createDate)}</td>
                <td>{buddyCount}</td>
                <td><Button color="info" href={`../../pack/packDetails/${pack.id}`}>See Details</Button></td>
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
                {
                    isMember === false && !pack.isOpen
                        ? "Pack Closed"
                        : ""
                }
                </td>
            </tr>
            )
}

export default FindByVibeResults