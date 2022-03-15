export default class APIservice{
    static Login(body){
        return(fetch('http://127.0.0.1:8000/auth/', {
              method:'POST',
              headers:{
                Accept: 'application/json',
                'Content-type':'application/json',
              },
              credentials:'include',
              body: JSON.stringify(body)
            }))
    }

}