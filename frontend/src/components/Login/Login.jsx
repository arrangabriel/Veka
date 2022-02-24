import React from "react";

const LoginForm = () => {
  return ( <form>
    <h3>Logg inn</h3>

    <div className="form-group">
        <label>E-postadresse</label>
        <input type="email" className="form-control" placeholder="Skriv E-postadresse" />
    </div>

    <div className="form-group">
        <label>Passord</label>
        <input type="password" className="form-control" placeholder="Skriv passord" />
    </div>

    <div className="form-group">
        <div className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input" id="customCheck1" />
            <label className="custom-control-label" htmlFor="customCheck1">Husk meg</label>
        </div>
    </div>

    <button type="submit" className="btn btn-primary btn-block">Logg inn</button>
    <p className="forgot-password text-right">
        Glemt <a href="#">passord?</a>
    </p>
</form>);
}

export default LoginForm