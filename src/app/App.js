import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ReactPixel from 'react-facebook-pixel';
import { hotjar } from 'react-hotjar';
import ReactGA from 'react-ga';
import TagManager from 'react-gtm-module';

import { Backoffice, Home, Login, Register, Steps, Vacancies, VacancyDetail, NotFound, Contact, Apply, ApplySucces, MessageSucces, Blog, Blogs, ForgottenPassword, SubmitReset, PrivacyPolicy, Disclaimer, Requirements, StepsFirm } from './pages';
import { ToolboxProvider, APIProvider } from './services';

// Config
import { clientConfig } from "./config";
import HomeFirm from './pages/Home/HomeFirm';

function App() {
    /** Facebook Pixel */
    const options = {
        autoConfig: true,
        debug: false
    };

    ReactPixel.init(clientConfig.pixelKey, null, options);
    ReactPixel.pageView();

    /** Hotjar */
    hotjar.initialize(clientConfig.hotjarKey, clientConfig.hotjarSv);

    /** Google Analytics */
    ReactGA.initialize(clientConfig.analyticsKey);
    ReactGA.pageview(window.location.pathname + window.location.search);

    /** Google Tagmanager */
    const tagManagerArgs = {
        gtmId: clientConfig.tagManagerKey
    };
    
    TagManager.initialize(tagManagerArgs);
    
  return (
    <ToolboxProvider>
      <APIProvider>
      <Router>
        <Switch basename="/">
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/firms">
              <HomeFirm />
            </Route>
            <Route exact path="/requirements">
              <Requirements />
            </Route>
            <Route exact path="/disclaimer">
              <Disclaimer />
            </Route>
            <Route exact path="/privacy-policy">
              <PrivacyPolicy />
            </Route>
            <Route exact path="/blogs/:page">
              <Blogs />
            </Route>
            <Route exact path="/blog/:id">
              <Blog />
            </Route>
            <Route exact path="/vacancies">
              <Vacancies />
            </Route>
            <Route exact path="/vacancy/:id">
              <VacancyDetail />
            </Route>
            <Route exact path="/contact">
              <Contact />
            </Route>
            <Route exact path="/profile">
              <Backoffice />
            </Route>
            <Route exact path="/contact/persoonlijkheidstest">
              <Contact
                isPersoonlijkheidstest={true}
              />
            </Route>
            <Route exact path="/contact-succes">
              <MessageSucces />
            </Route>
            <Route exact path="/profile">
              <Backoffice />
            </Route>
            <Route exact path="/roadmap/audience">
              <Steps />
            </Route>
            <Route exact path="/roadmap/firm">
              <StepsFirm />
            </Route>
            <Route exact path="/apply">
              <Apply />
            </Route>
            <Route exact path="/apply-succes">
              <ApplySucces />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/forgotten-password">
              <ForgottenPassword />
            </Route>
            <Route exact path="/resetpassword&token=:token">
              <SubmitReset />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
        </Switch>
      </Router>
      </APIProvider>
    </ToolboxProvider>
  );
}

export default App;
