import React, { useState } from 'react';
import ReactHtmlParser from 'react-html-parser';

import './_Roadmap.scss';

import Chat from '../../../assets/icons/chat.svg';
import Building from '../../../assets/icons/building.svg';
import Paper from '../../../assets/icons/paper.svg';
import Talking from '../../../assets/icons/talking.svg';
import Telephone from '../../../assets/icons/telephone.svg';
import Intake from '../../../assets/icons/intake.svg';
import Update from '../../../assets/icons/update.svg';
import Followup from '../../../assets/icons/followup.svg';

const Roadmap = ({ target }) => {
    const [ currentStep, setCurrentStep ] = useState(0);

    const stepsTarget = [
        {
            "step": 1,
            "title": "Hoe komen we in contact met elkaar?",
            "text": "<p>Vanaf we op de hoogte worden gebracht dat je al dan niet discreet uitkijkt naar een nieuwe uitdaging of als je geïnteresseerd bent in een vacature beginnen wij hart te werken. Binnen de 24u kan je een antwoord verwachten.</p><p>Vind je geen passende vacature en kijk je (discreet) uit naar een nieuwe uitdaging mail of bel ons dan met jouw verhaal.</p><div class='roadmap-button'><a href='/contact'>Contacteer ons</a></div>",
            "icon": Chat,
        },
        {
            "step": 2,
            "title": "Telefonische screening",
            "text": "<p>Omdat de cv een statisch gegeven is zullen we meestal een telefonische screening inplannen om jouw verwachtingen beter te begrijpen.</p><p>Aan de hand van dat telefoongesprek kunnen we een aantal vacatures zoeken die we in het kennismakingsgesprek verder kunnen toelichten.</p>",
            "icon": Telephone,
        },
        {
            "step": 3,
            "title": "Kennismakingsgesprek",
            "text": "<p>Tijdens het kennismakingsgesprek willen we jouw beter leren kennen! Wat verwacht je nu precies van je volgende job? In welke sfeer wil je terecht komen? …</p><p>Tijdens het gesprek lichten we vacatures en het desbetreffende bedrijf toe. Zo beslissen we samen in een open en eerlijke sfeer of het je droom job kan zijn. Is er geen match, dan gaan we verder voor jou op zoek.</p>",
            "icon": Talking,
        },
        {
            "step": 4,
            "title": "Toelichting van jouw kandidatuur aan het bedrijf",
            "text": "<p>Na het kennismakingsgesprek gaan we terug hart aan het werk met alle zaken die je hebt verteld. We bezorgen jouw verhaal aan het bedrijf.</p>",
            "icon": Building,
        },
        {
            "step": 5,
            "title": "Opvolging",
            "text": "<p>Wanneer jouw kandidatuur vertrokken is richting het desbetreffende bedrijf is het wachten…</p><p>Wekelijks volgen wij op bij het bedrijf en van zodra wij feedback ontvangen omtrent jouw kandidatuur bellen we je op en brengen we je op de hoogte.</p><p>Wij bij Enjoy Jobs vinden het erg belangrijk dat je feedback krijgt, zo kan je dit meenemen naar de toekomst.</p>",
            "icon": Paper,
        },
    ];

    const stepsFirms = [
        {
            "step": 1,
            "title": "Hoe komen we in contact met elkaar?",
            "text": "<p>We nemen er een koffie bij en spreken elkaar persoonlijk, via e-mail of via een telefoongesprek om te kijken wat wij voor jou en jouw bedrijf kunnen betekenen.</p>",
            "icon": Chat,
        },
        {
            "step": 2,
            "title": "Intake",
            "text": "<p>We organiseren een gesprek bij jou met één van onze collega’s om de identiteit van jouw bedrijf te definiëren en dieper in te gaan op de collega die gezocht wordt. We luisteren en stellen vragen om zo een actieplan op maat te ontwikkelen.</p>",
            "icon": Intake,
        },
        {
            "step": 3,
            "title": "Ons voorstel",
            "text": "<p>We maken ons actieplan met daar aan gekoppeld onze offerte op maat, naar aanleiding van wat er besproken is op het intakegesprek </p>",
            "icon": Paper,
        },
        {
            "step": 4,
            "title": "Start zoektocht naar passende kandidaten",
            "text": "<p>We schrijven de vacature uit naargelang de doelgroep. Na goedkeuring verspreiden we deze via verschillende kanalen en gaan actief in gesprek met potentiële collega’s. We plannen de verschillende contactmomenten in: telefonische screening, diepte interview en testing & assessment.</p>",
            "icon": Talking,
        },
        {
            "step": 5,
            "title": "Vinger aan de pols",
            "text": "<p>Op regelmatige basis bezorgen we een overzicht van het verloop van de zoektocht. We volgen nauw de voorgestelde kandidaten op.</p>",
            "icon": Update,
        },
        {
            "step": 6,
            "title": "Follow-up",
            "text": "<p>We blijven in contact met elkaar over een kandidaat die is opgestart bij jouw bedrijf. We voorzien op vaste tijdstippen een moment om de samenwerking met de nieuwe collega te evalueren. We blijven met elkaar in contact voor toekomstige vacatures of andere uitdagingen waar wij jou kunnen in ondersteunen.</p>",
            "icon": Followup,
        },
    ];

    const updateCard = (index) => {
        const card = document.getElementsByClassName('roadmap__card')[0];
        card.classList.add('gone');
        setTimeout(() => {
            card.classList.remove('gone');
            card.classList.add('add');
            setCurrentStep(index);

            setTimeout(() => {
                card.classList.remove('add');
                card.classList.add('comeBack');

                setTimeout(() => {
                    card.classList.remove('comeBack');
                }, 500);
            }, 200);
        }, 500);
    };

    return (
        <section className="roadmap">
            <div className="container">
                <h1 className="roadmap__title">
                    Zo pakken wij het aan
                </h1>
                <div className="row d-flex justify-content-center">
                    <div className="col-12 col-md-10 col-lg-8">
                        <div className="roadmap__steps">
                            <div className="roadmap__steps--line">
                                <div className="roadmap__steps--line__inner"></div>
                            </div>
                            {
                                target === 'audience' ? (
                                    stepsTarget.map((element, index) => {
                                        if (index < currentStep) {
                                            return (
                                                <div className="roadmap__steps--step previous" key={index} onClick={() => updateCard(index)}>
                                                    {element.step}
                                                </div>
                                            )
                                        } else if (index === currentStep) {
                                            return (
                                                <div className="roadmap__steps--step current" key={index}>
                                                    {element.step}
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div className="roadmap__steps--step next" key={index} onClick={() => updateCard(index)}>
                                                    {element.step}
                                                </div>
                                            )
                                        }
                                    })
                                ) : (
                                    stepsFirms.map((element, index) => {
                                        if (index < currentStep) {
                                            return (
                                                <div className="roadmap__steps--step previous" key={index} onClick={() => updateCard(index)}>
                                                    {element.step}
                                                </div>
                                            )
                                        } else if (index === currentStep) {
                                            return (
                                                <div className="roadmap__steps--step current" key={index}>
                                                    {element.step}
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div className="roadmap__steps--step next" key={index} onClick={() => updateCard(index)}>
                                                    {element.step}
                                                </div>
                                            )
                                        }
                                    })
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="row d-flex justify-content-center">
                    <div className="col-12 col-md-10 col-lg-8">
                        <div className="roadmap__card">
                            <h1 className="roadmap__card--title">
                                {
                                    target === 'audience' ? (
                                        stepsTarget[currentStep].title
                                    ) : (
                                        stepsFirms[currentStep].title
                                    )
                                }
                            </h1>

                            <div className="roadmap__card--img">
                                <img src={target === 'audience' ? (
                                    stepsTarget[currentStep].icon
                                ) : (
                                    stepsFirms[currentStep].icon
                                )} alt="icon" />
                            </div>

                            <div className="roadmap__card--text">
                                {
                                    target === 'audience' ? (
                                        ReactHtmlParser(stepsTarget[currentStep].text)
                                    ) : (
                                        ReactHtmlParser(stepsFirms[currentStep].text)
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`row d-flex justify-content-center align-items-center`}>
                    <div className={`col-12 col-md-10 col-lg-8 d-flex ${currentStep === 0 ? 'justify-content-end' : 'justify-content-between'} align-items-center`}>
                        {
                            currentStep !== 0 && (
                                <div className="roadmap__button" onClick={() => setCurrentStep(currentStep-1)}>
                                    Vorige stap
                                </div>
                            )
                        }
                        {
                            target === 'audience' ? (
                                currentStep !== 4 && (
                                    <div className="roadmap__button" onClick={() => setCurrentStep(currentStep+1)}>
                                        Volgende stap
                                    </div>
                                )
                            ) : (
                                currentStep !== 5 && (
                                    <div className="roadmap__button" onClick={() => setCurrentStep(currentStep+1)}>
                                        Volgende stap
                                    </div>
                                )
                            )
                        }
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Roadmap;