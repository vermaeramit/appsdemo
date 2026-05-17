(function () {
  var form = document.getElementById("contactForm");
  if (!form) return;
  var status = document.getElementById("contactStatus");
  var submitBtn = document.getElementById("contactSubmit");
  var endpoint = form.getAttribute("data-endpoint") || "/api/contact";

  function setStatus(text, tone) {
    if (!status) return;
    status.textContent = text;
    status.className = "text-sm " + (
      tone === "ok"    ? "text-emerald-600 font-medium" :
      tone === "error" ? "text-rose-600 font-medium" :
                         "text-slate-500"
    );
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    setStatus("Sending...", "info");
    if (submitBtn) submitBtn.disabled = true;

    var formData = new FormData(form);
    fetch(endpoint, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" }
    })
      .then(function (res) { return res.json().catch(function () { return {}; }); })
      .then(function (data) {
        if (data && data.success) {
          setStatus("Thanks! Your message is on its way - we usually reply within one business day.", "ok");
          form.reset();
        } else {
          setStatus((data && data.message) || "Could not send. Please try again.", "error");
        }
      })
      .catch(function () {
        setStatus("Network error. Please try again in a moment.", "error");
      })
      .then(function () {
        if (submitBtn) submitBtn.disabled = false;
      });
  });
})();
