import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllPacks} from "../../modules/packManager";
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
    }, [])

    useEffect(() => {
        getAllBuddies()
            .then((buddiesArr) => {
                const buddiesCompanies = buddiesArr.filter(b => b.companyName);
                const uniqueCompanies = [...new Set(buddiesCompanies)];
                setCompanies(uniqueCompanies);

                const buddiesCities = buddiesArr.filter(b => b.City);
                const uniqueCities = [...new Set(buddiesCities)];
                setCities(uniqueCities);
            })
        
        getAllHangouts()
            .then((hangoutArr) => {
                setHangouts(hangoutArr.filter(h => h.name));
            })

    }, [packs])

    return (
        <>
        <div className="findPack_selectFilters">
            <label for="cities">Filter by Cities:</label>
            <select name="cities" id="cities">
                {
                    cities?.map((city) => {
                        return <option value={city}>{city}</option>
                    })
                }
            </select>
            <label for="hangouts">Filter by Hangouts:</label>
            <select name="hangouts" id="hangouts">
                {
                    hangouts?.map((hangout) => {
                        return <option value={hangout}>{hangout}</option>
                    })
                }
            </select>
            <label for="companies">Filter by Companies:</label>
            <select name="companies" id="companies">
                {
                    companies?.map((company) => {
                        return <option value={company}>{company}</option>
                    })
                }
            </select>
        </div>
        </>
    )


}

export default FindPack