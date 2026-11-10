const NODE_COUNT = 8;
const SIZE = 100;
const CENTER = SIZE / 2;
const ORBIT_RADIUS = 37;
const CENTER_RADIUS = 7;
const OUTER_RADIUS = 4.5;

const NODES = Array.from({ length: NODE_COUNT }, (_, index) => {
  const angle = -Math.PI / 2 + (index * Math.PI * 2) / NODE_COUNT;
  const dx = Math.cos(angle);
  const dy = Math.sin(angle);
  return {
    dx,
    dy,
    x: CENTER + dx * ORBIT_RADIUS,
    y: CENTER + dy * ORBIT_RADIUS,
  };
});

export function NodeDiagram() {
  return (
    <svg
      className="node-diagram"
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      role="img"
      aria-label="One central node connected to eight surrounding nodes"
    >
      {NODES.map(({ dx, dy, x, y }, index) => (
        <line
          key={`line-${index}`}
          className="node-connector"
          x1={CENTER + dx * CENTER_RADIUS}
          y1={CENTER + dy * CENTER_RADIUS}
          x2={x - dx * OUTER_RADIUS}
          y2={y - dy * OUTER_RADIUS}
        />
      ))}
      <circle className="diagram-node diagram-node-center" cx={CENTER} cy={CENTER} r={CENTER_RADIUS} />
      {NODES.map(({ x, y }, index) => (
        <circle key={`node-${index}`} className="diagram-node" cx={x} cy={y} r={OUTER_RADIUS} />
      ))}
    </svg>
  );
}
