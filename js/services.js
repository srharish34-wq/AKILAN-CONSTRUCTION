/* Services page. Edit the SERVICES list to change text, bullets or image names.
   Images go in the images folder, e.g. images/residential.jpg */
const SERVICES = [
  { id: 'residential', short: 'Residential', kicker: 'Construction', title: 'Residential building construction', img: 'residential.jpg',
    desc: 'Independent houses, villas and duplex homes built from foundation to finishing by one engineer-led team. You get a clear specification, regular updates and a home built to last.',
    incl: ['Design to handover under one team', 'Engineer-supervised structure', 'Material quality checks at every stage', 'Standard, Premium or Ultra Luxury packages'],
    best: 'Families building a new home on their own plot.' },
  { id: 'commercial', short: 'Commercial', kicker: 'Construction', title: 'Commercial building construction', img: 'commercial.jpg',
    desc: 'Shops, offices and commercial complexes planned around footfall, parking and future expansion, and built to run your business from day one.',
    incl: ['Layouts planned for your business use', 'Structural design for heavier loads', 'Provision for services and parking', 'Phased construction where needed'],
    best: 'Shop owners, businesses and investors.' },
  { id: 'school-hospital', short: 'School and hospital', kicker: 'Institutional', title: 'School and hospital buildings', img: 'school-hospital.jpg',
    desc: 'Institutional buildings need safe circulation, light, ventilation and strict compliance. We design and build them to meet public building norms.',
    incl: ['Classroom, ward and clinic layouts', 'Safe exits and circulation planning', 'Natural light and ventilation', 'Approval drawings for institutional use'],
    best: 'Trusts, schools, clinics and hospitals.' },
  { id: 'plan-approval', short: 'Plan and approval', kicker: 'Design and approval', title: 'Building plan and approval drawings', img: 'plan-approval.jpg',
    desc: 'We prepare your building plan and elevation along with the approval blueprint drawings, and handle the application so you do not have to run between offices.',
    incl: ['Building plan and elevation drawings', 'Approval blueprint drawings', 'Online and offline plan approval', 'Follow-up until the approval is issued'],
    best: 'Anyone who needs a sanctioned plan before building.' },
  { id: 'elevation', short: 'Elevation', kicker: 'Design and approval', title: 'Elevation works', img: 'elevation.jpg',
    desc: 'The front of your building is the first thing people see. We design elevations that look modern, suit your plot and fit your budget.',
    incl: ['Front and side elevation designs', 'Material and colour suggestions', 'Elevation drawings for approval', 'Execution on site'],
    best: 'New builds and houses that need a fresh look.' },
  { id: 'vastu', short: 'Vastu plans', kicker: 'Design and approval', title: 'Vastu modern house plans', img: 'vastu.jpg',
    desc: 'Contemporary house plans that follow Vastu principles without wasting space or blocking light and air.',
    incl: ['Vastu-friendly room placement', 'Modern, practical layouts', 'Plans adjusted to your plot shape', 'Discussion and revisions before finalising'],
    best: 'Families who want a modern home that respects Vastu.' },
  { id: 'interior-exterior', short: 'Interior and exterior', kicker: 'Design', title: 'Interior and exterior designs', img: 'interior-exterior.jpg',
    desc: 'Thoughtful interior and exterior design that makes your building comfortable, attractive and easy to maintain.',
    incl: ['Room-by-room interior planning', 'Exterior finishes and landscaping ideas', 'Lighting and colour schemes', 'Design drawings you can review'],
    best: 'New homes and existing buildings that need a better finish.' },
  { id: 'structural', short: 'Structural design', kicker: 'Engineering', title: 'Structural design', img: 'structural.jpg',
    desc: 'Safe buildings start with sound structural design. Our engineers prepare structural drawings suited to your soil, plan and number of floors.',
    incl: ['Foundation, column, beam and slab design', 'Drawings prepared by a licensed civil engineer', 'Design for future floors if planned', 'Structural review of existing buildings'],
    best: 'Anyone building, adding a floor or checking an old structure.' },
  { id: 'supervision', short: 'Supervision', kicker: 'Engineering', title: 'Site supervision', img: 'supervision.jpg',
    desc: 'Already have a contractor? Our engineers can supervise your site, check the work against the drawings and keep quality on track.',
    incl: ['Regular site visits by an engineer', 'Checks on steel, concrete and masonry', 'Comparison against approved drawings', 'Progress reports you can follow'],
    best: 'Owners who want an expert watching their project.' },
  { id: 'renovation', short: 'Renovation', kicker: 'Renovation', title: 'Building renovation', img: 'renovation.jpg',
    desc: 'Give an old building new life with repairs, remodelling, extensions and fresh finishes, planned so the work causes as little disruption as possible.',
    incl: ['Remodelling and extensions', 'Repairs and waterproofing', 'Flooring, painting and fittings', 'Structural check before major changes'],
    best: 'Owners of older houses and commercial buildings.' },
  { id: 'valuation', short: 'Valuation', kicker: 'Consulting', title: 'Valuation', img: 'valuation.jpg',
    desc: 'A clear, professional valuation of your building or property for loans, sale, partition or legal needs.',
    incl: ['Property and building valuation report', 'Based on site inspection and records', 'Useful for loans, sale and legal matters', 'Prepared by a qualified engineer'],
    best: 'Buyers, sellers, banks and families settling property.' },
  { id: 'loan', short: 'Housing loan', kicker: 'Consulting', title: 'Housing loan and construction loan consultant', img: 'loan.jpg',
    desc: 'We guide you through building construction loans and housing loans, and prepare the drawings, estimates and documents banks ask for.',
    incl: ['Guidance on loan options', 'Estimates and drawings for the bank', 'Help with the document checklist', 'Support through the process'],
    best: 'First-time builders who need finance.' },
  { id: 'drda', short: 'DRDA works', kicker: 'Government', title: 'DRDA government works', img: 'drda.jpg',
    desc: 'We are a DRDA government contractor and take up public works with the discipline and documentation they demand.',
    incl: ['Registered DRDA government contractor', 'Work to specification and schedule', 'Proper measurement and documentation', 'Licensed engineer in charge'],
    best: 'Panchayats, departments and public bodies.' }
];

