(function (P) {
  P.initExperience = function () {
    // Word-split drawer paragraphs
    document.querySelectorAll('.exp-drawer-text').forEach(function (p) {
      p.innerHTML = p.innerHTML.replace(/(<[^>]+>|[^<\s]+)/g, function (token) {
        if (token.startsWith('<')) return token;
        return '<span class="edw-wrap" style="overflow:hidden;display:inline-block;vertical-align:bottom;">' +
               '<span class="edw" style="display:inline-block;transform:translateY(110%);">' + token + '</span></span> ';
      });
    });

    function animateDrawerWords(drawer) {
      gsap.to(drawer.querySelectorAll('.edw'), {
        y: '0%', duration: 0.5, stagger: 0.022, ease: 'power3.out', delay: 0.3,
      });
    }

    function resetDrawerWords(drawer) {
      gsap.set(drawer.querySelectorAll('.edw'), { y: '110%' });
    }

    // Heading reveal
    gsap.utils.toArray('.exp-heading-word-inner').forEach(function (el, i) {
      gsap.to(el, {
        y: '0%', duration: 1.1, ease: 'power4.out', delay: i * 0.12,
        scrollTrigger: { trigger: '.exp-heading-section', start: 'top 84%' },
      });
    });
    gsap.from('.exp-heading-meta span', {
      y: 14, opacity: 0, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: '.exp-heading-section', start: 'top 84%' },
    });

    // Entry stagger in
    gsap.utils.toArray('.exp-entry').forEach(function (entry, i) {
      gsap.to(entry, {
        opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', delay: i * 0.08,
        scrollTrigger: { trigger: entry, start: 'top 88%' },
        onStart: function () {
          gsap.to(entry.querySelector('.exp-entry-company'), {
            y: '0%', duration: 0.9, ease: 'power4.out', delay: 0.1,
          });
        },
      });
    });

    // Click expand/collapse
    var openEntry = null;

    document.querySelectorAll('.exp-entry').forEach(function (entry) {
      entry.addEventListener('click', function () {
        var drawer = entry.querySelector('.exp-entry-drawer');
        var inner  = entry.querySelector('.exp-drawer-inner');
        var isOpen = entry.classList.contains('open');

        if (openEntry && openEntry !== entry) {
          var prevDrawer = openEntry.querySelector('.exp-entry-drawer');
          gsap.to(prevDrawer, { height: 0, duration: 0.46, ease: 'power3.inOut' });
          resetDrawerWords(prevDrawer);
          openEntry.classList.remove('open');
        }

        if (isOpen) {
          gsap.to(drawer, { height: 0, duration: 0.46, ease: 'power3.inOut' });
          resetDrawerWords(drawer);
          entry.classList.remove('open');
          openEntry = null;
        } else {
          gsap.set(drawer, { height: 'auto' });
          var h = drawer.offsetHeight;
          gsap.fromTo(drawer, { height: 0 }, { height: h, duration: 0.56, ease: 'power3.inOut' });
          gsap.fromTo(inner.children,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, stagger: 0.09, duration: 0.48, ease: 'power3.out', delay: 0.2 }
          );
          animateDrawerWords(drawer);
          entry.classList.add('open');
          openEntry = entry;
        }
      });
    });
  };
})(window.Portfolio);
