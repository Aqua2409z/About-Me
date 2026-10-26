'use client';
import { useEffect, useRef } from 'react';

// -----------------------------------------------------------------------------
// 3D wireframe icosahedron rendered as SVG lines, rotated in real time via raf.
// 12 vertices (golden-ratio formula), 30 edges. Depth-shaded (back edges fade,
// front edges brighter + thicker). Vertex glow dots cycle through palette colors.
// Inner counter-rotating smaller icosahedron adds double-wireframe depth.
// -----------------------------------------------------------------------------

const PHI = (1 + Math.sqrt(5)) / 2;

// 12 vertices of a unit icosahedron
const BASE_VERTS: [number, number, number][] = [
  [-1,  PHI, 0], [ 1,  PHI, 0], [-1, -PHI, 0], [ 1, -PHI, 0],
  [ 0, -1,  PHI], [ 0,  1,  PHI], [ 0, -1, -PHI], [ 0,  1, -PHI],
  [ PHI, 0, -1], [ PHI, 0,  1], [-PHI, 0, -1], [-PHI, 0,  1],
];

// Compute edges once (pairs with distance² ≈ 4)
function computeEdges(verts: [number, number, number][]) {
  const edges: [number, number][] = [];
  for (let i = 0; i < verts.length; i++) {
    for (let j = i + 1; j < verts.length; j++) {
      const dx = verts[i][0] - verts[j][0];
      const dy = verts[i][1] - verts[j][1];
      const dz = verts[i][2] - verts[j][2];
      if (Math.abs(dx*dx + dy*dy + dz*dz - 4) < 0.01) edges.push([i, j]);
    }
  }
  return edges;
}
const EDGES = computeEdges(BASE_VERTS);

const VERT_COLORS = [
  '#FFD966', '#FFB84D', '#FF8E42', '#FF6B8A',
  '#E8457D', '#D64B9F', '#A54BC2', '#7B3B9A',
  '#5A3EC2', '#3B5CFF', '#4A89FF', '#FFC7D8',
];

function rotateY(v: [number, number, number], a: number): [number, number, number] {
  const [x, y, z] = v;
  const c = Math.cos(a), s = Math.sin(a);
  return [x * c + z * s, y, -x * s + z * c];
}
function rotateX(v: [number, number, number], a: number): [number, number, number] {
  const [x, y, z] = v;
  const c = Math.cos(a), s = Math.sin(a);
  return [x, y * c - z * s, y * s + z * c];
}
function project(v: [number, number, number], scale: number, cx: number, cy: number, dist = 5): [number, number, number] {
  const [x, y, z] = v;
  const f = dist / (dist + z);
  return [cx + x * scale * f, cy + y * scale * f, z];
}

