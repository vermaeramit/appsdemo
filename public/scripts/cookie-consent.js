(function () {
  var STORAGE_KEY = "appsdemo-cookie-consent-v1";
  var banner = document.getElementById("cookieBanner");
  if (!banner) return;

  // If user has already made a choice, stay hidden.
  try {
    if (localStorage.getItem(STORAGE_KEY)) return;
  } catch (e) {
    // localStorage may be blocked; in that case we still show the banner.
  }

  // Show after a short delay so it doesn't fight the page paint.
  setTimeout(function () { banner.removeAttribute("hidden"); }, 300);

  function dismiss(choice) {
    try { localStorage.setItem(STORAGE_KEY, choice + ":" + new Date().toISOString()); } catch (e) {}
    banner.setAttribute("hidden", "");
  }

  var accept = document.getElementById("cookieAccept");
  var decline = document.getElementById("cookieDecline");
  if (accept) accept.addEventListener("click", function () { dismiss("accepted"); });
  if (decline) decline.addEventListener("click", function () { dismiss("declined"); });
})();
