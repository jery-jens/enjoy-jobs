import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

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
import { VacancyContent, BasicButton, SearchBar } from '../../components';
import { useAPI, useToolbox } from '../../services';

import './VacancyDetail.scss'

import photo from '../../assets/photos/portrait_sophie.jpg'
import photo2 from '../../assets/photos/portrait_fien.png';
import photo3 from '../../assets/photos/portrait_fien2.jpeg';
import photo4 from '../../assets/photos/logo_vacancy.png';

const VacancyDetail = () => {
    const history = useHistory();
    
    document.title = 'Enjoy Jobs | Vacatures';
    const { id } = useParams();
    const [ selectedVacancy, setSelectedVacancy ] = useState({})

    const { getVacancy } = useAPI();
    const { getCSSSizeModifier } = useToolbox();

    useEffect(() => {
        const func = async () => {
            const vacancy = await getVacancy(id);
            setSelectedVacancy(vacancy);
        };
        func();
        // eslint-disable-next-line
    }, []);

    const [ searchParams, setSearchParams ] = useState({});

    const onSubmit = () => {
        history.push('/vacancies', {
            page: 1,
            city: document.getElementById('city').value,
            name: document.getElementById('keywords').value || null, 
            sector_id: document.getElementById('sectorValue').value || null
        });
    };

    return (
        <Layout>
            <div className="container searchbar">
                <SearchBar 
                    initParams={searchParams}
                    onSubmit={(params) => {
                        setSearchParams(params);
                        onSubmit();
                    }}
                /> 
            </div>     

            <div className={`vacancy-page-container container ${getCSSSizeModifier("vacancy-page-container")}`}>
                <div className="vacancy-detail col-12 col-lg-8">
                    {
                        (Object.keys(selectedVacancy).length > 0)
                        ?
                        <VacancyContent
                            title={selectedVacancy.name}
                            location={selectedVacancy.city}
                            sector={selectedVacancy.sectordescription}
                            refNr={selectedVacancy.id}
                            text={selectedVacancy.description}
                            overflow={false}
                        />
                        : <p>We kunnen deze vacature niet meer terugvinden.</p>
                    }

                    
                </div>  
                <div className="vacancy-cta col-12 col-lg-4">
                    <div className="vacancy-cta__container">
                        <div className="vacancy-cta__cta">
                            <h3>Interessant?</h3>
                            <BasicButton level="primary" value="Solliciteer hier!" onClick={() => history.push('/apply', {id: selectedVacancy.id})}/>  
                            <div className="vacancy-cta__container--share">
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
                        <hr/>
                        <div className="vacancy-cta__contact">
                            <h3>Contacteer mij als je graag persoonlijk in gesprek wil gaan over deze job</h3>
                            
                            <img alt="foto contact persoon" src={
                                selectedVacancy.employee === "Fien Fourneau" ? (
                                    photo2
                                ) : selectedVacancy.employee === "Sophie Verschelde" ? photo : selectedVacancy.employee === "Fien Desmet" ? (
                                    photo3
                                ) : photo4
                            } />
                                <div>
                                    <p>{selectedVacancy.employee ? selectedVacancy.employee : 'Enjoy Jobs'}</p>
                                    <ul>
                                        <li> <span></span><a href="tel:+32 (0) 56 980 051">+32 (0) 56 980 051</a></li>
                                        <li> <span></span><a href="mailto:info@enjoy.jobs">info@enjoy.jobs</a></li>
                                    </ul>
                                </div>
                        </div>
                        <hr/>

                        <div>
                            <BasicButton level="primary" value="Vacature afdrukken" onClick={() => window.print()}/>  
                        </div>
                    </div>
                </div>
            </div> 
        </Layout>
    );
};

export default VacancyDetail;