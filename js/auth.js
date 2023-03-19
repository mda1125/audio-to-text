const auth0 = new Auth0Client({
  domain: 'dev-ziwl0iyni3fd16ww.us.auth0.com', // Replace with your Auth0 domain
  client_id: '7h0BYhwPNJAlnVGtwBFIU0YAbW6sAPBQ', // Replace with your Auth0 client ID
  redirect_uri: 'https://audio-to-text-wine.vercel.app/', // Replace with your callback URL
  cacheLocation: 'localstorage',
  useRefreshTokens: true
});

window.addEventListener('load', async () => {
  await handleRedirectCallback();
  updateUI();

  const loginBtn = document.getElementById('loginBtn');
  const logoutBtn = document.getElementById('logoutBtn');

  loginBtn.addEventListener('click', login);
  logoutBtn.addEventListener('click', logout);
});

async function handleRedirectCallback() {
  if (window.location.search.includes('code=')) {
    await auth0.handleRedirectCallback();
    window.history.replaceState({}, document.title, '/');
  }
}

async function updateUI() {
  const isAuthenticated = await auth0.isAuthenticated();
  const authButtons = document.getElementById('authButtons');
  const transcriptionContainer = document.getElementById('transcriptionContainer');

  if (isAuthenticated) {
    document.getElementById('loginBtn').classList.add('hidden');
    document.getElementById('logoutBtn').classList.remove('hidden');
    transcriptionContainer.classList.remove('hidden');
  } else {
    document.getElementById('loginBtn').classList.remove('hidden');
    document.getElementById('logoutBtn').classList.add('hidden');
    transcriptionContainer.classList.add('hidden');
  }

  authButtons.classList.remove('hidden');
}

async function login() {
  await auth0.loginWithRedirect();
}

async function logout() {
  await auth0.logout({
    returnTo: window.location.origin
  });
}
