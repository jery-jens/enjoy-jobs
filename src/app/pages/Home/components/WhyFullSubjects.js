import React from 'react';
import ReactHtmlParser from 'react-html-parser';

import Testing from '../../../assets/icons/testing.svg';
import Health from '../../../assets/icons/health.svg';

import './_WhyFullSubjects.scss';

const WhyFullSubjects = () => {
  const whyContext = [{
    icon: Testing,
    title: "Testing & Assessment",
    text: "<p>We kunnen verschillende tests afnemen via de testbatterij van Thomas International, namelijk persoonlijkheidstest, leervermogen, emotionele intelligentie, … <br/><br/>Via de testen leer je beter te voorspellen of een kandidaat geschikt is voor de job en jouw organisatie.</p>"
  }, {
    icon: Health,
    title: "Gezondheid op het werk",
    text: "<p>Verhoog de efficiëntie van jouw firma door in te zetten op gezondheid op het werk. Wij begeleiden jullie graag naar gezondheidspreventie via ergonomie, coaching, burn-out preventie, beweging op het werk en gezonde voeding. Zo kunnen medewerkers zich zowel fysiek al mentaal 100% geven.</p>"
  }];

  return (
    <section className="why-full-subjects container">
      <div className="row justify-content-center">
        {
          whyContext.map((subject, index) => {
            return (
              <div key={index} className="col-12 col-md-6">
                <div className="why-full-subjects__subject">
                  <span className="why-full-subjects__subject--title d-flex align-items-center">
                    <img src={subject.icon} alt="subject-icon" />
                    {subject.title}
                  </span>
                  <span className="why-full-subjects__subject--content">
                    {ReactHtmlParser(subject.text)}
                  </span>
                </div>
              </div>
            )
          })
        }
      </div>
    </section>
  );
};

export default WhyFullSubjects;
