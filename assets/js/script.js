// ── Navbar scroll blur ──
const navbar = document.getElementById('navbar');

if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('backdrop-blur-md', 'bg-[#070d1e]/90', 'shadow-lg');
            navbar.classList.remove('py-6', 'lg:py-10');
            navbar.classList.add('py-4');
        } else {
            navbar.classList.remove('backdrop-blur-md', 'bg-[#070d1e]/90', 'shadow-lg');
            navbar.classList.remove('py-4');
            navbar.classList.add('py-6', 'lg:py-10');
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
            mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
            hamTop.style.transform = 'translateY(7px) rotate(45deg)';
            hamMid.style.opacity = '0';
            hamMid.style.transform = 'scaleX(0)';
            hamBot.style.width = '24px';
            hamBot.style.transform = 'translateY(-7px) rotate(-45deg)';
            // Adding a background to navbar when menu is open (if not scrolled)
            navbar.classList.add('bg-[#070d1e]');
        } else {
            mobileMenu.style.maxHeight = '0';
            hamTop.style.transform = '';
            hamMid.style.opacity = '';
            hamMid.style.transform = '';
            hamBot.style.width = '';
            hamBot.style.transform = '';
            if (window.scrollY <= 20) {
                navbar.classList.remove('bg-[#070d1e]');
            }
        }
    };

    hamburger.addEventListener('click', toggleMenu);

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (menuOpen) toggleMenu();
        });
    });
}

// ── Manifesto cards hover effect ──
const cards = document.querySelectorAll('.manifesto-card');

if (cards.length > 0) {
  let activeCard = document.querySelector('.manifesto-card.is-active') || cards[0];

  function activateCard(newCard) {
    if (newCard === activeCard) return;

    const oldCard = activeCard;
    activeCard = newCard;

    newCard.classList.add('is-active');

    setTimeout(() => {
      oldCard.classList.remove('is-active');
    }, 500);
  }

  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      activateCard(card);
    });
  });
}


// ── Service rows ──
const svcRows = document.querySelectorAll('.svc-row');

if (svcRows.length > 0) {
  // Assign bg images & preload
  svcRows.forEach(row => {
    row.querySelector('.svc-bg').style.backgroundImage = `url(${row.dataset.img})`;
    new Image().src = row.dataset.img;
  });

  // Entrance animation
  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .to('.svc-row', { opacity: 1, y: 0, duration: 0.6, stagger: 0.09 }, '-=0.45');

  // Hover animations
  svcRows.forEach(row => {
    const bg      = row.querySelector('.svc-bg');
    const overlay = row.querySelector('.svc-overlay');
    const shimmer = row.querySelector('.svc-shimmer');
    const name    = row.querySelector('.svc-name');
    const descs   = row.querySelectorAll('[class*="text-white/60"]');
    const num     = row.querySelector('.svc-num');

    row.addEventListener('mouseenter', () => {
      gsap.killTweensOf([bg, overlay, shimmer, name]);
      gsap.to(bg,      { opacity: 1, scale: 1,    duration: 0.65, ease: 'power2.out' });
      gsap.to(overlay, { opacity: 1,               duration: 0.5,  ease: 'power2.out' });
      gsap.fromTo(shimmer,
        { left: '-70%', opacity: 1 },
        { left: '120%', opacity: 1, duration: 0.75, ease: 'power1.inOut' }
      );
      gsap.to(name, { y: -4, duration: 0.4, ease: 'power2.out' });
      gsap.to([...descs, num], { color: 'rgba(255,255,255,0.9)', duration: 0.35 });
    });

    row.addEventListener('mouseleave', () => {
      gsap.killTweensOf([bg, overlay, name, ...descs, num]);
      gsap.to(bg,      { opacity: 0, scale: 1.08,       duration: 0.55, ease: 'power2.inOut' });
      gsap.to(overlay, { opacity: 0,                     duration: 0.4,  ease: 'power2.in' });
      gsap.to(name,    { y: 0,                           duration: 0.35, ease: 'power2.out' });
      gsap.to(descs,   { color: 'rgba(255,255,255,0.6)', duration: 0.35 });
      gsap.to(num,     { color: 'rgba(255,255,255,0.5)', duration: 0.35 });
    });
  });
}


// ── Counter section ──
const statsSection = document.getElementById('stats');

if (statsSection) {
  let animated = false;

  function startAnimation() {
    if (animated) return;
    animated = true;

    const statCards = document.querySelectorAll('.stat-card');

    gsap.to(statCards, {
      opacity: 1,
      y: 0,
      duration: 0.65,
      ease: 'power3.out',
      stagger: 0.13,
    });

    document.querySelectorAll('.counter').forEach((el, i) => {
      const target = parseInt(el.dataset.target);
      const pad    = parseInt(el.dataset.pad || 0);

      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 2,
        ease: 'power2.out',
        delay: 0.2 + i * 0.1,
        onUpdate() {
          const v = Math.round(obj.val);
          el.textContent = pad ? String(v).padStart(pad, '0') : v;
        },
        onComplete() {
          el.textContent = pad ? String(target).padStart(pad, '0') : target;
        }
      });
    });
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startAnimation();
        counterObserver.disconnect();
      }
    });
  }, { threshold: 0.2 });

  counterObserver.observe(statsSection);
}


