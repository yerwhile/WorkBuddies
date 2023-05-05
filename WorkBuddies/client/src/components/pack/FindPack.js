import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllPacks, getPacksByCity, getPacksByCompany, getPacksByHangout} from "../../modules/packManager";
import { getAllHangouts } from "../../modules/hangoutManager";
import { getAllBuddies } from "../../modules/buddyManager";

const FindPack = () => {
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

    useEffect(() => {
        getAllPacks().then(setPacks);
        getAllBuddies().then(setBuddies);
        getAllHangouts().then(setHangouts);
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
        getPacksByHangout(hangoutChoice.id).then(setHangoutPacks)
    }, [hangoutChoice])

    useEffect(() => {
        getPacksByCompany(companyChoice).then(setCompanyPacks)
    }, [companyChoice])

    return (
        <>
        <div className="findPack_selectFilters">
            <label htmlFor="cities">Filter by Cities:</label>
            <select name="cities"
                    id="cities" 
                    value={cityChoice}
                    onChange={(event) => {
                        setCityChoice(event.target.value)
                    }}>
                    <option value="">Choose a City</option>
                {
                    cities?.map((city, index) => {
                        return <option key={index + 1} value={city}>{city}</option>
                    })
                }
            </select>
            <label htmlFor="hangouts">Filter by Hangouts:</label>
            <select name="hangouts" 
                    id="hangouts" 
                    value={hangoutChoice} 
                    onChange={(event) => {
                        setHangoutChoice(event.target.value)
                    }}>
                    <option value="">Choose a Hangout</option>
                {
                    hangouts?.map((hangout) => {
                        return <option key={hangout.id} value={hangout.name}>{hangout.name}</option>
                    })
                }
            </select>
            <label htmlFor="companies">Filter by Companies:</label>
            <select name="companies"
                    id="companies" 
                    value={companyChoice}
                    onChange={(event) => {
                        setCompanyChoice(event.target.value)
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
                <tr>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Buddy Count</th>
                    <th>Join/Leave?</th>
                </tr>
                {pack?.buddies?.map((buddy) => {
                return <tr>
                    <td>{buddy.firstName} {buddy.lastName}</td>
                    <td>{buddy.city}, {buddy.state}</td>
                    <td>{buddy.companyName}</td>
                </tr>
            })}
            </table>
        </div>
        </>
    )


}

export default FindPack