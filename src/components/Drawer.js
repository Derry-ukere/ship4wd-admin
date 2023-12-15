/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/alt-text */
import { Link } from 'react-router-dom';
import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';

export default function TemporaryDrawer({ parentState }) {
  const [state, setState] = React.useState({
    left: false,
  });
  React.useEffect(() => {
    console.log('state', parentState);
  }, [parentState]);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, left: open });
  };

  return (
    <div>
      {['left', 'right', 'top', 'bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer anchor={anchor} open onClose={toggleDrawer(anchor, false)}>
            <ul className="sidenav" id="mobile-demo" style={{ transform: 'translateX(0%)' }}>
              <li>
                <div className="user-view">
                  <div className="background">
                    <img src="/assets/images/site/logo.png" className="responsive-img" style={{ height: '19vh' }} />
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
                    <Link className="sidenav-close" to="/contact">
                      <span className="material-icons notranslate">mail_outline</span>Contact Us
                    </Link>
                  </li>
                  <li>
                    <a className="sidenav-close" href="/pages/about-us">
                      <span className="material-icons notranslate">people</span>About Us
                    </a>
                  </li>
                  <li>
                    <a className="sidenav-close" href="/pages/privacy-policy">
                      <span className="material-icons notranslate">lock_open</span>Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a className="sidenav-close" href="/pages/terms-of-service">
                      <span className="material-icons notranslate">folder_open</span>Terms of Service
                    </a>
                  </li>
                  <li>
                    <a className="sidenav-close" href="/pages/forex-trading">
                      <span className="material-icons notranslate">wysiwyg</span>Forex Trading
                    </a>
                  </li>
                  <li>
                    <a className="sidenav-close" href="/pages/stocks-trading">
                      <span className="material-icons notranslate">insert_chart_outlined</span>Stocks Trading
                    </a>
                  </li>
                  <li>
                    <a className="sidenav-close" href="/pages/crypto-trading">
                      <span className="material-icons notranslate">copyright</span>Crypto Trading
                    </a>
                  </li>
                  <li>
                    <a className="sidenav-close" href="/pages/options-trading">
                      <span className="material-icons notranslate">donut_large</span>Options Trading
                    </a>
                  </li>
                  <li>
                    <a className="sidenav-close" href="/pages/copy-expert-traders">
                      <span className="material-icons notranslate">content_copy</span>Copy Expert Traders
                    </a>
                  </li>
                  <li>
                    <a className="sidenav-close" href="/pages/about-mining">
                      <span className="material-icons notranslate">copyright</span>About Mining
                    </a>
                  </li>
                  <li>
                    <a className="sidenav-close" href="/pages/bitcoin-mining">
                      <span className="material-icons notranslate">copyright</span>Bitcoin Mining
                    </a>
                  </li>
                  <li>
                    <a className="sidenav-close" href="/pages/dogecoin-mining">
                      <span className="material-icons notranslate">copyright</span>Dogecoin Mining
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
