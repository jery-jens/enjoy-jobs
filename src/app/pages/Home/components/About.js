import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { useHistory } from 'react-router-dom';

import { useToolbox } from '../../../services';
import { SlideButton } from '../../../components';

import './_About.scss';

import About1 from '../../../assets/photos/about_img1.jpg';
import About2 from '../../../assets/photos/about_img2.jpg';
import About3 from '../../../assets/photos/about_img3.jpg';
import Next from '../../../assets/icons/next.svg';

const About = () => {
    const history = useHistory();
    const { target } = useToolbox();

    const context = [{    
        'text': '<h1>Wij bezorgen je de job van je dromen</h1><p>Voor Enjoy Jobs ben jij allesbehalve een nummer. We garanderen een integere aanpak en eerlijke communicatie. Wanneer een potentiële kandidaat de selectie finaal niet haalt, zorgen wij voor constructieve feedback. Wanneer een werkzoekende via Enjoy Jobs een job vond, plannen we een nazorggesprek in. Ook wanneer we niet onmiddellijk mogelijkheden hebben voor een bepaald profiel, communiceren we dat en laten we die persoon niet in het ongewisse.</p>',
        'img': About1,
    },{
        'text': '<h1>Wij gaan voor jou opzoek naar de juiste match</h1><p>Enjoy Jobs is gespecialiseerd in het selecteren en screenen van kandidaten voor KMO’s uit West- en Oost-Vlaanderen. Onze baseline: hart werk. Maar wat betekent dit? Bij Enjoy Jobs nemen we onze slogan serieus. We willen dat werknemers en werkgevers met hun hart werken en daarom hard willen werken. Zelf past ons team dat ook toe in de praktijk. We houden enorm van onze job en dat vertaalt zich in hard en resultaatgericht werken.</p><p>Concreet doen we dit door...</p><ul><li>… tijd te nemen voor elke kandidaat en elke voorstelling die we bezorgen</li><li>… frequent op te volgen van zowel de voorgestelde kandidaten als de openstaande vacatures</li><li>… eerlijke en transparante te communiceren gedurende het volledige proces</li><li>… mee te denken in de context van jouw bedrijf</li></ul>',
        'img': About3,
    }, {
        'text': '<h1>Leer jezelf kennen</h1><p>Leer dankzij de persoonlijkheidstest van Thomas International welke job bij jouw persoonlijkheid past.</p>',
        'img': About2,
    }];

    const goToRoadmap = () => {
        history.push(`/roadmap/${target === 'audience' ? 'audience' : 'firm'}`);
    };

    const goToContact = () => {
        history.push('/contact', {isPersoonlijkheidstest: true});
    };

    return (
        <>
        <section className="about">
            <div className="about__context">
                <div className="container">
                    <div className="row d-flex justify-content-end">
                        <div className="col-lg-6 col-12">
                            {
                                target === 'audience' ? ReactHtmlParser(context[0].text) : ReactHtmlParser(context[1].text)
                            }
                        </div>
                    </div>
                    <div className="row d-flex justify-content-end about__context--button">
                        <div className="col-lg-6 col-12">
                            <SlideButton 
                                text="Welke stappen nemen we"
                                icon={Next}
                                action={goToRoadmap}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="about__image">
                <div style={{backgroundImage: `url(${target === 'audience' ? context[0].img : context[1].img})`}}></div>
            </div>
        </section>
        {
            target === 'audience' && (
                <section className="about">
                    <div className="about__image right-image">
                        <div style={{backgroundImage: `url(${context[2].img})`}}></div>
                    </div>
                    <div className="about__context">
                        <div className="container">
                            <div className="row d-flex justify-content-start">
                                <div className="col-lg-6 col-12">
                                    {
                                        ReactHtmlParser(context[2].text)
                                    }
                                </div>
                            </div>
                            <div className="row d-flex justify-content-start about__context--button">
                                <div className="col-lg-6 col-12">
                                    <SlideButton 
                                        text="Neem de test"
                                        icon={Next}
                                        action={goToContact}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )
        }
        </>
    )
};

export default About;