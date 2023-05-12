import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPacksByCity, getPacksByCompany, getPacksByHangout, getPacksByState} from "../../modules/packManager";
import { getHangoutsByState } from "../../modules/hangoutManager";
import { getBuddiesByState } from "../../modules/buddyManager";
import FindPackResults from "./FindPackResults";
import { Table } from "reactstrap";
import "../styles/FindPack.css"
import { getAllBuddies } from "../../modules/buddyManager";
import { isDisabled } from "@testing-library/user-event/dist/utils";

const FindPack = ({user}) => {
    const [packs, setPacks] = useState([]);
    const [states, setStates] = useState([]);
    const [buddies, setBuddies] = useState([])
    const [stateBuddies, setStateBuddies] = useState([]);
    const [cities, setCities] = useState([]);
    const [hangouts, setHangouts] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [cityPacks, setCityPacks] = useState([]);
    const [hangoutPacks, setHangoutPacks] = useState([]);
    const [companyPacks, setCompanyPacks] = useState([]);
    const [stateChosen, setStateChosen] = useState(false);
    const [stateChoice, setStateChoice] = useState("");
    const [cityChoice, setCityChoice] = useState("");
    const [hangoutChoice, setHangoutChoice] = useState("");
    const [companyChoice, setCompanyChoice] = useState("");
    const [filteredPacks, setFilteredPacks] = useState(null);

    useEffect(() => {

        // getHangoutsByState().then(setHangouts);

        getAllBuddies().then(setBuddies);
    }, [])

    useEffect(() => {
        const buddyStates = buddies.map(buddy => buddy.state);
        const uniqueStates = buddyStates.filter((state, index) => {
            return buddyStates.indexOf(state) === index;
        })
        setStates(uniqueStates);

        
    }, [buddies])

    useEffect(() => {
        getBuddiesByState(stateChoice).then(setStateBuddies);
        getHangoutsByState(stateChoice).then(setHangouts);
    }, [stateChoice])

    useEffect(() => {
        const buddyCities = stateBuddies.map(buddy => buddy.city);
        const uniqueCities = buddyCities.filter((city, index) => {
            return buddyCities.indexOf(city) === index;
        })
        setCities(uniqueCities);

        const  buddyCompanies = stateBuddies.map(buddy => buddy.companyName);
        const uniqueCompanies = buddyCompanies.filter((company, index) => {
            return buddyCompanies.indexOf(company) === index && company !== null;
        })
        setCompanies(uniqueCompanies);
    }, [stateBuddies])

    useEffect(() => {
        getPacksByCity(cityChoice).then(setCityPacks)
    }, [cityChoice])

    useEffect(() => {
        getPacksByHangout(hangoutChoice).then(setHangoutPacks)
    }, [hangoutChoice])

    useEffect(() => {
        getPacksByCompany(companyChoice).then(setCompanyPacks)
    }, [companyChoice])

    // useEffect(() => {
    //     setFilteredPacks(packs)
    // }, [packs])

    useEffect(() => {
        setFilteredPacks(companyPacks)

    }, [companyPacks])

    useEffect(() => {
        setFilteredPacks(cityPacks)
    }, [cityPacks])
  
    useEffect(() => {
        setFilteredPacks(hangoutPacks)
    }, [hangoutPacks])


    return (
        <>
        <div className="findPack">
            <h2>Find a Pack</h2>
            <div className="findPack_selectState">
            <label htmlFor="states">Choose a U.S. State:</label>
                    <select name="states"
                            id="states" 
                            value={stateChoice}
                            onChange={(event) => {
                                setStateChoice(event.target.value)
                                setStateChosen(true)
                                setHangoutChoice("")
                                setCompanyChoice("")
                                setCityChoice("")
                            }}>
                            <option value="">Choose a State</option>
                        {
                            states?.map((state, index) => {
                                return <option key={index + 1} value={state}>{state}</option>
                            })
                        }
                    </select>
            </div>
            <div className="findPack_selectFilters">
                <div className="findPack_selectFilters__cities">
                    <label htmlFor="states">Filter by Buddy City:</label>
                    <select name="cities"
                            id="cities"
                            disabled={stateChosen === true && stateChoice !== "" ? false : true}
                            value={cityChoice}
                            onChange={(event) => {
                                setCityChoice(event.target.value)
                                setHangoutChoice("")
                                setCompanyChoice("")
                            }}>
                            <option value="">Choose a City</option>
                        {
                            cities?.map((city, index) => {
                                return <option key={index + 1} value={city}>{city}</option>
                            })
                        }
                    </select>
                </div>
                <div className="findPack_selectFilters__hangouts">
                    <label htmlFor="hangouts">Filter by Pack Hangouts:</label>
                    <select name="hangouts" 
                            id="hangouts" 
                            disabled={stateChosen === true && stateChoice !== "" ? false : true}
                            value={hangoutChoice} 
                            onChange={(event) => {
                                setHangoutChoice(event.target.value)
                                setCityChoice("")
                                setCompanyChoice("")
                            }}>
                            <option value="">Choose a Hangout</option>
                        {
                            hangouts?.map((hangout) => {
                                return <option key={hangout.id} value={hangout.name}>{hangout.name}</option>
                            })
                        }
                    </select>
                </div>
                <div className="findPack_selectFilters__companies">
                    <label htmlFor="companies">Filter by Buddy Companies:</label>
                    <select name="companies"
                            id="companies" 
                            disabled={stateChosen === true && stateChoice !== "" ? false : true}
                            value={companyChoice}
                            onChange={(event) => {
                                setCompanyChoice(event.target.value)
                                setCityChoice("")
                                setHangoutChoice("")
                            }}>
                            <option value="">Choose a Company</option>
                        {
                            companies?.map((company, index) => {
                                return <option key={index + 1} value={company}>{company}</option>
                            })
                        }
                    </select>
                </div> 
            </div>
            <div className="findPack_filterResults">
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Formed</th>
                            <th>Buddy Count</th>
                            <th>Details</th>
                            <th>Join/Leave?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            stateChoice !== ""
                                ? filteredPacks?.map((pack) => <FindPackResults key={pack.id} pack={pack} />)
                                : ""
                        
                        }
                    </tbody>
                </Table>
            </div>
        </div>
        
        </>
    )


}

export default FindPack