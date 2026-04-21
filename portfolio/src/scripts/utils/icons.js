(function (P) {
  P.iconSVG = function (label, c) {
    const map = {

      'Java': `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 8c0 5-6 7-6 12s5 6 5 6" stroke="${c}" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M23 8c0 5 6 7 6 12s-5 6-5 6" stroke="${c}" stroke-width="1.8" stroke-linecap="round"/>
        <ellipse cx="20" cy="27" rx="6" ry="2.2" fill="${c}" opacity="0.9"/>
        <path d="M13 31.5c0 0 2.5-1.5 7-1.5s7 1.5 7 1.5" stroke="${c}" stroke-width="1.6" stroke-linecap="round"/>
        <path d="M11 35c0 0 4-2.2 9-2.2s9 2.2 9 2.2" stroke="${c}" stroke-width="1.6" stroke-linecap="round"/>
      </svg>`,

      'Spring Boot': `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="12" stroke="${c}" stroke-width="1.6"/>
        <path d="M20 8c-4 3-7 7-7 12s3 9 7 12" stroke="${c}" stroke-width="1.6" stroke-linecap="round"/>
        <path d="M20 8c4 3 7 7 7 12s-3 9-7 12" stroke="${c}" stroke-width="1.6" stroke-linecap="round"/>
        <circle cx="20" cy="20" r="3.5" fill="${c}"/>
        <path d="M8 20h24" stroke="${c}" stroke-width="1.4" stroke-linecap="round" opacity="0.4"/>
      </svg>`,

      'Docker': `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="7"  y="19" width="5" height="4.5" rx="1" fill="${c}"/>
        <rect x="13.5" y="19" width="5" height="4.5" rx="1" fill="${c}"/>
        <rect x="20" y="19" width="5" height="4.5" rx="1" fill="${c}"/>
        <rect x="13.5" y="13" width="5" height="4.5" rx="1" fill="${c}"/>
        <rect x="20" y="13" width="5" height="4.5" rx="1" fill="${c}"/>
        <path d="M31 20.5c0 0 1.8-1 1.8-3.5H29M7 24c0 4.5 3.5 7 8 7h9c5 0 7.5-3 7.5-7" stroke="${c}" stroke-width="1.6" stroke-linecap="round"/>
        <circle cx="30" cy="16" r="1.8" fill="${c}"/>
      </svg>`,

      'Redis': `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="20" cy="30" rx="11" ry="3.5" fill="${c}" opacity="0.18" stroke="${c}" stroke-width="1.4"/>
        <ellipse cx="20" cy="24" rx="11" ry="3.5" fill="${c}" opacity="0.42" stroke="${c}" stroke-width="1.4"/>
        <ellipse cx="20" cy="18" rx="11" ry="3.5" fill="${c}" opacity="0.72" stroke="${c}" stroke-width="1.4"/>
        <ellipse cx="20" cy="13" rx="11" ry="3.5" fill="${c}" opacity="0.92" stroke="${c}" stroke-width="1.4"/>
      </svg>`,

      'Kubernetes': `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="11.5" stroke="${c}" stroke-width="1.5"/>
        <circle cx="20" cy="20" r="3.2"  fill="${c}"/>
        ${Array.from({length:7},(_,i)=>{
          const a = i*Math.PI*2/7 - Math.PI/2;
          const x1=20+3.8*Math.cos(a), y1=20+3.8*Math.sin(a);
          const x2=20+10.5*Math.cos(a), y2=20+10.5*Math.sin(a);
          return `<line x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}" stroke="${c}" stroke-width="1.5"/>
                  <circle cx="${x2.toFixed(2)}" cy="${y2.toFixed(2)}" r="1.8" fill="${c}"/>`;
        }).join('')}
      </svg>`,

      'PostgreSQL': `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="19" cy="12" rx="9.5" ry="3.8" stroke="${c}" stroke-width="1.5"/>
        <path d="M9.5 12v14c0 2.5 4.5 4.5 9.5 4.5s9.5-2 9.5-4.5V12" stroke="${c}" stroke-width="1.5"/>
        <path d="M9.5 19c0 2.5 4.5 4.5 9.5 4.5s9.5-2 9.5-4.5" stroke="${c}" stroke-width="1.4" opacity="0.5"/>
        <path d="M28.5 11v-4.5c0 0 4.5 0 4.5 4s-4.5 3.8-4.5 3.8" stroke="${c}" stroke-width="1.5" stroke-linecap="round"/>
      </svg>`,

      'Kafka': `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="4"   fill="${c}"/>
        <circle cx="20" cy="7"  r="3"   stroke="${c}" stroke-width="1.4"/>
        <circle cx="20" cy="33" r="3"   stroke="${c}" stroke-width="1.4"/>
        <circle cx="8"  cy="27" r="3"   stroke="${c}" stroke-width="1.4"/>
        <circle cx="32" cy="27" r="3"   stroke="${c}" stroke-width="1.4"/>
        <circle cx="8"  cy="13" r="3"   stroke="${c}" stroke-width="1.4"/>
        <circle cx="32" cy="13" r="3"   stroke="${c}" stroke-width="1.4"/>
        <line x1="20" y1="16"   x2="20" y2="10"  stroke="${c}" stroke-width="1.2"/>
        <line x1="20" y1="24"   x2="20" y2="30"  stroke="${c}" stroke-width="1.2"/>
        <line x1="16.5" y1="22" x2="11" y2="25.5" stroke="${c}" stroke-width="1.2"/>
        <line x1="23.5" y1="22" x2="29" y2="25.5" stroke="${c}" stroke-width="1.2"/>
        <line x1="16.5" y1="18" x2="11" y2="14.5" stroke="${c}" stroke-width="1.2"/>
        <line x1="23.5" y1="18" x2="29" y2="14.5" stroke="${c}" stroke-width="1.2"/>
      </svg>`,

      'GraphQL': `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${(()=>{
          const pts=Array.from({length:6},(_,i)=>{
            const a=i*Math.PI/3-Math.PI/6;
            return {x:20+13*Math.cos(a), y:20+13*Math.sin(a)};
          });
          const hex=pts.map((p,i)=>`${i===0?'M':'L'}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ')+'Z';
          const lines=pts.map(p=>`<line x1="20" y1="20" x2="${p.x.toFixed(2)}" y2="${p.y.toFixed(2)}" stroke="${c}" stroke-width="1.4" opacity="0.5"/>`).join('');
          const dots=pts.map(p=>`<circle cx="${p.x.toFixed(2)}" cy="${p.y.toFixed(2)}" r="2.6" fill="${c}"/>`).join('');
          return `<path d="${hex}" stroke="${c}" stroke-width="1.5"/>
                  ${lines}${dots}<circle cx="20" cy="20" r="3" fill="${c}"/>`;
        })()}
      </svg>`,

      'AWS': `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 22c0-3.5 2.8-6 6-6 .3 0 .6 0 .9.1C18.7 13.8 21.2 12 24 12c3.3 0 6 2.7 6 6 0 .2 0 .4-.1.6 1.8.5 3.1 2.1 3.1 4 0 2.8-2.3 5-5 5H13c-1.7 0-2-1.5-2-3.5z" fill="${c}" opacity="0.15" stroke="${c}" stroke-width="1.5"/>
        <path d="M14 31.5c0 0 2.5-1 6-1s6 1 6 1" stroke="${c}" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M11.5 33.5l2.5-2M28.5 33.5l-2.5-2" stroke="${c}" stroke-width="1.8" stroke-linecap="round"/>
      </svg>`,

      'Git': `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="9"  r="3.8" stroke="${c}" stroke-width="1.6"/>
        <circle cx="12" cy="31" r="3.8" stroke="${c}" stroke-width="1.6"/>
        <circle cx="28" cy="31" r="3.8" stroke="${c}" stroke-width="1.6"/>
        <path d="M20 12.8V21" stroke="${c}" stroke-width="1.6" stroke-linecap="round"/>
        <path d="M20 21L12 27.2M20 21L28 27.2" stroke="${c}" stroke-width="1.6" stroke-linecap="round"/>
      </svg>`,

      'Hibernate': `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 5.5l12 6v17l-12 6-12-6v-17l12-6z" stroke="${c}" stroke-width="1.5" fill="${c}" fill-opacity="0.07"/>
        <path d="M14 14v12M26 14v12" stroke="${c}" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M14 20h12"           stroke="${c}" stroke-width="2.2" stroke-linecap="round"/>
      </svg>`,

      'Maven': `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 33L20 9l10 24" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M13.5 24.5h13" stroke="${c}" stroke-width="1.6" stroke-linecap="round"/>
        <circle cx="20" cy="9" r="2.5" fill="${c}"/>
      </svg>`,
    };
    return map[label] || `<svg viewBox="0 0 40 40"><text x="20" y="26" text-anchor="middle" fill="${c}" font-size="15" font-family="Inter">${label[0]}</text></svg>`;
  };
})(window.Portfolio);
