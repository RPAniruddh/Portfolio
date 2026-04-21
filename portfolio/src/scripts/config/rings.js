(function (P) {
  const R = () => Math.random() * Math.PI * 2;

  P.ICONS = [
    // Ring 0 — inner, 6 icons, CW
    { label: 'Java',        color: '#E76F00', ring: 0, phase: R() },
    { label: 'Spring Boot', color: '#6DB33F', ring: 0, phase: R() },
    { label: 'Docker',      color: '#2496ED', ring: 0, phase: R() },
    { label: 'Redis',       color: '#DC382D', ring: 0, phase: R() },
    { label: 'Kubernetes',  color: '#326CE5', ring: 0, phase: R() },
    { label: 'PostgreSQL',  color: '#336791', ring: 0, phase: R() },

    // Ring 1 — outer, 6 icons, CCW
    { label: 'Kafka',       color: '#231F20', ring: 1, phase: R() },
    { label: 'GraphQL',     color: '#E535AB', ring: 1, phase: R() },
    { label: 'AWS',         color: '#FF9900', ring: 1, phase: R() },
    { label: 'Git',         color: '#F05032', ring: 1, phase: R() },
    { label: 'Hibernate',   color: '#6E7B8B', ring: 1, phase: R() },
    { label: 'Maven',       color: '#C71A36', ring: 1, phase: R() },
  ];

  // rx/ry as fraction of viewport dimensions; tilt in degrees
  P.RING_DEF = [
    { baseSpeed: 0.32, dir:  1, rxF: 0.26, ryF: 0.12, tiltDeg:  12 },
    { baseSpeed: 0.18, dir: -1, rxF: 0.42, ryF: 0.19, tiltDeg:  -8 },
  ];
})(window.Portfolio = window.Portfolio || {});
