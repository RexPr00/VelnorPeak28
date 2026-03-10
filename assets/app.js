const body = document.body;

const trapFocus = (container, event) => {
  const selectors = 'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])';
  const focusable = [...container.querySelectorAll(selectors)];
  if (!focusable.length || event.key !== 'Tab') return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
};

document.querySelectorAll('.lang').forEach((wrap) => {
  const btn = wrap.querySelector('.lang-active');
  btn?.addEventListener('click', () => wrap.classList.toggle('open'));
  document.addEventListener('click', (e) => {
    if (!wrap.contains(e.target)) wrap.classList.remove('open');
  });
});

const drawer = document.querySelector('.drawer');
const backdrop = document.querySelector('.drawer-backdrop');
const openBtn = document.querySelector('.mobile-toggle');
const closeBtn = document.querySelector('.drawer .close');

const closeDrawer = () => {
  drawer?.classList.remove('open');
  backdrop?.classList.remove('show');
  body.style.overflow = '';
};
const openDrawer = () => {
  drawer?.classList.add('open');
  backdrop?.classList.add('show');
  body.style.overflow = 'hidden';
  drawer?.querySelector('a,button,input')?.focus();
};
openBtn?.addEventListener('click', openDrawer);
closeBtn?.addEventListener('click', closeDrawer);
backdrop?.addEventListener('click', closeDrawer);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeDrawer();
    closeModal();
  }
  if (drawer?.classList.contains('open')) trapFocus(drawer, e);
  if (modal?.classList.contains('show')) trapFocus(modal, e);
});

drawer?.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeDrawer));

const faqItems = [...document.querySelectorAll('.faq-item')];
faqItems.forEach((item) => {
  item.querySelector('button')?.addEventListener('click', () => {
    faqItems.forEach((it) => it !== item && it.classList.remove('open'));
    item.classList.toggle('open');
  });
});

const modal = document.getElementById('privacyModal');
const openPolicy = document.querySelectorAll('[data-open-policy]');
const closePolicy = document.querySelectorAll('[data-close-policy]');
const closeModal = () => {
  modal?.classList.remove('show');
  body.style.overflow = '';
};
openPolicy.forEach((btn) => btn.addEventListener('click', (e) => {
  e.preventDefault();
  modal?.classList.add('show');
  body.style.overflow = 'hidden';
}));
closePolicy.forEach((btn) => btn.addEventListener('click', closeModal));
modal?.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

document.querySelectorAll('form').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const box = form.querySelector('.form-msg');
    if (box) box.textContent = 'After you sign up, you get instant access to the next steps. We may send a short email to confirm your details.';
    form.reset();
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.card,.review-card,.metric-card,.process-card,.visual-card,.faq-item').forEach((el) => {
  el.style.transform = 'translateY(10px)';
  el.style.transition = 'transform .45s ease';
  observer.observe(el);
});
