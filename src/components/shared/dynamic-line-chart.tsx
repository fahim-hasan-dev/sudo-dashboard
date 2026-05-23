import React from "react";

interface DynamicLineChartProps {
  data: number[];
  strokeColor: string;
  fillGradientId: string;
  strokeWidth?: number;
  showDots?: boolean;
  height?: number;
}

export const DynamicLineChart: React.FC<DynamicLineChartProps> = ({
  data,
  strokeColor,
  fillGradientId,
  strokeWidth = 2.5,
  showDots = false,
  height = 100,
}) => {
  if (!data || data.length < 2) return null;

  const width = 600;
  const paddingX = 10;
  const paddingY = 15;

  const minVal = Math.min(...data);
  const maxVal = Math.max(...data);
  const valRange = maxVal - minVal === 0 ? 1 : maxVal - minVal;

  // Map data values to coordinate points inside the SVG viewBox
  const points = data.map((val, index) => {
    const x = paddingX + (index / (data.length - 1)) * (width - 2 * paddingX);
    const y = height - paddingY - ((val - minVal) / valRange) * (height - 2 * paddingY);
    return { x, y };
  });

  // Calculate smooth cubic bezier path
  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const curr = points[i];
    const next = points[i + 1];
    const cp1_x = curr.x + (next.x - curr.x) / 3;
    const cp1_y = curr.y;
    const cp2_x = curr.x + (2 * (next.x - curr.x)) / 3;
    const cp2_y = next.y;
    path += ` C ${cp1_x} ${cp1_y}, ${cp2_x} ${cp2_y}, ${next.x} ${next.y}`;
  }

  // Construct closed loop for the glowing area fill below the curve
  const areaPath = `${path} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

  return (
    <svg
      className="w-full h-full select-none pointer-events-none"
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={fillGradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={strokeColor} stopOpacity="0.18" />
          <stop offset="100%" stopColor={strokeColor} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Dynamic Glowing Area Gradient */}
      <path d={areaPath} fill={`url(#${fillGradientId})`} />

      {/* Dynamic Smooth Line Stroke */}
      <path
        d={path}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Dynamic Interactive Dot Indicators */}
      {showDots &&
        points.map((pt, idx) => (
          <g key={idx}>
            <circle
              cx={pt.x}
              cy={pt.y}
              r={strokeWidth * 2.5}
              fill={strokeColor}
              fillOpacity="0.25"
            />
            <circle
              cx={pt.x}
              cy={pt.y}
              r={strokeWidth * 1.2}
              fill="#ffffff"
              stroke={strokeColor}
              strokeWidth={strokeWidth * 0.6}
            />
          </g>
        ))}
    </svg>
  );
};
