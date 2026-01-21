const GOGGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScV5JnZltTEdQvUo0wG8ln_maeCHynMO6KLuTo5lc9yqRgaeA/formResponse"
const ENTRY_NAME = "entry.1564597964";
const ENTRY_EMAIL = "entry.1963473186";
const ENTRY_RATING = "entry.985417630";
const ENTRY_FEEDBACK = "entry.755505946";


const form = document.getElementById("feedbackForm");
const emailError = document.getElementById("emailError");
const ratingError = document.getElementById("ratingError");
const successMessage = document.getElementById("successMessage");
const stars = document.querySelectorAll(".star");
const ratingInput = document.getElementById("rating");

function validateEmail(email) {
  const regex = /^[a-z0-9]+([a-z0-9]*[a-z0-9]?@[a-z0-9]+[a-z][a-z0-9]*)\.[a-z]{2,}$/;
  return regex.test(email);
}

// Star click logic
stars.forEach(star => {
  star.addEventListener("click", () => {
    const value = star.getAttribute("data-value");
    ratingInput.value = value;

    stars.forEach(s => {
      s.classList.toggle("selected", s.getAttribute("data-value") <= value);
    });

    ratingError.textContent = "";
  });
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  emailError.textContent = "";
  ratingError.textContent = "";
  successMessage.textContent = "";

  const email = document.getElementById("email").value.trim();
  const rating = ratingInput.value;

  if (!validateEmail(email)) {
    emailError.textContent = "Invalid email format .";
    return;
  }

  if (!rating) {
    ratingError.textContent = "Please select a star rating.";
    return;
  }

  const formData = new FormData();

  formData.append(ENTRY_NAME, document.getElementById("name").value.trim());
  formData.append(ENTRY_EMAIL, email);
  formData.append(ENTRY_RATING, rating);
  formData.append(ENTRY_FEEDBACK, document.getElementById("feedback").value.trim());
  

  fetch("https://docs.google.com/forms/d/e/1FAIpQLScV5JnZltTEdQvUo0wG8ln_maeCHynMO6KLuTo5lc9yqRgaeA/formResponse", {
    method: "POST",
    mode: "no-cors",
    body: formData
  });

  successMessage.textContent =
    "Thank you! Your feedback has been submitted successfully.";

  form.reset();
  stars.forEach(star => star.classList.remove("selected"));


});