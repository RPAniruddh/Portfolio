(function (P) {
  const R = () => Math.random() * Math.PI * 2;

  P.ICONS = [
    // Ring 0 — innermost, CW
    { label: 'Java',        color: '#E76F00', ring: 0, phase: R() },
    { label: 'Spring Boot', color: '#6DB33F', ring: 0, phase: R() },
    { label: 'Docker',      color: '#2496ED', ring: 0, phase: R() },
    { label: 'Redis',       color: '#DC382D', ring: 0, phase: R() },
    { label: 'Kubernetes',  color: '#326CE5', ring: 0, phase: R() },

    // Ring 1 — second, CCW
    { label: 'Kafka',       color: '#231F20', ring: 1, phase: R() },
    { label: 'GraphQL',     color: '#E535AB', ring: 1, phase: R() },
    { label: 'AWS',         color: '#FF9900', ring: 1, phase: R() },
    { label: 'Git',         color: '#F05032', ring: 1, phase: R() },
    { label: 'PostgreSQL',  color: '#336791', ring: 1, phase: R() },
    { label: 'Maven',       color: '#C71A36', ring: 1, phase: R() },

    // Ring 2 — third, CW, tilted opposite
    { label: 'Hibernate',   color: '#6E7B8B', ring: 2, phase: R() },
    { label: 'Nginx',       color: '#009639', ring: 2, phase: R() },
    { label: 'Linux',       color: '#FCC624', ring: 2, phase: R() },
    { label: 'Gradle',      color: '#02303A', ring: 2, phase: R() },
    { label: 'Jenkins',     color: '#D33833', ring: 2, phase: R() },
    { label: 'Terraform',   color: '#7B42BC', ring: 2, phase: R() },

    // Ring 3 — outermost, CCW, near-flat
    { label: 'RabbitMQ',   color: '#FF6600', ring: 3, phase: R() },
    { label: 'Prometheus',  color: '#E6522C', ring: 3, phase: R() },
    { label: 'Grafana',     color: '#F46800', ring: 3, phase: R() },
    { label: 'MongoDB',     color: '#47A248', ring: 3, phase: R() },
    { label: 'Elasticsearch', color: '#005571', ring: 3, phase: R() },
  ];

  // rx/ry as fraction of viewport dimensions; tilt in degrees
  P.RING_DEF = [
    { baseSpeed: 0.38, dir:  1, rxF: 0.20, ryF: 0.09, tiltDeg:  15 },
    { baseSpeed: 0.22, dir: -1, rxF: 0.33, ryF: 0.15, tiltDeg:  -6 },
    { baseSpeed: 0.15, dir:  1, rxF: 0.46, ryF: 0.21, tiltDeg:  20 },
    { baseSpeed: 0.10, dir: -1, rxF: 0.60, ryF: 0.26, tiltDeg:  -4 },
  ];
})(window.Portfolio = window.Portfolio || {});
