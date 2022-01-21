import React from 'react';

import Recruiting from '../../../assets/icons/recruiting.svg';
import Testing from '../../../assets/icons/testing.svg';
import Health from '../../../assets/icons/health.svg';

import './_WhySubjects.scss';

const WhySubjects = () => {
  const whyContext = [{
    title: "Rekrutering & Selectie",
    icon: Recruiting,
  }, {
    title: "Testing & Assessment",
    icon: Testing,
  }, {
    title: "Gezondheid op het werk",
    icon: Health,
  }];

  return (
    <section className="why-subjects">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-12 d-flex justify-content-center">
            <h2 className="why-subjects__title">Bij ons kan je terecht voor</h2>
          </div>
          {
            whyContext.map((subject, index) => {
              return (
                <div className="col-4 col-md-3" key={index}>
                  <div key={index} className="why-subjects__subject">
                    <span>
                      <div className="d-flex justify-content-center">
                        <img className="why-subjects__subject--icon" src={subject.icon} alt="subject-icon" />
                      </div>
                      <h6 className="why-subjects__subject--title">
                        {subject.title}
                      </h6>
                    </span>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </section>
  );
};

export default WhySubjects;