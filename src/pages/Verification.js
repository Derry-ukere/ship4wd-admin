/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable arrow-body-style */
import React from 'react';

const Verification = () => {
  return (
    <div>
      <div className="row">
        <div className="col l4 s12 offset-l4">
          <br />
          <br />
          <div className="card-panel" style={{ borderRadius: '10px' }}>
            <div className="container">
              <center>
                <h3 className="btn-color">Your PIN is on the way</h3>
                <br />
                <p>
                  An email containing your 5-digit PIN is has been sent to <b>kelly@testmail.com</b>
                </p>
                <br />
                <p>If you haven’t received it in a minute or two, click ‘Resend PIN’.</p>
                <br />
                <form autoComplete="off">
                  <div>
                    <div className="input-field">
                      <label className="active" htmlFor="pin">
                        pin
                      </label>
                      <input
                        inputMode="decimal"
                        type="number"
                        id="pin"
                        min
                        max
                        step="any"
                        name="pin"
                        className
                        required
                        defaultValue
                      />
                    </div>
                  </div>
                  <br />
                  <div>
                    <button type="submit" className="btn btn-full">
                      Confirm PIN
                    </button>
                  </div>
                </form>
                <br />
                <br />
                <form autoComplete="off">
                  <br />
                  <div>
                    <button type="submit" className="btn btn-secondary">
                      Resend PIN To Email
                    </button>
                  </div>
                </form>
              </center>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;
