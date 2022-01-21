import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import {
    FacebookMessengerShareButton,
    FacebookMessengerIcon,
    EmailIcon,
    EmailShareButton,
    WhatsappIcon,
    WhatsappShareButton,
    LinkedinIcon,
    LinkedinShareButton,
} from 'react-share';

import { Layout } from '../../layouts';
import { SearchBar, VacancyContent, BasicButton } from '../../components';
import { VacancyCard } from './components';
import { useAPI, useToolbox } from '../../services';

import './Vacancies.scss'

import photo from '../../assets/photos/portrait_sophie.jpg';
import photo2 from '../../assets/photos/portrait_fien.png';
import photo3 from '../../assets/photos/portrait_fien2.jpeg';
import photo4 from '../../assets/photos/logo_vacancy.png';

const Vacancies = () => {
    document.title = 'Vacatures';
    document.querySelector('meta[name="description"]').setAttribute("content", "Solliciteer eenvoudig en snel op onze vacatures.");

    const history = useHistory();
    const { state } = useLocation();

    const [ vacancyResults, setVacancyResults ] = useState([]);
    const [ selectedVacancy, setSelectedVacancy ] = useState({})
    const [ currentPage, setCurrentPage ] = useState(1)
    const [ searchParams, setSearchParams ] = useState((state) ? state : {})
    const [ canFetch, setCanFetch ] = useState(true)

    const { getVacancies } = useAPI();
    const { screenIsMobile, getCSSSizeModifier } = useToolbox();

    useEffect(() => {
        const func = async () => {
            await fetchData();
            registerInfiniteScroll('infinite-scroll');
        };

        func();
        // eslint-disable-next-line     
    }, []);

    useEffect(() => {
        const func = async () => {
            await fetchData();
            setCanFetch(true)
        };

        if (!canFetch) func();
        // eslint-disable-next-line     
    }, [canFetch]);

    useEffect(() => {
        const func = async () => {
            await fetchData('new');
            registerInfiniteScroll('infinite-scroll');
        };
        
        resetSearchResults();
        func();
        // eslint-disable-next-line     
    }, [searchParams])

    const fetchData = async ( type = 'append') => {
        const params = searchParams;
        params["per-page"] = 6;
        params.page = currentPage;
        const vacancies = await getVacancies(params);

        // if no vacancy selected
        if (vacancies.length > 0) {
            if (Object.keys(selectedVacancy).length === 0) setSelectedVacancy(vacancies[0]);
        } else {
            setSelectedVacancy({})
        };

        setCurrentPage(currentPage + 1)

        if (type === 'append') {
            // filter doubles
            const filteredVacancies = vacancies.filter(
                (vacancy) => {
                    return !vacancyResults.map((vacancyResult) => vacancyResult.id).includes(vacancy.id)
                })
            // add unique vacancies
            setVacancyResults(vacancyResults.concat(filteredVacancies));
        } else {
            setVacancyResults(vacancies);
        };

        return vacancies;
    };

    const constructVacancyElements = (vacancies) => {
        return vacancies.map((vacancy, index) => {
            return (
                <VacancyCard 
                    isSelected={vacancy.id === selectedVacancy.id}
                    key={`${vacancy.id}`}
                    location={vacancy.city}
                    title={vacancy.name}
                    type={vacancy.employmentname}
                    duration={vacancy.contractname}
                    refNr={vacancy.id}
                    url={`/vacancy/${vacancy.id}`}
                    onClick={() => {
                        if (screenIsMobile()) {
                            window.open(`/vacancy/${vacancy.id}`, '_blank')
                        } else {
                            setSelectedVacancy(vacancy)
                        }
                    }}
                />
            );
        });
    };

    const resetSearchResults = () => {
        setCurrentPage(1);
        setVacancyResults([]);
        setSelectedVacancy({})
    };

    const registerInfiniteScroll = async (id) => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('scroll', async (e) => {
            checkOnBottom(e);
        })
    }

    const checkOnBottom = (e) => {
        const offset = 50;
        const isOnBottom = e.target.scrollTop + offset > e.target.scrollHeight - e.target.offsetHeight;
        if (isOnBottom && canFetch) {
            setCanFetch(false);
        }
    }

    return (
        <Layout>
            <div className="container">
                <SearchBar
                    initParams={searchParams}
                    onSubmit={(params) => {
                        resetSearchResults();
                        setSearchParams(params);
                    }}
                /> 
            </div>      

            <div className={`vacancy-container container ${getCSSSizeModifier("vacancy-container")}`}>
                <div id="infinite-scroll" className="vacancy-overview col-12 col-lg-4">
                    {
                        (vacancyResults.length > 0)
                        ? constructVacancyElements(vacancyResults)
                        : <p className="error-message">Geen resultaten om te tonen...</p>
                    }
                    <div className="line-shadow"></div>
                </div>
                <div className="vacancy-detail d-none d-lg-flex col-8">
                    <a className="vacancy-detail__new-tab" href={`/vacancy/${selectedVacancy.id}`} target="blank">

                    </a>
                    <VacancyContent
                        title={selectedVacancy.name}
                        location={selectedVacancy.city}
                        sector={selectedVacancy.sectordescription}
                        refNr={selectedVacancy.id}
                        text={selectedVacancy.description}
                        overflow={true}
                    />
                    {
                        (Object.keys(selectedVacancy).length)
                        ?
                        <div className="vacancy-detail__cta">
                            <hr/>
                            <div className="vacancy-detail-cta__container">
                                <div>
                                    <h3>Interessant?</h3>
                                    {/* <BasicButton level="primary" value="Solliciteer hier!" onClick={() => window.open(`/apply/${selectedVacancy.id}`)} />    */}
                                    <BasicButton level="primary" value="Solliciteer hier!" onClick={() => history.push('/apply', {id: selectedVacancy.id})} />   
                                    <div className="vacancy-detail-cta__container--share">
                                        <EmailShareButton style={{padding: "3px"}} url={window.location.href}>
                                            <EmailIcon size={25} round={true} />
                                        </EmailShareButton>
                                        <FacebookMessengerShareButton style={{padding: "3px"}} url={window.location.href}>
                                            <FacebookMessengerIcon size={25} round={true} />
                                        </FacebookMessengerShareButton>
                                        <WhatsappShareButton style={{padding: "3px"}} url={window.location.href}>
                                            <WhatsappIcon size={25} round={true} />
                                        </WhatsappShareButton>
                                        <LinkedinShareButton style={{padding: "3px"}} url={window.location.href}>
                                            <LinkedinIcon size={25} round={true} />
                                        </LinkedinShareButton>
                                    </div> 
                                </div>
                                <div className="vacancy-detail-cta__contact">
                                    <h3>Contacteer mij als je graag persoonlijk in gesprek wil gaan over deze job.</h3>
                                    <div>
                                    <img alt="foto contact persoon" src={
                                        selectedVacancy.employee === "Fien Fourneau" ? (
                                            photo2
                                        ) : selectedVacancy.employee === "Sophie Verschelde" ? photo : selectedVacancy.employee === "Fien Desmet" ? (
                                            photo3
                                        ) : photo4
                                    }/>
                                        <div>
                                            <p>{selectedVacancy.employee ? selectedVacancy.employee : 'Enjoy Jobs'}</p>
                                            <ul>
                                                <li> <span></span><a href="tel:+32 (0) 56 980 051">+32 (0) 56 980 051</a></li>
                                                <li> <span></span><a href="mailto:info@enjoy.jobs">info@enjoy.jobs</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : null
                    }

                </div>
            </div>     
        </Layout>
    );
};

export default Vacancies;