import React from 'react';
import SwiperCore, { Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import './_References.scss';

import Citaat from '../../../assets/icons/citaat.svg';

import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';

import moment from 'moment'
import 'moment/locale/nl-be';
moment.locale('nl-be');

SwiperCore.use([Pagination, Autoplay]);

const References = ({ target, references }) => {
    return (
        <section className="references bg-tertiary">
            <div className="container">
                <h1 className="references__title">
                    Enkele referenties
                </h1>
                <Swiper
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        991.98: {
                            slidesPerView: 3,
                        }
                    }}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    loop={true}
                    autoplay={{
                        delay: 20000
                    }}
                >
                    {
                        references ? references.map((element, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <div className="references__item">
                                        {
                                            target === "audience" ? (
                                                <h2>{element.name} {element.initials}</h2>
                                            ) : (
                                                <a target="_blank" rel="noopener noreferrer" href={`${element.url}`}>
                                                    <h2>{element.name}</h2>
                                                </a>
                                            )
                                        }
                                        
                                        <h4>{ element.date && moment(element.date).format('LL') }</h4>
                                        <p dangerouslySetInnerHTML={{__html: element.description}}></p>
                                        <img src={Citaat} alt="citaat" />
                                    </div>
                                </SwiperSlide>
                            )
                        }) : ''
                    }
                </Swiper>
            </div>
        </section>
    )
};

export default References;