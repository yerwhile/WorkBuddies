import React, { useEffect, useState } from "react";
import { getPacksByState, getPacksByVibe} from "../../modules/packManager";
import { getAllVibes } from "../../modules/vibeManager";
import FindByVibeResults from "./FindByVibeResults";
import { Table } from "reactstrap";

const FindByVibe = ({user}) => {
    const [packs, setPacks] = useState([]);
    const [vibes, setVibes] = useState([])
    const [vibeChoice, setVibeChoice] = useState("")
    const [vibePacks, setVibePacks] = useState([]);
    const [filteredPacks, setFilteredPacks] = useState([]);

    useEffect(() => {
        getPacksByState().then(setPacks);
        getAllVibes().then(setVibes);
    }, [])

    useEffect(() => {
        getPacksByVibe(vibeChoice).then(setVibePacks)
    }, [vibeChoice])


    useEffect(() => {
        setFilteredPacks(vibePacks)
    }, [vibePacks])

    

    return (
        <>
        <div className="findPack">
            <h2>Find a Pack by Vibe in Your State: {user?.state}</h2>
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
                            <th>Name</th>
                            <th>Formed</th>
                            <th>Buddy#</th>
                            <th>Details</th>
                            <th>Join/Leave?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPacks?.map((pack) => <FindByVibeResults key={pack.id} pack={pack} />

                        )}
                    </tbody>
                </Table>
            </div>
        </div>
        
        </>
    )


}

export default FindByVibe