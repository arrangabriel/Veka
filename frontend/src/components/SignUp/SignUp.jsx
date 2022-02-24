import React from "react";

const SignUp = () => {
    return (
        <form>
            <h3>Registrer bruker</h3>

            <div className="form-group">
                <label>Fornavn</label>
                <input type="text" className="form-control" placeholder="Fornavn" />
            </div>

            <div className="form-group">
                <label>Etternavn</label>
                <input type="text" className="form-control" placeholder="Etternavn" />
            </div>

            <div className="form-group">
                <label>E-postadresse</label>
                <input type="email" className="form-control" placeholder="Skriv E-post" />
            </div>

            <div className="form-group">
                <label>Passord</label>
                <input type="password" className="form-control" placeholder="Skriv passord" />
            </div>

            <button type="submit" className="btn btn-primary btn-block">Registrer meg</button>
            <p className="forgot-password text-right">
                Allerede registrert? <a href="/sign-in">Logg inn</a>
            </p>
        </form>
    );
}

export default SignUp