(function () {
  const WA = '919629856936';
  const list = document.getElementById('svcList');
  const jump = document.getElementById('jumpNav');
  if (!list) return;

  // Build the jump menu and the service rows
  jump.innerHTML = SERVICES.map((s) => `<li><a href="#s-${s.id}" data-id="${s.id}">${s.short}</a></li>`).join('');
  list.innerHTML = SERVICES.map((s, i) => {
    const n = String(i + 1).padStart(2, '0');
    const msg = encodeURIComponent('Hello Akilan Constructions, I would like to know more about: ' + s.title);
    return `<article class="svc-row${i % 2 ? ' flip' : ''}" id="s-${s.id}">
      <div class="container svc-grid2">
        <div class="svc-media"><figure class="photo"><img src="images/${s.img}" alt="${s.title}" loading="lazy"></figure><span class="svc-num">${n}</span></div>
        <div class="svc-body">
          <span class="kicker" style="--i:0">${s.kicker}</span>
          <h2 style="--i:1">${s.title}</h2>
          <p style="--i:2">${s.desc}</p>
          <h4 style="--i:3">What is included</h4>
          <ul class="incl" style="--i:4">${s.incl.map((t, j) => `<li style="--j:${j}">${t}</li>`).join('')}</ul>
          <p class="best" style="--i:5"><b>Best for:</b> ${s.best}</p>
          <div class="btn-row left" style="--i:6">
            <a class="btn btn-red" target="_blank" rel="noopener" href="https://wa.me/${WA}?text=${msg}">Enquire on WhatsApp</a>
            <a class="btn btn-ghost-dark" href="tel:+919629856936">Call us</a>
          </div>
        </div>
      </div></article>`;
  }).join('');

  const rows = list.querySelectorAll('.svc-row');

  // Play each row's animation when it scrolls into view
  const show = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); show.unobserve(e.target); }
  }), { threshold: 0.2 });
  rows.forEach((r) => show.observe(r));

  // Highlight the matching jump chip while scrolling (scroll-spy)
  const chips = jump.querySelectorAll('a');
  const spy = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    const id = e.target.id.replace('s-', '');
    chips.forEach((c) => {
      const on = c.dataset.id === id;
      c.classList.toggle('on', on);
      if (on) jump.scrollTo({ left: c.offsetLeft - jump.clientWidth / 2 + c.offsetWidth / 2, behavior: 'smooth' });
    });
  }), { rootMargin: '-45% 0px -50% 0px' });
  rows.forEach((r) => spy.observe(r));

  // Gentle 3D tilt on the images (mouse devices only)
  if (matchMedia('(hover:hover) and (pointer:fine)').matches && !matchMedia('(prefers-reduced-motion:reduce)').matches) {
    list.querySelectorAll('.svc-media').forEach((m) => {
      const p = m.querySelector('.photo');
      m.addEventListener('mousemove', (e) => {
        const r = m.getBoundingClientRect();
        p.style.setProperty('--ry', ((e.clientX - r.left) / r.width - 0.5) * 8 + 'deg');
        p.style.setProperty('--rx', (0.5 - (e.clientY - r.top) / r.height) * 8 + 'deg');
      });
      m.addEventListener('mouseleave', () => { p.style.setProperty('--rx', '0deg'); p.style.setProperty('--ry', '0deg'); });
    });
  }

  // Open a service directly from a link such as services.html#s-vastu
  if (location.hash) {
    const t = document.querySelector(location.hash);
    if (t) setTimeout(() => t.scrollIntoView(), 300);
  }
})();