export default function HeroGeometry() {
  const svgRef = useRef<SVGSVGElement>(null);
  const outerLinesRef = useRef<(SVGLineElement | null)[]>([]);
  const innerLinesRef = useRef<(SVGLineElement | null)[]>([]);
  const outerVertsRef = useRef<(SVGCircleElement | null)[]>([]);
  const angleRef = useRef({ y: 0, x: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const CX = 400, CY = 300;
    const SCALE_OUTER = 170;
    const SCALE_INNER = 95;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf: number | null = null;

    const renderShape = (
      scale: number,
      extraAngleY: number,
      lineRefs: (SVGLineElement | null)[],
      vertRefs?: (SVGCircleElement | null)[],
    ) => {
      const ay = angleRef.current.y + extraAngleY;
      const ax = angleRef.current.x;
      const projected: [number, number, number][] = BASE_VERTS.map((v) => {
        const r1 = rotateY(v, ay);
        const r2 = rotateX(r1, ax);
        return project(r2, scale, CX, CY, 5);
      });

      EDGES.forEach(([a, b], i) => {
        const line = lineRefs[i];
        if (!line) return;
        const pa = projected[a], pb = projected[b];
        line.setAttribute('x1', pa[0].toFixed(2));
        line.setAttribute('y1', pa[1].toFixed(2));
        line.setAttribute('x2', pb[0].toFixed(2));
        line.setAttribute('y2', pb[1].toFixed(2));
        // Depth shading: avgZ ranges roughly from -PHI to +PHI (~ -1.6 to 1.6)
        const avgZ = (pa[2] + pb[2]) / 2;
        const t = (avgZ + PHI) / (2 * PHI); // 0 = far back, 1 = near front
        const opacity = (0.15 + t * 0.85).toFixed(3);
        const sw = (0.5 + t * 1.3).toFixed(2);
        line.setAttribute('opacity', opacity);
        line.setAttribute('stroke-width', sw);
      });

      if (vertRefs) {
        projected.forEach((p, i) => {
          const c = vertRefs[i];
          if (!c) return;
          c.setAttribute('cx', p[0].toFixed(2));
          c.setAttribute('cy', p[1].toFixed(2));
          const t = (p[2] + PHI) / (2 * PHI);
          const r = (2 + t * 4).toFixed(2);
          c.setAttribute('r', r);
          c.setAttribute('opacity', (0.3 + t * 0.7).toFixed(3));
        });
      }
    };

    const tick = () => {
      // Auto-rotate (slow)
      angleRef.current.y += reduced ? 0 : 0.0045;
      // Mouse-tilt (lerp X axis a bit, Y axis gets added spin)
      const targetX = mouseRef.current.y * 0.35;
      angleRef.current.x += (targetX - angleRef.current.x) * 0.06;

      renderShape(SCALE_OUTER, 0, outerLinesRef.current, outerVertsRef.current);
      renderShape(SCALE_INNER, Math.PI / 7, innerLinesRef.current);

      raf = requestAnimationFrame(tick);
    };

    const onMouse = (e: MouseEvent) => {
      const el = svgRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - r.left) / r.width - 0.5;
      mouseRef.current.y = (e.clientY - r.top) / r.height - 0.5;
    };
    const onLeave = () => { mouseRef.current.x = 0; mouseRef.current.y = 0; };

    const parent = svgRef.current?.parentElement;
    parent?.addEventListener('mousemove', onMouse);
    parent?.addEventListener('mouseleave', onLeave);

    tick();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      parent?.removeEventListener('mousemove', onMouse);
      parent?.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <svg ref={svgRef} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="geoBase" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#0E0828"/>
          <stop offset="50%"  stopColor="#1A1046"/>
          <stop offset="100%" stopColor="#2E1861"/>
        </linearGradient>
        <radialGradient id="geoGlowBlue" cx="78%" cy="22%" r="48%">
          <stop offset="0%"   stopColor="#3B5CFF" stopOpacity="0.75"/>
          <stop offset="55%"  stopColor="#2454FF" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="#2454FF" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="geoGlowMag" cx="12%" cy="45%" r="42%">
          <stop offset="0%"   stopColor="#D64B9F" stopOpacity="0.70"/>
          <stop offset="60%"  stopColor="#D64B9F" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="#D64B9F" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="geoGlowAmber" cx="50%" cy="52%" r="40%">
          <stop offset="0%"   stopColor="#FFD966" stopOpacity="0.55"/>
          <stop offset="40%"  stopColor="#FFB84D" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="#FFB84D" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="geoGlowCoral" cx="25%" cy="82%" r="45%">
          <stop offset="0%"   stopColor="#FF6B8A" stopOpacity="0.65"/>
          <stop offset="60%"  stopColor="#FF6B8A" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#FF6B8A" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="geoEdgeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#FFD966"/>
          <stop offset="35%"  stopColor="#FF6B8A"/>
          <stop offset="70%"  stopColor="#D64B9F"/>
          <stop offset="100%" stopColor="#3B5CFF"/>
        </linearGradient>
        <filter id="geoGrain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={12}/>
          <feColorMatrix values="0 0 0 0 1  0 0 0 0 0.55  0 0 0 0 0.65  0 0 0 0.16 0"/>
          <feComposite in2="SourceGraphic" operator="in"/>
        </filter>
        <filter id="geoVertGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2"/>
        </filter>
      </defs>

      {/* Base + 4 blended glows */}
      <rect width="800" height="600" fill="url(#geoBase)"/>
      <g data-layer="halo">
        <g className="anim-halo">
          <rect width="800" height="600" fill="url(#geoGlowBlue)"  style={{ mixBlendMode: 'screen' as const }}/>
          <rect width="800" height="600" fill="url(#geoGlowMag)"   style={{ mixBlendMode: 'screen' as const }}/>
          <rect width="800" height="600" fill="url(#geoGlowCoral)" style={{ mixBlendMode: 'screen' as const }}/>
          <rect width="800" height="600" fill="url(#geoGlowAmber)" style={{ mixBlendMode: 'screen' as const }}/>
        </g>
      </g>

      {/* OUTER icosahedron wireframe */}
      <g data-layer="geometryOuter">
        {EDGES.map((_, i) => (
          <line
            key={`o-${i}`}
            ref={(el) => { outerLinesRef.current[i] = el; }}
            x1={0} y1={0} x2={0} y2={0}
            stroke="url(#geoEdgeGrad)"
            strokeWidth={1}
            strokeLinecap="round"
          />
        ))}
        {/* Vertex glow dots */}
        {BASE_VERTS.map((_, i) => (
          <circle
            key={`v-${i}`}
            ref={(el) => { outerVertsRef.current[i] = el; }}
            cx={0} cy={0} r={3}
            fill={VERT_COLORS[i]}
            filter="url(#geoVertGlow)"
          />
        ))}
      </g>

      {/* INNER counter-rotating smaller icosahedron */}
      <g data-layer="geometryInner" opacity="0.55">
        {EDGES.map((_, i) => (
          <line
            key={`i-${i}`}
            ref={(el) => { innerLinesRef.current[i] = el; }}
            x1={0} y1={0} x2={0} y2={0}
            stroke="#F5F0E8"
            strokeWidth={0.8}
            strokeLinecap="round"
            opacity={0.6}
          />
        ))}
      </g>

      {/* Horizon */}
      <g data-layer="horizon" opacity="0.9">
        <rect x="0" y="500" width="800" height="1" fill="#F5F0E8" opacity="0.3"/>
        <rect x="0" y="506" width="800" height="1" fill="#FF6B8A" opacity="0.5"/>
      </g>

      {/* Ridge */}
      <g data-layer="ridge">
        <path d="M 0 530 C 120 512, 240 548, 360 528 S 600 510, 720 536 L 800 530 L 800 600 L 0 600 Z"
              fill="#0A061F" opacity="0.9"/>
      </g>

      {/* Mist */}
      <g data-layer="mist">
        <rect className="anim-mist" x="-100" y="280" width="1000" height="36" fill="#F5F0E8" opacity="0.07"/>
      </g>

      {/* Grain */}
      <rect className="anim-grain" width="800" height="600" filter="url(#geoGrain)" opacity="0.5"/>
    </svg>
  );
}
