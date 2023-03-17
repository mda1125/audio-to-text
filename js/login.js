const loginForm = document.getElementById('loginForm');
const errorMsg = document.getElementById('errorMsg');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Replace these values with the desired username and password
  const validUsername = 'admin';
  const validPassword = 'password';

  if (username === validUsername && password === validPassword) {
    sessionStorage.setItem('authenticated', 'true');
    window.location.href = 'index.html';
  } else {
    errorMsg.textContent = 'Invalid username or password';
  }
});
