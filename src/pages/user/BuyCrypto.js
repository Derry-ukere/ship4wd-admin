/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable arrow-body-style */
import React from 'react';

const BuyCrypto = () => {
  return (
    <div>
      <main className="app-py-1" style={{ height: '100vh' }}>
        <div className="fade-appear-done fade-enter-done">
          <section className="center">
            <h2>BUY CRYPTO</h2>
            <p>buy bitcoin, ethereum, and other crypto currencies for account funding from third parties</p>
            <br />
            <br />
            <div className="container">
              <div className="container">
                <ul className="collection">
                  <a href="https://bitcoin.com/" target="_blank" className="collection-item bg">
                    <li>Bitcoin.com</li>
                  </a>
                  <a href="https://exchange.mercuryo.io/" target="_blank" className="collection-item bg">
                    <li>Mercuryo</li>
                  </a>
                  <a href="https://changelly.com/" target="_blank" className="collection-item bg">
                    <li>Changelly</li>
                  </a>
                  <a href="https://crypto.com/" target="_blank" className="collection-item bg">
                    <li>Crypto.com</li>
                  </a>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default BuyCrypto;
