

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

  static EditUser(body, token, userID) {
    console.log(token)
    userID = 22 //TODO
    return (fetch('http://127.0.0.1:8000/api/edit/' + userID, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Authorization': 'Token ' + token.mytoken,
        'Content-type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(body)
    }))
  }

}