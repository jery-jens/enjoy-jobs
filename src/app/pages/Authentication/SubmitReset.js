import React, { useEffect, useState } from 'react';

import { Layout } from '../../layouts';

import Check from '../../assets/icons/check.svg';
import Next from '../../assets/icons/next.svg';

import { AuthError, InputPass, SlideButton } from '../../components';

import { useAPI } from '../../services';
import { useHistory, useParams } from 'react-router';

const SubmitReset = () => {
  document.title = 'Enjoy Jobs | Wachtwoord herstellen';

  const history = useHistory();
  const { token } = useParams();

  const [ succes, setSucces ] = useState();
  const [ authError, setAuthError ] = useState({
    'status': false,
    'message': '',
  });
  const [ password, setPassword ] = useState('');
  const [ repeatedPassword, setRepeatedPassword ] = useState('');

  const { submitReset, currentUser } = useAPI();

  useEffect(() => {
    if (currentUser) {
        history.push('/profile');
    };
  }, [currentUser, history]);

  const submitRequest = async () => {
    document.body.style.cursor = 'wait';

    if (password.length < 8 || repeatedPassword.length < 8) {
      setAuthError({
          status: true,
          message: 'Gelieve een geldig wachtwoord in te vullen',
      });
      document.body.style.cursor = 'auto';
      return;
    };

    if (password !== repeatedPassword) {
        setAuthError({
            status: true,
            message: 'De ingevulde wachtwoorden lijken niet op elkaar.'
        });
        document.body.style.cursor = 'auto';
        return;
    };

    const result = await submitReset(token, 'onbekend', password, repeatedPassword);

    if (!result || !result.status || result.status === false) {
      setAuthError({
          status: true,
          message: 'Jouw wachtwoord kon niet worden gewijzigd.'
      });
      document.body.style.cursor = 'auto';
      return;
    };

    document.body.style.cursor = 'auto';
    setSucces(true);
  };

  return (
    <Layout>
      <section className="authentication reset-password">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              {
                succes ? (
                  <div className="succes-holder">
                    <h1>Wachtwoord gewijzigd!</h1>
                    <p>Jouw wachtwoord werd succesvol gewijzigd.</p>
                    <div className="succes-holder__icon">
                      <img src={Check} alt="check" />
                    </div>
                  </div>  
                ) : (
                  <div className="forms-holder">
                    <h1>Wachtwoord wijzigen</h1>
                    <div className="form-container">
                      <p className="authentication__text">
                        Kies voor een sterk wachtwoord bestaande uit minimaal 8 karakters.
                      </p>
                      {
                        authError.status && <AuthError text={authError.message} />
                      }
                      <InputPass 
                        label="Jouw wachtwoord"
                        id="password"
                        action={(e) => setPassword(e.target.value)}
                      />
                      <InputPass 
                        label="Herhaal jouw wachtwoord"
                        id="repeat-password"
                        action={(e) => setRepeatedPassword(e.target.value)}
                      />
                      <div className="authentication__button">
                        <div className="slide-button-container">
                            <SlideButton
                              id="auth-slide"
                              icon={Next}
                              text="Aanpassen" 
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
  );
};

export default SubmitReset;