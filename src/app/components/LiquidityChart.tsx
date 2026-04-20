import { motion, AnimatePresence } from 'motion/react';
import { useState, useMemo } from 'react';
import { TrendingUp } from 'lucide-react';

const dataByRange = {
  '7D': [
    { month: 'Mon', value: 665 },
    { month: 'Tue', value: 680 },
    { month: 'Wed', value: 671 },
    { month: 'Thu', value: 676 },
    { month: 'Fri', value: 690 },
    { month: 'Sat', value: 680 },
    { month: 'Sun', value: 685 },
  ],
  '30D': [
    { month: 'Jan', value: 396 },
    { month: 'Feb', value: 439 },
    { month: 'Mar', value: 410 },
    { month: 'Apr', value: 492 },
    { month: 'May', value: 569 },
    { month: 'Jun', value: 647 },
    { month: 'Jul', value: 685 },
  ],
  '1Y': [
    { month: 'Q1 22', value: 328 },
    { month: 'Q2 22', value: 362 },
    { month: 'Q3 22', value: 396 },
    { month: 'Q4 22', value: 439 },
    { month: 'Q1 23', value: 507 },
    { month: 'Q2 23', value: 594 },
    { month: 'Q3 23', value: 666 },
    { month: 'Q4 23', value: 685 },
  ],
};

