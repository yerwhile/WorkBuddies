import { useEffect, useState } from "react"
import { getBuddyCount } from "../../modules/packManager";

const FindPackResults = ({pack}) => {
    const [buddyCount, setBuddyCount] = useState(0);

    useEffect(() => {
        getBuddyCount(pack.id).then(setBuddyCount);
    }, [])

    return (<tr>
                <td>{pack.name}</td>
                <td>{pack.createDate}</td>
                <td>{buddyCount}</td>
                <td>Join/Leave?</td>
            </tr>
            )
}

export default FindPackResults