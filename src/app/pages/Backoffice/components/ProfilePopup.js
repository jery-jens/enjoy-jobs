import React from 'react';

const ProfilePopup = ({type, hide}) => {
    return (
        <div className="popup">
            <span className="invisible-clickable"></span>    
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-12 col-md-8 col-lg-4">
                        <div className="popup__profile">
                            {
                                type === "delete-profile" && (
                                    <div className="popup__profile--content">
                                        <h2>U staat op punt om uw account te verwijderen. Bent u zeker dat u dit wilt verwijderen? Dan contacteert u best <a href="mailto:info@enjoy.jobs">volgend e-mailadres</a>.</h2>
                                        <div className="popup__profile--content--button">
                                            <span className="back-button" onClick={hide}>
                                                Liever niet
                                            </span>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ProfilePopup;