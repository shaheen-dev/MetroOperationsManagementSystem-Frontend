import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8080/';

class ApiService{

registerComplaint(complaint){
return axios.post(USER_API_BASE_URL+"user/complaints/register_complaint",complaint);
}

fetchAllComplaints(loggedInUser)
{
    return axios.post(USER_API_BASE_URL+"user/complaints/",loggedInUser);
}

bookRequest(bookRequest)
{
    return axios.post(USER_API_BASE_URL+"user/book_ticket/journey_planner", bookRequest);
}

fetchAllComplaintsAdmin()
{
    return axios.get(USER_API_BASE_URL+"admin/complaints/");
}

replyToComplaint(id,msgString)
{
    return axios.put(USER_API_BASE_URL+"admin/replyToComplaint/"+id, msgString);
}

Login(LoginRequest)
{
    return axios.post(USER_API_BASE_URL+"sign_in",LoginRequest)
}
AdminLogin(LoginRequest)
{
    return axios.post(USER_API_BASE_URL+"admin/sign_in",LoginRequest)
}
getFair(Source)
{
    return axios.get(USER_API_BASE_URL+"user/fair_and_Schedule/fair/"+Source)
}
getSchedule(Source){
    return axios.get(USER_API_BASE_URL+"user/fair_and_Schedule/schedule/"+Source)
}
SignUp(signUpRequest)
{
    return axios.post(USER_API_BASE_URL+"/sign_up",signUpRequest)
}

CreateOrderRequest(data)
{
    return axios.post(USER_API_BASE_URL+"user/book_ticket/orders",data);
}
SaveTransactionDetails(transaction)
{
return axios.post(USER_API_BASE_URL+"user/history/save",transaction)
}

requestMetroCard(card)
{
return axios.post(USER_API_BASE_URL+"user/metro_card/request_card",card)
}

AuthenticateMetroCard(CardObj){
    return axios.post(USER_API_BASE_URL+"user/metro_card/card_authenticate",CardObj)
}
rechargeMetroCard(card1)
{
return axios.put(USER_API_BASE_URL+"user/metro_card/card_recharge",card1)
}

fetCardDetails(loggedInUser)
{
    return axios.post(USER_API_BASE_URL+"user/metro_card/card",loggedInUser);
}
fetchAllHistory(loggedInUser){
    return axios.post(USER_API_BASE_URL+"user/history/display",loggedInUser);
}

fetchAdminData()
{
    return axios.get(USER_API_BASE_URL+"admin/")
}

fetchAllCardsForIssueAdmin()
{
    return axios.get(USER_API_BASE_URL+"admin/issueCards/");
}
issueCardByAdmin(id)
{
    return axios.put(USER_API_BASE_URL+"admin/issueCard/"+id);
}

}

export default new ApiService();