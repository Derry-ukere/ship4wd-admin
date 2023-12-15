/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Link, Outlet } from 'react-router-dom';

// components
import Footer from '../../components/Footer';

export default function SwipeableTemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            <ul className="sidenav" id="mobile-demo" style={{ transform: 'translateX(0%)' }}>
              <li>
                <div className="user-view">
                  <div className="background">
                    <img
                      src="/assets/images/site/logo.png"
                      className="responsive-img"
                      alt="logo"
                      style={{ height: '19vh' }}
                    />
                  </div>
                </div>
              </li>
              <li className="no-padding">
                <ul>
                  <li>
                    <Link className="sidenav-close" to="/">
                      <span className="material-icons notranslate">home</span>Home
                    </Link>
                  </li>
                  <li>
                    <Link className="sidenav-close" to="/signin">
                      <span className="material-icons notranslate">person_outline</span>Sign In
                    </Link>
                  </li>
                  <li>
                    <Link className="sidenav-close" to="/signup">
                      <span className="material-icons notranslate">person_add</span>Sign Up
                    </Link>
                  </li>
                  <li>
                    <Link className="sidenav-close" to="/pages/contact">
                      <span className="material-icons notranslate">mail_outline</span>Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link className="sidenav-close" to="/pages/about-us">
                      <span className="material-icons notranslate">people</span>About Us
                    </Link>
                  </li>
                  <li>
                    <Link className="sidenav-close" to="/pages/privacy-policy">
                      <span className="material-icons notranslate">lock_open</span>Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link className="sidenav-close" to="/pages/terms-of-service">
                      <span className="material-icons notranslate">folder_open</span>Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link className="sidenav-close" to="/pages/forex-trading">
                      <span className="material-icons notranslate">wysiwyg</span>Forex Trading
                    </Link>
                  </li>
                  <li>
                    <Link className="sidenav-close" to="/pages/stocks-trading">
                      <span className="material-icons notranslate">insert_chart_outlined</span>Stocks Trading
                    </Link>
                  </li>
                  <li>
                    <Link className="sidenav-close" to="/pages/crypto-trading">
                      <span className="material-icons notranslate">copyright</span>Crypto Trading
                    </Link>
                  </li>
                  <li>
                    <Link className="sidenav-close" to="/pages/options-trading">
                      <span className="material-icons notranslate">donut_large</span>Options Trading
                    </Link>
                  </li>
                  <li>
                    <Link className="sidenav-close" to="/pages/copy-expert-traders">
                      <span className="material-icons notranslate">content_copy</span>Copy Expert Traders
                    </Link>
                  </li>
                  <li>
                    <Link className="sidenav-close" to="/pages/about-mining">
                      <span className="material-icons notranslate">copyright</span>About Mining
                    </Link>
                  </li>
                  <li>
                    <Link className="sidenav-close" to="/pages/bitcoin-mining">
                      <span className="material-icons notranslate">copyright</span>Bitcoin Mining
                    </Link>
                  </li>
                  <li>
                    <Link className="sidenav-close" to="/pages/dogecoin-mining">
                      <span className="material-icons notranslate">copyright</span>Dogecoin Mining
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </SwipeableDrawer>
          <main className style={{ minHeight: '80vh' }}>
            <div className="bg bg-secondary app-image-back-1 fade-appear-done fade-enter-done">
              <div className="navbar-fixed">
                <nav className="bg">
                  <div className="nav-wrapper">
                    <ul id="nav-mobile" className="left">
                      <li onClick={toggleDrawer(anchor, true)}>
                        <a data-target="mobile-demo" className="sidenav-trigger show-on-large">
                          <span className="material-icons notranslate">menu</span>
                        </a>
                      </li>
                      <li>
                        <Link to="/">
                          <b className="app-title">SwiftTrading</b>
                        </Link>
                      </li>
                    </ul>
                    <ul className="right hide-on-med-and-down">
                      <li>
                        <Link to="/pages/contact">Contact Us</Link>
                      </li>
                      <li>
                        <Link to="/signin">Log In</Link>
                      </li>
                      <li>
                        <Link to="/signup">Sign Up</Link>
                      </li>

                      <li className="dropdown-trigger" data-target="translator">
                        <a href = "#">
                          <span className="flag-icon flag-icon-us flag-icon-rounded" />{' '}
                          <span className="hide-on-small-only">en</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
            <div>
              <Outlet />
            </div>
          </main>
          <Footer />
        </React.Fragment>
      ))}
    </div>
  );
}