// ── Design Philosophy section ──
(function initDesignPhilosophySection() {
  const section = document.getElementById('philosophy-section');
  if (!section) return;
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  const q    = (sel) => section.querySelector(sel);
  const qAll = (sel) => section.querySelectorAll(sel);

  const designTitle = q('.design-title');
  if (designTitle) {
    gsap.to(designTitle, {
      scrollTrigger: { trigger: section, start: 'top 80%', once: true },
      opacity: 1, y: 0,
      duration: 1, ease: 'power4.out',
    });
  }

  const processCards = qAll('.process-card');
  if (processCards.length > 0) {
    gsap.to(processCards, {
      scrollTrigger: { trigger: section, start: 'top 75%', once: true },
      opacity: 1, y: 0,
      duration: 0.8, stagger: 0.15,
      ease: 'power3.out',
    });
  }
})();


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


// ── Testimonial slider ──
const splideEl = document.getElementById('testimonial-splide');

if (splideEl) {
  const splide = new Splide('#testimonial-splide', {
    type       : 'loop',
    drag       : 'free',
    focus      : 'center',
    perPage    : 2,
    gap        : '12px',
    arrows     : false,
    pagination : false,
    autoScroll : {
      speed        : 1,
      pauseOnHover : true,
      pauseOnFocus : true,
    },
    breakpoints: {
      1536: { perPage: 2 },
      1280: { perPage: 4 },
      1024: { perPage: 3, gap: '10px' },
      768 : { perPage: 2.5 },
      640 : { perPage: 1.5, gap: '8px' },
    },
  });

  if (window.Splide && window.Splide.Extensions) {
    splide.mount(window.Splide.Extensions);
  } else {
    splide.mount();
  }

  // ── Video hover play ──
  const videoCards = document.querySelectorAll('.video-card');

  if (videoCards.length > 0) {
    videoCards.forEach(card => {
      const video = card.querySelector('.video-element');
      if (!video) return;

      let isPlaying = false;

      card.addEventListener('mouseenter', function () {
        if (!isPlaying) {
          video.currentTime = 0;
          video.play().catch(err => console.log('Video play error:', err));
          card.classList.add('is-playing');
          isPlaying = true;
        }
      });

      card.addEventListener('mouseleave', function () {
        if (isPlaying) {
          video.pause();
          video.currentTime = 0;
          card.classList.remove('is-playing');
          isPlaying = false;
        }
      });

      video.addEventListener('ended', function () {
        if (isPlaying) {
          video.currentTime = 0;
          video.play();
        }
      });
    });

    // Slider move হলে সব video pause করো
    splide.on('move', function () {
      videoCards.forEach(card => {
        const video = card.querySelector('.video-element');
        if (video) {
          video.pause();
          video.currentTime = 0;
          card.classList.remove('is-playing');
        }
      });
    });
  }
}


// ── Skill rating boxes ──
const skillRows = document.querySelectorAll('.skill-row');

if (skillRows.length > 0) {
  skillRows.forEach((row) => {
    const rating = parseInt(row.dataset.rating, 10);
    const boxes  = row.querySelectorAll('.rating-box');

    const tl = gsap.timeline({ paused: true });

    boxes.forEach((box, i) => {
      const isFilled = i < rating;

      if (isFilled) {
        tl.to(box, {
          '--fill': '1',
          duration: 0,
          onStart: () => {
            gsap.to(box, {
              duration: 0.35,
              ease: 'power2.out',
              onStart: () => {
                box.classList.add('filled');
                box.style.background = 'transparent';
              }
            });
          }
        }, i * 0.12);
      }
    });

    // ScrollTrigger for each row
    ScrollTrigger.create({
      trigger: row,
      start: 'top 85%',
      onEnter: () => {
        const boxes = row.querySelectorAll('.rating-box');
        boxes.forEach((box, i) => {
          const isFilled = i < rating;
          if (isFilled) {
            gsap.to(box, {
              delay: i * 0.13,
              duration: 0,
              onComplete: () => {
                gsap.fromTo(
                  box,
                  { '--scale': 0 },
                  {
                    duration: 0.4,
                    ease: 'power3.out',
                    onStart: () => {
                      box.classList.add('filled');
                      box.style.background = 'transparent';
                    }
                  }
                );
              }
            });
          }
        });
      },
      onLeaveBack: () => {
        row.querySelectorAll('.rating-box').forEach(box => {
          box.classList.remove('filled');
          box.style.background = '';
        });
      }
    });

    // Hover: re-animate boxes
    row.addEventListener('mouseenter', () => {
      const boxes = row.querySelectorAll('.rating-box');
      boxes.forEach((box, i) => {
        if (i < rating) {
          box.classList.remove('filled');
          box.style.background = 'transparent';
          gsap.delayedCall(i * 0.08, () => {
            box.classList.add('filled');
            gsap.fromTo(box, { scale: 0.7, opacity: 0.4 }, {
              scale: 1,
              opacity: 1,
              duration: 0.3,
              ease: 'back.out(2)'
            });
          });
        }
      });
    });
  });
}


