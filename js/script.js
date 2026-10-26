/* ---- Construction packages: edit prices and specs here ---- */
const PACKAGES = [
  { name: 'Standard Package', price: '2,299', pick: false, rows: {
    'Project Management': 'Engineer supervision, weekly progress updates and material checks.',
    'Structure': 'RCC framed structure with TMT steel and standard walling.',
    'Bathroom & Plumbing': 'Standard CP fittings and white sanitaryware, concealed plumbing.',
    'Flooring': 'Vitrified tiles in living areas and anti-skid tiles in bathrooms.',
    'Kitchen & Dining': 'Granite kitchen platform with steel sink and wall tiling.',
    'Door, Windows and Railing': 'Wood or engineered main door, aluminium windows, MS railing.',
    'Painting': 'Putty with primer, and emulsion paint inside and out.',
    'Electrical': 'Concealed copper wiring with modular switches and MCB box.' } },
  { name: 'Premium Package', price: '2,599', pick: true, rows: {
    'Project Management': 'Engineer supervision, weekly updates and stage-wise quality checks.',
    'Structure': 'RCC framed structure with branded steel and cement.',
    'Bathroom & Plumbing': 'Branded CP fittings and sanitaryware, wall-hung closets.',
    'Flooring': 'Larger-format vitrified tiles with skirting.',
    'Kitchen & Dining': 'Granite platform, branded sink, and tile dado up to ceiling height.',
    'Door, Windows and Railing': 'Teak-finish main door, UPVC windows, SS or glass railing.',
    'Painting': 'Putty, primer and premium emulsion with a smooth finish.',
    'Electrical': 'Branded wiring and modular switches with extra points.' } },
  { name: 'Ultra Luxury', price: '3,299', pick: false, rows: {
    'Project Management': 'Dedicated engineer, fortnightly review meetings and a full quality log.',
    'Structure': 'RCC structure with top-grade steel, plus waterproofing treatments.',
    'Bathroom & Plumbing': 'Premium fittings, rain showers and designer sanitaryware.',
    'Flooring': 'Italian-finish or imported tiles and marble in selected areas.',
    'Kitchen & Dining': 'Modular kitchen with premium finishes and designer dado.',
    'Door, Windows and Railing': 'Solid wood doors, premium UPVC or glass fronts, designer railings.',
    'Painting': 'Premium textured and emulsion finishes, with exterior weather coat.',
    'Electrical': 'Premium wiring, smart-ready points and designer switches.' } }
];

(function renderPackages() {
  const grid = document.getElementById('pkgGrid');
  if (!grid) return;
  grid.innerHTML = PACKAGES.map((p) => `
    <article class="pkg reveal${p.pick ? ' pick' : ''}">
      ${p.pick ? '<span class="tag">Most chosen</span>' : ''}
      <h3>${p.name}</h3>
      <p class="price">\u20B9${p.price} <small>per sq ft</small></p>
      ${Object.entries(p.rows).map(([k, v]) => `<details><summary>${k}</summary><p>${v}</p></details>`).join('')}
    </article>`).join('');
})();

/* Show a labelled placeholder when an image file is missing */
document.addEventListener('error', (e) => {
  const img = e.target;
  if (img.tagName !== 'IMG') return;
  const box = img.closest('.photo');
  if (box) { box.classList.add('missing'); box.setAttribute('data-label', img.alt); }
}, true);

document.documentElement.classList.add('js');

(function () {
  const header = document.querySelector('.site-header');
  const toTop = document.querySelector('.to-top');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('nav');

  // Header shrink + back-to-top button
  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 30);
    toTop.classList.toggle('show', y > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Mobile menu
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  // Projects dropdown on touch screens: first tap opens, second tap follows link
  const sub = document.querySelector('.has-sub');
  sub.querySelector(':scope > a').addEventListener('click', (e) => {
    if (window.matchMedia('(max-width:860px)').matches && !sub.classList.contains('open')) {
      e.preventDefault();
      sub.classList.add('open');
    }
  });

  // Reveal sections as they enter the screen
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.15 });
    items.forEach((el, i) => {
      el.style.transitionDelay = (i % 3) * 90 + 'ms'; // small stagger within a row
      io.observe(el);
    });
  } else {
    items.forEach((el) => el.classList.add('in'));
  }

  // Count-up numbers in the stats strip
  const counters = document.querySelectorAll('.count');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const run = (el) => {
    const to = +el.dataset.to;
    if (reduce) { el.textContent = to; return; }
    const start = performance.now(), dur = 1400;
    (function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    })(start);
  };
  if ('IntersectionObserver' in window) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { run(en.target); co.unobserve(en.target); } });
    }, { threshold: 0.6 });
    counters.forEach((c) => co.observe(c));
  } else {
    counters.forEach(run);
  }

  document.getElementById('year').textContent = new Date().getFullYear();
})();

