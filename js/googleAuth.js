function init() {
  gapi.load('auth2', function() {
    gapi.auth2.init({
      client_id: 'YOUR_CLIENT_ID',
    });
  });
}

function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;

  // Verify the token with your server, and then store it in a secure way
  sessionStorage.setItem('id_token', id_token);

  // Show the transcription components and the Sign out button
  document.querySelector('.transcription').style.display = 'block';
  document.querySelector('button[onclick="signOut()"]').style.display = 'inline';
}

function signOut() {
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(() => {
    sessionStorage.removeItem('id_token');

    // Hide the transcription components and the Sign out button
    document.querySelector('.transcription').style.display = 'none';
    document.querySelector('button[onclick="signOut()"]').style.display = 'none';
  });
}
