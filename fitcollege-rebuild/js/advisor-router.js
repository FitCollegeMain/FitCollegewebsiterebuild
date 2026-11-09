/* ==========================================================================
   FIT COLLEGE: LEAD CAPTURE + CAREER ADVISOR ROUTING
   [KOOK] Vanilla JS, no dependencies. Load js/advisor-data.js first.

   Drop <div data-lead-flow data-form-type="advisor|infopack"></div> on any
   page and this script renders a three-step flow inside it:

     STEP 1 (our code)     Course + postcode (or "I live outside Australia").
                           Postcode checked against POSTCODE MASTER; advisor
                           shown immediately.
     STEP 2 (HubSpot)      The HubSpot form (name, email, mobile, consent,
                           reCAPTCHA). Step 1 answers go in as hidden fields.
     STEP 3 (our code)     On HubSpot's submission-success event, the matched
                           advisor's HubSpot booking calendar replaces the form.

   Full spec: advisor-routing-deck.html
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- HubSpot config ----------
     [KOOK] Fill in portalId + formId (one form serves both advisor and
     info-pack flows; lead_form_type tells them apart). editor = 'new' for
     forms built in HubSpot's current form editor, 'legacy' for the old one.
     While portalId is blank the prototype shows a STAND-IN form that
     behaves like HubSpot's, so the flow can be reviewed end to end. */
  var HS = Object.assign({ region: 'ap1', portalId: '', formId: '', editor: 'new' }, window.FIT_HUBSPOT || {});

  var PHONE = '1300 887 017';
  var COUNTRIES = ['New Zealand', 'United Kingdom', 'Ireland', 'India', 'Philippines', 'South Africa', 'Fiji',
    'Papua New Guinea', 'Nepal', 'Brazil', 'Colombia', 'Japan', 'South Korea', 'United States', 'Canada',
    'Singapore', 'Malaysia', 'Indonesia', 'Vietnam', 'Thailand', 'China', 'Hong Kong', 'Germany', 'France',
    'Italy', 'Spain', 'Netherlands', 'Chile', 'Argentina', 'Other'];

  /* ======================================================================
     1. ROUTING
     ====================================================================== */
  var index = null;
  function buildIndex() {
    index = {};
    var groups = window.FIT_POSTCODES_BY_ADVISOR || {};
    Object.keys(groups).forEach(function (id) {
      groups[id].split(' ').forEach(function (pc) { index[pc] = id; });
    });
  }

  /* "4558", " 4558 ", "800" (NT without the leading 0) -> "4558"/"0800" */
  function normalisePostcode(raw) {
    var digits = String(raw || '').replace(/\D/g, '');
    if (digits.length === 3) digits = '0' + digits;
    return /^\d{4}$/.test(digits) ? digits : null;
  }

  var STATE_BY_PREFIX = { '0': 'NT', '2': 'NSW', '3': 'VIC', '4': 'QLD', '5': 'SA', '6': 'WA', '7': 'TAS' };

  function courseRoute(course) {
    var r = window.FIT_COURSE_ROUTING || {};
    if (!course) return 'postcode';
    return Object.prototype.hasOwnProperty.call(r, course) ? r[course] : (r['*unlisted*'] || 'postcode');
  }

  /* Decide who gets the lead.
     Returns { id, advisor, routing, postcode, state, matched }
     routing: 'postcode' | 'course' | 'overseas' | 'unmatched' */
  function route(opts) {
    if (!index) buildIndex();
    var all = window.FIT_ADVISORS || {};
    var res = { postcode: null, state: '', country: 'Australia' };

    if (opts.overseas) {
      var oid = (window.FIT_COURSE_ROUTING || {})['*overseas*'] || '_fallback';
      res.country = opts.country || '';
      /* A non-fitness course still goes to its course owner from overseas */
      var cr = courseRoute(opts.course);
      if (cr !== 'postcode') oid = cr;
      return finish(res, oid, cr !== 'postcode' ? 'course' : 'overseas');
    }

    res.postcode = normalisePostcode(opts.postcode);
    var sheetId = res.postcode && index[res.postcode];
    res.state = (res.postcode && STATE_BY_PREFIX[res.postcode.charAt(0)]) || '';
    if (res.postcode && /^(02\d\d|260\d|261[0-8]|29[01]\d|2920)$/.test(res.postcode)) res.state = 'ACT';

    var c = courseRoute(opts.course);
    if (c !== 'postcode') return finish(res, c, 'course');
    if (sheetId) return finish(res, sheetId, 'postcode');
    return finish(res, '_fallback', 'unmatched');

    function finish(r, id, how) {
      r.id = all[id] ? id : '_fallback';
      r.advisor = all[r.id] || { name: 'FIT College Career Advisor', firstName: '', meetingUrl: '' };
      r.routing = how;
      r.matched = r.id !== '_fallback';
      r.inSheet = !!sheetId;
      return r;
    }
  }

  /* ======================================================================
     2. SMALL HELPERS
     ====================================================================== */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function track(event, data) {
    /* [KOOK] GA4 via GTM dataLayer. Mark lead_submitted and
       advisor_meeting_booked as conversions. */
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: event }, data || {}));
  }
  function utmParams() {
    var p = new URLSearchParams(location.search), out = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'].forEach(function (k) {
      if (p.get(k)) out[k] = p.get(k);
    });
    return out;
  }
  var uid = 0;

  /* ======================================================================
     3. STEP 1: course + postcode
     ====================================================================== */
  function renderStep1(root, state) {
    var n = ++uid, type = state.type;
    var courses = Object.keys(window.FIT_COURSE_ROUTING || {}).filter(function (k) { return k.charAt(0) !== '*'; });
    var opts = courses.map(function (c) {
      return '<option' + (c === state.course ? ' selected' : '') + '>' + esc(c) + '</option>';
    }).join('');

    root.innerHTML =
      '<form class="lead-form lead-step1" novalidate>' +
        '<p class="lead-stepper" aria-hidden="true"><b>1</b> Your area <span>2</span> Your details <span>3</span> ' + (type === 'infopack' ? 'Done' : 'Book') + '</p>' +
        '<div class="field field--full"><label for="lf-course-' + n + '">' + (type === 'infopack' ? 'Which course guide?' : 'What are you interested in?') + '</label>' +
          '<select id="lf-course-' + n + '" name="course">' + opts + '</select></div>' +
        '<div class="field field--full" data-au>' +
          '<label for="lf-pc-' + n + '">Your postcode <span class="hint">so we can match you with your local Career Advisor</span></label>' +
          '<input id="lf-pc-' + n + '" name="postcode" inputmode="numeric" autocomplete="postal-code" maxlength="4" value="' + esc(state.postcode || '') + '">' +
          '<span class="field__error" aria-live="polite"></span>' +
          '<span class="pc-match" aria-live="polite"></span>' +
          '<button type="button" class="linkish" data-toggle-overseas>I live outside Australia</button>' +
        '</div>' +
        '<div class="field field--full" data-os hidden>' +
          '<label for="lf-country-' + n + '">Country you live in</label>' +
          '<input id="lf-country-' + n + '" name="country" list="lf-countries-' + n + '" autocomplete="country-name" value="' + esc(state.country || '') + '">' +
          '<datalist id="lf-countries-' + n + '">' + COUNTRIES.map(function (c) { return '<option value="' + esc(c) + '">'; }).join('') + '</datalist>' +
          '<span class="field__error" aria-live="polite"></span>' +
          '<button type="button" class="linkish" data-toggle-overseas>I have an Australian postcode</button>' +
        '</div>' +
        '<button type="submit" class="btn btn--primary">Continue</button>' +
      '</form>';

    var form = root.querySelector('form');
    var au = form.querySelector('[data-au]'), os = form.querySelector('[data-os]');
    var pc = form.elements.postcode, country = form.elements.country, course = form.elements.course;
    var matchEl = form.querySelector('.pc-match');

    function setOverseas(on) {
      state.overseas = on; au.hidden = on; os.hidden = !on;
      (on ? country : pc).focus();
    }
    Array.prototype.forEach.call(form.querySelectorAll('[data-toggle-overseas]'), function (b) {
      b.addEventListener('click', function () { setOverseas(!state.overseas); });
    });
    if (state.overseas) { au.hidden = true; os.hidden = false; }

    function preview() {
      clearErr(pc);
      var v = pc.value.trim();
      if (normalisePostcode(v) === null || v.replace(/\D/g, '').length < 3) { matchEl.textContent = ''; matchEl.className = 'pc-match'; return; }
      var r = route({ postcode: v, course: course.value });
      if (r.routing === 'course') {
        matchEl.className = 'pc-match pc-match--ok';
        matchEl.innerHTML = esc(r.postcode) + (r.state ? ' · ' + r.state : '') + ' · <strong>' + esc(r.advisor.name) + '</strong> looks after ' + esc(course.value);
      } else if (r.inSheet) {
        matchEl.className = 'pc-match pc-match--ok';
        matchEl.innerHTML = esc(r.postcode) + ' · ' + esc(r.state) + ' · Your local Career Advisor is <strong>' + esc(r.advisor.name) + '</strong>';
      } else {
        matchEl.className = 'pc-match pc-match--warn';
        matchEl.textContent = 'We couldn’t match ' + r.postcode + ' to an area. Please check it, or continue and our advisor team will look after you.';
      }
    }
    pc.addEventListener('input', preview);
    course.addEventListener('change', preview);
    country.addEventListener('input', function () { clearErr(country); });
    if (state.postcode) preview();

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      state.course = course.value;
      if (state.overseas) {
        if (!country.value.trim()) return showErr(country, 'Please tell us which country you live in');
        state.country = country.value.trim(); state.postcode = '';
      } else {
        if (!normalisePostcode(pc.value)) return showErr(pc, 'Please enter your 4-digit postcode');
        state.postcode = pc.value.trim(); state.country = 'Australia';
      }
      state.match = route({ postcode: state.postcode, course: state.course, overseas: state.overseas, country: state.country });
      track('lead_step1_complete', { lead_form_type: type, lead_routing: state.match.routing, assigned_advisor: state.match.advisor.name });
      renderStep2(root, state);
    });
  }

  function showErr(input, msg) {
    var out = input.closest('.field').querySelector('.field__error');
    input.setAttribute('aria-invalid', 'true'); out.textContent = msg; input.focus();
  }
  function clearErr(input) {
    var out = input.closest('.field').querySelector('.field__error');
    input.setAttribute('aria-invalid', 'false'); if (out) out.textContent = '';
  }

  /* ======================================================================
     4. STEP 2: HubSpot form with hidden fields
     ====================================================================== */
  /* Hidden fields written into the HubSpot form. Names are HubSpot
     contact property INTERNAL names. [KOOK] add the promotion form's
     hidden fields here once confirmed (see deck: HubSpot form spec). */
  function hiddenFields(state) {
    var m = state.match, params = new URLSearchParams(location.search);
    return Object.assign({
      zip: m.postcode || '',
      state: m.state || '',
      country: m.country || '',
      course_interest: state.course === 'Not sure yet' ? '' : state.course,
      assigned_advisor: m.advisor.name,
      lead_routing: m.routing,
      lead_form_type: state.type,
      lead_context: params.get('from') || ''
    }, utmParams());
  }

  function renderStep2(root, state) {
    var m = state.match, a = m.advisor;
    var banner = m.matched
      ? 'Your Career Advisor: <strong>' + esc(a.name) + '</strong>'
      : 'You’ll be looked after by our <strong>Career Advisor team</strong>';
    var where = m.postcode ? esc(m.postcode) + (m.state ? ' ' + m.state : '') : esc(m.country);

    root.innerHTML =
      '<div class="lead-step2">' +
        '<p class="lead-stepper" aria-hidden="true"><span>1</span> Your area <b>2</b> Your details <span>3</span> ' + (state.type === 'infopack' ? 'Done' : 'Book') + '</p>' +
        '<div class="advisor-banner"><span>' + banner + '</span><span class="advisor-banner__meta">' + where + ' · ' + esc(state.course) +
          ' · <button type="button" class="linkish" data-back>Change</button></span></div>' +
        '<div class="hs-form-slot" tabindex="-1"></div>' +
      '</div>';
    root.querySelector('[data-back]').addEventListener('click', function () { renderStep1(root, state); });

    var slot = root.querySelector('.hs-form-slot');
    var hidden = hiddenFields(state);
    var onSuccess = function (values) { onSubmitted(root, state, values || {}); };

    if (HS.portalId && HS.formId) mountHubSpot(slot, hidden, onSuccess);
    else mountStandIn(slot, state, hidden, onSuccess);
    slot.focus();
  }

  /* ---------- 4a. Real HubSpot embed ----------
     [KOOK] VERIFY against HubSpot's current developer docs before go-live:
     these method/event names are written from HubSpot's documented APIs but
     could not be checked from the prototype environment. */
  function mountHubSpot(slot, hidden, onSuccess) {
    if (HS.editor === 'legacy') {
      /* Legacy forms: hbspt.forms.create with callbacks */
      loadScript('https://js-' + HS.region + '.hsforms.net/forms/embed/v2.js', function () {
        window.hbspt.forms.create({
          region: HS.region, portalId: HS.portalId, formId: HS.formId, target: '#' + ensureId(slot),
          onFormReady: function (form) {
            var el = form.jquery ? form[0] : form;
            Object.keys(hidden).forEach(function (k) {
              var input = el.querySelector('input[name="' + k + '"]');
              if (input) { input.value = hidden[k]; input.dispatchEvent(new Event('change', { bubbles: true })); }
            });
          },
          onFormSubmitted: function (form, data) {
            var v = {};
            ((data && data.submissionValues) ? Object.keys(data.submissionValues).map(function (k) { return { name: k, value: data.submissionValues[k] }; }) : [])
              .forEach(function (f) { v[f.name] = f.value; });
            onSuccess(v);
          }
        });
      });
      return;
    }
    /* New form editor: iframe-free embed + global events + HubSpotFormsV4 */
    slot.innerHTML = '<div class="hs-form-frame" data-region="' + HS.region + '" data-form-id="' + HS.formId + '" data-portal-id="' + HS.portalId + '"></div>';
    function onReady(e) {
      var form = window.HubSpotFormsV4 && window.HubSpotFormsV4.getFormFromEvent(e);
      if (!form || e.detail && e.detail.formId && e.detail.formId !== HS.formId) return;
      Object.keys(hidden).forEach(function (k) { form.setFieldValue('0-1/' + k, hidden[k]); }); /* 0-1 = contact object */
    }
    function onSubmit(e) {
      var form = window.HubSpotFormsV4 && window.HubSpotFormsV4.getFormFromEvent(e);
      if (!form) return;
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
    loadScript('https://js-' + HS.region + '.hsforms.net/forms/embed/' + HS.portalId + '.js', function () {}, true);
  }
  function ensureId(el) { if (!el.id) el.id = 'hs-slot-' + (++uid); return el.id; }
  function loadScript(src, cb, always) {
    var existing = document.querySelector('script[src="' + src + '"]');
    if (existing && !always) { if (window.hbspt || window.HubSpotFormsV4) cb(); else existing.addEventListener('load', cb); return; }
    var s = document.createElement('script'); s.src = src; s.defer = true; s.onload = cb; document.head.appendChild(s);
  }

  /* ---------- 4b. Prototype stand-in (only while portalId is blank) ----------
     Mirrors the HubSpot form spec field for field, so the flow can be
     reviewed without HubSpot access. Not for production. */
  function mountStandIn(slot, state, hidden, onSuccess) {
    var n = ++uid;
    slot.innerHTML =
      '<form class="lead-form hs-standin" novalidate>' +
        '<p class="hs-standin__tag">Prototype stand-in for the HubSpot form · ' + Object.keys(hidden).length + ' hidden fields attached</p>' +
        '<div class="field"><label for="s-f-' + n + '">First name*</label><input id="s-f-' + n + '" name="firstname" autocomplete="given-name"><span class="field__error"></span></div>' +
        '<div class="field"><label for="s-l-' + n + '">Last name*</label><input id="s-l-' + n + '" name="lastname" autocomplete="family-name"><span class="field__error"></span></div>' +
        '<div class="field field--full"><label for="s-e-' + n + '">Email*</label><input id="s-e-' + n + '" name="email" type="email" autocomplete="email"><span class="field__error"></span></div>' +
        '<div class="field field--full"><label for="s-m-' + n + '">Mobile*</label><div class="phone-row">' +
          '<select aria-label="Country code" name="cc"><option value="+61"' + (state.overseas ? '' : ' selected') + '>AU +61</option><option value="+64">NZ +64</option><option value="+44">UK +44</option><option value="+353">IE +353</option><option value="+91">IN +91</option><option value="+63">PH +63</option><option value="+27">ZA +27</option><option value="+1">US/CA +1</option><option value=""' + (state.overseas ? ' selected' : '') + '>Other</option></select>' +
          '<input id="s-m-' + n + '" name="mobilephone" type="tel" autocomplete="tel-national"></div><span class="field__error"></span></div>' +
        '<p class="consent">By submitting, you agree FIT College may contact you about study options by phone, SMS and email. See our <a href="privacy.html">Privacy Policy</a>.</p>' +
        '<p class="hs-standin__captcha">Protected by reCAPTCHA (HubSpot form setting)</p>' +
        '<button type="submit" class="btn btn--primary">' + (state.type === 'infopack' ? 'Send me the info pack' : (state.match.matched ? 'Next: pick a time with ' + esc(state.match.advisor.firstName || state.match.advisor.name) : 'Next: pick a time')) + '</button>' +
      '</form>';
    var f = slot.querySelector('form');
    f.addEventListener('input', function (e) { if (e.target.getAttribute('aria-invalid') === 'true') clearErr(e.target); });
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = {}, bad = null;
      ['firstname', 'lastname', 'email', 'mobilephone'].forEach(function (k) { v[k] = f.elements[k].value.trim(); });
      if (!v.firstname) bad = bad || [f.elements.firstname, 'Please add your first name'];
      if (!v.lastname) bad = bad || [f.elements.lastname, 'Please add your last name'];
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) bad = bad || [f.elements.email, 'Please check your email address'];
      if (v.mobilephone.replace(/\D/g, '').length < 8) bad = bad || [f.elements.mobilephone, 'Please check your mobile number'];
      if (bad) return showErr(bad[0], bad[1]);
      v.mobilephone = f.elements.cc.value + ' ' + v.mobilephone;
      if (window.console) console.log('[stand-in] HubSpot submission', Object.assign({}, v, hidden));
      var btn = f.querySelector('button[type=submit]'); btn.disabled = true; btn.textContent = 'Sending…';
      setTimeout(function () { onSuccess(v); }, 400);
    });
  }

  /* ======================================================================
     5. STEP 3: advisor's booking calendar
     ====================================================================== */
  function meetingSrc(url, v) {
    var sep = url.indexOf('?') === -1 ? '?' : '&';
    return url + sep + 'embed=true' +
      (v.firstname ? '&firstname=' + encodeURIComponent(v.firstname) : '') +
      (v.lastname ? '&lastname=' + encodeURIComponent(v.lastname) : '') +
      (v.email ? '&email=' + encodeURIComponent(v.email) : '');
  }

  function onSubmitted(root, state, v) {
    var m = state.match, a = m.advisor, who = m.matched ? (a.firstName || a.name) : 'one of our Career Advisors';
    track('lead_submitted', { lead_form_type: state.type, lead_routing: m.routing, assigned_advisor: a.name });
    var first = v.firstname ? ', ' + esc(v.firstname) : '';
    var heading, intro;
    if (state.type === 'infopack') {
      heading = 'Your info pack is on its way' + first;
      intro = 'Check your inbox in the next few minutes. Want to talk it through? ' +
        (m.matched ? '<strong>' + esc(a.name) + '</strong> can walk you through it. Grab a time below.' : 'Grab a time with one of our Career Advisors below.');
    } else {
      heading = m.matched ? 'You’re with ' + esc(a.name) : 'Thanks' + first + ', let’s find you a time';
      intro = 'Pick a time that suits and ' + esc(who) + ' will call you then. Your details are already filled in.';
    }
    var cal = a.meetingUrl
      ? '<iframe class="advisor-cal" title="Book a time with ' + esc(a.name) + '" src="' + esc(meetingSrc(a.meetingUrl, v)) + '" loading="lazy"></iframe>'
      : '<div class="img-slot img-slot--light advisor-cal--slot" role="img" aria-label="Placeholder: booking calendar">HUBSPOT BOOKING CALENDAR<br><small>' +
          esc(a.name) + ' · [CONFIRM] meeting URL in data/advisors.csv</small></div>';

    root.innerHTML =
      '<div class="advisor-result" data-advisor="' + esc(m.id) + '">' +
        '<p class="lead-stepper" aria-hidden="true"><span>1</span> Your area <span>2</span> Your details <b>3</b> ' + (state.type === 'infopack' ? 'Done' : 'Book') + '</p>' +
        '<span class="advisor-result__tick" aria-hidden="true">✓</span>' +
        '<h3 tabindex="-1">' + heading + '</h3>' +
        '<p class="advisor-result__intro">' + intro + '</p>' + cal +
        '<p class="small advisor-result__alt">No times showing, or rather talk now? Call <a href="tel:1300887017"><strong>' + PHONE + '</strong></a>' +
          (m.matched ? ' and ask for ' + esc(who) : '') + '.</p>' +
      '</div>';
    root.querySelector('h3').focus();
    var after = root.parentNode && root.parentNode.querySelector('[data-hide-after-submit]');
    if (after) after.hidden = true;
  }

  /* HubSpot's meetings embed posts a message to the page when a booking
     completes. [KOOK] confirm the payload key in the live embed. */
  window.addEventListener('message', function (e) {
    if (!/hubspot\.com$/.test((e.origin || '').replace(/:\d+$/, ''))) return;
    if (e.data && e.data.meetingBookSucceeded) track('advisor_meeting_booked', {});
  });

  /* ======================================================================
     6. BOOT
     ====================================================================== */
  function init() {
    var params = new URLSearchParams(location.search);
    Array.prototype.forEach.call(document.querySelectorAll('[data-lead-flow]'), function (root) {
      var state = {
        type: root.getAttribute('data-form-type') || 'advisor',
        /* Course pages can preselect: contact.html?course=Cert%20IV%20in%20Fitness */
        course: root.getAttribute('data-course') || params.get('course') || 'Not sure yet',
        postcode: '', country: '', overseas: false
      };
      renderStep1(root, state);
    });
  }

  /* Console testing: FITAdvisorRouter.route({postcode:'4558', course:'Cert IV in Fitness'}) */
  window.FITAdvisorRouter = { route: route, normalisePostcode: normalisePostcode };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
