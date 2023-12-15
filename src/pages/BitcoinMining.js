/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable arrow-body-style */
import React from 'react';
import Page from '../components/Page';
import Hero from '../components/PageHeroSection';

const ForexTrading = () => {
  return (
    <Page title="About Mining">
      <Hero title="Bitcoin Mining" desc="Your Bitcoin Mining Portfolio" />
      <main className style={{ minHeight: '80vh' }}>
        <section className="container app-py-3 fade-appear-done fade-enter-done">
          <div className="card-panel">
            <div className="container">
              <span>
                <br />
              </span>
              <span>
                <br />
              </span>
              <span>
                {' '}
                WHY IS MINING SO IMPORTANT
                <br />
              </span>
              <span>
                <br />
              </span>
              <span>
                Cryptocurrency networks need computational power to run securely. The world’s most powerful blockchains
                are supported by millions of computers around the world. Unlike paper money, Bitcoin and other
                cryptocurrencies are produced mathematically and held digitally. The people who voluntarily offer their
                computing power to secure these cryptocurrency networks are called miners.
                <br />
              </span>
              <span>
                {' '}
                <br />
              </span>
              <span>
                Cryptocurrencies don’t have a central government or other so-called ‘middlemen’ that decide about the
                future of the system. – They are in fact digital, borderless democracies in which miners vote with their
                computing power to reach order and consensus. <br />
              </span>
              <span>
                <br />
              </span>
              <span>
                {' '}
                <br />
              </span>
              <span>
                <br />
              </span>
              <span>
                {' '}
                HOW IS BITCOIN KEPT SECURE
                <br />
              </span>
              <span>
                <br />
              </span>
              <span>
                The only way to not create money out of thin air or corrupt it, is to burn real energy. This is called
                Proof-Of-Work. Today, bitcoin is the most secure computer network on the planet and it’s practically
                impossible to break it! The reason for that is hash power, the umbrella term used for the computing
                power that miners provide to the bitcoin network and similar cryptocurrency networks. Due to the rapid
                growth of the ecosystem, mining operations today are mostly running with specialized high-performance
                computers that function most efficiently set up in large data centers.
                <br />
              </span>
              <span>
                <br />
              </span>
              <span>
                <br />
              </span>
              <span>
                <br />
              </span>
              <span>
                {' '}
                WHAT ARE THE INCENTIVES FOR MINERS
                <br />
              </span>
              <span>
                <br />
              </span>
              <span>
                It all comes down to trust: Miners keep the blockchains trustworthy and are rewarded for their efforts.
                As miners, we are processing and verifying the transactions of the cryptocurrency ecosystems and keeping
                their public transaction history (blockchains) maintained and secure. For this, the mining community is
                rewarded with the networks’ transaction fees and newly created coins. It’s a win-win situation! When you
                start mining with us, you are getting your share of this reward.
                <br />
              </span>
              <span>
                <br />
              </span>
              <span>
                <br />
              </span>
              <span>
                {' '}
                <br />
              </span>
              <span>
                {' '}
                THE BIG VISION OF CRYPTO CURRENCY
                <br />
              </span>
              <span>
                <br />
              </span>
              <span>
                To keep the integrity (and values!) of all cryptocurrency ecosystems intact, miners keep the networks
                safe and its authority decentralized by keeping each other constantly in check. This allows both a
                healthy growth and a fair distribution of currency units to all crypto-citizens!
                <br />
              </span>
              <span>
                {' '}
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
