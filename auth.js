// ==========================================
// CATTLE TRACKER LOGIN
// ==========================================

// इथे तुमचा 10 अंकी फोन नंबर टाका
const USER_PHONE = "9876543210";

// इथे तुमचा Master PIN टाका
const MASTER_PIN = "1234";


// फोन नंबरच्या शेवटचे 4 अंक + 7
// उदाहरण: 9876543210 → 32107
function getPassword(phone) {
  return phone.slice(-4) + "7";
}


// Login
function loginUser() {
  const phone = document.getElementById("loginPhone").value.trim();
  const password = document.getElementById("loginPassword").value;
  const error = document.getElementById("loginError");

  const correctPassword = getPassword(USER_PHONE);

  // Phone Number + Password
  if (phone === USER_PHONE && password === correctPassword) {
    sessionStorage.setItem("cattle_logged_in", "true");

    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("appScreen").style.display = "block";

    error.innerText = "";
    return;
  }

  // Master PIN
  if (password === MASTER_PIN) {
    sessionStorage.setItem("cattle_logged_in", "true");

    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("appScreen").style.display = "block";

    error.innerText = "";
    return;
  }

  error.innerText = "फोन नंबर किंवा पासवर्ड चुकीचा आहे.";
}


// App सुरू होताना Login तपासणे
window.addEventListener("DOMContentLoaded", function () {

  const loggedIn = sessionStorage.getItem("cattle_logged_in");

  if (loggedIn === "true") {
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("appScreen").style.display = "block";
  } else {
    document.getElementById("loginScreen").style.display = "flex";
    document.getElementById("appScreen").style.display = "none";
  }

  // Password box मध्ये Enter दाबल्यावर Login
  document.getElementById("loginPassword").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      loginUser();
    }
  });

});
