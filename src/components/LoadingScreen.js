export default function LoadingScreen() {
  const SRC = 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/android-chrome-192x192.png?alt=media&token=b473127e-c58d-43ed-9a57-49c776434626'
  return (
    <>
      <center className="app-my-3">
        <img src= {SRC} className="responsive-img" alt="Logo" />
        <div className="container">
          <div className="container">
            <div className="progress">
              <div className="indeterminate" />
            </div>
          </div>
        </div>
      </center>
    </>
  );
}
