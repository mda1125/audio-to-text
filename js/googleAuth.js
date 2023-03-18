function init() {
  gapi.load('auth2', function () {
    gapi.auth2.init({
      client_id: '856066838706-e3njg99uk5bj9i1c0g5rff7q8ukf0lm5.apps.googleusercontent.com',
    }).then(() => {
      const auth2 = gapi.auth2.getAuthInstance();
      const signInButton = document.getElementById('signInButton');
      signInButton.addEventListener('click', () => {
        console.log("Signing in...");
        auth2.signIn().then(onSignIn).catch(error => console.log("Sign-in error:", error));
      });
    });
  });
}

function onSignIn(googleUser) {
  console.log("Sign-in successful");
  const id_token = googleUser.getAuthResponse().id_token;

  // Verify the token with your server, and then store it in a secure way
  sessionStorage.setItem('id_token', id_token);

  // Show the transcription components and the Sign out button
  document.querySelector('.transcription').style.display = 'block';
  document.getElementById('signOutButton').style.display = 'inline';
  document.getElementById('signInButton').style.display = 'none';
}

function signOut() {
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(() => {
    sessionStorage.removeItem('id_token');

    // Hide the transcription components and the Sign out button
    document.querySelector('.transcription').style.display = 'none';
    document.getElementById('signOutButton').style.display = 'none';
    document.getElementById('signInButton').style.display = 'inline';
  });
}

window.addEventListener('load', init);
