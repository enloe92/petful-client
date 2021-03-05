import API_ADDRESS from '../config';

const ApiService = {
    getCat() {
        return fetch(`${API_ADDRESS}/cats`)
            .then(res => {
                if (!res.ok) {
                    return res.json().then(e => Promise.reject(e));
                }
                return res.json();
            })
            .then(data => {
                return data;
            })
            .catch((error) => console.error(error));
    },
    getDog() {
        return fetch(`${API_ADDRESS}/dogs`)
            .then(res => {
                if (!res.ok) {
                    return res.json().then(e => Promise.reject(e));
                }
                return res.json();
            })
            .then(data => {
                return data;
            })
            .catch((error) => console.error(error));
    },
    getPeople() {
        return fetch(`${API_ADDRESS}/people`)
            .then(res => {
                if (!res.ok) {
                    return res.json().then(e => Promise.reject(e));
                }
                return res.json();
            })
            .then(data => {
                return data;
            })
            .catch((error) => console.error(error));
    },
    addPerson(person) {
        return fetch(`${API_ADDRESS}/people`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ person }),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((event) => Promise.reject(event));
                } else {
                    return response.json();
                }
            })
            .catch((error) => console.error(error));
    },
    removePerson() {
        return fetch(`${API_ADDRESS}/people`, {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' },
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((event) => Promise.reject(event));
                } else {
                    return response.json();
                }
            })
            .catch((error) => console.error(error));
    },
    dequeuePet(type) {
        return fetch(`${API_ADDRESS}/pets`, {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ type }),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((event) => Promise.reject(event));
                } else {
                    return response.json();
                }
            })
            .catch((error) => console.error(error));
    },
}

export default ApiService;