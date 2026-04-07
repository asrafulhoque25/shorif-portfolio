const navbar = document.getElementById('navbar');

if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('backdrop-blur-md', 'bg-white/90', 'shadow-sm');
            navbar.classList.remove('py-6', 'lg:py-10');
            navbar.classList.add('py-4');
        } else {
            navbar.classList.remove('backdrop-blur-md', 'bg-white/90', 'shadow-sm');
            navbar.classList.remove('py-4');
            navbar.classList.add('py-6', 'lg:py-10');
        }
    });
}

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
            navbar.classList.add('bg-white');
        } else {
            mobileMenu.style.maxHeight = '0';
            hamTop.style.transform = '';
            hamMid.style.opacity = '';
            hamMid.style.transform = '';
            hamBot.style.width = '';
            hamBot.style.transform = '';
            if (window.scrollY <= 20) {
                navbar.classList.remove('bg-white');
            }
        }
    };

    hamburger.addEventListener('click', toggleMenu);

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (menuOpen) toggleMenu();
        });
    });
}
 
 
 
 
 // ── Button animation using GSAP ──
 // সব .btn-slide এ একসাথে কাজ করবে
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

// Page load reveal — সব button এ stagger দিয়ে
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



