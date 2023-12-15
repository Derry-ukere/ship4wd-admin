/* eslint-disable arrow-body-style */
import React from 'react';

const Identity = () => {
  return (
    <div>
      <br />
      <div className="row">
        <div className="col l4 s12 offset-l4">
          <div className="card-panel">
            <h3 className="btn-color center">Verify Your Identity</h3>
            <p style={{ textAlign: 'justify' }}>
              Please verify your identity by uploading a valid government issued identification card. You may experience
              difficulties when uploading from an ios device. Make sure your browser has camera access in your ios
              settings.
            </p>
            <center>
              <br />
              <form encType="multipart/form-data">
                <div>
                  <div className="file-field input-field">
                    <div className="btn btn-secondary">
                      <span>select front</span>
                      <input type="file" accept=".jpg,.png,.jpeg" id="front" name="front" required />
                    </div>
                    <div className="file-path-wrapper">
                      <input className="file-path validate" type="text" />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="file-field input-field">
                    <div className="btn btn-secondary">
                      <span>select back</span>
                      <input type="file" accept=".jpg,.png,.jpeg" id="back" name="back" required />
                    </div>
                    <div className="file-path-wrapper">
                      <input className="file-path validate" type="text" />
                    </div>
                  </div>
                </div>
                <div>
                  <button type="submit" className="btn btn-full">
                    Upload
                  </button>
                </div>
              </form>
              <form autoComplete="off">
                <br />
                <div>
                  <button type="submit" className="btn btn-secondary btn-full">
                    Skip
                  </button>
                </div>
              </form>
            </center>
          </div>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default Identity;
