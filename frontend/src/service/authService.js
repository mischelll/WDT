const baseUrl = 'http://localhost:8082/api/auth';

export const signup = (registerData) => {
    const registerUrl = baseUrl + '/register'
    console.log("asdasdas");
    return fetch(registerUrl, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData)
    })
        .then(res => res.json())
        .then(data => {
            if (data) {
                return Promise.reject(data);
            }
            return data;
        })
        .catch(err => {
            return err;
        });
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
        .catch(err => {
            return err
        });
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
    return fetch('http://localhost:8082/api/user/info', {
        method: "GET",
        headers: { 'Authorization': "Bearer " + sessionStorage.getItem("AUTH_TOKEN_KEY") },
    })
        .then(res => res.json())
        .catch(err => {
            console.log(err.message);
        });
}

export const logout = () => {
    sessionStorage.clear()
}

export const getRoleName = (roleId) => {
    return fetch('http://localhost:8082/api/role/' + roleId, {
        method: "GET",
        headers: { 'Authorization': "Bearer " + sessionStorage.getItem("AUTH_TOKEN_KEY") },
    })
        .then(res => res.json())
        .catch(err => {
            console.log(err.message);
        });
}