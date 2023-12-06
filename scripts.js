function showSection(id) {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.style.display = 'none';
    section.classList.remove('active');
  });

  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.classList.remove('active');
  });

  const sectionToShow = document.getElementById(id);
  if (sectionToShow) {
    sectionToShow.style.display = 'block';
    setTimeout(() => {
      sectionToShow.classList.add('active');
    }, 10);
  }

  document.querySelector(`nav a[href="#${id}"]`).classList.add('active');
  document.getElementById("mainNav").classList.remove('active');
}

function toggleMenu() {
  const nav = document.getElementById("mainNav");
  nav.classList.toggle('active');
}

window.onload = function() {
  showSection('info');
}

function isPhishingWebsite(url) {
  const ipRegex = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
  if (ipRegex.test(url)) {
    return "This is a Phishing Website! (Reason: Contains IP address)";
  }

  if (url.length < 54) {
    return "This is a Legitimate Website!";
  } else if (url.length >= 54 && url.length <= 75) {
    return "This is a Suspicious Website!";
  } else if (url.length > 75) {
    return "This is a Phishing Website! (Reason: URL length greater than 75 characters)";
  }

  if (url.includes('@')) {
    return "This is a Phishing Website! (Reason: Contains '@' symbol)";
  }

  const dotCount = (url.match(/\./g) || []).length;
  if (dotCount > 2) {
    return "This is a Phishing Website! (Reason: Contains more than 2 dots)";
  }

  return "This is a Legitimate Website!";
}

document.getElementById('phishingCheckForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const url = document.getElementById('link').value;
  const resultDiv = document.getElementById('phishingResult');
  resultDiv.textContent = isPhishingWebsite(url);
});
