const auth0 = new Auth0Client({
  domain: 'https://audio-to-text-wine.vercel.app/',
  client_id: '7h0BYhwPNJAlnVGtwBFIU0YAbW6sAPBQ',
  redirect_uri: 'https://audio-to-text-wine.vercel.app/',
  cacheLocation: 'localstorage',
  useRefreshTokens: true
});

async function login() {
  await auth0.loginWithRedirect();
}

async function handleCallback() {
  if (window.location.search.includes('code=')) {
    await auth0.handleRedirectCallback();
    window.location.hash = '';
    checkAuthentication();
  }
}

async function logout() {
  await auth0.logout({ returnTo: window.location.origin });
}

async function isAuthenticated() {
  return await auth0.isAuthenticated();
}

async function checkAuthentication() {
  const transcriptionComponents = document.getElementById('transcriptionComponents');
  const loginBtn = document.getElementById('loginBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  
  if (await isAuthenticated()) {
    transcriptionComponents.style.display = 'block';
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'block';
  } else {
    transcriptionComponents.style.display = 'none';
    loginBtn.style.display = 'block';
    logoutBtn.style.display = 'none';
  }
}

handleCallback();
checkAuthentication();