// Catch images that failed before this script started
window.addEventListener('load', () => {
  document.querySelectorAll('.photo img').forEach((img) => {
    if (img.complete && img.naturalWidth === 0) img.dispatchEvent(new Event('error'));
  });
});

/* ---- Reviews: replace these 20 placeholders with real client reviews ---- */

const REVIEWS = [
  {
    name: 'Karthik S',
    place: 'Panruti',
    text: 'Akilan Constructions offers building design and residential construction consultation for our area.'
  },
  {
    name: 'Priya R',
    place: 'Vallam',
    text: 'The team explained the floor plan and helped us understand different house design options.'
  },
  {
    name: 'Suresh Kumar',
    place: 'Manadikuppam',
    text: 'We explored residential building plans and discussed our construction requirements.'
  },
  {
    name: 'Divya M',
    place: 'Panruti',
    text: 'The house elevation ideas helped us visualize the exterior design of a modern home.'
  },
  {
    name: 'Prakash V',
    place: 'Cuddalore',
    text: 'The team explained the planning process and important details of residential construction.'
  },
  {
    name: 'Meena S',
    place: 'Vallam',
    text: 'We discussed our home layout requirements and explored practical floor plan options.'
  },
  {
    name: 'Ramesh B',
    place: 'Panruti',
    text: 'The engineers helped explain building drawings and the proposed house layout.'
  },
  {
    name: 'Lakshmi P',
    place: 'Manadikuppam',
    text: 'The consultation helped us understand different options for planning our home.'
  },
  {
    name: 'Arun Raj',
    place: 'Nellikuppam',
    text: 'We discussed house elevation designs and requirements for our residential project.'
  },
  {
    name: 'Vijayalakshmi K',
    place: 'Panruti',
    text: 'The team helped us organize our ideas for a residential building plan.'
  },
  {
    name: 'Senthil Kumar',
    place: 'Cuddalore',
    text: 'We explored modern house designs and discussed our building requirements.'
  },
  {
    name: 'Naveen T',
    place: 'Vallam',
    text: 'The design discussion helped clarify our questions about floor plans and room layouts.'
  },
  {
    name: 'Revathi N',
    place: 'Panruti',
    text: 'We discussed practical layout options for our proposed residential building.'
  },
  {
    name: 'Balaji G',
    place: 'Cuddalore',
    text: 'The team explained the drawings and various aspects of construction planning.'
  },
  {
    name: 'Dinesh R',
    place: 'Vallam',
    text: 'We explored ideas for our house layout and discussed the next planning steps.'
  },
  {
    name: 'Anitha S',
    place: 'Manadikuppam',
    text: 'The consultation covered our home requirements and different exterior design ideas.'
  },
  {
    name: 'Mohanraj P',
    place: 'Panruti',
    text: 'We discussed residential building plans and practical design options with the team.'
  },
  {
    name: 'Saranya V',
    place: 'Nellikuppam',
    text: 'The team helped us explore suitable ideas for a functional home layout.'
  },
  {
    name: 'Gokul K',
    place: 'Vallam',
    text: 'We discussed elevation drawings and planning requirements for a new house.'
  },
  {
    name: 'Ravi Shankar',
    place: 'Cuddalore District',
    text: 'Akilan Constructions provides building design and construction consultation for residential projects.'
  }
];


