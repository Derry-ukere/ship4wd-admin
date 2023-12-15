import React from 'react';

const TradingPrice = () => (
  <div>
    <main className="app-py-1" style={{ height: '100vh' }}>
      <div className="fade-appear-done fade-enter-done">
        <div className="container center">
          <h2 className=" center">Trading Plans</h2>
          <br />
          <div className="row">
            <div className="col l3 s12 wow fadeInUp slow">
              <div className="card hoverable app-py-1 app-px-2" style={{ borderRadius: '10px' }}>
                <center>
                  <span>STARTER PACKAGE</span>
                  <br />
                  <span className="alt-color" style={{ fontSize: '38px', fontWeight: 'bold' }}>
                    $1000
                  </span>
                  <br />
                  <span className="alt-color">minimum</span>
                  <br />
                  <br />
                  <p>Min Deposit $1000</p>
                  <p>Max Deposit $10000 </p>
                  <p>Referral Bonus</p>
                  <p>Full IT Support</p>
                  <br />
                  <a className="btn " href="/user/deposits/crypto/10000">
                    PURCHASE PLAN
                  </a>
                </center>
              </div>
            </div>
            <div className="col l3 s12 wow fadeInUp slow">
              <div className="card hoverable app-py-1 app-px-2" style={{ borderRadius: '10px' }}>
                <center>
                  <span>PREMIUM PACKAGE</span>
                  <br />
                  <span className="alt-color" style={{ fontSize: '38px', fontWeight: 'bold' }}>
                    $10000
                  </span>
                  <br />
                  <span className="alt-color">minimum</span>
                  <br />
                  <br />
                  <p>Min Deposit $10000</p>
                  <p>Max Deposit $20000 </p>
                  <p>Referral Bonus</p>
                  <p>Full IT Support</p>
                  <br />
                  <a className="btn " href="/user/deposits/crypto/20000">
                    PURCHASE PLAN
                  </a>
                </center>
              </div>
            </div>
            <div className="col l3 s12 wow fadeInUp slow">
              <div className="card hoverable app-py-1 app-px-2" style={{ borderRadius: '10px' }}>
                <center>
                  <span>MASTER PACKAGE</span>
                  <br />
                  <span className="alt-color" style={{ fontSize: '38px', fontWeight: 'bold' }}>
                    $20000
                  </span>
                  <br />
                  <span className="alt-color">minimum</span>
                  <br />
                  <br />
                  <p>Min Deposit $20000</p>
                  <p>Max Deposit $50000 </p>
                  <p>Referral Bonus</p>
                  <p>Full IT Support</p>
                  <br />
                  <a className="btn " href="/user/deposits/crypto/50000">
                    PURCHASE PLAN
                  </a>
                </center>
              </div>
            </div>
            <div className="col l3 s12 wow fadeInUp slow">
              <div className="card hoverable app-py-1 app-px-2" style={{ borderRadius: '10px' }}>
                <center>
                  <span>PRO PACKAGE</span>
                  <br />
                  <span className="alt-color" style={{ fontSize: '38px', fontWeight: 'bold' }}>
                    $50000
                  </span>
                  <br />
                  <span className="alt-color">minimum</span>
                  <br />
                  <br />
                  <p>Min Deposit $50000</p>
                  <p>Max Deposit $999999 </p>
                  <p>Referral Bonus</p>
                  <p>Full IT Support</p>
                  <br />
                  <a className="btn " href="/user/deposits/crypto/999999">
                    PURCHASE PLAN
                  </a>
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
);

export default TradingPrice;
