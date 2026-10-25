/* Contact page only. Shared features (menu, reveal, progress bar) come from script.js */
(function () {
  const WA = '919629856936'; // WhatsApp number that receives the enquiry
  const $ = (id) => document.getElementById(id);
  const form = $('contactForm');
  if (!form) return;

  // Pre-select a service from a link such as contact.html?service=vastu
  const q = new URLSearchParams(location.search).get('service');
  if (q) {
    const opt = [...form.service.options].find((o) => o.text.toLowerCase().includes(q.toLowerCase()));
    if (opt) form.service.value = opt.value;
  }

  // Message counter
  form.msg.addEventListener('input', () => { $('msgCount').textContent = form.msg.value.length + ' / 300'; });

  // Show or clear an error under a field
  const setErr = (name, text) => {
    const f = form[name].closest('.field');
    f.classList.remove('bad');
    void f.offsetWidth; // restart the shake animation
    f.classList.toggle('bad', !!text);
    f.querySelector('.err-t').textContent = text || '';
    return !text;
  };
  ['name', 'phone', 'email'].forEach((n) => form[n].addEventListener('input', () => setErr(n, '')));

  // Turn what the visitor typed into a clean 10-digit Indian mobile number
  const cleanPhone = (v) => {
    let d = v.replace(/\D/g, '');
    if (d.length === 12 && d.startsWith('91')) d = d.slice(2);
    if (d.length === 11 && d.startsWith('0')) d = d.slice(1);
    return d;
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const phone = cleanPhone(form.phone.value);
    const email = form.email.value.trim();

    const ok = [
      setErr('name', name.length < 2 ? 'Please enter your name.' : ''),
      setErr('phone', /^[6-9]\d{9}$/.test(phone) ? '' : 'Please enter a valid 10-digit mobile number.'),
      setErr('email', email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'Please enter a valid email address.' : '')
    ].every(Boolean);
    if (!ok) { form.querySelector('.bad input').focus(); return; }

    const lines = [
      'Hello Akilan Constructions, I would like to enquire.',
      'Name: ' + name,
      'Mobile: ' + phone,
      email && 'Email: ' + email,
      form.loc.value.trim() && 'Plot location: ' + form.loc.value.trim(),
      'Service: ' + form.service.value,
      'Best time to call: ' + form.time.value,
      form.msg.value.trim() && 'Message: ' + form.msg.value.trim()
    ].filter(Boolean);
    const link = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(lines.join('\n'));

    // Paper-plane animation, then open WhatsApp and show the thank-you panel
    const btn = form.querySelector('.btn-send');
    btn.classList.add('go-fly');
    window.open(link, '_blank');
    $('waFallback').href = link;
    try { sessionStorage.setItem('enqSent', '1'); } catch (err) {}
    setTimeout(() => {
      form.hidden = true;
      $('done').hidden = false;
      btn.classList.remove('go-fly');
    }, 650);
  });

  // "Send another enquiry"
  $('again').addEventListener('click', () => {
    form.reset();
    $('msgCount').textContent = '0 / 300';
    $('done').hidden = true;
    form.hidden = false;
    form.name.focus();
  });

  // Copy buttons (email)
  const toast = $('toast');
  document.querySelectorAll('[data-copy]').forEach((b) => b.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(b.dataset.copy);
      toast.textContent = 'Copied: ' + b.dataset.copy;
    } catch (err) {
      toast.textContent = 'Press and hold to copy: ' + b.dataset.copy;
    }
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
  }));
})();