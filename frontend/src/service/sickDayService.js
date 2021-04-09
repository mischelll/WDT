export const getSicknDaysByUser = (userId) => {
    console.log(userId);
    return  fetch('http://localhost:8082/api/sickDay/user/'+ userId, {
        method: "GET",
        headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem("AUTH_TOKEN_KEY") }
    })
        .then(res => res.json())
        .catch(err => console.log(err.message));
}