import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { SplitText } from 'gsap/SplitText';
import { initPortrait } from './portrait';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

const root = document.documentElement;
const reduce = root.classList.contains('reduce') || matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
const $ = <T extends Element = HTMLElement>(s: string, ctx: ParentNode = document) => ctx.querySelector<T & Element>(s) as T | null;
const $$ = <T extends Element = HTMLElement>(s: string, ctx: ParentNode = document) => Array.from(ctx.querySelectorAll(s)) as T[];

/* ─── things that run with or without motion ─────────────────── */

function startClocks() {
  const fmt = new Intl.DateTimeFormat(root.lang, { hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo' });
  const tick = () => $$('[data-clock]').forEach((el) => (el.textContent = fmt.format(new Date())));
  tick();
  setInterval(tick, 15_000);
}

function rememberLanguage() {
  $$<HTMLAnchorElement>('[data-lang]').forEach((a) =>
    a.addEventListener('click', () => {
      try { localStorage.setItem('portfolio-lang', a.dataset.lang ?? 'en'); } catch {}
    }),
  );
}

async function latestRepo() {
  const box = $('[data-gh]');
  const link = $<HTMLAnchorElement>('[data-gh-link]');
  if (!box || !link) return;
  try {
    const res = await fetch('https://api.github.com/users/igormarcelmoreira/repos?sort=pushed&per_page=10&type=owner');
    if (!res.ok) return;
    const repo = (await res.json()).find((r: { fork: boolean }) => !r.fork);
    if (!repo) return;
    link.textContent = repo.name;
    link.href = repo.html_url;
    box.hidden = false;
  } catch {}
}

startClocks();
rememberLanguage();
latestRepo();

/* ─── motion ─────────────────────────────────────────────────── */

async function boot() {
  if (reduce) {
    root.classList.add('motion-ready');
    initPortrait(true);
    return;
  }

  // don't let a slow font request hold the page hostage
  await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))]);

  // the safety timer in <head> already gave up on motion: stay static
  if (root.classList.contains('reduce')) {
    initPortrait(true);
    return;
  }

  const smoother = ScrollSmoother.create({
    wrapper: '#smooth-wrapper',
    content: '#smooth-content',
    smooth: 1.15,
    effects: true,
    smoothTouch: 0.1,
  });

  // in-page links go through the smoother
  $$<HTMLAnchorElement>('a[data-scroll]').forEach((a) =>
    a.addEventListener('click', (e) => {
      const hash = a.getAttribute('href');
      if (!hash?.startsWith('#')) return;
      e.preventDefault();
      smoother.scrollTo(hash === '#top' ? 0 : hash, true, 'top top');
      history.replaceState(null, '', hash === '#top' ? location.pathname : hash);
    }),
  );
  if (location.hash && $(location.hash)) requestAnimationFrame(() => smoother.scrollTo(location.hash, false, 'top top'));

  const firstVisit = !root.classList.contains('intro-seen');
  navBehaviour();
  intro(firstVisit);
  scrollReveals();
  scrubbedManifesto();
  services();
  counters();
  marquee();
  workRows();
  if (finePointer) {
    cursor();
    workPreview();
    magnetic();
  }
  root.classList.add('motion-ready');

  // building ~36k glyphs is heavy: do it once the intro is already moving
  setTimeout(() => initPortrait(false).then(() => ScrollTrigger.refresh()), firstVisit ? 1800 : 150);
}

function navBehaviour() {
  const nav = $('.nav');
  if (!nav) return;
  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      const y = self.scroll();
      nav.classList.toggle('is-solid', y > window.innerHeight * 0.85);
      nav.classList.toggle('is-hidden', self.direction === 1 && y > window.innerHeight * 0.85);
    },
  });
}

