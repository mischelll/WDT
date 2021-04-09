const baseUrl = 'http://localhost:8082';

export const getMessage = () => {
    let messageUrl = baseUrl + '/api/home';

    return fetch(messageUrl)
        .then(res => res.json())
        .catch(err => console.log(err));
}