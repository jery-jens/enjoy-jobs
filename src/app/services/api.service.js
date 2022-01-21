import React, { createContext, useContext, useState } from 'react';
import Cookies from 'universal-cookie';
import Download from 'downloadjs';
import * as jwt from 'jsonwebtoken';

const APIContext = createContext();
const useAPI = () => useContext(APIContext);

const APIProvider = ({children}) => {
    const cookies = new Cookies();
    const BASE_URL = "https://api.enjoy.jobs/v1";

    /**
     *  USERS
     */
    const verifyUser = () => {
        try {
            const token = cookies.get("jwt_token");

            if (!token) {
                throw new Error('Token is not present!');
            };

            const decoded = jwt.decode(token);

            if (!decoded) {
              throw new Error('Couldn\'t decode the token!');
            };
    
            if (Date.now() >= decoded.exp * 1000) {
                throw new Error('Token is expired!')
            };

            return token;
        } catch (e) {
            return false;
        };
    };

    const loginUserWithApi = async (username, password) => {
        const url = `${BASE_URL}/user/login`;

        const form = new FormData();
        form.append('username', username);
        form.append('password', password);
        
        const user = await fetch(
            url,
            {
                method: 'POST',
                body: form,
            }
        ).then((result) => {
            const res = result.json();            
            return res;
        })
        .catch((e) => {
            return e;
        });

        cookies.set("jwt_token", await user.token);

        return user;
    };

    const registerUserWithApi = async (username, password, email, firstname, name) => {
        const url = `${BASE_URL}/user`;

        const form = new FormData();
        form.append('username', username);
        form.append('password', password);
        form.append('email', email);
        form.append('name', name);
        form.append('firstname', firstname);

        const user = await fetch(
            url,
            {
                method: 'POST',
                body: form,
            }
        ).then((result) => {
            const res = result.json();
            return res;
        })
        .catch((e) => {
            return e;
        });

        if (user && user.isSuccess && user.isSuccess === 201) {
            await loginUserWithApi(username, password);
        };

        return user;
    };

    const viewUserInformation = async (bearer) => {
        const url = `${BASE_URL}/user/view`;

        const user = await fetch(
            url,
            {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': `Bearer ${bearer}`,
                },
            }
        ).then((result) => {
            return result.json();
        });

        return user;
    };

    const requestReset = async (email) => {
        const url = `${BASE_URL}/user/requestpasswordreset`;

        const form = new FormData();
        form.append('email', email);
        
        const req = await fetch(
            url,
            {
                method: 'POST',
                body: form,
            }
        ).then((result) => {
            const res = result.json();
            return res;
        })
        .catch((e) => {
            return e;
        });

        return req;
    };

    const submitReset = async (token, current_password, password, confirm_password) => {
        const url = `${BASE_URL}/user/resetpassword`;

        const form = new FormData();
        form.append('token', token);
        form.append('current_password', current_password);
        form.append('password', password);
        form.append('confirm_password', confirm_password);
        
        const req = await fetch(
            url,
            {
                method: 'POST',
                body: form,
            }
        ).then((result) => {
            const res = result.json();
            return res;
        })
        .catch((e) => {
            return e;
        });

        return req;
    };

    /**
     * FORM SELECTION VALUES
     */

    const getSectors = async () => {
        const url = `${BASE_URL}/vacancy/sectorlist`;

        const sectors = await fetch(
            url,
            {
                method: 'GET',
                mode: 'cors',
            }
        ).then((result) => {
            return result.json();
        });

        return sectors;
    };

    const getCities = async () => {
        const url = `${BASE_URL}/vacancy/citylist`;

        const cities = await fetch(
            url,
            {
                method: 'GET',
                mode: 'cors',
            }
        ).then((result) => {
            return result.json();
        });

        return cities;
    };

    const getBlogs = async (page) => {
        const url = `${BASE_URL}/news?page=${page}`;

        const blogs = await fetch(
            url,
            {
                method: 'GET',
                mode: 'cors',
            }
        ).then((result) => {
            return result.json();
        });

        return blogs;
    };

    const getBlogsPagination = async (page) => {
        const url = `${BASE_URL}/news?page=${page}`;

        const blogs = await fetch(
            url,
            {
                method: 'GET',
                mode: 'cors',
            }
        ).then((result) => {
            let object;
            let current;
            let total;
            for (var pair of result.headers.entries()) {
                if (pair[0] === 'x-pagination-current-page') {
                    current = pair[1];
                };

                if (pair[0] === 'x-pagination-page-count') {
                    total = pair[1];
                };
            }

            object = {
                total, 
                current
            };

            return object;
        });

        return blogs;
    };

    const getBlog = async (id) => {
        const url = `${BASE_URL}/news/${id}`;

        const blogs = await fetch(
            url,
            {
                method: 'GET',
                mode: 'cors',
            }
        ).then((result) => {
            return result.json();
        });

        return blogs;
    };

    const getCompanyReviews = async (id) => {
        const url = `${BASE_URL}/coreview`;

        const reviews = await fetch(
            url,
            {
                method: 'GET',
                mode: 'cors',
            }
        ).then((result) => {
            return result.json();
        });

        return reviews;
    };

    const getClientReviews = async (id) => {
        const url = `${BASE_URL}/cvreview`;

        const reviews = await fetch(
            url,
            {
                method: 'GET',
                mode: 'cors',
            }
        ).then((result) => {
            return result.json();
        });

        return reviews;
    };

    const getEmployees = async (id) => {
        const url = `${BASE_URL}/employee`;

        const employees = await fetch(
            url,
            {
                method: 'GET',
                mode: 'cors',
            }
        ).then((result) => {
            return result.json();
        });

        return employees;
    };

    const getList = async (listType, bearer) => {
        let url = `${BASE_URL}/${listType}`;

        const list = await fetch(
            url,
            {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Authorization': `Bearer ${bearer}`,
                },
            }
        ).then((result) => {
            return result.json();
        });

        return list;
    };

    const postList = async (listType, bearer, formData) => {
        let url = `${BASE_URL}/${listType}`;

        const list = await fetch(
            url,
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Authorization': `Bearer ${bearer}`,
                },
                body: formData,
            }
        ).then((result) => {
            return result.json();
        });

        return list;
    };

    const deleteList = async (listType, bearer, id) => {
        let url = `${BASE_URL}/${listType}/${id}`;

        const list = await fetch(
            url,
            {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                    'Authorization': `Bearer ${bearer}`,
                },
            }
        ).then((result) => {
            return result.json();
        });

        return list;
    };

    const updateProfile = async (token, changes) => {
        let url = `${BASE_URL}/user`;

        const user = await fetch(
            url,
            {
                method: 'PUT',
                mode: 'cors',
                body: JSON.stringify(changes),
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }
        ).then((result) => {
            return result.json();
        });

        return user;
    };

    const downloadFile = async (token, id) => {
        let url = `${BASE_URL}/upload/${id}`;

        await fetch(
            url,
            {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }
        ).then(res => {
            return res.blob();
        })
        .then((blob) => {
            Download(blob);
        });
    };

    const logout = async (bearer) => {
        let url = `${BASE_URL}/user/logout`;

        const user = await fetch(
            url,
            {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Authorization': `Bearer ${bearer}`,
                },
            }
        ).then((result) => {
            return result.json();
        });

        cookies.remove("jwt_token");

        return user;
    };

    /**
     * VACANCIES
     */

    const getVacancies = async (params) => {
        let url = `${BASE_URL}/vacancy?`;
        Object.keys(params).forEach((param) => {
            if (params[param]) {
                url = `${url}${param}=${params[param]}&`
            }
        });

        const vacancies = await fetch(
            url,
            {
                method: 'GET',
                mode: 'cors',
            }
        ).then((result) => {
            return result.json();
        });

        return vacancies;
    };

    const getVacancy = async (id) => {
        let url = `${BASE_URL}/vacancy/${id}`;

        const vacancies = await fetch(
            url,
            {
                method: 'GET',
                mode: 'cors',
            }
        ).then((result) => {
            return result.json();
        });

        return vacancies;
    };

    const apply = async (name, email, mobile, body, file, vacancy_id, jwt) => {
        const data = new FormData();

        data.append('name', name);
        data.append('email', email);
        data.append('mobile', mobile);
        data.append('subject', 'Mijn sollicitatie');
        data.append('body', body);
        data.append('file', file);
        data.append('vacancy_id', vacancy_id);

        let url = `${BASE_URL}/vacancy/apply`;

        let res;

        if (jwt) {
            res = await fetch(
                url,
                {
                    method: 'POST',
                    mode: 'cors',
                    body: data,
                    headers: {
                        'Authorization': `Bearer ${jwt}`,
                    },
                }
            ).then((result) => {
                return result.json();
            })
            .catch((e) => {
                throw e;
            });
        } else {
            res = await fetch(
                url,
                {
                    method: 'POST',
                    mode: 'cors',
                    body: data,
                }
            ).then((result) => {
                return result.json();
            })
            .catch((e) => {
                throw e;
            });
        };

        return res;
    };
    
    // CONTACT
    const sendContact = async (name, email, mobile, subject, body) => {
        const data = new FormData();
        data.append('name', name);
        data.append('email', email);
        data.append('mobile', mobile);
        data.append('subject', subject);
        data.append('body', body);

        let url = `${BASE_URL}/contact`;

        const contact = await fetch(
            url,
            {
                method: 'POST',
                mode: 'cors',
                body: data,
            }
        ).then((result) => {
            return result.json();
        });

        return contact;
    }

    const [ currentUser, setCurrentUser ] = useState(verifyUser);

    const refreshService = () => {
        setCurrentUser(verifyUser);
    };

    return (
        <APIContext.Provider value={{
            getSectors,
            getBlogs,
            getBlog,
            getBlogsPagination,
            getVacancies,
            getVacancy,
            loginUserWithApi,
            logout,
            registerUserWithApi,
            viewUserInformation,
            requestReset,
            submitReset,
            getList,
            postList,
            deleteList,
            downloadFile,
            currentUser,
            setCurrentUser,
            verifyUser,
            updateProfile,
            getCities,
            sendContact,
            apply,
            refreshService,
            getCompanyReviews,
            getClientReviews,
            getEmployees
        }}>
            {children}
        </APIContext.Provider>
    )
};

export {
    APIContext,
    useAPI,
    APIProvider,
};