function intro(firstVisit: boolean) {
  const name = $('[data-hero-name]')!;
  const split = SplitText.create(name, { type: 'chars', mask: 'chars' });
  const fades = $$('[data-hero-fade]');
  gsap.set([name, ...fades], { autoAlpha: 1 });

  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

  if (firstVisit) {
    const counter = { v: 0 };
    const out = $('.loader__count')!;
    tl.to(counter, {
      v: 100,
      duration: 1.25,
      ease: 'power2.inOut',
      onUpdate: () => (out.textContent = String(Math.round(counter.v))),
    })
      .to('.loader', { yPercent: -100, duration: 0.95, ease: 'expo.inOut' })
      .set('.loader', { display: 'none' });
    try { sessionStorage.setItem('intro-seen', '1'); } catch {}
  }

  tl.from(split.chars, { yPercent: 115, duration: 1.3, stagger: 0.03 }, firstVisit ? '-=0.5' : 0.1)
    .from(fades, { autoAlpha: 0, y: 28, duration: 1, stagger: 0.1 }, '-=1.1');

  // the name slides a little slower than the page as you leave the hero
  gsap.to(name, {
    yPercent: -18,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });
}

function scrollReveals() {
  $$('[data-split-lines]').forEach((el) => {
    gsap.set(el, { autoAlpha: 1 });
    SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      linesClass: 'split-line',
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 110,
          duration: 1.3,
          stagger: 0.09,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        }),
    });
  });

  $$('[data-split-chars]').forEach((el) => {
    gsap.set(el, { autoAlpha: 1 });
    SplitText.create(el, {
      type: 'words,chars',
      mask: 'chars',
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.chars, {
          yPercent: 115,
          duration: 1.2,
          stagger: 0.025,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
        }),
    });
  });

  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 88%',
    once: true,
    onEnter: (els) =>
      gsap.fromTo(els, { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.08, ease: 'expo.out' }),
  });
}

function scrubbedManifesto() {
  $$('[data-scrub-words]').forEach((el) => {
    SplitText.create(el, {
      type: 'words',
      autoSplit: true,
      onSplit: (self) =>
        gsap.fromTo(
          self.words,
          { opacity: 0.14 },
          {
            opacity: 1,
            stagger: 0.12,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top 78%', end: 'bottom 40%', scrub: 0.6 },
          },
        ),
    });
  });
}

function services() {
  $$('[data-service]').forEach((row) => {
    const rule = $('.service__rule', row);
    const title = $('.service__title', row);
    const body = $('.service__body', row);
    gsap
      .timeline({ scrollTrigger: { trigger: row, start: 'top 85%', once: true }, defaults: { ease: 'expo.out' } })
      .from(rule, { scaleX: 0, duration: 1.4 })
      .from(title, { yPercent: 40, autoAlpha: 0, duration: 1.1 }, 0.1)
      .from(body, { y: 24, autoAlpha: 0, duration: 1.1 }, 0.2);
  });
}

function counters() {
  $$('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count);
    const obj = { v: 0 };
    gsap.to(obj, {
      v: end,
      duration: 1.6,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => (el.textContent = String(Math.round(obj.v))),
    });
  });
}

function marquee() {
  const track = $('[data-marquee]');
  if (!track) return;
  const loop = gsap.to(track, { xPercent: -50, duration: 38, ease: 'none', repeat: -1 });
  const skew = gsap.quickTo(track, 'skewX', { duration: 0.5, ease: 'power3.out' });
  let settle: gsap.core.Tween | null = null;

  // scroll speed pushes the band faster (and reverses it when scrolling up)
  ScrollTrigger.create({
    onUpdate: (self) => {
      const v = self.getVelocity();
      const dir = v < 0 ? -1 : 1;
      const boost = Math.min(Math.abs(v) / 350, 5);
      settle?.kill();
      loop.timeScale(dir * (1 + boost));
      skew(gsap.utils.clamp(-8, 8, v / -220));
      settle = gsap.to(loop, { timeScale: dir, duration: 1.2, ease: 'power2.out', delay: 0.1 });
    },
  });
}