// ── Ripple hover effect ──
class RippleHover {
  constructor(element, options = {}) {
    this.el     = element;
    this.canvas = element.querySelector('.ripple-canvas');
    this.ctx    = this.canvas.getContext('2d');
    this.ripples = [];

    this.settings = {
      maxSize        : options.maxSize        ?? 80,
      animationSpeed : options.animationSpeed ?? 4,
      strokeColor    : options.strokeColor    ?? [148, 217, 255],
    };

    this._resize();
    this._bindEvents();
    this._loop();
  }

  _resize() {
    const rect = this.el.getBoundingClientRect();

    this.canvas.width        = rect.width;
    this.canvas.height       = rect.height;
    this.canvas.style.width  = rect.width  + 'px';
    this.canvas.style.height = rect.height + 'px';
    this.canvas.style.position = 'absolute';
    this.canvas.style.top      = '0';
    this.canvas.style.left     = '0';
  }

  _bindEvents() {
    this._onMouseMove = (e) => {
      const rect = this.el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      this.ripples.unshift(
        new _Ripple(x, y, 2, this.ctx, this.settings)
      );
    };
    this.el.addEventListener('mousemove', this._onMouseMove);
    window.addEventListener('resize', () => this._resize());
  }

  _loop() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = this.ripples.length - 1; i >= 0; i--) {
      this.ripples[i].update();
      this.ripples[i].draw();
      if (this.ripples[i].opacity <= 0) this.ripples.splice(i, 1);
    }
    requestAnimationFrame(() => this._loop());
  }

  static initAll(selector = '.ripple-hover', options = {}) {
    document.querySelectorAll(selector).forEach(el => new RippleHover(el, options));
  }
}

class _Ripple {
  constructor(x, y, circleSize, ctx, settings) {
    this.x          = x;
    this.y          = y;
    this.circleSize = circleSize;
    this.maxSize    = settings.maxSize;
    this.opacity    = 1;
    this.ctx        = ctx;
    this.speed      = settings.animationSpeed;
    this.color      = settings.strokeColor;
    this.opacityStep = (this.speed / (this.maxSize - circleSize)) / 2;
  }
  update() { this.circleSize += this.speed; this.opacity -= this.opacityStep; }
  draw() {
    const [r, g, b] = this.color;
    this.ctx.beginPath();
    this.ctx.strokeStyle = `rgba(${r},${g},${b},${this.opacity})`;
    this.ctx.lineWidth = 1.5;
    this.ctx.arc(this.x, this.y, this.circleSize, 0, Math.PI * 2);
    this.ctx.stroke();
  }
}

window.addEventListener('load', () => {
  setTimeout(() => {
    RippleHover.initAll('.ripple-hover');
  }, 100);
});




// case study tab section switch

(function initTabFilter() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const grid       = document.getElementById('project-grid');

  if (!tabButtons.length || !grid) return;

  // সব items একবারেই collect করে রাখো — DOM থেকে উঠে গেলেও array তে থাকবে
  const allItems = Array.from(grid.querySelectorAll('.project-item'));

  if (!allItems.length) return;

  function applyFilter(filter) {
    // Grid পুরো খালি করো
    grid.innerHTML = '';

    // Match করা items বের করো
    const matched = filter === 'all'
      ? allItems
      : allItems.filter(item => item.dataset.category === filter);

    // Transition বন্ধ রেখে initial (invisible) state এ DOM এ বসাও
    matched.forEach(item => {
      item.style.transition = 'none';
      item.style.opacity    = '0';
      item.style.transform  = 'translateY(16px)';
      grid.appendChild(item);
    });

    // Double rAF — browser কে layout calculate করার সুযোগ দাও, তারপর animate in
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        matched.forEach(item => {
          item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          item.style.opacity    = '1';
          item.style.transform  = 'translateY(0)';
        });
      });
    });
  }

  // Page load এ প্রথমবার সব দেখাও
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

const pings  = [...document.querySelectorAll('[data-ping]')]
                         .sort((a, b) => +a.dataset.ping - +b.dataset.ping);

        const BETWEEN = 300;   // gap between each card (ms)
        const PAUSE   = 4000;  // idle time after full sequence (ms)

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