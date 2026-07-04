/* ==========================================================================
   FIT COLLEGE REBUILD — SHARED JS
   [KOOK] Vanilla only. No jQuery, no libraries, no build step.
   This file is intentionally tiny: the design system leans on
   native HTML (details/summary, anchor scroll) wherever possible.
   ========================================================================== */

/* Mobile nav toggle */
function toggleNav(btn){
  var nav = document.getElementById('mainnav');
  var open = nav.classList.toggle('open');
  btn.setAttribute('aria-expanded', open ? 'true' : 'false');
}

/* [KOOK] Advisor CTA — demo stub. In production this opens the
   HubSpot meeting link / instant-callback flow, and the enquiry
   triggers the FITCollege SMS speed-to-lead automation
   (SMSGlobal registered sender ID). */
function advisorCta(){
  alert('Demo: HubSpot meeting / instant callback flow goes here.');
  return false;
}
