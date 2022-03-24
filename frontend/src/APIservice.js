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

<<<<<<< HEAD
=======

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

>>>>>>> b1d0eaf484243eff556bf257e7e3dd8d29fd227d
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

<<<<<<< HEAD
  static EditUser(body, userID, token) {
    userID = 1 //todo
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
    console.log("FETCHING from: http://127.0.0.1:8000/api/profiles/"+userID)
    return(fetch('http://127.0.0.1:8000/api/profiles/'+ userID + '/', {
      'method': 'GET',
      headers: {
        'Authorization': 'Token ' + token.mytoken,
        'Content-type': 'application/json', 
      },
      credentials: 'include'
    }))
  }

=======
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
>>>>>>> b1d0eaf484243eff556bf257e7e3dd8d29fd227d
}