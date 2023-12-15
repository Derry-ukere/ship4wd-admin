/* eslint-disable jsx-a11y/label-has-associated-control */
import Page from '../components/Page';
import RegisterForm from '../sections/auth/register/RegisterForm';

// ----------------------------------------------------------------------

export default function Signin() {
  return (
    <Page title="Sign up">
      <>
        <div className=" row" style={{ minHeight: '100vh' }}>
          <br />
          <div className="col l4 offset-l4 s12">
            <div className="container">
            <div className="app-relative hero-mixed">
      <div className="overlay1" />
      <div className="fade-appear-done fade-enter-done" style={{ paddingBottom: '6rem', paddingTop: '2rem' }}>
        <h1 className="center app-relative white-text">Create Admin</h1>
      </div>
    </div>

              <div className="card-panel" style={{ borderRadius: '10px' }}>
                <center>
                  <br />
                  <RegisterForm />
                  <br />
                  
                </center>
              </div>
            </div>
          </div>
        </div>
      </>
    </Page>
  );
}
