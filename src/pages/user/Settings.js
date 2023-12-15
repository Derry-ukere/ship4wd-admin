/* eslint-disable arrow-body-style */
import React from 'react';
import {Link} from 'react-router-dom'

const Account = () => { 

  return (
    <main className="app-py-1" style={{ height: '100vh' }}>
      <div className="fade-appear-done fade-enter-done">
        <br />
        <h1 className="center">Settings</h1>
        <br />
        <div className="container">
          <div className="row">
            <div className="col l6 s12 offset-l3">
              <ul className="collection">
                <Link className="collection-item bg" to="/user/settings/create-admin">
                  <li>
                    <div
                      style={{
                        padding: '1rem 1rem 0.8rem',
                        background: 'rgb(50, 167, 226)',
                        borderRadius: '10px',
                        display: 'inline-block',
                        marginRight: '1rem',
                      }}
                    >
                      <span
                        className="material-icons notranslate"
                        style={{ fontSize: '30px', margin: '0px', padding: '0px', color: 'white' }}
                      >
                        person
                      </span>
                    </div>
                    Add Admin
                  </li>
                </Link>
                <Link className="collection-item bg" to="/user/settings/create-user">
                  <li>
                    <div
                      style={{
                        padding: '1rem 1rem 0.8rem',
                        background: 'rgb(225, 85, 93)',
                        borderRadius: '10px',
                        display: 'inline-block',
                        marginRight: '1rem',
                      }}
                    >
                      <span
                        className="material-icons notranslate"
                        style={{ fontSize: '30px', margin: '0px', padding: '0px', color: 'white' }}
                      >
                        notifications
                      </span>
                    </div>
                    Add New User
                  </li>
                </Link>
                <Link className="collection-item bg" to="/user/admin">
                  <li>
                    <div
                      style={{
                        padding: '1rem 1rem 0.8rem',
                        background: 'rgb(225, 85, 93)',
                        borderRadius: '10px',
                        display: 'inline-block',
                        marginRight: '1rem',
                      }}
                    >
                      <span
                        className="material-icons notranslate"
                        style={{ fontSize: '30px', margin: '0px', padding: '0px', color: 'white' }}
                      >
                        notifications
                      </span>
                    </div>
                    Admin Details
                  </li>
                </Link>
 
                <Link className="collection-item bg" to="update-password">
                  <li>
                    <div
                      style={{
                        padding: '1rem 1rem 0.8rem',
                        background: 'rgb(50, 167, 226)',
                        borderRadius: '10px',
                        display: 'inline-block',
                        marginRight: '1rem',
                      }}
                    >
                      <span
                        className="material-icons notranslate"
                        style={{ fontSize: '30px', margin: '0px', padding: '0px', color: 'white' }}
                      >
                        lock
                      </span>
                    </div>
                    Change Password
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Account;