export function LiquidityChart() {
  const [activeRange, setActiveRange] = useState<'7D' | '30D' | '1Y'>('30D');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const data = dataByRange[activeRange];

  const chartData = useMemo(() => {
    const width = 800;
    const height = 300;
    const padding = { top: 20, right: 20, bottom: 40, left: 40 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const maxValue = Math.max(...data.map(d => d.value));
    const minValue = Math.min(...data.map(d => d.value));
    const range = maxValue - minValue;

    // Add some padding to the range for better visuals
    const valuePadding = range * 0.1;
    const adjustedMax = maxValue + valuePadding;
    const adjustedMin = minValue - valuePadding;
    const adjustedRange = adjustedMax - adjustedMin;

    const points = data.map((d, i) => {
      const x = padding.left + (i / (data.length - 1)) * chartWidth;
      const y = padding.top + chartHeight - ((d.value - adjustedMin) / adjustedRange) * chartHeight;
      return { x, y, ...d };
    });

    const pathD = points.map((p, i) =>
      i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`
    ).join(' ');

    const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padding.bottom} L ${padding.left} ${height - padding.bottom} Z`;

    // Generate Y-axis grid lines
    const gridLines = [];
    const numGridLines = 5;
    for (let i = 0; i <= numGridLines; i++) {
      const value = adjustedMin + (adjustedRange * i / numGridLines);
      const y = padding.top + chartHeight - (i / numGridLines) * chartHeight;
      gridLines.push({ y, value: Math.round(value) });
    }

    return {
      points,
      pathD,
      areaD,
      width,
      height,
      padding,
      gridLines,
      maxValue: Math.round(adjustedMax),
      minValue: Math.round(adjustedMin)
    };
  }, [data]);

  const handleRangeChange = (newRange: '7D' | '30D' | '1Y') => {
    setHoveredIndex(null);
    setActiveRange(newRange);
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="col-span-2 bg-white rounded-3xl p-8 shadow-lg shadow-slate-200/50 border border-slate-100"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Asset Growth
          </p>
          <h3 className="text-2xl font-semibold text-slate-900">Liquidity Trend</h3>
        </div>
        <div className="flex gap-2">
          {(['7D', '30D', '1Y'] as const).map((range) => (
            <button
              key={range}
              onClick={() => handleRangeChange(range)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all focus:outline-none ${
                activeRange === range
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 focus:ring-2 focus:ring-blue-500/50'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 focus:ring-2 focus:ring-slate-300/50'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-emerald-600">
            <TrendingUp className="w-4 h-4" strokeWidth={2.5} />
            <span className="text-sm font-medium">+12% YoY</span>
          </div>
          <span className="text-xs text-slate-400">Projected Growth</span>
        </div>
        <span className="text-xs font-semibold text-slate-400 uppercase">Scale: PHP (M)</span>
      </div>

      <motion.div
        key={activeRange}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative bg-slate-50/50 rounded-2xl p-4"
      >
        <svg
          viewBox={`0 0 ${chartData.width} ${chartData.height}`}
          className="w-full h-auto"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id={`chartGradient-${activeRange}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {chartData.gridLines.map((line, i) => (
            <g key={`grid-${i}`}>
              <line
                x1={chartData.padding.left}
                y1={line.y}
                x2={chartData.width - chartData.padding.right}
                y2={line.y}
                stroke="#e2e8f0"
                strokeWidth="1"
                strokeDasharray="4,4"
              />
              <text
                x={chartData.padding.left - 10}
                y={line.y + 4}
                textAnchor="end"
                fontSize="11"
                fill="#94a3b8"
                fontWeight="600"
              >
                {line.value}
              </text>
            </g>
          ))}

          {/* Area */}
          <motion.path
            d={chartData.areaD}
            fill={`url(#chartGradient-${activeRange})`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          />

          {/* Line */}
          <motion.path
            d={chartData.pathD}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Interactive hover areas */}
          {chartData.points.map((point, i) => (
            <g key={`point-group-${i}`}>
              {/* Large invisible hover target */}
              <rect
                x={point.x - 25}
                y={chartData.padding.top}
                width={50}
                height={chartData.height - chartData.padding.top - chartData.padding.bottom}
                fill="transparent"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="cursor-pointer"
              />

              {/* Vertical indicator line on hover */}
              {hoveredIndex === i && (
                <motion.line
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  x1={point.x}
                  y1={chartData.padding.top}
                  x2={point.x}
                  y2={chartData.height - chartData.padding.bottom}
                  stroke="#3b82f6"
                  strokeWidth="1.5"
                  strokeDasharray="4,4"
                />
              )}

              {/* Data point */}
              <motion.circle
                cx={point.x}
                cy={point.y}
                r={hoveredIndex === i ? 7 : 5}
                fill="white"
                stroke="#3b82f6"
                strokeWidth={hoveredIndex === i ? 3 : 2}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + i * 0.05, duration: 0.3, type: "spring", stiffness: 300 }}
                className="pointer-events-none"
              />

              {/* Inner dot */}
              {hoveredIndex === i && (
                <motion.circle
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  cx={point.x}
                  cy={point.y}
                  r={3}
                  fill="#3b82f6"
                  className="pointer-events-none"
                />
              )}
            </g>
          ))}

          {/* X-axis labels */}
          {data.map((d, i) => (
            <text
              key={`x-label-${i}`}
              x={chartData.points[i].x}
              y={chartData.height - chartData.padding.bottom + 20}
              textAnchor="middle"
              fontSize="12"
              fill={hoveredIndex === i ? "#3b82f6" : "#64748b"}
              fontWeight={hoveredIndex === i ? "700" : "600"}
              className="transition-all duration-200"
            >
              {d.month}
            </text>
          ))}
        </svg>

        {/* Tooltip */}
        <AnimatePresence>
          {hoveredIndex !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className="absolute bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl pointer-events-none z-10"
              style={{
                left: `${((hoveredIndex / (data.length - 1)) * 100)}%`,
                top: '-20px',
                transform: 'translateX(-50%)',
              }}
            >
              <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  {data[hoveredIndex].month}
                </span>
                <span className="text-lg font-medium text-white">
                  ₱{data[hoveredIndex].value}M
                </span>
                <div className="flex items-center gap-1 text-emerald-400">
                  <TrendingUp className="w-3 h-3" />
                  <span className="text-[10px] font-medium">
                    {hoveredIndex > 0
                      ? `+${Math.round(((data[hoveredIndex].value - data[hoveredIndex - 1].value) / data[hoveredIndex - 1].value) * 100)}%`
                      : 'Base'
                    }
                  </span>
                </div>
              </div>
              {/* Arrow */}
              <div className="absolute left-1/2 -bottom-1 w-2 h-2 bg-slate-900 rotate-45 -translate-x-1/2" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
