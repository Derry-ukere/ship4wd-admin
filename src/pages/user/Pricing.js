/* eslint-disable arrow-body-style */
import React from 'react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  return (
    <div>
      <main className="app-py-1" style={{ height: '100vh' }}>
        <div className="fade-appear-done fade-enter-done">
          <div className="container center">
            <div>
              <b>Pricing</b>
            </div>
            <br />
            <div className="container">
              <ul className="collection">
                <Link className="collection-item bg" to="/user/deposits/trading">
                  <li>Trading Plans</li>
                </Link>
                <Link className="collection-item bg" to="/user/deposits/mining">
                  <li>Mining Plans</li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pricing;
