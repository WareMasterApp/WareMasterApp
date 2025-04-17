const eyeIcon = document.getElementById('eye-icon');
eyeIcon?.addEventListener('click', () => {
  const passwordInput = document.getElementById('password');
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    eyeIcon.src = '/images/eye-open.png';
  } else {
    passwordInput.type = 'password';
    eyeIcon.src = '/images/eye-close.png';
  }
});
