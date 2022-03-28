export default class APIservice {
  static Login(body) {
    return (fetch('http://127.0.0.1:8000/auth/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(body)
    }))
  }


  static getListings(queries,token){
    console.log("FETCHING from: http://127.0.0.1:8000/api/listings/"+queries)
    return(fetch('http://127.0.0.1:8000/api/listings/'+queries, {
      'method': 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Token ' + token.mytoken
      },
      credentials: 'include',
    }))
  }

  static Signup(body) {
    return (fetch('http://127.0.0.1:8000/api/profiles/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      // credentials:'include',
      body: JSON.stringify(body)
    }))
  }


  static CreateListings(body, token) {
    console.log(token)
    return (fetch('http://127.0.0.1:8000/api/listings/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Authorization': 'Token ' + token.mytoken,
        'Content-type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(body)
    }))
  }

  static EditUser(body, userID, token) {
    return (fetch('http://127.0.0.1:8000/api/edit/' + userID, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Authorization': 'Token ' + token,
        'Content-type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(body)
    }))
  }

  static getUser(userID, token){
    return(fetch('http://127.0.0.1:8000/api/profiles/'+ userID + '/', {
      'method': 'GET',
      headers: {
        'Authorization': 'Token ' + token.mytoken,
        'Content-type': 'application/json', 
      },
      credentials: 'include'
    }))
  }

  static ShowInterest(id, token) {
    return (fetch('http://127.0.0.1:8000/api/listings/'+id+'/show_interest/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Authorization': 'Token ' + token.mytoken,
        'Content-type': 'application/json',
      },
      credentials: 'include',
    }))
  }
  static SetAsSold(id, token){
    return (fetch('http://127.0.0.1:8000/api/listings/'+id+'/mark_sold/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Authorization': 'Token ' + token.mytoken,
        'Content-type': 'application/json',
      },
      credentials: 'include',
    }))
  }
}