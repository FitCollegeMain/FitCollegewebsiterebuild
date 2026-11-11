/* ==========================================================================
   FIT COLLEGE: LEAD CAPTURE + CAREER ADVISOR ROUTING
   [KOOK] Vanilla JS, no dependencies. Load js/advisor-data.js first.

   Drop <div data-lead-flow></div> on a page and this script runs a
   two-screen flow inside it. There is ONE form: every submission gets
   the info pack for its course and becomes a lead.


     SCREEN 1  The HubSpot form: every detail on one screen (name, email,
               mobile, course, where they live -> postcode or country,
               consent, reCAPTCHA). Context (source page, UTMs) goes in as
               hidden fields; the course is preselected from the page the
               lead came from.
     SCREEN 2  On HubSpot's submission-success event: "Your info pack is
               on its way" + "Tess will be in touch within 1 business
               day", with two options: book a time now (Tess's HubSpot
               calendar) or call now.

   Routing (who the advisor is) is worked out in the browser from the
   submitted values and js/advisor-data.js, so screen 2 is instant
   (HubSpot's own owner assignment lags ~6 minutes).
   Full spec: advisor-routing-deck.html
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- HubSpot config ----------
     [KOOK] Set portalId + formId. editor: 'new' (current HubSpot form
     editor) or 'legacy'. While portalId is blank the prototype shows a
     STAND-IN that mirrors the HubSpot form spec field for field. */
  var HS = Object.assign({ region: 'ap1', portalId: '', formId: '', editor: 'new', bookingMode: 'embed' }, window.FIT_HUBSPOT || {});
  /* bookingMode: 'embed' shows the advisor's calendar in the page;
     'link' opens their HubSpot booking page in a new tab instead. */

  var PHONE = '1300 887 017', PHONE_TEL = '1300887017';
  var RESPONSE_PROMISE = 'within 1 business day';

  /* Page slug -> course label (must match data/course-routing.csv).
     Used to preselect the course from the page the lead came from. */
  var COURSE_BY_PAGE = {
    'course-fit-elite': 'FIT Elite™ Dual-Career PT Program',
    'course-cert-iii': 'Cert III in Fitness',
    'course-cert-iv': 'Cert IV in Fitness',
    'course-diploma-sport': 'Diploma of Sport (Coaching)',
    'course-strength-conditioning': 'Strength & Conditioning',
    'course-short-courses': 'CEC Short Courses',
    'course-disability-support': 'Disability Support Skill Set',
    'course-tae': 'Cert IV in Training & Assessment',
    'course-tae-upgrade': 'TAE Upgrade (TAE40116 to TAE40122)',
    'course-first-aid': 'First Aid / CPR',
    'course-cpr': 'First Aid / CPR',
    'course-cert-iii-travel': 'Cert III in Travel',
    'course-international': 'International Student Pathways',
    'funding': 'Cert III in Fitness'
  };

  /* ======================================================================
     1. ROUTING (who screen 2 shows)
     ====================================================================== */
  var index = null;
  function buildIndex() {
    index = {};
    var groups = window.FIT_POSTCODES_BY_ADVISOR || {};
    Object.keys(groups).forEach(function (id) {
      groups[id].split(' ').forEach(function (pc) { index[pc] = id; });
    });
  }
  function normalisePostcode(raw) {
    var digits = String(raw || '').replace(/\D/g, '');
    if (digits.length === 3) digits = '0' + digits;
    return /^\d{4}$/.test(digits) ? digits : null;
  }
  function courseRoute(course) {
    var r = window.FIT_COURSE_ROUTING || {};
    if (!course || course === 'Not sure yet') return 'postcode';
    return Object.prototype.hasOwnProperty.call(r, course) ? r[course] : (r['*unlisted*'] || 'postcode');
  }
  function isOverseas(v) {
    var w = String(v.where_do_you_live || '').toLowerCase();
    if (w) return w.indexOf('outside') > -1;
    return !!v.country && !/^australia$/i.test(v.country);
  }

  /* Rules, first match wins:
       1 non-fitness course            -> course owner (Shay Best)
       2 lives outside Australia       -> *overseas* owner
       3 postcode in POSTCODE MASTER   -> that advisor
       4 anything else                 -> team fallback (lead_routing=unmatched) */
  function route(v) {
    if (!index) buildIndex();
    var all = window.FIT_ADVISORS || {}, id, how;
    var pc = normalisePostcode(v.zip);
    var c = courseRoute(v.course_interest);
    if (c !== 'postcode') { id = c; how = 'course'; }
    else if (isOverseas(v)) { id = (window.FIT_COURSE_ROUTING || {})['*overseas*'] || '_fallback'; how = 'overseas'; }
    else if (pc && index[pc]) { id = index[pc]; how = 'postcode'; }
    else { id = '_fallback'; how = 'unmatched'; }
    if (!all[id]) id = '_fallback';
    return {
      id: id, routing: how, postcode: pc,
      advisor: all[id] || { name: 'FIT College Career Advisor', firstName: '', meetingUrl: '' },
      matched: id !== '_fallback'
    };
  }

  /* ======================================================================
     2. CONTEXT: where the lead came from
     ====================================================================== */
  function pageSlug(url) {
    try { return new URL(url, location.href).pathname.split('/').pop().replace(/\.html?$/, ''); } catch (e) { return ''; }
  }
  /* The page on OUR site they clicked through from (document.referrer when
     same-site). HubSpot already records original source + first page seen
     via its tracking cookie; this adds the page they converted from. */
  function sourcePage() {
    var r = document.referrer || '';
    try { if (r && new URL(r).host === location.host) return r; } catch (e) { /* ignore */ }
    return '';
  }
  function context(root) {
    var p = new URLSearchParams(location.search);
    var src = (root && root.getAttribute('data-source-page')) || sourcePage();
    var ctx = {
      lead_source_page: src || location.href,
      lead_context: (root && root.getAttribute('data-context')) || p.get('from') || ''
    };
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'].forEach(function (k) {
      if (p.get(k)) ctx[k] = p.get(k);
    });
    return ctx;
  }
  function presetCourse(root) {
    var p = new URLSearchParams(location.search);
    return root.getAttribute('data-course') || p.get('course') ||
      COURSE_BY_PAGE[pageSlug(root.getAttribute('data-source-page') || sourcePage())] || '';
  }

  /* ======================================================================
     3. HELPERS
     ====================================================================== */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function track(event, data) {
    /* [KOOK] GTM dataLayer -> GA4. Conversions: lead_submitted,
       advisor_meeting_booked, advisor_call_clicked. */
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: event }, data || {}));
  }
  var uid = 0;

  /* ======================================================================
     4. SCREEN 1: the HubSpot form
     ====================================================================== */
  function renderScreen1(root, state) {
    root.innerHTML = '<div class="hs-form-slot"></div>';
    var slot = root.firstChild;
    var preset = Object.assign({}, state.ctx);
    if (state.course) preset.course_interest = state.course;
    var done = function (values) { renderScreen2(root, state, Object.assign({}, state.ctx, values || {})); };
    if (HS.portalId && HS.formId) mountHubSpot(slot, preset, done);
    else mountStandIn(slot, state, done);
  }

  /* ---------- 4a. Real HubSpot embed ----------
     [KOOK] VERIFY method and event names against HubSpot's current
     developer docs (they could not be checked from the prototype
     environment). Both editors are covered. */
  function mountHubSpot(slot, preset, onSuccess) {
    if (HS.editor === 'legacy') {
      loadScript('https://js-' + HS.region + '.hsforms.net/forms/embed/v2.js', function () {
        if (!slot.id) slot.id = 'hs-slot-' + (++uid);
        window.hbspt.forms.create({
          region: HS.region, portalId: HS.portalId, formId: HS.formId, target: '#' + slot.id,
          onFormReady: function (form) {
            var el = form.jquery ? form[0] : form;
            Object.keys(preset).forEach(function (k) {
              var input = el.querySelector('[name="' + k + '"]');
              if (input && !input.value) { input.value = preset[k]; input.dispatchEvent(new Event('change', { bubbles: true })); }
            });
          },
          /* Legacy forms render in the page, so routing can also be written
             into hidden fields before submit. */
          onBeforeFormSubmit: function (form, data) {
            var el = form.jquery ? form[0] : form, v = {};
            (data || []).forEach(function (f) { v[f.name] = f.value; });
            var m = route(v);
            [['assigned_advisor', m.advisor.name], ['lead_routing', m.routing]].forEach(function (pair) {
              var input = el.querySelector('[name="' + pair[0] + '"]');
              if (input) input.value = pair[1];
            });
          },
          onFormSubmitted: function (form, data) {
            var v = {}, sv = (data && data.submissionValues) || {};
            Object.keys(sv).forEach(function (k) { v[k] = sv[k]; });
            onSuccess(v);
          }
        });
      });
      return;
    }
    slot.innerHTML = '<div class="hs-form-frame" data-region="' + HS.region + '" data-form-id="' + HS.formId + '" data-portal-id="' + HS.portalId + '"></div>';
    function formFrom(e) { return window.HubSpotFormsV4 && window.HubSpotFormsV4.getFormFromEvent(e); }
    function onReady(e) {
      var form = formFrom(e); if (!form) return;
      Object.keys(preset).forEach(function (k) { form.setFieldValue('0-1/' + k, preset[k]); }); /* 0-1 = contact */
    }
    function onSubmit(e) {
      var form = formFrom(e); if (!form) return;
      window.removeEventListener('hs-form-event:on-ready', onReady);
      window.removeEventListener('hs-form-event:on-submission:success', onSubmit);
      Promise.resolve(form.getFormFieldValues()).then(function (fields) {
        var v = {};
        (fields || []).forEach(function (f) { v[String(f.name).replace(/^0-1\//, '')] = f.value; });
        onSuccess(v);
      }, function () { onSuccess({}); });
    }
    window.addEventListener('hs-form-event:on-ready', onReady);
    window.addEventListener('hs-form-event:on-submission:success', onSubmit);
    loadScript('https://js-' + HS.region + '.hsforms.net/forms/embed/' + HS.portalId + '.js', function () {});
  }
  function loadScript(src, cb) {
    var s = document.querySelector('script[src="' + src + '"]');
    if (s) { if (window.hbspt || window.HubSpotFormsV4) cb(); else s.addEventListener('load', cb); return; }
    s = document.createElement('script'); s.src = src; s.defer = true; s.onload = cb; document.head.appendChild(s);
  }

  /* ---------- 4b. Prototype stand-in (only while portalId is blank) ----------
     Mirrors the HubSpot form spec (deck slide 8) so the flow can be
     reviewed end to end. Not for production. */
  function mountStandIn(slot, state, onSuccess) {
    var n = ++uid;
    var courses = Object.keys(window.FIT_COURSE_ROUTING || {}).filter(function (k) { return k.charAt(0) !== '*'; });
    var hiddenCount = Object.keys(state.ctx).length + 2;
    slot.innerHTML =
      '<form class="lead-form hs-standin" novalidate>' +
        '<p class="hs-standin__tag">Prototype stand-in for the HubSpot form · ' + hiddenCount + ' hidden fields</p>' +
        field('firstname', 'First name*', '<input id="sf-firstname-' + n + '" name="firstname" autocomplete="given-name">') +
        field('lastname', 'Last name*', '<input id="sf-lastname-' + n + '" name="lastname" autocomplete="family-name">') +
        field('email', 'Email*', '<input id="sf-email-' + n + '" name="email" type="email" autocomplete="email">', true) +
        field('mobilephone', 'Mobile*', '<div class="phone-row"><select aria-label="Country code" name="cc"><option value="+61">AU +61</option><option value="+64">NZ +64</option><option value="+44">UK +44</option><option value="+353">IE +353</option><option value="+91">IN +91</option><option value="+63">PH +63</option><option value="+27">ZA +27</option><option value="+1">US/CA +1</option><option value="">Other</option></select>' +
          '<input id="sf-mobilephone-' + n + '" name="mobilephone" type="tel" autocomplete="tel-national"></div>', true) +
        field('course_interest', 'Course you’re interested in*',
          '<select id="sf-course_interest-' + n + '" name="course_interest">' + courses.map(function (c) {
            return '<option' + (c === (state.course || 'Not sure yet') ? ' selected' : '') + '>' + esc(c) + '</option>';
          }).join('') + '</select>', true) +
        field('where_do_you_live', 'Where do you live?*', '<select id="sf-where_do_you_live-' + n + '" name="where_do_you_live"><option>Australia</option><option>Outside Australia</option></select>') +
        '<div class="field" data-dep="au">' +
          '<label for="sf-zip-' + n + '">Postcode*</label><input id="sf-zip-' + n + '" name="zip" inputmode="numeric" autocomplete="postal-code" maxlength="4" placeholder="e.g. 4558">' +
          '<span class="field__error" aria-live="polite"></span></div>' +
        '<div class="field" data-dep="os" hidden>' +
          '<label for="sf-country-' + n + '">Country*</label><input id="sf-country-' + n + '" name="country" autocomplete="country-name">' +
          '<span class="field__error" aria-live="polite"></span></div>' +
        '<p class="consent">By submitting, you agree FIT College may contact you about study options by phone, SMS and email. See our <a href="privacy.html">Privacy Policy</a>.</p>' +
        '<p class="hs-standin__captcha">Protected by reCAPTCHA (HubSpot form setting)</p>' +
        '<button type="submit" class="btn btn--primary">Send me my info pack</button>' +
      '</form>';

    var f = slot.querySelector('form');
    var where = f.elements.where_do_you_live;
    /* HubSpot equivalent: conditional logic on "Where do you live?" */
    where.addEventListener('change', function () {
      var os = where.value === 'Outside Australia';
      f.querySelector('[data-dep="au"]').hidden = os;
      f.querySelector('[data-dep="os"]').hidden = !os;
    });
    f.addEventListener('input', function (e) { if (e.target.getAttribute('aria-invalid') === 'true') clearErr(e.target); });
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = {}, err = [];
      ['firstname', 'lastname', 'email', 'mobilephone', 'course_interest', 'where_do_you_live', 'zip', 'country'].forEach(function (k) {
        v[k] = f.elements[k].value.trim();
      });
      var os = v.where_do_you_live === 'Outside Australia';
      if (!v.firstname) err.push(['firstname', 'Please add your first name']);
      if (!v.lastname) err.push(['lastname', 'Please add your last name']);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) err.push(['email', 'Please check your email address']);
      if (v.mobilephone.replace(/\D/g, '').length < 8) err.push(['mobilephone', 'Please check your mobile number']);
      if (!os && !/^\d{4}$/.test(v.zip)) err.push(['zip', 'Please enter your 4-digit postcode']);
      if (os && !v.country) err.push(['country', 'Please tell us which country you live in']);
      err.forEach(function (x) { showErr(f.elements[x[0]], x[1]); });
      if (err.length) { f.elements[err[0][0]].focus(); return; }
      if (os) v.zip = ''; else v.country = 'Australia';
      v.mobilephone = f.elements.cc.value + ' ' + v.mobilephone;
      var m = route(v);
      var payload = Object.assign({}, v, state.ctx, { assigned_advisor: m.advisor.name, lead_routing: m.routing });
      if (window.console) console.log('[stand-in] HubSpot submission ' + JSON.stringify(payload));
      var btn = f.querySelector('button[type=submit]'); btn.disabled = true; btn.textContent = 'Sending…';
      setTimeout(function () { onSuccess(v); }, 400);
    });

    function field(name, label, control, full) {
      return '<div class="field' + (full ? ' field--full' : '') + '"><label for="sf-' + name + '-' + n + '">' + label + '</label>' + control +
        '<span class="field__error" aria-live="polite"></span></div>';
    }
  }
  function showErr(input, msg) {
    var out = input.closest('.field').querySelector('.field__error');
    input.setAttribute('aria-invalid', 'true'); if (out) out.textContent = msg;
  }
  function clearErr(input) {
    var out = input.closest('.field').querySelector('.field__error');
    input.setAttribute('aria-invalid', 'false'); if (out) out.textContent = '';
  }

  /* ======================================================================
     5. SCREEN 2: in touch within 1 business day + book / call options
     ====================================================================== */
  function meetingSrc(url, v) {
    var sep = url.indexOf('?') === -1 ? '?' : '&';
    return url + sep + 'embed=true' +
      (v.firstname ? '&firstname=' + encodeURIComponent(v.firstname) : '') +
      (v.lastname ? '&lastname=' + encodeURIComponent(v.lastname) : '') +
      (v.email ? '&email=' + encodeURIComponent(v.email) : '');
  }

  function bookingPageUrl(url, v) {
    return meetingSrc(url, v).replace('?embed=true&', '?').replace('?embed=true', '');
  }

  /* The advisor's contact card. Comes from js/advisor-data.js, so it shows
     instantly: HubSpot's own owner assignment lags by ~6 minutes. */
  function advisorCard(m, a) {
    var phone = a.phone || PHONE, tel = a.phoneTel || PHONE_TEL;
    var email = a.email || 'info@fitcollege.edu.au';
    var initials = m.matched ? a.name.split(' ').map(function (p) { return p.charAt(0); }).join('').slice(0, 2) : 'FC';
    var role = !m.matched ? 'FIT College Career Advisors'
      : m.routing === 'course' ? 'Your Career Advisor for this course' : 'Your local Career Advisor';
    return '<div class="advisor-card">' +
        '<span class="advisor-card__avatar" aria-hidden="true">' + esc(initials) + '</span>' +
        '<div class="advisor-card__body">' +
          '<strong class="advisor-card__name">' + esc(m.matched ? a.name : 'Career Advisor team') + '</strong>' +
          '<span class="advisor-card__role">' + role + '</span>' +
          '<span class="advisor-card__contact">' +
            '<a href="tel:' + esc(tel) + '" data-call>' + esc(phone) + '</a>' +
            '<a href="mailto:' + esc(email) + '" data-email>' + esc(email) + '</a>' +
          '</span>' +
        '</div>' +
      '</div>';
  }

  function renderScreen2(root, state, v) {
    var m = route(v), a = m.advisor;
    var who = m.matched ? (a.firstName || a.name) : 'our team';
    var info = { lead_routing: m.routing, assigned_advisor: a.name };
    track('lead_submitted', info);
    /* Page-level hook: listen for 'fit:lead' on the container. */
    root.dispatchEvent(new CustomEvent('fit:lead', { bubbles: true, detail: {
      values: Object.assign({}, v, { assigned_advisor: a.name, lead_routing: m.routing }), advisor: a, routing: m.routing } }));

    var name = v.firstname ? ', ' + esc(v.firstname) : '';
    var heading = 'Thanks' + name + ', your info pack is on its way';
    var pack = (!v.course_interest || v.course_interest === 'Not sure yet') ? 'our course guide' : 'the ' + esc(v.course_interest) + ' info pack';
    var promise = m.matched
      ? '<strong>' + esc(a.name) + '</strong>, ' + (m.routing === 'course' ? 'who looks after ' + esc(v.course_interest) + ',' : 'your local Career Advisor,') + ' will be in touch <strong>' + RESPONSE_PROMISE + '</strong>.'
      : 'One of our Career Advisors will be in touch <strong>' + RESPONSE_PROMISE + '</strong>.';
    promise = 'Check your inbox for ' + pack + '. ' + promise;

    root.innerHTML =
      '<div class="advisor-result" data-advisor="' + esc(m.id) + '" data-routing="' + esc(m.routing) + '">' +
        '<span class="advisor-result__tick" aria-hidden="true">✓</span>' +
        '<h3 tabindex="-1">' + heading + '</h3>' +
        '<p class="advisor-result__intro">' + promise + '</p>' +
        advisorCard(m, a) +
        '<p class="advisor-result__or">Don’t want to wait?</p>' +
        '<div class="next-options">' +
          (a.meetingUrl
            ? (HS.bookingMode === 'link'
              ? '<a class="next-option next-option--book" href="' + esc(bookingPageUrl(a.meetingUrl, v)) + '" target="_blank" rel="noopener" data-book-link>'
              : '<button type="button" class="next-option next-option--book" data-book aria-expanded="false">') +
                '<span class="next-option__icon" aria-hidden="true">📅</span><strong>Book a time now</strong>' +
                '<span>Pick a time in ' + (m.matched ? esc(who) + '’s' : 'our') + ' calendar</span>' +
              (HS.bookingMode === 'link' ? '</a>' : '</button>')
            : '') +
          '<a class="next-option next-option--call" href="tel:' + esc(a.phoneTel || PHONE_TEL) + '" data-call>' +
            '<span class="next-option__icon" aria-hidden="true">☎</span><strong>' + (m.matched ? 'Call ' + esc(who) + ' now' : 'Call us now') + '</strong>' +
            '<span>' + esc(a.phone || PHONE) + '</span></a>' +
        '</div>' +
        '<div class="advisor-cal-wrap" hidden></div>' +
      '</div>';

    var h = root.querySelector('h3'); h.focus();
    var after = root.parentNode && root.parentNode.querySelector('[data-hide-after-submit]');
    if (after) after.hidden = true;

    var book = root.querySelector('[data-book]');
    if (book) book.addEventListener('click', function () {
      var wrap = root.querySelector('.advisor-cal-wrap');
      if (!wrap.firstChild) {
        wrap.innerHTML = '<iframe class="advisor-cal" title="Book a time with ' + esc(a.name) + '" src="' + esc(meetingSrc(a.meetingUrl, v)) + '"></iframe>' +
          '<p class="small advisor-result__alt">No times showing? Call <a href="tel:' + PHONE_TEL + '"><strong>' + PHONE + '</strong></a>.</p>';
        track('advisor_book_opened', info);
      }
      wrap.hidden = !wrap.hidden;
      book.setAttribute('aria-expanded', wrap.hidden ? 'false' : 'true');
      if (!wrap.hidden) wrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    var bl = root.querySelector('[data-book-link]');
    if (bl) bl.addEventListener('click', function () { track('advisor_book_opened', info); });
    Array.prototype.forEach.call(root.querySelectorAll('[data-call]'), function (el) {
      el.addEventListener('click', function () { track('advisor_call_clicked', info); });
    });
    var em = root.querySelector('[data-email]');
    if (em) em.addEventListener('click', function () { track('advisor_email_clicked', info); });
  }

  /* HubSpot's meetings embed posts a message when a booking completes.
     [KOOK] confirm the payload key in the live embed. */
  window.addEventListener('message', function (e) {
    if (!/hubspot\.com$/.test((e.origin || '').replace(/:\d+$/, ''))) return;
    if (e.data && e.data.meetingBookSucceeded) track('advisor_meeting_booked', {});
  });

  /* ======================================================================
     6. BOOT
     ====================================================================== */
  function mount(root) {
    renderScreen1(root, { course: presetCourse(root), ctx: context(root) });
  }
  function init() {
    if (window.FIT_NO_AUTO_MOUNT) return;
    Array.prototype.forEach.call(document.querySelectorAll('[data-lead-flow]'), mount);
  }

  /* Console testing: FITAdvisorRouter.route({zip:'4558', course_interest:'Cert IV in Fitness'}) */
  window.FITAdvisorRouter = { route: route, normalisePostcode: normalisePostcode, mount: mount };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
