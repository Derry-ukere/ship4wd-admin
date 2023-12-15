/* eslint-disable arrow-body-style */
import React from 'react';

const ComfirmDeposit = () => {
  return (
    <div>
      <main className="app-py-1" style={{ height: '100vh' }}>
        <div className="fade-appear-done fade-enter-done">
          <section className="row center">
            <div className="col l4 offset-l4 s12">
              <div className="card-panel">
                <p>SEND 0.07402 BTC</p>
                <p>TO THE WALLET ADDRESS BELOW OR SCAN THE QR CODE WITH YOUR WALLET APP</p>
                <div className="input-field">
                  <i className="material-icons prefix">content_copy</i>
                  <input
                    type="text"
                    defaultValue="bc1q0enlrg8e65kxnhzcare3unw7w9f5qg6pjps2yq"
                    style={{ textAlign: 'center' }}
                  />
                </div>
                <img
                  src="https://chart.googleapis.com/chart?cht=qr&chl=bc1q0enlrg8e65kxnhzcare3unw7w9f5qg6pjps2yq&chs=160x160&chld=L|0"
                  alt="bc1q0enlrg8e65kxnhzcare3unw7w9f5qg6pjps2yq"
                />
                <br />
                <br />
                <span>25:36</span>
                <p>Awaiting Payment</p>
                <br />
                <a className="btn" href="/user/deposits/upload.html">
                  UPLOAD PAYMENT PROOF
                </a>
                <br />
                <br />
                <a className="btn btn-secondary" href="/user/deposits/list.html">
                  WAIT FOR CONFIRMATION
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ComfirmDeposit;
