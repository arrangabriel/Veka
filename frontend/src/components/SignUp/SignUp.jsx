import React from "react";

const SignUp = () => {
    return (
        <form action="/">
            <h3>Registrer bruker</h3>

            <div className="form-group">
<<<<<<< HEAD
                <label>Fornavn</label>
                <input type="text" className="form-control" placeholder="Fornavn" required="required" maxLength="40"/>
            </div>

            <div className="form-group">
                <label>Etternavn</label>
                <input type="text" className="form-control" placeholder="Etternavn" required="required" maxLength="40"/>
=======
                <label>Brukernavn</label>
                <input type="text" className="form-control" placeholder="Brukernavn" />
>>>>>>> origin/dev
            </div>

            <div className="form-group">
                <label>E-postadresse</label>
                <input type="email" className="form-control" placeholder="Skriv E-post" required="required" maxLength="40"/>
            </div>

            <div className="form-group">
                <label>Passord</label>
                <input type="password" className="form-control" placeholder="Skriv passord" required="required" maxLength="40"/>
            </div>

            <button type="submit" className="btn btn-primary btn-block">Registrer meg</button>
            <p className="forgot-password text-right">
                Allerede registrert? <a href="/sign-in">Logg inn</a>
            </p>
        </form>
    );
}

export default SignUp