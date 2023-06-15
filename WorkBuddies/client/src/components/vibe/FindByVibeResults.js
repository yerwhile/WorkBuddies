import { useEffect, useState } from "react"
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

const FindByVibeResults = ({searchResult}) => {
    const navigate = useNavigate();


    useEffect(() => {

    }, [])

    

    return (<tr>
                <td>
                    {
                        searchResult.streetAddress != null
                            ? "Hangout"
                            : "Pack"
                    }
                </td>
                <td>{searchResult.name}</td>
                <td>{
                        searchResult.streetAddress != null
                            ? <Button color="info" href={`../../hangout/hangoutDetails/${searchResult.id}`}>See Details</Button>
                            : <Button color="info" href={`../../pack/packDetails/${searchResult.id}`}>See Details</Button>
                    
                    }
                </td>
            </tr>
            )
}

export default FindByVibeResults