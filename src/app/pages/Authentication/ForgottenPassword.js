import React, { useEffect, useState } from 'react';

import { Layout } from '../../layouts';

import Check from '../../assets/icons/check.svg';
import Next from '../../assets/icons/next.svg';

import { AuthError, InputMail, SlideButton } from '../../components';

import { useAPI } from '../../services';
import { useHistory } from 'react-router';

const ForgottenPassword = () => {
  document.title = 'Enjoy Jobs | Wachtwoord vergeten';

  const history = useHistory();

  const [ succes, setSucces ] = useState();
  const [ authError, setAuthError ] = useState({
    'status': false,
    'message': '',
  });
  const [ mail, setMail ] = useState('');

  const { requestReset, currentUser } = useAPI();

  useEffect(() => {
    if (currentUser) {
        history.push('/profile');
    };
  }, [currentUser, history]);

  const submitRequest = async () => {
    document.body.style.cursor = 'wait';

    const res = await requestReset(mail);

    if (res.status === false || !res) {
      setAuthError({
        status: true,
        message: "Jouw wachtwoord kon niet worden hersteld. Kijk even na of het e-mailadres correct is.",
      });

      document.body.style.cursor = 'auto';
      return;
    };

    document.body.style.cursor = 'auto';
    setSucces(true);
  }

  return (
    <Layout>
      <section className="authentication reset-password">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              {
                succes ? (
                  <div className="succes-holder">
                    <h1>Aanvraag goedgekeurd!</h1>
                    <p>Er werd een mail gestuurd naar het gegeven e-mailadres waarmee je de herstelling kan voortzetten.</p>
                    <div className="succes-holder__icon">
                      <img src={Check} alt="check" />
                    </div>
                  </div>  
                ) : (
                  <div className="forms-holder">
                    <h1>Wachtwoord vergeten?</h1>
                    <div className="form-container">
                      <p className="authentication__text">
                        Plaats in onderstaand veld een e-mailadres waar een account is met verbonden.
                      </p>
                      {
                        authError.status && <AuthError text={authError.message} />
                      }
                      <InputMail 
                        label="Jouw e-mail"
                        id="mail"
                        action={(e) => setMail(e.target.value)}
                      />
                      <div className="authentication__button">
                        <div className="slide-button-container">
                            <SlideButton
                              id="auth-slide"
                              icon={Next}
                              text="Herstel aanvragen" 
                              action={submitRequest}
                            /> 
                          </div>
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
};

export default ForgottenPassword;
