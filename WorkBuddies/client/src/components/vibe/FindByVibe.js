import React, { useEffect, useState } from "react";
import { getPacksByVibe} from "../../modules/packManager";
import { getAllVibes } from "../../modules/vibeManager";
import FindByVibeResults from "./FindByVibeResults";
import { Table } from "reactstrap";
import { getHangoutsByVibe } from "../../modules/hangoutManager";

const FindByVibe = ({user}) => {
    const [vibes, setVibes] = useState([])
    const [vibeChoice, setVibeChoice] = useState("")
    const [vibePacks, setVibePacks] = useState([]);
    const [vibeHangouts, setVibeHangouts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        getAllVibes().then(setVibes);
    }, [])

    useEffect(() => {
        getPacksByVibe(vibeChoice).then(setVibePacks);
        getHangoutsByVibe(vibeChoice).then(setVibeHangouts);
    }, [vibeChoice])


    useEffect(() => {
        const vibeResults = vibePacks.concat(vibeHangouts);
        vibeResults.sort((a, b) => a.name - b.name)
        setSearchResults(vibeResults);
    }, [vibePacks, vibeHangouts])

    

    return (
        <>
        <div className="findPack">
            <h2>Find Packs and Hangouts by Vibe</h2>
            <div className="findPack_selectFilters">
                <label htmlFor="vibes">Filter by Vibes:</label>
                <select name="vibes"
                        id="vibes" 
                        value={vibeChoice}
                        onChange={(event) => {
                            setVibeChoice(event.target.value)
                        }}>
                        <option value="">Choose a Vibe</option>
                    {
                        vibes?.map((vibe) => {
                            return <option key={vibe.id} value={vibe.name}>{vibe.name}</option>
                        })
                    }
                </select>
            </div>
            <div className="findPack_filterResults">
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>Pack or Hangout?</th>
                            <th>Name</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            vibeChoice !== ""
                                ? searchResults?.map((sr) => <FindByVibeResults key={`${searchResults.indexOf(sr)}`} searchResult={sr} />)
                                : ""
                        
                        }
                    </tbody>
                </Table>
            </div>
        </div>
        
        </>
    )


}

export default FindByVibe