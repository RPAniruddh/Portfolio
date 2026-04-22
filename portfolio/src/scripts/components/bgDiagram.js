(function (P) {
  P.initBgDiagram = function () {
    const canvas = document.createElement('canvas');
    canvas.id = 'bgCanvas';
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;';
    document.body.insertBefore(canvas, document.body.firstChild);
    const ctx = canvas.getContext('2d');

    let W, H;
    function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
    window.addEventListener('resize', resize);
    resize();

    const C_LINE    = 'rgba(154,176,200,0.09)';
    const C_TEXT    = 'rgba(226,221,216,0.11)';
    const C_ACCENT  = 'rgba(57,211,83,0.11)';
    const C_DASHED  = 'rgba(154,176,200,0.06)';

    // ── UML Class nodes ──────────────────────────────────
    const NODES = [
      {
        id: 'base',
        stereotype: '«abstract»',
        name: 'BaseEntity',
        attrs: ['id: Long {id}', 'createdAt: Instant', 'updatedAt: Instant'],
        x: 0.07, y: 0.15,
      },
      {
        id: 'user',
        stereotype: '«entity»',
        name: 'User',
        attrs: ['username: String', 'email: String', 'role: UserRole'],
        x: 0.08, y: 0.44,
      },
      {
        id: 'userservice',
        name: 'UserService',
        attrs: ['- userRepo: UserRepository', '- orderRepo: OrderRepository'],
        methods: ['+ findById(id): User', '+ createUser(): User'],
        x: 0.32, y: 0.13,
      },
      {
        id: 'order',
        stereotype: '«entity»',
        name: 'Order',
        attrs: ['status: OrderStatus', 'total: BigDecimal', 'placedAt: Instant'],
        x: 0.34, y: 0.44,
      },
      {
        id: 'orderitem',
        stereotype: '«entity»',
        name: 'OrderItem',
        attrs: ['quantity: int', 'unitPrice: BigDecimal'],
        x: 0.22, y: 0.74,
      },
      {
        id: 'product',
        name: 'Product',
        attrs: ['sku: String', 'name: String', 'price: BigDecimal', 'stock: int'],
        x: 0.50, y: 0.72,
      },
      {
        id: 'orderstatus',
        stereotype: '«enumeration»',
        name: 'OrderStatus',
        attrs: ['PENDING', 'CONFIRMED', 'SHIPPED', 'CANCELLED'],
        x: 0.70, y: 0.15,
      },
      {
        id: 'userrole',
        stereotype: '«enumeration»',
        name: 'UserRole',
        attrs: ['ADMIN', 'USER', 'MANAGER'],
        x: 0.72, y: 0.44,
      },
      {
        id: 'userrepo',
        stereotype: '«interface»',
        name: 'UserRepository',
        attrs: ['+ findByEmail(): User', '+ existsByUsername(): boolean'],
        x: 0.10, y: 0.86,
      },
      {
        id: 'orderrepo',
        stereotype: '«interface»',
        name: 'OrderRepository',
        attrs: ['+ findByUser(): List', '+ findByStatus(): List'],
        x: 0.40, y: 0.86,
      },
      {
        id: 'search',
        stereotype: '«interface»',
        name: 'Searchable',
        attrs: ['+ search(query): List', '+ filter(params): List'],
        x: 0.72, y: 0.72,
      },
      {
        id: 'controller',
        name: 'ApiController',
        attrs: ['- userService: UserService'],
        methods: ['+ getUser(): ResponseEntity', '+ createOrder(): ResponseEntity'],
        x: 0.68, y: 0.86,
      },
    ];

    // ── Relationships ────────────────────────────────────
    // types: 'generalization' | 'composition' | 'aggregation' | 'association' | 'dependency' | 'realization'
    const EDGES = [
      { from: 'user',        to: 'base',        type: 'generalization' },
      { from: 'order',       to: 'base',        type: 'generalization' },
      { from: 'product',     to: 'base',        type: 'generalization' },
      { from: 'user',        to: 'order',       type: 'association',   label: 'places',   mFrom: '1', mTo: '0..*' },
      { from: 'order',       to: 'orderitem',   type: 'composition',   label: 'contains', mFrom: '1', mTo: '1..*' },
      { from: 'orderitem',   to: 'product',     type: 'association',   label: 'refs',     mFrom: '*', mTo: '1'    },
      { from: 'order',       to: 'orderstatus', type: 'dependency',    label: '«use»'  },
      { from: 'user',        to: 'userrole',    type: 'dependency',    label: '«use»'  },
      { from: 'user',        to: 'userrepo',    type: 'realization'   },
      { from: 'order',       to: 'orderrepo',   type: 'realization'   },
      { from: 'userservice', to: 'userrepo',    type: 'dependency',    label: '«use»'  },
      { from: 'userservice', to: 'orderrepo',   type: 'dependency',    label: '«use»'  },
      { from: 'controller',  to: 'userservice', type: 'dependency',    label: '«use»'  },
      { from: 'product',     to: 'search',      type: 'realization'   },
    ];

    // ── Packet animations along associations ─────────────
    const PACKETS = EDGES
      .filter(function (e) { return e.type === 'association' || e.type === 'dependency'; })
      .map(function (e) { return { edge: e, t: Math.random(), speed: 0.0004 + Math.random() * 0.0004 }; });

    function getNode(id) { return NODES.find(function (n) { return n.id === id; }); }

    // ── Measure & cache box dimensions ──────────────────
    function measureNode(n) {
      const fs  = Math.max(8, W * 0.007);
      const sfs = fs * 0.82;
      ctx.font = `${sfs}px 'Courier New', monospace`;
      const sw  = n.stereotype ? ctx.measureText(n.stereotype).width : 0;
      ctx.font  = `600 ${fs}px 'Courier New', monospace`;
      const nw  = ctx.measureText(n.name).width;
      ctx.font  = `${sfs}px 'Courier New', monospace`;
      const aw  = Math.max(...(n.attrs || []).concat(n.methods || []).map(function (a) { return ctx.measureText(a).width; }), 0);
      const pad = 10;
      const bw  = Math.max(sw, nw, aw) + pad * 2;
      const rows = (n.stereotype ? 1 : 0) + 1 + (n.attrs || []).length + (n.methods ? 1 + n.methods.length : 0);
      const bh  = rows * (sfs + 4) + pad * 2 + (n.attrs && n.attrs.length ? 6 : 0);
      n._w = bw; n._h = bh; n._fs = fs; n._sfs = sfs; n._pad = pad;
    }

    function drawNode(n) {
      const x = n.x * W, y = n.y * H;
      const { _w: bw, _h: bh, _fs: fs, _sfs: sfs, _pad: pad } = n;
      const lx = x - bw / 2, ty = y - bh / 2;
      const lineH = sfs + 4;

      // Box fill + border
      ctx.fillStyle   = 'rgba(14,17,23,0.25)';
      ctx.globalAlpha = 1;
      ctx.fillRect(lx, ty, bw, bh);
      ctx.strokeStyle = C_LINE;
      ctx.lineWidth   = 0.8;
      ctx.strokeRect(lx, ty, bw, bh);

      let cy = ty + pad;

      // Stereotype
      if (n.stereotype) {
        ctx.font      = `${sfs}px 'Courier New', monospace`;
        ctx.fillStyle = C_ACCENT;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.globalAlpha  = 1;
        ctx.fillText(n.stereotype, x, cy);
        cy += lineH;
      }

      // Class name
      ctx.font      = `600 ${fs}px 'Courier New', monospace`;
      ctx.fillStyle = C_TEXT;
      ctx.textAlign = 'center';
      ctx.fillText(n.name, x, cy);
      cy += lineH + 4;

      // Divider under name
      ctx.beginPath();
      ctx.moveTo(lx, cy - 2); ctx.lineTo(lx + bw, cy - 2);
      ctx.strokeStyle = C_LINE; ctx.lineWidth = 0.6;
      ctx.stroke();

      // Attributes
      ctx.font      = `${sfs}px 'Courier New', monospace`;
      ctx.fillStyle = C_TEXT;
      ctx.textAlign = 'left';
      (n.attrs || []).forEach(function (a) {
        ctx.fillText(a, lx + pad, cy);
        cy += lineH;
      });

      // Methods (with divider)
      if (n.methods && n.methods.length) {
        ctx.beginPath();
        ctx.moveTo(lx, cy); ctx.lineTo(lx + bw, cy);
        ctx.strokeStyle = C_LINE; ctx.stroke();
        cy += 2;
        ctx.fillStyle = C_TEXT;
        n.methods.forEach(function (m) {
          ctx.fillText(m, lx + pad, cy);
          cy += lineH;
        });
      }

      ctx.globalAlpha = 1;
    }

    // ── Arrow / end markers ───────────────────────────────
    function drawHollowTriangle(x, y, angle) {
      const s = 10;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-s, s * 0.55);
      ctx.lineTo(-s, -s * 0.55);
      ctx.closePath();
      ctx.fillStyle   = 'rgba(14,17,23,1)';
      ctx.fill();
      ctx.strokeStyle = C_LINE;
      ctx.lineWidth   = 0.8;
      ctx.stroke();
      ctx.restore();
    }

    function drawOpenArrow(x, y, angle) {
      const s = 8;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(-s, -s * 0.55);
      ctx.lineTo(0, 0);
      ctx.lineTo(-s,  s * 0.55);
      ctx.strokeStyle = C_LINE;
      ctx.lineWidth   = 0.8;
      ctx.stroke();
      ctx.restore();
    }

    function drawDiamond(x, y, angle, filled) {
      const s = 9;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-s, s * 0.45);
      ctx.lineTo(-s * 1.9, 0);
      ctx.lineTo(-s, -s * 0.45);
      ctx.closePath();
      ctx.fillStyle   = filled ? C_ACCENT : 'rgba(14,17,23,1)';
      ctx.fill();
      ctx.strokeStyle = C_LINE;
      ctx.lineWidth   = 0.8;
      ctx.stroke();
      ctx.restore();
    }

    // Edge point on the border of a node box given direction angle
    function edgePoint(n, angle) {
      const cx = n.x * W, cy = n.y * H;
      const hw = n._w / 2, hh = n._h / 2;
      const dx = Math.cos(angle), dy = Math.sin(angle);
      const tx = dx !== 0 ? hw / Math.abs(dx) : Infinity;
      const ty = dy !== 0 ? hh / Math.abs(dy) : Infinity;
      const t  = Math.min(tx, ty);
      return [cx + dx * t, cy + dy * t];
    }

    function drawEdge(e) {
      const a = getNode(e.from), b = getNode(e.to);
      if (!a || !b || !a._w) return;

      const ax = a.x * W, ay = a.y * H, bx = b.x * W, by = b.y * H;
      const angle   = Math.atan2(by - ay, bx - ax);
      const [x1,y1] = edgePoint(a,  angle);
      const [x2,y2] = edgePoint(b,  angle + Math.PI);
      const isDash  = e.type === 'dependency' || e.type === 'realization';

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = isDash ? C_DASHED : C_LINE;
      ctx.lineWidth   = 0.75;
      ctx.setLineDash(isDash ? [4, 7] : []);
      ctx.stroke();
      ctx.setLineDash([]);

      // End marker at target (b)
      const backAngle = angle + Math.PI;
      if (e.type === 'generalization' || e.type === 'realization') {
        drawHollowTriangle(x2, y2, backAngle);
      } else if (e.type === 'association' || e.type === 'dependency') {
        drawOpenArrow(x2, y2, backAngle);
      } else if (e.type === 'composition') {
        drawDiamond(x1, y1, angle, true);
        drawOpenArrow(x2, y2, backAngle);
      } else if (e.type === 'aggregation') {
        drawDiamond(x1, y1, angle, false);
        drawOpenArrow(x2, y2, backAngle);
      }

      // Label
      const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
      if (e.label) {
        const fs = Math.max(7, W * 0.0058);
        ctx.font      = `${fs}px 'Courier New', monospace`;
        ctx.fillStyle = C_ACCENT;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.globalAlpha  = 1;
        ctx.fillText(e.label, mx, my - 3);
        ctx.globalAlpha = 1;
      }

      // Multiplicity
      const mfs = Math.max(7, W * 0.0055);
      ctx.font      = `${mfs}px 'Courier New', monospace`;
      ctx.fillStyle = C_TEXT;
      ctx.globalAlpha = 1;
      const off = 12;
      const nx  = -Math.sin(angle), ny = Math.cos(angle);
      if (e.mFrom) {
        ctx.textAlign = 'center';
        ctx.fillText(e.mFrom, x1 + Math.cos(angle) * off + nx * off, y1 + Math.sin(angle) * off + ny * off);
      }
      if (e.mTo) {
        ctx.textAlign = 'center';
        ctx.fillText(e.mTo, x2 + Math.cos(backAngle) * off + nx * off, y2 + Math.sin(backAngle) * off + ny * off);
      }
      ctx.globalAlpha = 1;
    }

    // ── Animated data packets ────────────────────────────
    function drawPackets() {
      PACKETS.forEach(function (p) {
        p.t = (p.t + p.speed) % 1;
        const a = getNode(p.edge.from), b = getNode(p.edge.to);
        if (!a || !b || !a._w) return;
        const angle   = Math.atan2(b.y * H - a.y * H, b.x * W - a.x * W);
        const [x1,y1] = edgePoint(a, angle);
        const [x2,y2] = edgePoint(b, angle + Math.PI);
        const px = x1 + (x2 - x1) * p.t;
        const py = y1 + (y2 - y1) * p.t;
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle   = '#39d353';
        ctx.globalAlpha = 0.3 * Math.sin(p.t * Math.PI);
        ctx.fill();
        ctx.globalAlpha = 1;
      });
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      NODES.forEach(function (n) { measureNode(n); });
      EDGES.forEach(drawEdge);
      NODES.forEach(drawNode);
      drawPackets();
      requestAnimationFrame(draw);
    }

    draw();
    return canvas;
  };
})(window.Portfolio);
