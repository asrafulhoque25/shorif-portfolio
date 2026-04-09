// ── Navbar scroll ──
const navbar = document.getElementById('navbar');

if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  });
}

// ── Mobile menu toggle ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

if (hamburger && mobileMenu) {
  const hamTop = hamburger.querySelector('.ham-top');
  const hamMid = hamburger.querySelector('.ham-mid');
  const hamBot = hamburger.querySelector('.ham-bot');
  let menuOpen = false;

  const toggleMenu = () => {
    menuOpen = !menuOpen;

    if (menuOpen) {
      // Open menu
      mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
      navbar.classList.add('navbar--menu-open');

      // Hamburger → X
      hamTop.style.transform = 'translateY(0px) rotate(45deg)';
      hamMid.style.opacity = '0';
      hamMid.style.transform = 'scaleX(0)';
      hamBot.style.width = '24px';
      hamBot.style.transform = 'translateY(0px) rotate(-45deg)';
    } else {
      // Close menu
      mobileMenu.style.maxHeight = '0';
      navbar.classList.remove('navbar--menu-open');

      // Reset hamburger bars
      hamTop.style.transform = '';
      hamMid.style.opacity = '';
      hamMid.style.transform = '';
      hamBot.style.width = '';
      hamBot.style.transform = '';
    }
  };

  hamburger.addEventListener('click', toggleMenu);

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (menuOpen) toggleMenu();
    });
  });
}
 
 
 
 // ── Button animation ──
document.querySelectorAll('.btn-slide').forEach(btn => {
  const overlay = btn.querySelector('.btn-slide__overlay');

  btn.addEventListener('mouseenter', () => {
    gsap.to(overlay, { y: '0%', duration: 0.42, ease: 'power3.out' });
    gsap.to(btn, { scale: 1.05, duration: 0.35, ease: 'back.out(2)' });
  });

  btn.addEventListener('mouseleave', () => {
    gsap.to(overlay, { y: '110%', duration: 0.4, ease: 'power3.inOut' });
    gsap.to(btn, { scale: 1, duration: 0.45, ease: 'elastic.out(1, 0.6)' });
  });

  btn.addEventListener('click', () => {
    gsap.timeline()
      .to(btn, { scale: 0.93, duration: 0.1, ease: 'power2.in' })
      .to(btn, { scale: 1.05, duration: 0.55, ease: 'elastic.out(1, 0.5)' })
      .to(btn, { scale: 1,    duration: 0.3,  ease: 'power2.out' });
  });
});


gsap.fromTo('.btn-slide',
  { opacity: 0, scaleX: 0.4, scaleY: 0.6, transformOrigin: 'center center' },
  { opacity: 1, scaleX: 1, scaleY: 1, duration: 0.9, ease: 'elastic.out(1, 0.55)', delay: 0.3, stagger: 0.1 }
);





    
// ── process number animation ──


document.querySelectorAll('.svc-row').forEach(row => {
  const numReveal = row.querySelector('.svc-num-reveal');
  const nameReveal = row.querySelector('.svc-name-reveal');

  row.addEventListener('mouseenter', () => {
    gsap.killTweensOf([numReveal, nameReveal]);
    gsap.to([numReveal, nameReveal], {
      clipPath: 'inset(0 0% 0 0)',
      duration: 0.88,
      ease: 'power3.out'
    });
  });

  row.addEventListener('mouseleave', () => {
    gsap.killTweensOf([numReveal, nameReveal]);
    gsap.to([numReveal, nameReveal], {
      clipPath: 'inset(0 100% 0 0)',
      duration: 0.6,
      ease: 'power2.in'
    });
  });
});





// case study tab section switch

(function initTabFilter() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const grid = document.getElementById('project-grid');

  if (!tabButtons.length || !grid) return;

  const allItems = Array.from(grid.querySelectorAll('.project-item'));

  if (!allItems.length) return;

  function applyFilter(filter) {
    grid.innerHTML = '';

    const matched = filter === 'all'
      ? allItems
      : allItems.filter(item => item.dataset.category === filter);

    // Transition 
    matched.forEach(item => {
      item.style.transition = 'none';
      item.style.opacity = '0';
      item.style.transform = 'translateY(16px)';
      grid.appendChild(item);
    });

    // Double rAF —
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        matched.forEach(item => {
          item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        });
      });
    });
  }

  // Page load 
  applyFilter('all');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(btn.dataset.filter);
    });
  });

})();



//user research bling 

const pings = [...document.querySelectorAll('[data-ping]')]
  .sort((a, b) => +a.dataset.ping - +b.dataset.ping);

const BETWEEN = 300;   // gap between each card (ms)
const PAUSE = 4000;  // idle time after full sequence (ms)

function fire(el) {
  el.classList.remove('ping-active');
  requestAnimationFrame(() => requestAnimationFrame(() => {
    el.classList.add('ping-active');
  }));
  el.addEventListener('animationend', () => {
    el.classList.remove('ping-active');
  }, { once: true });
}

