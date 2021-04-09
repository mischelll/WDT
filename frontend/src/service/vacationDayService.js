export const getVacationDaysByUser = (userId) => {
    console.log(userId);
    return  fetch('http://localhost:8082/api/vacationDay/user/'+ userId, {
        method: "GET",
        headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem("AUTH_TOKEN_KEY") }
    })
        .then(res => res.json())
        .catch(err => console.log(err.message));
}