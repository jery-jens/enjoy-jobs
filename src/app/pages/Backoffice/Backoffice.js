import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import ReactQuill from 'react-quill';
import parsePhoneNumber from 'libphonenumber-js';
import Moment from 'moment';
import 'moment/locale/nl-be';

import { Layout } from '../../layouts';
import { useAPI } from '../../services';
import { ProfileGrid, ProfileItem, ProfilePopup } from './components';
import { InputDate, InputSelect, InputText, InputFile, InputSearch, Loading } from '../../components';

import Date from '../../assets/icons/date.svg';

import './_Backoffice.scss';
import 'react-quill/dist/quill.snow.css';

const Backoffice = () => {
    document.title = 'Enjoy Jobs | Mijn profiel';

    const history = useHistory();

    const { getList, viewUserInformation, currentUser, updateProfile, logout, refreshService, postList } = useAPI();

    const [ showPopup, setShowPopup ] = useState(false);
    const [ popUpType, setPopUpType ] = useState('delete-profile');

    // States
    const [ user, setUser ] = useState();
    const [ showError, setShowError ] = useState({
        message: '',
        status: false,
    });

    const [ driversLicenses, setDriverLicenses ] = useState();
    // const [ competences, setCompetences ] = useState();
    const [ experiences, setExperiences ] = useState();
    // const [ studies, setStudies ] = useState();
    const [ educations, setEducations ] = useState();
    const [ languages, setLanguages ] = useState();

    const [ myCourses, setMyCourses ] = useState();
    const [ myStudies, setMyStudies ] = useState();
    const [ myExperiences, setMyExperiences ] = useState();
    const [ myLanguages, setMyLanguages ] = useState();
    const [ myDriverslicenses, setMyDriverslicenses ] = useState();
    const [ myCompetences, setMyCompetences ] = useState();
    const [ myHobbies, setMyHobbies ] = useState();
    const [ myUploads, setMyUploads ] = useState();

    const [ profileForm, setProfileForm ] = useState({
        address: '',
        birthdate: '',
        birthplace: '',
        city: '',
        contract: '',
        description: '',
        email2: '',
        employment: '',
        facebook: '',
        firstname: '',
        linkedin: '',
        maxhours: 0,
        mobile: '',
        name: '',
        notice: '',
        phone: '',
        position: '',
        rrn: '',
        salary: 0,
        vdab_country_id: '',
        vdab_template_id: '',
        website: '',
        zip: '',
    });

    useEffect(() => {        
        const getLists = async () => {
            const driversLicenseList = await getList('driverslicense/list', currentUser);
            setDriverLicenses(driversLicenseList.map((license) => {return {value: license.id, label: license.description}}));

            const experienceList = await getList('experience/list', currentUser);
            setExperiences(experienceList.map((experience) => {return {value: experience.id, label: experience.description}}));

            const educationList = await getList('study/educationlevelist', currentUser);
            setEducations(Object.keys(educationList).map(function(key) {return {value: key, label: educationList[key]}}));

            const languageList = await getList('language/list', currentUser);
            setLanguages(languageList.map((language) => {return {value: language.id, label: language.description}}));
 
            const userObj = await viewUserInformation(currentUser);
            setUser(userObj);
            setProfileForm({
                address: userObj.address,
                birthdate: userObj.birthdate,
                birthplace: userObj.birthplace,
                city: userObj.city,
                contract: userObj.contract,
                description: userObj.description,
                email2: userObj.email2,
                employment: userObj.employment,
                facebook: userObj.facebook,
                firstname: userObj.firstname,
                linkedin: userObj.linkedin,
                maxhours: userObj.maxhours,
                mobile: userObj.mobile,
                name: userObj.name,
                notice: userObj.notice,
                phone: userObj.phone,
                position: userObj.position,
                rrn: userObj.rrn,
                salary: userObj.salary,
                vdab_country_id: userObj.vdab_country_id,
                vdab_template_id: userObj.vdab_template_id,
                website: userObj.website,
                zip: userObj.zip,
            });
        };

        const getUsersData = async () => {
            const myCoursesData = await getList('course', currentUser);
            setMyCourses(myCoursesData);

            const myStudiesData = await getList('study', currentUser);
            setMyStudies(myStudiesData);

            const myExperiencesData = await getList('experience', currentUser);
            setMyExperiences(myExperiencesData);

            const myLanguagesData = await getList('language', currentUser);
            setMyLanguages(myLanguagesData);

            const myDriverslicensesData = await getList('driverslicense', currentUser);
            setMyDriverslicenses(myDriverslicensesData);

            const myCompetencesData = await getList('competence', currentUser);
            setMyCompetences(myCompetencesData);

            const myUploadsData = await getList('upload', currentUser);
            setMyUploads(myUploadsData);

            const myHobbiesData = await getList('hobby', currentUser);
            setMyHobbies(myHobbiesData);
        };

        if (currentUser) {
            getUsersData();
            getLists();
        } else {
            history.push('/not-found');
        };
    }, [getList, currentUser, viewUserInformation, history]);

    const updateData = async () => {
        setUser(null);

        const myCoursesData = await getList('course', currentUser);
        setMyCourses(myCoursesData);

        const myStudiesData = await getList('study', currentUser);
        setMyStudies(myStudiesData);

        const myExperiencesData = await getList('experience', currentUser);
        setMyExperiences(myExperiencesData);

        const myLanguagesData = await getList('language', currentUser);
        setMyLanguages(myLanguagesData);

        const myDriverslicensesData = await getList('driverslicense', currentUser);
        setMyDriverslicenses(myDriverslicensesData);

        const myCompetencesData = await getList('competence', currentUser);
        setMyCompetences(myCompetencesData);

        const myUploadsData = await getList('upload', currentUser);
        setMyUploads(myUploadsData);

        const myHobbiesData = await getList('hobby', currentUser);
        setMyHobbies(myHobbiesData);

        const userObj = await viewUserInformation(currentUser);
        setProfileForm({
            address: userObj.address,
            birthdate: userObj.birthdate,
            birthplace: userObj.birthplace,
            city: userObj.city,
            contract: userObj.contract,
            description: userObj.description,
            email2: userObj.email2,
            employment: userObj.employment,
            facebook: userObj.facebook,
            firstname: userObj.firstname,
            linkedin: userObj.linkedin,
            maxhours: userObj.maxhours,
            mobile: userObj.mobile,
            name: userObj.name,
            notice: userObj.notice,
            phone: userObj.phone,
            position: userObj.position,
            rrn: userObj.rrn,
            salary: userObj.salary,
            vdab_country_id: userObj.vdab_country_id,
            vdab_template_id: userObj.vdab_template_id,
            website: userObj.website,
            zip: userObj.zip,
        });

        setUser(userObj);
    };

    const submitUpdate = async () => {
        const result = await updateProfile(currentUser, {
            address: profileForm.address ? profileForm.address : null,
            birthdate: Moment(profileForm.birthdate).format('YYYY-MM-DD'),
            birthplace: profileForm.birthplace ? profileForm.birthplace : null,
            city: profileForm.city ? profileForm.city : null,
            contract: profileForm.contract,
            description: profileForm.description,
            email2: profileForm.email2,
            employment: profileForm.employment,
            facebook: profileForm.facebook,
            firstname: profileForm.firstname,
            linkedin: profileForm.linkedin,
            maxhours: profileForm.maxhours,
            mobile: profileForm.phone ? parsePhoneNumber(profileForm.mobile, 'BE').number : '',
            name: profileForm.name,
            notice: profileForm.notice,
            phone: profileForm.phone ? parsePhoneNumber(profileForm.phone, 'BE').number : '',
            position: profileForm.position,
            rrn: profileForm.rrn,
            salary: profileForm.salary,
            vdab_country_id: profileForm.vdab_country_id,
            vdab_template_id: profileForm.vdab_template_id,
            website: profileForm.website,
            zip: profileForm.zip,
        });

        if (result.status && result.status === 1) {
            setShowError({
                message: '',
                status: false,
            });

            updateData();
        } else {
            setShowError({
                message: 'Jouw gegevens konden niet worden opgeslagen.',
                status: true,
            });        
        };
    };

    const uploadFile = async (file) => {
        const formData = new FormData();

        if (file.name.split('.')[1] === 'png' || file.name.split('.')[1] === 'jpg' || file.name.split('.')[1] === 'gif' || file.name.split('.')[1] === 'pdf' || file.name.split('.')[1] === 'doc' || file.name.split('.')[1] === 'docx' || file.name.split('.')[1] === 'xls' || file.name.split('.')[1] === 'xlsx' || file.name.split('.')[1] === 'rtf' || file.name.split('.')[1] === 'txt') {
            formData.append("name", file.name);
            formData.append("uploadfile", file);
    
            const result = await postList("upload", currentUser, formData);

            if (result.status === 1) {
                setShowError({
                    message: '',
                    status: false,
                });

                updateData();
            } else {
                setShowError({
                    message: "Jouw bestand kon niet worden opgeslagen",
                    status: true,
                });
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
            };
        } else {
            setShowError({
                message: "Jouw bestand is niet geschikt om up te loaden.",
                status: true,
            });            
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        };
    };


    const Contracts = [
        {
            value: "",
            label: "Geen",
        },
        {
            value: "fixed",
            label: "Bepaalde duur",
        },
        {
            value: "indefinitely",
            label: "Onbepaalde duur",
        },
        {
            value: "interim",
            label: "Interim optie vast",
        },
    ];

    const TimeSchedules = [
        {
            value: "",
            label: "Geen",
        },
        {
            value: "parttime",
            label: "Deeltijds",
        },
        {
            value: "fulltime",
            label: "Voltijds",
        },
        {
            value: "both",
            label: "Beide",
        },
    ];

    // eslint-disable-next-line
    const changeStatePopup = (bool, type) => {
        setShowPopup(bool);
        setPopUpType(type);
    };

    const setValueToForm = (value, id) => {
        setProfileForm({
            ...profileForm,
            [value]: id,
        });
    };

    const logOut = async () => {
        await logout(currentUser);

        history.push('/');
        refreshService();
    };

    const setPleasedJob = (id, value) => {
        setProfileForm({
            ...profileForm,
            vdab_template_id: value,
        });
    }; 

    return user ? (
        <Layout>
            {
                showPopup ? (
                    <ProfilePopup 
                        type={popUpType}
                        hide={() => setShowPopup(false)}
                    />
                ) : (
                    ''
                )
            }
            <section className="profile container">
                {
                    showError.status && (
                        <div className="row">
                            <div className="col-12">
                                <div className="profile__error">
                                    <strong>Foutmelding: </strong>{showError.message}
                                </div>
                            </div>
                        </div>
                    )
                }
                <div className="row d-flex align-items-center profile__head">
                    <div className="col-12 col-md-6">
                        <h1 className="profile__head--title">Welkom terug, {user.firstname}</h1>
                    </div>
                    <div className="col-12 col-md-6 d-flex justify-content-md-end justify-content-start align-items-center">
                        <span className="profile__head--save" onClick={submitUpdate}>
                            Bewaar gegevens
                        </span>
                        <span className="profile__head--delete" onClick={logOut}>
                            Afmelden
                        </span>
                    </div>
                </div>
                <ProfileItem info={{
                    'title': 'Persoonlijke gegevens',
                }}>
                    <div className="row">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-12 col-lg-6">
                                    <InputText 
                                        label="Voornaam"
                                        placeholder="Voornaam"
                                        id="firstname"
                                        value={(user) ? user.firstname : null}
                                        action={(e) => setProfileForm({...profileForm, [e.target.id]: e.target.value})}
                                    />
                                </div>
                                <div className="col-12 col-lg-6">
                                    <InputText 
                                        label="Achternaam"
                                        placeholder="Achternaam"
                                        id="name"
                                        value={(user) ? user.name : null}
                                        action={(e) => setProfileForm({...profileForm, [e.target.id]: e.target.value})}
                                    />
                                </div>
                                <div className="col-12 col-lg-8">
                                    <InputText 
                                        label="Straat & nr (& bus)"
                                        placeholder="Straat & nr (& bus)"
                                        id="address"
                                        value={(user) ? user.address : null}
                                        action={(e) => setProfileForm({...profileForm, [e.target.id]: e.target.value})}
                                    />
                                </div>
                                <div className="col-4 col-lg-4">
                                    <InputText 
                                        label="Postcode"
                                        placeholder="Postcode"
                                        id="zip"
                                        value={(user) ? user.zip : null}
                                        action={(e) => setProfileForm({...profileForm, [e.target.id]: e.target.value})}
                                    />
                                </div>
                                <div className="col-8 col-lg-6">
                                    <InputText 
                                        label="Gemeente"
                                        placeholder="Gemeente"
                                        id="city"
                                        value={(user) ? user.city : null}
                                        action={(e) => setProfileForm({...profileForm, [e.target.id]: e.target.value})}
                                    />
                                </div>
                                <div className="col-12 col-lg-6">
                                    <InputDate 
                                        label="Geboortedatum"
                                        placeholder="Geboortedatum"
                                        id="birthdate"
                                        icon={Date}
                                        value={(user) ? user.birthdate : null}
                                        action={(e) => setProfileForm({...profileForm, [e.target.id]: e.target.value})}
                                    />
                                </div>
                                <div className="col-12 col-lg-6">
                                    <InputText 
                                        label="Geboorteplaats"
                                        placeholder="Geboorteplaats"
                                        id="birthplace"
                                        value={(user) ? user.birthplace : null}
                                        action={(e) => setProfileForm({...profileForm, [e.target.id]: e.target.value})}
                                    />
                                </div>
                                <div className="col-12 col-lg-4">
                                    <InputText
                                        label="GSM-nummer"
                                        placeholder="GSM"
                                        id="mobile"
                                        value={(user) ? user.mobile : null}
                                        action={(e) => setProfileForm({...profileForm, [e.target.id]: e.target.value})}
                                    />
                                </div>
                                <div className="col-12 col-lg-4">
                                    <InputText
                                        label="Telefoonnummer"
                                        placeholder="Telefoon"
                                        id="phone"
                                        value={(user) ? user.phone : null}
                                        action={(e) => setProfileForm({...profileForm, [e.target.id]: e.target.value})}
                                    />
                                </div>
                                <div className="col-12 col-lg-6">
                                    <InputText
                                        label="E-mailadres"
                                        placeholder="E-mail"
                                        id="email2"
                                        value={(user) ? user.email2 : null}
                                        action={(e) => setProfileForm({...profileForm, [e.target.id]: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </ProfileItem>
                <ProfileItem info={{
                    'title': 'Link jouw sociale media',
                }}>
                    <div className="row">
                        <div className="col-12 col-md-4">
                            <InputText
                                label="LinkedIn"
                                placeholder="LinkedIn-profiel"
                                id="linkedin"
                                value={(user) ? user.linkedin : null}
                                action={(e) => setProfileForm({...profileForm, [e.target.id]: e.target.value})}
                            />                           
                        </div>
                        <div className="col-12 col-md-4">
                            <InputText
                                label="Facebook"
                                placeholder="Facebook-profiel"
                                id="facebook"
                                value={(user) ? user.facebook : null}
                                action={(e) => setProfileForm({...profileForm, [e.target.id]: e.target.value})}
                            />                           
                        </div>
                        <div className="col-12 col-md-4">
                            <InputText
                                label="Website"
                                placeholder="Website"
                                id="website"
                                value={(user) ? user.website : null}
                                action={(e) => setProfileForm({...profileForm, [e.target.id]: e.target.value})}
                            />                           
                        </div>
                    </div>
                </ProfileItem>
                <ProfileItem info={{
                    'title': 'Gewenste vacatures',
                }}>
                    <div className="row">
                        <div className="col-12 col-md-4">
                            <InputSelect
                                label="Gewenst contract"
                                id="contract-profile"
                                secondId="contract"
                                options={Contracts}    
                                value={(user) ? user.contract : ""}        
                                backoffice={true}
                                setProfile={setValueToForm}                 
                            />
                        </div>
                        <div className="col-12 col-md-4">
                            <InputSelect
                                label="Gewenste tijdsregeling"
                                id="employment-profile"
                                secondId="employment"
                                options={TimeSchedules}
                                value={(user) ? user.employment : ""}      
                                backoffice={true}
                                setProfile={setValueToForm}                        
                            />
                        </div>
                        <div className="col-12 col-md-4">
                            <InputSearch
                                label="Gewenste job"
                                id="position"
                                values={experiences ? experiences : []}
                                setValue={setPleasedJob}   
                                defaultValue={user.vdab_template_id ? user.vdab_template_id : false}               
                            />
                        </div>
                        <div className="col-12 col-md-4">
                            <InputText
                                label="Maximum uren per week"
                                placeholder="Uren"
                                id="maxhours"
                                value={(user) ? user.maxhours : 0}
                                action={(e) => setProfileForm({...profileForm, [e.target.id]: e.target.value})}                 
                            />
                        </div>
                        <div className="col-12 col-md-4">
                            <InputText
                                label="Gewenste bruto maandloon (EUR)"
                                placeholder="Bruto maandloon"
                                id="salary"
                                value={(user) ? user.salary : 0}
                                action={(e) => setProfileForm({...profileForm, [e.target.id]: e.target.value})}                 
                            />
                        </div>
                        <div className="col-12 col-md-4">
                            <InputText
                                label="Vooropzeg in maanden"
                                placeholder="Vooropzeg"
                                id="notice"
                                value={(user) ? user.notice : 0}
                                action={(e) => setProfileForm({...profileForm, [e.target.id]: e.target.value})}                 
                            />
                        </div>
                    </div>
                </ProfileItem>
                <ProfileItem info={{
                    'title': 'Extra',
                }}>
                    <div className="row">
                        <div className="col-12">
                            <ReactQuill 
                                onChange={(e) => setProfileForm({...profileForm, description: e})} 
                                theme="snow" 
                                defaultValue={user.description ? user.description : ''} 
                            />                       
                        </div>
                    </div>
                </ProfileItem>
                <ProfileItem info={{
                    'title': 'Extra bestanden',
                }}>
                    <InputFile 
                        id="file-upload"
                        label="Sleep uw bestanden naar hier of klik op de upload knop"
                        backoffice={true}
                        defaultFiles={myUploads ? myUploads : null}
                        uploadFile={uploadFile}
                    />
                </ProfileItem>
                <ProfileItem info={{
                    'title': 'Opleidingen',
                }}>
                    <ProfileGrid 
                        titles={["Van", "Tot", "Opleiding", "Instituut", "Plaats"]}
                        items={myStudies ? myStudies : []}
                        section="Opleiding"
                        update={updateData}
                        inputs={[
                            {
                                "label": "Van",
                                "id": "opleidingen-from",
                                "type": "date",
                            },
                            {
                                "label": "Tot",
                                "id": "opleidingen-till",
                                "type": "date",
                            },
                            {
                                "label": "Opleiding",
                                "id": "opleidingen-description",
                                "type": "text",
                            },
                            {
                                "label": "Niveau",
                                "id": "opleidingen-education_level_id",
                                "type": "search",
                                "items": educations ? educations : '',                            
                            },
                            {
                                "label": "Instituut",
                                "id": "opleidingen-at",
                                "type": "text",
                            },
                            {
                                "label": "Plaats",
                                "id": "opleidingen-location",
                                "type": "text",
                            },
                            {
                                "label": "Volbracht",
                                "id": "opleidingen-succesful-primary",
                                "secondId": "opleidingen-succesful",
                                "type": "select",
                                "items": [{
                                    value: "1",
                                    label: "Ja",
                                }, {
                                    value: "0",
                                    label: "Nee",
                                }],
                            },
                        ]}
                    />
                </ProfileItem>
                <ProfileItem info={{
                    'title': 'Ervaring',
                }}>
                    <ProfileGrid 
                        titles={["Van", "Tot", "Ervaring", "Werkgever", "Plaats", "Omschrijving"]}
                        section="Ervaring"
                        items={myExperiences ? myExperiences : []}
                        update={updateData}
                        inputs={[
                            {
                                "label": "Van",
                                "id": "ervaring-from",
                                "type": "date",
                            },
                            {
                                "label": "Tot",
                                "id": "ervaring-till",
                                "type": "date",
                            },
                            {
                                "label": "Ervaring",
                                "id": "ervaring-name",
                                "type": "text",
                            },
                            {
                                "label": "Werkgever",
                                "id": "ervaring-employer",
                                "type": "text",
                            },
                            {
                                "label": "Plaats",
                                "id": "ervaring-location",
                                "type": "text",
                            }
                        ]}
                    />
                </ProfileItem>
                <ProfileItem info={{
                    'title': 'Talen',
                }}>
                     <ProfileGrid 
                        titles={["Taalcode", "Taal", "Kennisniveau"]}
                        section="Taal"
                        items={myLanguages ? myLanguages : []}
                        update={updateData}
                        inputs={[
                            {
                                "label": "Taal",
                                "id": "talen-vdab_language_id",
                                "type": "search",
                                "items": languages ? languages : ''
                            },
                            {
                                "label": "Kennis op 10",
                                "id": "talen-level-primary",
                                "secondId": "talen-level",
                                "type": "select",
                                "items": [
                                    {
                                        value: "10",
                                        label: "10",
                                    }, 
                                    {
                                        value: "9",
                                        label: "9",
                                    },
                                    {
                                        value: "8",
                                        label: "8",
                                    },
                                    {
                                        value: "7",
                                        label: "7",
                                    },
                                    {
                                        value: "6",
                                        label: "6",
                                    },
                                    {
                                        value: "5",
                                        label: "5",
                                    },
                                    {
                                        value: "4",
                                        label: "4",
                                    },
                                    {
                                        value: "3",
                                        label: "3",
                                    },
                                    {
                                        value: "2",
                                        label: "2",
                                    },
                                    {
                                        value: "1",
                                        label: "1",
                                    },
                                ],
                            },
                        ]}
                    />
                </ProfileItem>
                <ProfileItem info={{
                    'title': 'Rijbewijs',
                }}>
                    <ProfileGrid 
                        titles={["Rijbewijs"]}
                        section="Rijbewijs"
                        items={myDriverslicenses ? myDriverslicenses : []}
                        update={updateData}
                        inputs={[
                            {
                                "label": "Rijbewijs",
                                "id": "rijbewijs-vdab_drivers_license_id",
                                "type": "search",
                                "items": driversLicenses ? driversLicenses : ''
                            },
                        ]}
                    />
                </ProfileItem>
                <ProfileItem info={{
                    'title': 'Aanvullende competenties',
                }}>
                    <ProfileGrid 
                        titles={["Competentie"]}
                        section="Competentie"
                        update={updateData}
                        items={myCompetences ? myCompetences : []}
                        inputs={[
                            {
                                "label": "Beschrijving",
                                "id": "competentie-name",
                                "type": "text",
                            },
                        ]}
                    />
                </ProfileItem>
                <ProfileItem info={{
                    'title': 'Cursussen',
                }}>
                    <ProfileGrid 
                        titles={["Van", "Tot", "Cursus"]}
                        section="Cursus"
                        items={myCourses ? myCourses : []}
                        update={updateData}
                        inputs={[
                            {
                                "label": "Van",
                                "id": "cursussen-from",
                                "type": "date",
                            },
                            {
                                "label": "Tot",
                                "id": "cursussen-till",
                                "type": "date",
                            },
                            {
                                "label": "Cursus",
                                "id": "cursussen-course",
                                "type": "text",
                            },
                            {
                                "label": "Volbracht",
                                "id": "cursussen-succesful-primary",
                                "secondId": "cursussen-succesful",
                                "type": "select",
                                "items": [{
                                    value: "1",
                                    label: "Ja",
                                }, {
                                    value: "0",
                                    label: "Nee",
                                }],
                            },
                        ]}
                    />
                </ProfileItem>
                <ProfileItem info={{
                    'title': "Hobby's en interesses",
                }}>
                    <ProfileGrid 
                        titles={["Hobby of interesse"]}
                        section="Hobby of interesse"
                        items={myHobbies ? myHobbies : []}
                        update={updateData}
                        inputs={[
                            {
                                "label": "Hobby of interesse",
                                "id": "hobby-hobby",
                                "type": "text",
                            },
                        ]}
                    />
                </ProfileItem>
                <div className="row d-flex align-items-center profile__head">
                    <div className="col-12 d-flex justify-content-md-end justify-content-start align-items-center">
                        <span className="profile__head--save" onClick={submitUpdate}>
                            Bewaar gegevens
                        </span>
                        <span className="profile__head--delete" onClick={() => setShowPopup(true)}>
                            Account verwijderen
                        </span>
                    </div>
                </div>
            </section>
        </Layout>
    ) : <Loading />
};

export default Backoffice;