/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/autocomplete-valid */
import React from 'react';

const ForgotPassword = () => (
  <div>
    <main className style={{ minHeight: '80vh' }}>
      <div className="row app-py-0 fade-appear-done fade-enter-done">
        <div className="col s12 m12 l4 offset-l4">
          <br />
          <br />
          <div className="card-panel">
            <center>
              <br />
              <div>
                <p>please enter the email address attached to your account below</p>
                <form autoComplete="off">
                  `
                  <div className="input-field">
                    <input type="email" id="email" name="email" autoComplete="new-email" required />
                    <label className="active" htmlFor="email">
                      email
                    </label>
                  </div>
                  <br />
                  <div>
                    <button type="submit" className="btn btn-full">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              <br />
            </center>
          </div>
        </div>
      </div>
      <br />
    </main>
  </div>
);

export default ForgotPassword;
