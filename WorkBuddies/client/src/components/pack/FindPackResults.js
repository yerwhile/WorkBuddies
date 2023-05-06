const FindPackResults = ({pack}) => {
    return (<tr>
                <td>{pack.name}</td>
                <td>{pack.createDate}</td>
                <td>Buddy Count</td>
                <td>Join/Leave?</td>
            </tr>
            )
}

export default FindPackResults