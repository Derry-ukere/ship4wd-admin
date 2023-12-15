/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable arrow-body-style */
import React from 'react';
import Page from '../components/Page';
import Hero from '../components/PageHeroSection';

const ForexTrading = () => {
  return (
    <Page title="Crypto Trading">
      <Hero title="Crypto Trading" desc="Trade Top Cryptocurrencies" />
      <main className style={{ minHeight: '80vh' }}>
        <section className="container app-py-3 fade-appear-done fade-enter-done">
          <div className="card-panel">
            <div className="container">
              <span>
                <br />
              </span>
              <span>
                {' '}
                Build Your Cryptocurrency Trading Portfolio with SpringTrading <br />
              </span>
              <span>
                SpringTrading is excited to announce the launch of our new cryptocurrency trading platform. Now you can
                start trading Bitcoin, Ethereum and many more cryptocurrencies quickly, easily and safely from wherever
                you are — in just seconds. You get great margin trading leverage and short sell options with fast
                deposits and withdrawals. Our support team is available 24/7/365 to help get you trading on our
                CySEC-regulated platform with a trading volume of US $11 billion monthly.
                <br />
              </span>
              <span>
                {' '}
                <br />
              </span>
              <span>
                {' '}
                What is a crypto currency
                <br />
              </span>
              <span>
                A cryptocurrency like bitcoin is a virtual currency traded peer-to-peer on a blockchain, independent of
                centralized authorities like banks and governments. Cryptocurrencies are entirely virtual, so they are
                not backed by physical commodities and have no intrinsic value.
                <br />
              </span>
              <span>
                {' '}
                <br />
              </span>
              <span>
                {' '}
                How Do Cryptocurrencies Work?
                <br />
              </span>
              <span>
                Primarily, cryptocurrencies rely on blockchain technology to complete a transaction via an intricate P2P
                network. Once a transfer request is entered into the network, it is validated by the network and added
                to a pool of other transactions to create a block of data for the ledger, which is then entered into the
                existing blockchain. Once the block is successfully added to the chain, the transaction is approved and
                completed.
                <br />
              </span>
              <span>
                {' '}
                <br />
              </span>
              <span>
                {' '}
                Are There Investment Opportunities with Cryptocurrencies?
                <br />
              </span>
              <span>
                Absolutely. Cryptocurrencies have become established investment commodities among major financial
                institutions and have even been adopted by countries such as Australia and Japan. As with any investment
                though, there are risks linked to market movements, high volatility and economics.
                <br />
              </span>
              <span>
                {' '}
                <br />
              </span>
            </div>
          </div>
        </section>
      </main>
    </Page>
  );
};

export default ForexTrading;
