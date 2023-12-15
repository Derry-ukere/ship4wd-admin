import React from 'react';
import { Link } from 'react-router-dom';

const DashboardFooter = () => (
  <div>
    <div className="fixed-footer mobile-bg">
      <ul className="tabs">
        <li className="tab col s6">
          <Link className to="/user">
            <span className="material-icons notranslate">assessment</span>
            <span>Trading</span>
          </Link>
        </li>
        <li className="tab col s6">
          <Link className="active" to="/user/mining">
            <span className="material-icons notranslate">copyright</span>
            <span>Mining</span>
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default DashboardFooter;