function runSequence() {
  pings.forEach((el, i) => setTimeout(() => fire(el), i * BETWEEN));
  // schedule next sequence after all pings finish + PAUSE
  setTimeout(runSequence, pings.length * BETWEEN + PAUSE);
}

// Small initial delay so page is fully rendered
setTimeout(runSequence, 600);





//cta grid


// ── CTA Grid ──────────────────────────────────────────────────────
(function () {

  const resultSection = document.querySelector('.result');
  const card1 = document.getElementById('card1');
  const card2 = document.getElementById('card2');
  const card3 = document.getElementById('card3');
  const svg = document.getElementById('dashRing');
  const ringInner = document.getElementById('ringInner');
  const pctEl = document.getElementById('pct');
  const customersEl = document.getElementById('customers');
  const countriesEl = document.getElementById('countries');

  if (!resultSection || !card1 || !svg) return;

  // Build dashed ring
  const cx = 96, cy = 96, rOuter = 88, dashLen = 11, total = 36;
  for (let i = 0; i < total; i++) {
    const rad = ((360 / total) * i - 90) * Math.PI / 180;
    const x1 = cx + (rOuter - dashLen) * Math.cos(rad);
    const y1 = cy + (rOuter - dashLen) * Math.sin(rad);
    const x2 = cx + rOuter * Math.cos(rad);
    const y2 = cy + rOuter * Math.sin(rad);
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1.toFixed(2));
    line.setAttribute('y1', y1.toFixed(2));
    line.setAttribute('x2', x2.toFixed(2));
    line.setAttribute('y2', y2.toFixed(2));
    line.setAttribute('stroke', '#ffffff');
    line.setAttribute('stroke-width', '5.5');
    line.setAttribute('stroke-linecap', 'round');
    svg.appendChild(line);
  }

  // Count-up helper
  function countUp(el, target, dur) {
    if (!el) return;
    const o = { v: 0 };
    gsap.to(o, {
      v: target,
      duration: dur,
      ease: 'power2.out',
      onUpdate() { el.textContent = Math.round(o.v); }
    });
  }


  gsap.set([card1, card2, card3], { opacity: 0, y: 60 });


  gsap.to(svg, {
      rotation: 360,
  duration: 8,
  ease: 'none',
  repeat: -1,
  transformOrigin: '50% 50%'
  });



  let triggered = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !triggered) {
        triggered = true;
        observer.disconnect();

        // Cards reveal
        gsap.to([card1, card2, card3], {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.14,
          ease: 'power3.out'
        });

      
        gsap.delayedCall(0.4, () => {
          countUp(pctEl, 65, 2.0);
          countUp(customersEl, 12, 1.8);
          countUp(countriesEl, 50, 1.8);
        });
      }
    });
  }, { threshold: 0.25 }); 

  observer.observe(resultSection);

  // Hover lift
  [card1, card2, card3].forEach(card => {
    card.addEventListener('mouseenter', () =>
      gsap.to(card, { y: -10, duration: 0.28, ease: 'power2.out' })
    );
    card.addEventListener('mouseleave', () =>
      gsap.to(card, { y: 0, duration: 0.4, ease: 'power2.inOut' })
    );
  });

})();








//text animation

    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll('.swipe-reveal').forEach(el => {

      // Read optional config from data attributes
      const boxColor   = el.dataset.swipeColor || '#111';
      const startPoint = el.dataset.swipeStart  || 'top 80%';

      // Apply custom box color via CSS variable
      el.style.setProperty('--swipe-color', boxColor);

      // Inject the sweeping box element
      const box = document.createElement('span');
      box.classList.add('swipe-reveal__box');
      el.prepend(box);

      // Wrap the existing content in an inner text span
      const inner = document.createElement('span');
      inner.classList.add('swipe-reveal__text');
      while (el.childNodes.length > 1) {
        inner.appendChild(el.childNodes[1]);
      }
      el.appendChild(inner);

      // Detect optional .swipe-subtitle on the next sibling
      const subtitle = el.nextElementSibling?.classList.contains('swipe-subtitle')
        ? el.nextElementSibling
        : null;

      // Build the GSAP timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: startPoint,
          toggleActions: 'play none none none',
        }
      });

      // Step 1 — box sweeps in from left
      tl.to(box, {
        width: '100%',
        duration: 0.45,
        ease: 'power2.inOut',
      });

      // Step 2 — text becomes visible (still hidden behind box)
      tl.to(inner, {
        opacity: 1,
        duration: 0.01,
      }, '>-0.05');

      // Step 3 — box exits to the right, revealing the text
      tl.to(box, {
        left: '100%',
        duration: 0.4,
        ease: 'power2.inOut',
      });

      // Step 4 — subtitle fades up (optional)
      if (subtitle) {
        tl.to(subtitle, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
        }, '-=0.1');
      }

    });


// ── Smooth scroll (Lenis) ──
if (typeof Lenis !== 'undefined') {
  const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.3,
    infinite: false,
  });

  if (typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
  }

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
}



