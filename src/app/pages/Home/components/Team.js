import React, { useCallback, useEffect, useState } from 'react';
import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import './_Team.scss';
import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';

import { useAPI } from '../../../services/api.service';

SwiperCore.use([Pagination]);

const Team = () => {
    const [ members, setMembers ] = useState(null);
    const { getEmployees } = useAPI();

    const fetchEmployees = useCallback(async () => {
        const data = await getEmployees();
        setMembers(data);
    }, [ getEmployees ]);

    useEffect(() => {
        fetchEmployees();
    }, [ fetchEmployees ]);

    const animateCard = (bool, index) => {
        const memberCard = document.getElementsByClassName('team__members--member')[index];

        if (bool === true) {
            memberCard.classList.add('active-member');
        } else {
            memberCard.classList.remove('active-member');
        };
    };

    return members ? (
            <section className="team bg-tertiary">
                <div className="container">
                    <h1 className="team__title">
                        Wij staan voor jou klaar
                    </h1>

                    {/** Visible for desktop */}
                    <div className="team__members">
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
                            navigation
                            pagination={{
                                clickable: true,
                                dynamicBullets: true,
                            }}
                        >
                            {
                                members.map((element, index) => {
                                    return (
                                        <SwiperSlide key={index}>
                                            <div className="team__members--member unhidden-member" 
                                                onMouseEnter={() => animateCard(true, index)} 
                                                onMouseLeave={() => animateCard(false, index)} 
                                            >
                                                <div className="team__members--member__content">
                                                    <div className="team__members--member__content--img" style={{backgroundImage: `url(${encodeURI(element.avatarurl)})`}}></div>
                                                    <div className="team__members--member__content--text">
                                                        <h5>{element.name}</h5>
                                                        <h6>{element.position}</h6>
                                                        <p>{element.description}</p>
                                                    </div>
                                                </div>
                                                <h5 className="team__members--member__name">{element.name}</h5>
                                                <h5 className="team__members--member__function">{element.position}</h5>
                                            </div>
                                        </SwiperSlide>
                                    )
                                })
                            }
                        </Swiper>
                    </div>
                </div>
            </section>
    ) : ''
};

export default Team;