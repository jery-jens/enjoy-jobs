import React, { useLayoutEffect, useState } from 'react';

import { InputText, InputSelect, BasicButton } from '../';
import { useAPI } from '../../services' 
import './SearchBar.scss';

const SearchBar = (props) => {
    const { getSectors, getCities } = useAPI();

    const [ sectors, setSectors ] = useState([]);
    const [ cities, setCities ] = useState([]);

    useLayoutEffect(() => {
        const func = async () => {
            const sectorOptions = await getSectors();
            const sectors = Object.keys(sectorOptions);
            const sectorRefactored = sectors.map((sector) => {
                return { value: sector, label: sectorOptions[sector]}
            });
            sectorRefactored.unshift({ value: '', label: '' })
            setSectors(sectorRefactored);

            const cityOptions = await getCities();
            const cities = Object.keys(cityOptions);
            const cityRefactored = cities.map((city) => {
                return { value: city, label: cityOptions[city]}
            });
            cityRefactored.unshift({ value: '', label: '' })
            cityRefactored.sort(function(a, b) {
                return a.label.localeCompare(b.label);
            });
            setCities(cityRefactored);
        };

        func();
        // eslint-disable-next-line     
    }, []);

    const onSubmit = () => {
        props.onSubmit({
            page: 1,
            city: (document.getElementById('city').value) 
                ? cities.filter((city) => city.label === document.getElementById('city').value)[0].label
                : null, 
            name: document.getElementById('keywords').value || null, 
            sector_id: document.getElementById('sectorValue').value || null
        });
    };

    const pressedEnter = (e) => {
        if (e === "Enter") {
            props.onSubmit({
                page: 1,
                city: (document.getElementById('city').value) 
                    ? cities.filter((city) => city.label === document.getElementById('city').value)[0].label
                    : null, 
                name: document.getElementById('keywords').value || null, 
                sector_id: document.getElementById('sectorValue').value || null
            });
        };
    };

    return(
        <div className="row">
            <div className="col-12 col-lg-6 head-search-engine__input">
                <InputText 
                    label="Waar ben je naar opzoek?"
                    id="keywords"
                    value={(props.initParams && props.initParams.name) ? props.initParams.name : null}
                    enterAction={pressedEnter}
                />
            </div>
            <div className="col-12 col-lg-6 head-search-engine__input">
                <InputSelect 
                    id="sector" 
                    secondId="sectorValue"
                    label="Sector" 
                    options={sectors} 
                    value={(props.initParams && props.initParams.sector_id) ? props.initParams.sector_id : null}
                />
            </div>

            <div className="col-12 col-lg-6 head-search-engine__input">
                <InputSelect 
                    id="city" 
                    secondId="cityValue"
                    label="Stad" 
                    options={cities} 
                    value={(props.initParams && props.initParams.city) ? props.initParams.city : null}
                />
            </div>
            <div className="col-12 offset-lg-3 col-lg-3 head-search-engine__button">
                <BasicButton 
                    level="secondary" 
                    value="Toon mij de vacatures" 
                    onClick={onSubmit}
                />
            </div>
        </div>
    );
}

export default SearchBar;