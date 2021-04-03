const baseUrl = 'http://localhost:8080/api/auth';

export const register = (registerData) => {
    const registerUrl = baseUrl + '/register'

    return fetch(registerUrl, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData)
    })
        .then(res => res.json())
        .then(token => {
            console.log(token);
            // const bearerToken = result.value.headers.authorization;
            // if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
            //     const jwt = bearerToken.slice(7, bearerToken.length);
            //     Storage.session.set(AUTH_TOKEN_KEY, jwt);

            // }
        })
        .catch(err => console.log(err.message));
}

export const login = (loginData) => {
    const loginUrl = baseUrl + '/login'

    return fetch(loginUrl, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
    })
        .then(res => res.json())
        .then(token => {
            console.log(token);
            sessionStorage.setItem("AUTH_TOKEN_KEY", token.id_token);
            return token;
        })
        .catch(err => console.log(err.message));
}

export const getAdmin = () => {
    const adminUrl = baseUrl + '/admin';

    return fetch(adminUrl, {
        method: "GET",
        headers: { 'Authorization': "Bearer " + sessionStorage.getItem("AUTH_TOKEN_KEY") },
    })
        .then(res => res.json())
        .catch(err => console.log(err.message));
}

export const getUserInfo = () => {
    fetch('http://localhost:8080/api/user/info', {
        method: "GET",
        headers: { 'Authorization': "Bearer " + sessionStorage.getItem("AUTH_TOKEN_KEY") },
    })
        .then(res => res.json())
        .then(info => {
            console.log(info);
            return info
        })
        .catch(err => {
            console.log(err.message);
        });
}

export const logout = () => {
    sessionStorage.clear()
}