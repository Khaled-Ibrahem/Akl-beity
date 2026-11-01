(() => {
  const data = window.AKL_BEIT;
  const waHref = () => data.contact.whatsapp ? `https://wa.me/${data.contact.whatsapp}` : "#contact";
  const formsScript = document.createElement("script");
  formsScript.src = "https://cdn.formsapp.io/embed.js";
  formsScript.async = true;
  formsScript.defer = true;
  formsScript.onload = () => {
    if (typeof window.formsapp !== "function") return;
    new window.formsapp(data.formsApp.formId, data.formsApp.layout, data.formsApp.options, data.formsApp.responseUrl);
    window.AKL_BEIT_FORMS_READY = true;
  };
  document.body.appendChild(formsScript);
  document.querySelectorAll(".wa-link").forEach(a => { a.href = waHref(); if (!data.contact.whatsapp) a.addEventListener("click", e => { e.preventDefault(); document.querySelector("#contact").scrollIntoView({ behavior: "smooth" }); }); });
  document.querySelectorAll(".social-link").forEach((a, i) => { const url = i === 0 ? data.contact.instagram : data.contact.facebook; if (url) a.href = url; else { a.href = "#contact"; a.addEventListener("click", e => { e.preventDefault(); document.querySelector("#contact").scrollIntoView({ behavior: "smooth" }); }); } });
  document.querySelectorAll(".location").forEach(el => { el.lastChild.textContent = ` ${data.contact.serviceArea}`; });
  document.querySelector("#year").textContent = new Date().getFullYear();

  document.querySelector("#faq-list").innerHTML = data.faqs.map((faq, i) => `<article class="faq-item ${i === 0 ? "open" : ""}"><button class="faq-question" aria-expanded="${i === 0}" aria-controls="faq-answer-${i}"><span class="faq-count">0${i + 1}</span><span>${faq.question}</span><span class="faq-plus">${i === 0 ? "−" : "+"}</span></button><div class="faq-answer" id="faq-answer-${i}" ${i === 0 ? "" : "hidden"}><p>${faq.answer}</p></div></article>`).join("");
  document.querySelectorAll(".faq-question").forEach(button => button.addEventListener("click", () => { const item = button.closest(".faq-item"); const open = item.classList.toggle("open"); button.setAttribute("aria-expanded", String(open)); button.querySelector(".faq-plus").textContent = open ? "−" : "+"; item.querySelector(".faq-answer").hidden = !open; }));

  const toggle = document.querySelector(".menu-toggle"), nav = document.querySelector(".main-nav");
  toggle.addEventListener("click", () => { const open = toggle.getAttribute("aria-expanded") !== "true"; toggle.setAttribute("aria-expanded", String(open)); nav.classList.toggle("nav-open", open); document.body.classList.toggle("nav-active", open); });
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => { toggle.setAttribute("aria-expanded", "false"); nav.classList.remove("nav-open"); document.body.classList.remove("nav-active"); }));

  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }), { threshold: .12 });
  document.querySelectorAll(".problem-card,.step,.promise-list article,.faq-item,.solution-photo,.weekly-flex").forEach(el => observer.observe(el));
})();
