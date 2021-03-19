const baseUrl = 'http://localhost:8080';

export const getMessage = () => {
    let messageUrl = baseUrl + '/home';

    return fetch(messageUrl)
        .then(res => res.json())
        .catch(err => console.log(err));
}