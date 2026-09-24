/* The inquiry stays in memory until a visitor opens, copies or downloads it. */
(() => {
  'use strict';
  const form = document.querySelector('#booking-form');
  if (!form || !window.SociallyInquiry) return;

  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const stages = [...form.querySelectorAll('[data-booking-step]')];
  const service = form.querySelector('#booking-service');
  const needFields = [...form.querySelectorAll('[name="need"]')];
  const needs = form.querySelector('#booking-needs');
  const packageNotice = form.querySelector('#booking-package');
  const packageName = form.querySelector('#booking-package-name');
  const status = form.querySelector('#booking-status');
  const resultStatus = form.querySelector('#inquiry-status');
  const emailLink = form.querySelector('#email-inquiry');
  const download = form.querySelector('#download-inquiry');
  const copyFallback = form.querySelector('#inquiry-copy-fallback');
  const output = form.querySelector('#inquiry-text');
  const fields = {
    message: form.querySelector('#booking-message'),
    name: form.querySelector('#booking-name'),
    email: form.querySelector('#booking-email')
  };
  const packageNeeds = {
    'Curated Content': 'Content creation',
    'Curated Growth': 'Content creation',
    'Curated Management': 'Social media management',
    'The Moment Edit': 'Event content',
    'The Event Edit': 'Event content',
    'The Fully Curated': 'Event content',
    'A custom package': 'Not sure yet'
  };
  let currentStep = 0;
  let downloadURL;
  let preparedBody = '';

  function clearDraft() {
    if (downloadURL) URL.revokeObjectURL(downloadURL);
    downloadURL = null;
    preparedBody = '';
    emailLink.removeAttribute('href');
    download.removeAttribute('href');
    copyFallback.hidden = true;
    output.value = '';
    resultStatus.textContent = 'Nothing has been sent yet.';
  }

  function showStep(index, focus = true) {
    currentStep = index;
    stages.forEach((stage, position) => { stage.hidden = position !== index; });
    if (focus) {
      form.scrollIntoView({ behavior: reduce.matches ? 'auto' : 'smooth', block: 'start' });
      stages[index].querySelector('h3').focus({ preventScroll: true });
    }
  }

  function errorFor(key) {
    const value = fields[key].value.trim();
    if (key === 'name' && !value) return 'Please enter your name.';
    if (key === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Add a valid email address, like you@example.com.';
    if (key === 'message' && value.length < 10) return 'Please describe your project in at least 10 characters.';
    return '';
  }

  function showError(key, message) {
    const error = form.querySelector('#booking-' + key + '-error');
    error.textContent = message;
    error.hidden = !message;
    if (message) fields[key].setAttribute('aria-invalid', 'true');
    else fields[key].removeAttribute('aria-invalid');
  }

  function validate() {
    const invalid = [];
    Object.keys(fields).forEach(key => {
      const message = errorFor(key);
      showError(key, message);
      if (message) invalid.push(fields[key]);
    });
    if (!invalid.length) { status.textContent = ''; return true; }
    status.textContent = 'Please check ' + invalid.length + (invalid.length === 1 ? ' field.' : ' fields.');
    invalid[0].focus();
    return false;
  }

  function setService(value) {
    const recognized = SociallyInquiry.services.includes(value) ? value : 'Not sure yet';
    service.value = recognized;
    const category = packageNeeds[recognized] || recognized;
    needFields.forEach(input => { input.checked = input.value === category; });
    const isPackage = Object.prototype.hasOwnProperty.call(packageNeeds, recognized);
    packageNotice.hidden = !isPackage;
    needs.hidden = isPackage;
    packageName.textContent = isPackage ? recognized : '';
    clearDraft();
  }

  needFields.forEach(input => input.addEventListener('change', () => setService(input.value)));
  form.querySelector('#booking-change-package').addEventListener('click', () => {
    const category = packageNeeds[service.value] || 'Not sure yet';
    setService(category);
    needFields.find(input => input.checked)?.focus();
  });

  form.querySelectorAll('[data-booking-back]').forEach(button => button.addEventListener('click', () => {
    clearDraft();
    showStep(Number(button.dataset.bookingBack));
  }));

  form.addEventListener('input', event => {
    clearDraft();
    const key = event.target.name;
    if (Object.prototype.hasOwnProperty.call(fields, key) && fields[key].hasAttribute('aria-invalid')) showError(key, errorFor(key));
  });
  form.addEventListener('change', clearDraft);

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (currentStep !== 0 || !validate()) return;
    const data = Object.fromEntries(new FormData(form));
    const prepared = SociallyInquiry.prepare(data);
    clearDraft();
    preparedBody = prepared.body;
    output.value = prepared.body;
    emailLink.href = prepared.href;
    downloadURL = URL.createObjectURL(new Blob([prepared.body], { type: 'text/plain;charset=utf-8' }));
    download.href = downloadURL;
    const review = {
      name: data.name.trim(), email: data.email.trim(), brand: data.brand.trim() || 'Not specified',
      service: data.service, timing: data.timing, message: data.message.trim()
    };
    Object.entries(review).forEach(([key, value]) => { form.querySelector('#review-' + key).textContent = value; });
    showStep(1);
  });

  form.querySelector('#copy-inquiry').addEventListener('click', async () => {
    if (!preparedBody) return;
    const body = preparedBody;
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(body);
      if (body !== preparedBody) return;
      resultStatus.textContent = 'Copied. Paste into an email to ' + SociallyInquiry.recipient + '.';
    } catch {
      if (body !== preparedBody) return;
      copyFallback.hidden = false;
      output.focus();
      output.select();
      resultStatus.textContent = 'Select Copy in your browser, or choose Download .txt.';
    }
  });

  // A package CTA retains its exact service; broad needs remain available via Change.
  document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    setService(link.dataset.service);
    if (location.hash !== '#book') history.pushState(null, '', '#book');
    showStep(0);
  }));

  window.addEventListener('pagehide', event => {
    if (!event.persisted) clearDraft();
  });
  form.hidden = false;
  document.querySelector('#booking-fallback').hidden = true;
  showStep(0, false);
})();
