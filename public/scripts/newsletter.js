(function () {
  var forms = document.querySelectorAll('form[data-newsletter]');
  forms.forEach(function (form) {
    var status = form.querySelector('[data-newsletter-status]');
    var submit = form.querySelector('button[type="submit"]');

    function setStatus(text, tone) {
      if (!status) return;
      status.textContent = text;
      status.className = "text-xs mt-2 " + (
        tone === "ok"    ? "text-emerald-600 font-medium" :
        tone === "error" ? "text-rose-600 font-medium" :
                           "text-slate-500"
      );
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      setStatus("Subscribing...", "info");
      if (submit) submit.disabled = true;

      var fd = new FormData(form);
      fetch("/api/subscribe", {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" }
      })
        .then(function (res) { return res.json().catch(function () { return {}; }); })
        .then(function (data) {
          if (data && data.success) {
            setStatus("Thanks! You're on the list.", "ok");
            form.reset();
          } else {
            setStatus((data && data.message) || "Could not subscribe. Try again.", "error");
          }
        })
        .catch(function () {
          setStatus("Network error. Please try again in a moment.", "error");
        })
        .then(function () {
          if (submit) submit.disabled = false;
        });
    });
  });
})();