function cursor() {
  const dot = $('.cursor')!;
  const label = $('.cursor__label')!;
  const x = gsap.quickTo(dot, 'x', { duration: 0.45, ease: 'power3.out' });
  const y = gsap.quickTo(dot, 'y', { duration: 0.45, ease: 'power3.out' });
  let shown = false;
  window.addEventListener(
    'pointermove',
    (e) => {
      if (!shown) {
        gsap.set(dot, { x: e.clientX, y: e.clientY });
        gsap.to(dot, { opacity: 1, duration: 0.3 });
        shown = true;
      }
      x(e.clientX);
      y(e.clientY);
    },
    { passive: true },
  );
  document.documentElement.addEventListener('pointerleave', () => { gsap.to(dot, { opacity: 0, duration: 0.2 }); shown = false; });

  const grow = (text: string) => {
    label.textContent = text;
    gsap.to(dot, { scale: 1, duration: 0.45, ease: 'expo.out' });
    gsap.to(label, { opacity: 1, duration: 0.25, delay: 0.1 });
  };
  const shrink = () => {
    gsap.to(dot, { scale: 0.16, duration: 0.45, ease: 'expo.out' });
    gsap.to(label, { opacity: 0, duration: 0.15 });
  };
  $$('[data-cursor]').forEach((el) => {
    el.addEventListener('pointerenter', () => grow(el.dataset.cursor ?? ''));
    el.addEventListener('pointerleave', shrink);
  });
  $$('a:not([data-cursor]), button').forEach((el) => {
    el.addEventListener('pointerenter', () => gsap.to(dot, { scale: 0.4, duration: 0.3 }));
    el.addEventListener('pointerleave', () => gsap.to(dot, { scale: 0.16, duration: 0.3 }));
  });
}

function workRows() {
  const rows = $$('[data-row]');

  // every screen: the project names rise in as the list scrolls in
  rows.forEach((row) => {
    const name = $('.row__name', row);
    if (!name) return;
    SplitText.create(name, {
      type: 'chars',
      mask: 'chars',
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.chars, {
          yPercent: 110,
          duration: 1,
          stagger: 0.025,
          ease: 'expo.out',
          scrollTrigger: { trigger: row, start: 'top 92%', once: true },
        }),
    });
  });

  // touch / narrow: no hover, so the row crossing the middle of the screen is the "hovered" one
  gsap.matchMedia().add('(hover: none), (max-width: 820px)', () => {
    const triggers = rows.map((row) =>
      ScrollTrigger.create({
        trigger: row,
        start: 'top 58%',
        end: 'bottom 58%',
        toggleClass: { targets: row, className: 'is-active' },
        onToggle: (self) => {
          if (!self.isActive) return;
          const icons = $$('.row__icons img', row);
          if (icons.length)
            gsap.fromTo(
              icons,
              { scale: 0, rotation: -25 },
              { scale: 1, rotation: 0, duration: 0.7, stagger: 0.07, ease: 'back.out(2.2)', delay: 0.15 },
            );
        },
      }),
    );
    return () => triggers.forEach((t) => t.kill());
  });
}

function workPreview() {
  const list = $('[data-work-list]');
  const preview = $('[data-preview]');
  const track = $('[data-preview-track]');
  if (!list || !preview || !track) return;
  // position: fixed inside the transformed smooth-content would follow the page, not the screen
  document.body.appendChild(preview);

  const x = gsap.quickTo(preview, 'x', { duration: 0.7, ease: 'power3.out' });
  const y = gsap.quickTo(preview, 'y', { duration: 0.7, ease: 'power3.out' });
  const rot = gsap.quickTo(preview, 'rotation', { duration: 0.9, ease: 'power3.out' });
  let lastX = 0;

  list.addEventListener('pointermove', (e) => {
    x(e.clientX + 170);
    y(e.clientY);
    rot(gsap.utils.clamp(-10, 10, (e.clientX - lastX) * 0.6));
    lastX = e.clientX;
  });
  list.addEventListener('pointerenter', (e) => {
    gsap.set(preview, { x: e.clientX + 170, y: e.clientY });
    gsap.to(preview, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'expo.out' });
  });
  list.addEventListener('pointerleave', () => gsap.to(preview, { autoAlpha: 0, scale: 0.6, duration: 0.4, ease: 'power3.in' }));

  $$('[data-row]', list).forEach((row) =>
    row.addEventListener('pointerenter', () =>
      gsap.to(track, { yPercent: -100 * Number(row.dataset.row), duration: 0.7, ease: 'expo.out' }),
    ),
  );
}

function magnetic() {
  $$('[data-magnetic]').forEach((el) => {
    const x = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    const y = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      x((e.clientX - (r.left + r.width / 2)) * 0.25);
      y((e.clientY - (r.top + r.height / 2)) * 0.35);
    });
    el.addEventListener('pointerleave', () => { x(0); y(0); });
  });
}

boot();