(function () {
  const WA = '919629856936';
  const waLink = (t) => 'https://wa.me/' + WA + '?text=' + encodeURIComponent(t);
  const $ = (id) => document.getElementById(id);
  const inr = (n) => '\u20B9' + Math.round(n).toLocaleString('en-IN');

  // Sliding review rows (second row moves the other way)
  const rows = $('revRows');
  if (rows) {
    const card = (r) => `<blockquote class="rev"><p class="stars" aria-label="5 stars">★★★★★</p><p>${r.text}</p><footer><b>${r.name}</b>${r.place}</footer></blockquote>`;
    const half = Math.ceil(REVIEWS.length / 2);
    rows.innerHTML = [REVIEWS.slice(0, half), REVIEWS.slice(half)].map((list, i) => {
      const html = list.map(card).join('');
      return `<div class="marquee-row${i ? ' rtl' : ''}"><div class="track">${html}${html}</div></div>`;
    }).join('');
  }

  // Slide-in direction for text/image blocks
  document.querySelectorAll('.split').forEach((s) => {
    const [a, b] = s.children, flip = s.classList.contains('flip');
    a.classList.add(flip ? 'from-right' : 'from-left');
    b.classList.add(flip ? 'from-left' : 'from-right');
  });

  // Scroll progress bar
  const bar = $('progress');
  const prog = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = 'scaleX(' + (max > 0 ? scrollY / max : 0) + ')';
  };
  addEventListener('scroll', prog, { passive: true }); prog();

  // Cost estimator
  const pk = $('estPkgs');
  if (pk) {
    pk.insertAdjacentHTML('beforeend', PACKAGES.map((p, i) =>
      `<label class="opt"><input type="radio" name="estPkg" value="${i}"${i === 1 ? ' checked' : ''}><span><b>${p.name.replace(' Package', '')}</b><small>\u20B9${p.price}/sq ft</small></span></label>`).join(''));
    const area = $('estArea');
    const calc = () => {
      const a = +area.value || 0;
      const p = PACKAGES[+pk.querySelector('input:checked').value];
      const total = a * +p.price.replace(/,/g, '');
      $('estTotal').textContent = inr(total);
      $('estHint').textContent = a && a < 2000 ? 'Our minimum built-up area is 2,000 sq ft. Call us for smaller buildings.' : '';
      return { a, p, total };
    };
    area.addEventListener('input', calc);
    pk.addEventListener('change', calc);
    $('estSend').addEventListener('click', () => {
      const { a, p, total } = calc();
      open(waLink(`Hello Akilan Constructions, I used the cost estimator.\nBuilt-up area: ${a} sq ft\nPackage: ${p.name}\nApproximate cost: ${inr(total)}\nPlease contact me.`), '_blank');
    });
    calc();
  }

  // EMI calculator
  const amt = $('emiAmt'), rate = $('emiRate'), yrs = $('emiYears');
  if (amt) {
    const emi = () => {
      const P = +amt.value, r = +rate.value / 1200, n = +yrs.value * 12;
      const m = r === 0 ? P / n : P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
      $('emiAmtV').textContent = inr(P);
      $('emiRateV').textContent = (+rate.value).toFixed(1) + '%';
      $('emiYearsV').textContent = yrs.value + ' years';
      $('emiMonthly').textContent = inr(m);
      $('emiInt').textContent = inr(m * n - P);
      $('emiTotal').textContent = inr(m * n);
    };
    [amt, rate, yrs].forEach((el) => el.addEventListener('input', emi));
    emi();
  }

  // Popups: certificate viewer and enquiry form (reopens every 30 seconds until sent)
  const POPUP_EVERY = 30000;
  let active = null, lastFocus = null, sent = false;
  try { sent = sessionStorage.getItem('enqSent') === '1'; } catch (e) {}
  const openModal = (m) => {
    if (active || !m) return;
    lastFocus = document.activeElement;
    m.hidden = false; active = m; document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => m.classList.add('show'));
    const f = m.querySelector('input,button'); if (f) f.focus();
  };
  const closeModal = () => {
    if (!active) return;
    const m = active; active = null;
    m.classList.remove('show'); document.body.style.overflow = '';
    setTimeout(() => { if (m !== active) m.hidden = true; }, 250);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  };
  document.querySelectorAll('[data-open]').forEach((b) => b.addEventListener('click', () => openModal($(b.dataset.open))));
  document.querySelectorAll('.modal').forEach((m) => m.addEventListener('click', (e) => {
    if (e.target === m || e.target.hasAttribute('data-close')) closeModal();
  }));
  addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  const enq = $('enquiryModal');
  setInterval(() => { if (!sent && !active) openModal(enq); }, POPUP_EVERY);

  $('enqForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const f = e.target, name = f.name.value.trim(), phone = f.phone.value.replace(/\D/g, '');
    if (!name) { $('enqErr').textContent = 'Please enter your name.'; return; }
    if (phone.length < 10) { $('enqErr').textContent = 'Please enter a valid 10-digit mobile number.'; return; }
    $('enqErr').textContent = '';
    const msg = `Hello Akilan Constructions, I would like to enquire.\nName: ${name}\nMobile: ${phone}\nLooking for: ${f.need.value}` + (f.msg.value.trim() ? `\nMessage: ${f.msg.value.trim()}` : '');
    open(waLink(msg), '_blank');
    sent = true;
    try { sessionStorage.setItem('enqSent', '1'); } catch (err) {}
    $('enqFormWrap').hidden = true; $('enqDone').hidden = false;
    setTimeout(closeModal, 4000);
  });
})();
