/* ==========================================================================
   FIT COLLEGE: POSTCODE -> CAREER ADVISOR ROUTING (lead capture)
   [KOOK] Vanilla JS, no dependencies. Needs js/advisor-data.js loaded first.

   Any <form data-advisor-form> on the page gets this behaviour:
     1. Validate + capture details (name, mobile, email, postcode, course)
     2. Look the postcode up -> advisor (falls back to the team link)
     3. Submit to HubSpot WITH the advisor attached (hidden fields)
     4. Swap the form for that advisor's booking calendar, prefilled

   Full spec: advisor-routing-handover.html
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- 1. Lookup ---------- */
  var index = null;
  function buildIndex() {
    index = {};
    var groups = window.FIT_POSTCODES_BY_ADVISOR || {};
    Object.keys(groups).forEach(function (id) {
      groups[id].split(' ').forEach(function (pc) { index[pc] = id; });
    });
  }

  /* Accepts "4558", " 4558 ", "800" (NT typed without the 0). */
  function normalisePostcode(raw) {
    var digits = String(raw || '').replace(/\D/g, '');
    if (digits.length === 3) digits = '0' + digits;
    return /^\d{4}$/.test(digits) ? digits : null;
  }

  /* Returns { id, advisor, matched } where matched=false means fallback. */
  function findAdvisor(rawPostcode) {
    if (!index) buildIndex();
    var pc = normalisePostcode(rawPostcode);
    var id = pc && index[pc];
    var all = window.FIT_ADVISORS || {};
    if (id && all[id]) return { id: id, advisor: all[id], matched: true, postcode: pc };
    return { id: '_fallback', advisor: all._fallback || { name: 'FIT College Career Advisor', meetingUrl: '' }, matched: false, postcode: pc };
  }

  /* ---------- 2. HubSpot submission ---------- */
  /* [KOOK] PRODUCTION: POST to the HubSpot Forms API v3
       https://api.hsforms.com/submissions/v3/integration/submit/{portalId}/{formGuid}
     body: { fields:[{name,value}...], context:{ hutk, pageUri, pageName } }
     - hutk = value of the "hubspotutk" cookie (ties the visit history to the contact)
     - Field names below are HubSpot INTERNAL names. "assigned_advisor" and
       "lead_context" are new custom contact properties (see handover doc).
     - hubspot_owner_id sets Contact owner directly; only sent once owner IDs
       are filled in data/advisors.csv.
     The SMS speed-to-lead workflow should trigger off this submission and
     can now personalise with {{ contact.assigned_advisor }}.
     DEMO: logs the payload and resolves, so the flow can be reviewed offline. */
  function submitToHubSpot(fields) {
    if (window.console) console.log('[demo] HubSpot submission payload', fields);
    return new Promise(function (resolve) { setTimeout(resolve, 450); });
  }

  /* ---------- 3. Booking calendar ---------- */
  /* HubSpot meetings pages accept ?embed=true plus prefill params, so the
     lead doesn't retype their details. [KOOK] confirm param names against
     the portal (firstname / lastname / email are the standard ones). */
  function meetingSrc(url, d) {
    var sep = url.indexOf('?') === -1 ? '?' : '&';
    return url + sep + 'embed=true' +
      '&firstname=' + encodeURIComponent(d.firstname) +
      '&lastname=' + encodeURIComponent(d.lastname) +
      '&email=' + encodeURIComponent(d.email);
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function renderResult(form, match, d) {
    var a = match.advisor;
    var type = form.getAttribute('data-form-type') || 'advisor';
    var who = match.matched ? a.firstName || a.name : 'a Career Advisor';
    var heading, intro;

    if (type === 'infopack') {
      heading = 'Your info pack is on its way, ' + esc(d.firstname);
      intro = match.matched
        ? 'Check your inbox in the next few minutes. Want to talk it through? <strong>' + esc(a.name) + '</strong> looks after your area. Grab a time below.'
        : 'Check your inbox in the next few minutes. Want to talk it through? Grab a time with one of our Career Advisors below.';
    } else {
      heading = match.matched
        ? 'You’re with ' + esc(a.name) + ', your local Career Advisor'
        : 'Thanks ' + esc(d.firstname) + ', let’s find you a time';
      intro = match.matched
        ? 'Pick a time that suits and ' + esc(who) + ' will call you then. Your details are already filled in.'
        : 'Pick a time below and one of our Career Advisors will call you.';
    }

    var calendar = a.meetingUrl
      ? '<iframe class="advisor-cal" title="Book a time with ' + esc(a.name) + '" src="' + esc(meetingSrc(a.meetingUrl, d)) + '" loading="lazy"></iframe>'
      : '<div class="img-slot img-slot--light advisor-cal--slot" role="img" aria-label="Placeholder: booking calendar">' +
          'HUBSPOT BOOKING CALENDAR<br><small>' + esc(a.name) + ' · [CONFIRM] meeting URL in data/advisors.csv</small></div>';

    var panel = document.createElement('div');
    panel.className = 'advisor-result';
    panel.setAttribute('data-advisor', match.id);
    panel.innerHTML =
      '<span class="advisor-result__tick" aria-hidden="true">✓</span>' +
      '<h3 tabindex="-1">' + heading + '</h3>' +
      '<p class="advisor-result__intro">' + intro + '</p>' +
      calendar +
      '<p class="small advisor-result__alt">Rather talk now? Call <a href="tel:1300887017"><strong>1300 887 017</strong></a>' +
      (match.matched ? ' and ask for ' + esc(who) : '') + '.</p>';

    var after = form.parentNode.querySelector('[data-hide-after-submit]');
    if (after) after.hidden = true;
    form.parentNode.replaceChild(panel, form);
    panel.querySelector('h3').focus();
  }

  /* ---------- 4. Wire up forms ---------- */
  function fieldVal(form, name) {
    var el = form.elements[name];
    return el ? String(el.value || '').trim() : '';
  }

  function setError(form, name, msg) {
    var el = form.elements[name];
    if (!el) return;
    var holder = el.closest('.field');
    var out = holder && holder.querySelector('.field__error');
    el.setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (out) out.textContent = msg || '';
  }

  function validate(form) {
    var ok = true;
    var checks = {
      firstname: function (v) { return v ? '' : 'Please add your first name'; },
      lastname: function (v) { return v ? '' : 'Please add your last name'; },
      email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Please check your email address'; },
      mobilephone: function (v) { return /^(\+?61|0)4\d{8}$/.test(v.replace(/[\s()-]/g, '')) ? '' : 'Please enter an Australian mobile, e.g. 0412 345 678'; },
      zip: function (v) { return normalisePostcode(v) ? '' : 'Please enter your 4-digit postcode'; }
    };
    var first = null;
    Object.keys(checks).forEach(function (name) {
      if (!form.elements[name]) return;
      var msg = checks[name](fieldVal(form, name));
      setError(form, name, msg);
      if (msg) { ok = false; if (!first) first = form.elements[name]; }
    });
    if (first) first.focus();
    return ok;
  }

  function onSubmit(e) {
    e.preventDefault();
    var form = e.target;
    if (!validate(form)) return;

    var d = {
      firstname: fieldVal(form, 'firstname'),
      lastname: fieldVal(form, 'lastname'),
      email: fieldVal(form, 'email'),
      mobilephone: fieldVal(form, 'mobilephone'),
      zip: fieldVal(form, 'zip'),
      course_interest: fieldVal(form, 'course_interest')
    };
    var match = findAdvisor(d.zip);
    var params = new URLSearchParams(location.search);

    var fields = [
      { name: 'firstname', value: d.firstname },
      { name: 'lastname', value: d.lastname },
      { name: 'email', value: d.email },
      { name: 'mobilephone', value: d.mobilephone },
      { name: 'zip', value: match.postcode || d.zip },
      { name: 'course_interest', value: d.course_interest },
      { name: 'assigned_advisor', value: match.advisor.name },
      { name: 'lead_form_type', value: form.getAttribute('data-form-type') || 'advisor' },
      { name: 'lead_context', value: params.get('from') || '' }
    ];
    if (match.advisor.hubspotOwnerId) fields.push({ name: 'hubspot_owner_id', value: match.advisor.hubspotOwnerId });

    var btn = form.querySelector('button[type="submit"]');
    if (btn) { btn.disabled = true; btn.textContent = 'Finding your advisor…'; }

    submitToHubSpot(fields).then(function () {
      renderResult(form, match, d);
    }, function () {
      /* [KOOK] On API failure still show the calendar: the meeting booking
         itself creates the contact in HubSpot, so the lead isn't lost. */
      renderResult(form, match, d);
    });
  }

  function init() {
    var forms = document.querySelectorAll('form[data-advisor-form]');
    Array.prototype.forEach.call(forms, function (f) {
      f.addEventListener('submit', onSubmit);
      /* Clear a field's error as soon as the person starts fixing it */
      f.addEventListener('input', function (e) {
        if (e.target.name && e.target.getAttribute('aria-invalid') === 'true') setError(f, e.target.name, '');
      });
    });
  }

  /* Exposed for testing in the console: FITAdvisorRouter.findAdvisor('4558') */
  window.FITAdvisorRouter = { findAdvisor: findAdvisor, normalisePostcode: normalisePostcode };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
