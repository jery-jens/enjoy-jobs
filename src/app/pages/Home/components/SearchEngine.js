import React, { useLayoutEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { BasicButton, InputSelect, InputText } from '../../../components';
import { useAPI } from '../../../services';

import './_SearchEngine.scss';

const SearchEngine = () => {
    const history = useHistory();
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
            cityRefactored.sort(function(a, b) {
                return a.label.localeCompare(b.label);
            });
            cityRefactored.unshift({ value: '', label: '' })
            setCities(cityRefactored);
        };

        func();
        // eslint-disable-next-line     
    }, []);

    const onSubmit = () => {
        history.push('/vacancies', {
            page: 1,
            city: document.getElementById('city').value,
            name: document.getElementById('keywords').value || null, 
            sector_id: document.getElementById('sectorValue').value || null
        });
    };

    const pressedEnter = (e) => {
        if (e === "Enter") {
            history.push('/vacancies', {
                page: 1,
                city: document.getElementById('city').value,
                name: document.getElementById('keywords').value || null, 
                sector_id: document.getElementById('sectorValue').value || null
            });
        };
    };
    
    return (
        <section className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-12 col-md-10 col-lg-8">
                    <div className="head-search-engine">
                        <div className="row">
                            <div className="col-12 col-lg-6 head-search-engine__input">
                                <InputText 
                                    label="Waar ben je naar opzoek?"
                                    id="keywords"
                                    enterAction={pressedEnter}
                                />
                            </div>
                            <div className="col-12 col-lg-6 head-search-engine__input">
                                <InputSelect 
                                    id="sector" 
                                    secondId="sectorValue"
                                    label="Sector" 
                                    options={sectors} 
                                />
                            </div>

                            <div className="col-12 col-lg-6 head-search-engine__input">
                                <InputSelect 
                                    id="city" 
                                    secondId="cityValue"
                                    label="Stad" 
                                    options={cities} 
                                />
                            </div>
                            <div className="col-12 col-lg-6 head-search-engine__button">
                                <BasicButton 
                                    level="secondary" 
                                    value="Toon mij de vacatures" 
                                    onClick={onSubmit}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default SearchEngine;