import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPacksByCity, getPacksByCompany, getPacksByHangout, getPacksByState} from "../../modules/packManager";
import { getHangoutsByState } from "../../modules/hangoutManager";
import { getBuddiesByState } from "../../modules/buddyManager";
import FindPackResults from "./FindPackResults";

const FindPack = ({user}) => {
    const [packs, setPacks] = useState([]);
    const [buddies, setBuddies] = useState([])
    const [cities, setCities] = useState([]);
    const [hangouts, setHangouts] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [cityPacks, setCityPacks] = useState([]);
    const [hangoutPacks, setHangoutPacks] = useState([]);
    const [companyPacks, setCompanyPacks] = useState([]);
    const [cityChoice, setCityChoice] = useState("");
    const [hangoutChoice, setHangoutChoice] = useState("");
    const [companyChoice, setCompanyChoice] = useState("");
    const [filteredPacks, setFilteredPacks] = useState([]);

    useEffect(() => {
        getPacksByState().then(setPacks);
        getHangoutsByState().then(setHangouts);
        getBuddiesByState().then(setBuddies);
    }, [])

    useEffect(() => {
        const buddyCities = buddies.map(buddy => buddy.city);
        const uniqueCities = buddyCities.filter((city, index) => {
            return buddyCities.indexOf(city) === index;
        })
        setCities(uniqueCities);

        const  buddyCompanies = buddies.map(buddy => buddy.companyName);
        const uniqueCompanies = buddyCompanies.filter((company, index) => {
            return buddyCompanies.indexOf(company) === index;
        })
        setCompanies(uniqueCompanies);
    }, [buddies])

    useEffect(() => {
        getPacksByCity(cityChoice).then(setCityPacks)
    }, [cityChoice])

    useEffect(() => {
        getPacksByHangout(hangoutChoice).then(setHangoutPacks)
    }, [hangoutChoice])

    useEffect(() => {
        getPacksByCompany(companyChoice).then(setCompanyPacks)
    }, [companyChoice])

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
        <h2>Find a Pack in Your State: {user?.state}</h2>
        <div className="findPack_selectFilters">
            <label htmlFor="cities">Filter by Buddy Cities:</label>
            <select name="cities"
                    id="cities" 
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
            <label htmlFor="hangouts">Filter by Pack Hangouts:</label>
            <select name="hangouts" 
                    id="hangouts" 
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
            <label htmlFor="companies">Filter by Buddy Companies:</label>
            <select name="companies"
                    id="companies" 
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
        <div className="findPack_filterResults">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Formed</th>
                        <th>Buddy#</th>
                        <th>Join/Leave?</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPacks?.map((pack) => <FindPackResults key={pack.id} pack={pack} />

                    )}
                </tbody>
            </table>
        </div>
        </>
    )


}

export default FindPack