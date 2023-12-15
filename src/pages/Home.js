/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import { Link } from 'react-router-dom';
import Page from '../components/Page';

// ----------------------------------------------------------------------

export default function Home() {
  return (
    <Page title="Home">
      <main className style={{ minHeight: '80vh' }}>
        <div className="bg bg-secondary app-image-back-1 fade-appear-done fade-enter-done">
          <div className="container">
            <div className="row" style={{ display: 'flex', flexWrap: 'wrap-reverse' }}>
              <div className="col l6 s12 center white-text">
                <div>
                  <div className="hide-on-med-and-down">
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  </div>
                  <h1 className="white-text">Finance Redefined</h1>
                  <p style={{ color: 'rgb(165, 189, 217)' }}>Experience a New Level of Fast Trading and Mining</p>
                  <br />
                  <Link className="btn" to="/signin">
                    LOGIN ACCOUNT
                  </Link>
                  <Link className="btn btn-white-trans" to="/signup">
                    CREATE ACCOUNT
                  </Link>
                  <br />
                  <br />
                  <br />
                  <br />
                </div>
              </div>
              <div className="col l6 s12">
                <center>
                  <br />
                  <img src="/assets/images/site/Landing2.png" className="responsive-img" />
                  <br />
                  <br />
                  <div className="hide-on-med-and-down">
                    <br />
                    <br />
                    <br />
                  </div>
                </center>
              </div>
            </div>
          </div>
        </div>
        <div className="tradingview-widget-container">
          <div className="tradingview-widget-container__widget" />
          <div id="tradingview_3e2" />
          <div className="tradingview-widget-copyright" />
          <div>
            <div style={{ width: '100%', height: '46px' }}>
              <style
                dangerouslySetInnerHTML={{
                  __html:
                    '\n .tradingview-widget-copyright {\n                        font-size: 13px !important;\n                        line-height: 32px !important;\n                        text-align: center !important;\n                        vertical-align: middle !important;\n                        /* @mixin sf-pro-display-font; */\n                        font-family: -apple-system, BlinkMacSystemFont, "Trebuchet MS", Roboto, Ubuntu, sans-serif !important;\n                        color: #9db2bd !important;\n                    }\n\n                    .tradingview-widget-copyright .blue-text {\n                        color: #2962ff !important;\n                    }\n\n                    .tradingview-widget-copyright a {\n                        text-decoration: none !important;\n                        color: #9db2bd !important;\n                    }\n\n                    .tradingview-widget-copyright a:visited {\n                        color: #9db2bd !important;\n                    }\n\n                    .tradingview-widget-copyright a:hover .blue-text {\n                        color: #1e53e5 !important;\n                    }\n\n                    .tradingview-widget-copyright a:active .blue-text {\n                        color: #1848cc !important;\n                    }\n\n                    .tradingview-widget-copyright a:visited .blue-text {\n                        color: #2962ff !important;\n                    }\n                ',
                }}
              />
              <iframe
                scrolling="no"
                allowtransparency="true"
                frameBorder={0}
                src="https://s.tradingview.com/embed-widget/ticker-tape/?locale=en#%7B%22symbols%22%3A%5B%7B%22title%22%3A%22S%26P%20500%22%2C%22proName%22%3A%22OANDA%3ASPX500USD%22%7D%2C%7B%22title%22%3A%22Shanghai%20Composite%22%2C%22proName%22%3A%22INDEX%3AXLY0%22%7D%2C%7B%22title%22%3A%22EUR%2FUSD%22%2C%22proName%22%3A%22FX_IDC%3AEURUSD%22%7D%2C%7B%22description%22%3A%22%22%2C%22proName%22%3A%22GBPUSD%22%7D%2C%7B%22description%22%3A%22USDCHF%22%2C%22proName%22%3A%22USDCHF%22%7D%2C%7B%22description%22%3A%22USDJPY%22%2C%22proName%22%3A%22USDJPY%22%7D%2C%7B%22description%22%3A%22USDCNH%22%2C%22proName%22%3A%22USDCNH%22%7D%2C%7B%22description%22%3A%22USDRUB%22%2C%22proName%22%3A%22FOREXCOM%3AUSDRUB%22%7D%2C%7B%22description%22%3A%22%22%2C%22proName%22%3A%22FX%3AAUDUSD%22%7D%2C%7B%22description%22%3A%22%22%2C%22proName%22%3A%22FX%3ANZDUSD%22%7D%2C%7B%22description%22%3A%22%22%2C%22proName%22%3A%22FX%3AUSDCAD%22%7D%2C%7B%22description%22%3A%22%22%2C%22proName%22%3A%22FX%3AUSDSEK%22%7D%2C%7B%22description%22%3A%22%22%2C%22proName%22%3A%22FX%3AEURCHF%22%7D%2C%7B%22title%22%3A%22BTC%2FUSD%22%2C%22proName%22%3A%22BITFINEX%3ABTCUSD%22%7D%2C%7B%22title%22%3A%22ETH%2FUSD%22%2C%22proName%22%3A%22BITFINEX%3AETHUSD%22%7D%5D%2C%22colorTheme%22%3A%22light%22%2C%22isTransparent%22%3Afalse%2C%22displayMode%22%3A%22adaptive%22%2C%22width%22%3A%22100%25%22%2C%22height%22%3A46%2C%22utm_source%22%3A%22springtrading.live%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22ticker-tape%22%7D"
                style={{ boxSizing: 'border-box', height: '46px', width: '100%' }}
                title="price list"
              />
            </div>
          </div>
        </div>
        <section className>
          <div className="app-py-3">
            <div className="container ">
              <div className="row ">
                <div
                  className="col l4 s12  app-py-1 wow fadeInUp slow"
                  style={{ display: 'flex', visibility: 'visible' }}
                >
                  <div style={{ flex: '1 1 0%' }}>
                    <img src="/assets/images/site/Service2.png" style={{ width: '95px' }} />
                  </div>
                  <div style={{ flex: '4 1 0%' }}>
                    <h3>FAST WITHDRAWALS</h3>
                    <p className="app-f2" style={{ marginTop: '4px', marginBottom: '4px' }}>
                      Withdrawal requests process instantly. You can make as many requests as you want everyday and
                      without a minimum or limits.
                    </p>
                  </div>
                </div>
                <div
                  className="col l4 s12  app-py-1 wow fadeInUp slow"
                  data-wow-delay="0.2s"
                  style={{ display: 'flex', visibility: 'visible', animationDelay: '0.2s' }}
                >
                  <div style={{ flex: '1 1 0%' }}>
                    <img src="/assets/images/site/Service1.png" style={{ width: '95px' }} />
                  </div>
                  <div style={{ flex: '4 1 0%' }}>
                    <h3>FRIENDLY INTERFACE</h3>
                    <p className="app-f2" style={{ marginTop: '4px', marginBottom: '4px' }}>
                      Whether you are a beginner or a professional in the online investment field, we are sure that you
                      will find our platform easy to use.
                    </p>
                  </div>
                </div>
                <div
                  className="col l4 s12  app-py-1 wow fadeInUp slow"
                  data-wow-delay="0.4s"
                  style={{ display: 'flex', visibility: 'visible', animationDelay: '0.4s' }}
                >
                  <div style={{ flex: '1 1 0%' }}>
                    <img src="/assets/images/site/Service3.png" style={{ width: '95px' }} />
                  </div>
                  <div style={{ flex: '4 1 0%' }}>
                    <h3>24/7 SUPPORT</h3>
                    <p className="app-f2" style={{ marginTop: '4px', marginBottom: '4px' }}>
                      We provide unbeatable support service through ticket system and email to cater your needs and give
                      a professional, fast and effective response
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg app-py-3 ">
          <div className="container app-py-3">
            <div className="row" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
              <div className="col l6 s12 app-flex-l6 wow fadeInUp slow" style={{ visibility: 'visible' }}>
                <center>
                  <img
                    src="/assets/images/site/Landing3.png"
                    className="responsive-img"
                    style={{ maxHeight: '60vh' }}
                  />
                  <br />
                  <br />
                </center>
              </div>
              <div className="col l6 s12 app-flex-l6 wow fadeInUp slow" style={{ visibility: 'visible' }}>
                <h2 className="center">Enjoy the ultimate platform</h2>
                <p>
                  Smooth Experience on Any Device. A multichart layout, technical analysis, historical quotes and
                  beyond. Everything you’re looking for in a platform — on the device of your choice.
                </p>
                <p className>
                  Whether you prefer trading at your desk or on the go — SwiftTrading has got you covered. The
                  custom-built platform has been adapted for any device you may choose and switching is 100% seamless.
                </p>
                <center>
                  <Link className="btn btn-trans" to="/signin">
                    Open in Browser
                  </Link>
                </center>
                <br />
              </div>
            </div>
          </div>
        </section>
        <section className="app-py-3">
          <br />
          <div className="container">
            <div className="row" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap-reverse' }}>
              <div className="col l6 s12 app-flex-l6">
                <div>
                  <br />
                  <h2
                    className="app-mobile-center wow fadeInUp slow"
                    style={{ fontWeight: 'bold', visibility: 'visible' }}
                  >
                    Technical Analysis
                  </h2>
                  <p
                    className="app-mobile-center  wow fadeInUp slow"
                    style={{ fontSize: '16px', visibility: 'visible' }}
                  >
                    Get the most out of fundamental and technical analysis with our more than 100 most widely-used
                    technical indicators and widgets. Always stay up-to-date on what is happening in the financial
                    markets.
                  </p>
                  <br />
                </div>
              </div>
              <div className="col l6 s12 app-flex-l6  wow fadeInUp slow" style={{ visibility: 'visible' }}>
                <center>
                  <div className="container">
                    <img
                      src="/assets/images/site/Analysis.png"
                      className="responsive-img"
                      style={{ maxHeight: '60vh' }}
                    />
                  </div>
                </center>
              </div>
            </div>
          </div>
        </section>
        <section className="bg app-py-3">
          <br />
          <div className="container">
            <div className="row" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
              <div className="col l6 s12 app-flex-l6 wow fadeInUp slow" style={{ visibility: 'visible' }}>
                <div className="container">
                  <center>
                    <img src="/assets/images/site/Risk.png" className="responsive-img" style={{ maxHeight: '60vh' }} />
                  </center>
                </div>
              </div>
              <div className="col l6 s12 app-flex-l6">
                <br />
                <h2 className="app-mobile-center wow fadeInUp slow" style={{ visibility: 'visible' }}>
                  Risk Management
                </h2>
                <p className="app-mobile-center wow fadeInUp slow" style={{ visibility: 'visible' }}>
                  With features like Stop Loss/Take Profit, Negative balance protection and Trailing Stop you can manage
                  your losses and profits at the levels predetermined by you.
                </p>
                <br />
              </div>
            </div>
          </div>
        </section>
        <section className=" app-py-3">
          <div className="container app-py-1">
            <h3 className="center alt-color wow fadeInUp slow" style={{ visibility: 'visible' }}>
              Three Simple Steps
            </h3>
            <div className="row">
              <div className="col l4 s12 app-py-1 wow fadeInUp slow" style={{ display: 'flex', visibility: 'visible' }}>
                <div style={{ flex: '1 1 0%' }}>
                  <img src="/assets/images/site/Step1.png" />
                </div>
                <div style={{ flex: '4 1 0%' }}>
                  <h3 className="alt-color">1. Register</h3>Open Account for free in just a few minutes
                </div>
              </div>
              <div className="col l4 s12 app-py-1 wow fadeInUp slow" style={{ display: 'flex', visibility: 'visible' }}>
                <div style={{ flex: '1 1 0%' }}>
                  <img src="/assets/images/site/Step2.png" />
                </div>
                <div style={{ flex: '4 1 0%' }}>
                  <h3 className="alt-color"> 2. Deposit</h3>Fund your trading account or purchase mining contracts
                </div>
              </div>
              <div className="col l4 s12 app-py-1 wow fadeInUp slow" style={{ display: 'flex', visibility: 'visible' }}>
                <div style={{ flex: '1 1 0%' }}>
                  <img src="/assets/images/site/Step3.png" />
                </div>
                <div style={{ flex: '4 1 0%' }}>
                  <h3 className="alt-color"> 3. Trade</h3>Trade by yourself or copy our expert traders
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg app-py-3">
          <br />
          <br />
          <div className="container">
            <div className="container">
              <div>
                <h2 className="center wow fadeInUp alt-color" style={{ visibility: 'visible' }}>
                  Why Choose Us
                </h2>
                <p className="center wow fadeInUp slow" style={{ visibility: 'visible' }}>
                  CFDs on Stocks, ETFs, Commodities, Indices, Cryptocurrencies and Forex
                </p>
                <br />
                <p className="wow fadeInUp slow" style={{ textAlign: 'justify', visibility: 'visible' }}>
                  SwiftTrading is one of the fastest growing online trading brands in the world. Voted the best mobile
                  trading platform, we have now expanded our offerings to include CFDs on stocks, ETFs and Forex
                  trading. First founded in 2013, SwiftTrading has grown massively and now has over 40 million members
                  and counting! The platform itself has also undergone some changes since 2013, and we are constantly
                  working to ensure it is fast, accurate and easy to use.
                </p>
                <p className="wow fadeInUp slow" style={{ textAlign: 'justify', visibility: 'visible' }}>
                  We have also refined our offering and introduced plenty of new products in our bid to continue giving
                  our customers the ultimate online trading experience and to help them optimize their investment
                  portfolio. Now, using our platform, our members can try CFDs on currency pairs, CFDs on stocks, CFDs
                  on commodities, CFDs on cryptocurrencies, as well as CFDs on ETFs.
                </p>
                <br />
                <br />
              </div>
              <div className="row">
                <div className="col l6 s12 app-py-1 wow fadeInUp" style={{ visibility: 'visible' }}>
                  <div style={{ display: 'flex' }}>
                    <div style={{ flex: '1 1 0%' }}>
                      <img src="/assets/images/site/Com7.png" style={{ maxHeight: '80px' }} />
                    </div>
                    <div style={{ flex: '4 1 0%' }}>
                      <h6>Copy Trading</h6>
                      <p>
                        Select from a list of expert traders, and automatically copy trades.{' '}
                        <a className="alt-color" href="/pages/copy-expert-traders">
                          Learn more
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col l6 s12 app-py-1 wow fadeInUp" style={{ visibility: 'visible' }}>
                  <div style={{ display: 'flex' }}>
                    <div style={{ flex: '1 1 0%' }}>
                      <img src="/assets/images/site/Com1.png" style={{ maxHeight: '80px' }} />
                    </div>
                    <div style={{ flex: '4 1 0%' }}>
                      <h6>Trade Forex</h6>
                      <p>
                        Explore and trade major, minor and exotic currency pairs with efficient spreads{' '}
                        <a className="alt-color" href="/pages/forex-trading">
                          Learn more
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col l6 s12 app-py-1 wow fadeInUp" style={{ visibility: 'visible' }}>
                  <div style={{ display: 'flex' }}>
                    <div style={{ flex: '1 1 0%' }}>
                      <img src="/assets/images/site/Com4.png" />
                    </div>
                    <div style={{ flex: '4 1 0%' }}>
                      <h6>Mine Cryptocurrencies</h6>
                      <p>
                        Mine popular digital/crypto currencies with different algorithms.{' '}
                        <a className="alt-color" href="/pages/bitcoin-mining">
                          Learn more
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col l6 s12 app-py-1 wow fadeInUp" style={{ visibility: 'visible' }}>
                  <div style={{ display: 'flex' }}>
                    <div style={{ flex: '1 1 0%' }}>
                      <img src="/assets/images/site/Com3.png" />
                    </div>
                    <div style={{ flex: '4 1 0%' }}>
                      <h6>CFD Stocks</h6>
                      <p>
                        Trade CFDs on stocks of leading companies and industry giants.{' '}
                        <a className="alt-color" href="/pages/stocks-trading">
                          Learn more
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="app-py-3">
          <div>
            <h2 className="center wow fadeInUp slow" style={{ visibility: 'visible' }}>
              MINE TOP CRYPTO CURRENCIES
            </h2>
            <br />
            <div className="container">
              <p className="wow fadeInUp slow" style={{ visibility: 'visible' }}>
                Unlike paper money, Bitcoin and other cryptocurrencies are produced mathematically and held digitally.
                The people who voluntarily offer their computing power to secure these cryptocurrency networks are
                called miners. Cryptocurrencies don’t have a central government or other so-called ‘middlemen’ that
                decide about the future of the system.
              </p>
              <p className="wow fadeInUp slow" style={{ visibility: 'visible' }}>
                As miners, we are processing and verifying the transactions of the cryptocurrency ecosystems and keeping
                their public transaction history (blockchains) maintained and secure. For this, the mining community is
                rewarded with the networks’ transaction fees and newly created coins.
              </p>
            </div>
            <br />
            <div className="container row center">
              <div className="col l3 s12">
                <div className="card-panel wow fadeInUp slow" style={{ visibility: 'visible' }}>
                  <img src="/assets/images/icons/pair-icon-atomusd.img.svg" style={{ height: '56px' }} />
                  <br />
                  <p>Cosmos</p>
                  <p>30.43943</p>
                </div>
                <br />
              </div>
              <div className="col l3 s12 ">
                <div
                  className="card-panel wow fadeInUp slow"
                  data-wow-delay="0.1s"
                  style={{ visibility: 'visible', animationDelay: '0.1s' }}
                >
                  <img src="/assets/images/icons/pair-icon-btcusd.img.svg" />
                  <p>Bitcoin</p>
                  <p>45629.77</p>
                </div>
                <br />
              </div>
              <div className="col l3 s12">
                <div
                  className="card-panel wow fadeInUp slow"
                  data-wow-delay="0.2s"
                  style={{ visibility: 'visible', animationDelay: '0.2s' }}
                >
                  <img src="/assets/images/icons/pair-icon-ethusd.img.svg" />
                  <br />
                  <p>Ethereum</p>
                  <p>3422.676</p>
                </div>
                <br />
              </div>
              <div className="col l3 s12">
                <div
                  className="card-panel wow fadeInUp slow"
                  data-wow-delay="0.4s"
                  style={{ visibility: 'visible', animationDelay: '0.4s' }}
                >
                  <img src="/assets/images/icons/pair-icon-bnbusd.img.svg" />
                  <br />
                  <p>Binance Coin</p>
                  <p>438.17959</p>
                </div>
                <br />
              </div>
            </div>
            <br />
          </div>
        </section>
        <section className="bg center app-py-3">
          <div className="container">
            <div className="row">
              <div
                className="app-my-2 col l4 s12 wow fadeInUp"
                data-wow-delay="0.4s"
                style={{ visibility: 'visible', animationDelay: '0.4s' }}
              >
                <img src="/assets/images/site/ServiceVector3.png" className="responsive-img" />
                <h3 className="h4">Daily Mining Outputs</h3>
                <p className="app-mb-2">
                  Returns made from either trading or mining transactions will be added to your account daily and
                  automatically.
                </p>
              </div>
              <div className="app-my-2 col l4 s12 wow fadeInUp" style={{ visibility: 'visible' }}>
                <img src="/assets/images/site/ServiceVector1.png" className="responsive-img" />
                <h3 className="h4">State of the Art Mining</h3>
                <p className="app-mb-2">
                  Productivity is a top notch quality for any investment. So, for every trade action or blockchain
                  mining algorithm that we offer, we’re providing some of the highest performing systems and softwares
                  that exist
                </p>
              </div>
              <div
                className="app-my-2 col l4 s12 wow fadeInUp"
                data-wow-delay="0.2s"
                style={{ visibility: 'visible', animationDelay: '0.2s' }}
              >
                <img src="/assets/images/site/ServiceVector2.png" className="responsive-img" />
                <h3 className="h4">Diverse Mining Portfolio</h3>
                <p className="app-mb-2">
                  Choose from a wide range of target assets for trading and over 10 major mining algorithms that cut
                  across 4 mineable cryptocurrencies
                </p>
              </div>
            </div>
            <div className="row">
              <div className="app-my-2 col l4 s12 wow fadeInUp" style={{ visibility: 'visible' }}>
                <img src="/assets/images/site/ServiceVector45.png" className="responsive-img" />
                <h3 className="h4">Hardware is already running</h3>
                <p className="app-mb-2">
                  Don’t wrestle with rig assembly and hot, noisy miners at home. We have the fastest bitcoin mining
                  hardware running for you already
                </p>
              </div>
              <div
                className="app-my-2 col l4 s12 wow fadeInUp"
                data-wow-delay="0.2s"
                style={{ visibility: 'visible', animationDelay: '0.2s' }}
              >
                <img src="/assets/images/site/ServiceVector55.png" className="responsive-img" />
                <h3 className="h4">Intuitive Dashboard</h3>
                <p className="app-mb-2">
                  All the financial instruments data and charts that you need, when you need them
                </p>
              </div>
              <div
                className="app-my-2 col l4 s12 wow fadeInUp"
                data-wow-delay="0.4s"
                style={{ visibility: 'visible', animationDelay: '0.4s' }}
              >
                <img src="/assets/images/site/ServiceVector65.png" className="responsive-img" />
                <h3 className="h4">Secure and Private</h3>
                <p className="app-mb-2">
                  We value the privacy of our users, so we strive to keep collected user data to a minimum level.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Page>
  );
}
