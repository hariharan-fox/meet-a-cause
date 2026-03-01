import { cn } from '@/lib/utils';
import type { Certificate } from '@/lib/types';

export const BadgeVisual = ({ badge, size = 'medium' }: { badge: Certificate; size?: 'medium' | 'large' }) => {
  const SHAPE_PATHS = {
    circle: "M 50, 50 m -48, 0 a 48,48 0 1,0 96,0 a 48,48 0 1,0 -96,0",
    pentagon: "M 50,2 L 98,35 L 80,98 L 20,98 L 2,35 Z",
    hexagon: "M 50,2 L 98,27 V 73 L 50,98 L 2,73 V 27 Z",
  };

  const LEVEL_COLORS = {
    Bronze: { stops: ["#D9A66C", "#A67C49", "#D9A66C"], highlight: "#F5D4A8", text: "text-white", shadow: "rgba(166, 124, 73, 0.4)" },
    Silver: { stops: ["#E0E0E0", "#BDBDBD", "#E0E0E0"], highlight: "#FFFFFF", text: "text-gray-800", shadow: "rgba(189, 189, 189, 0.4)" },
    Gold: { stops: ["#FFDF80", "#FFC700", "#FFDF80"], highlight: "#FFF0B3", text: "text-yellow-950", shadow: "rgba(255, 199, 0, 0.4)" },
    Platinum: { stops: ["#BDEBFF", "#87CEEB", "#BDEBFF"], highlight: "#E6F7FF", text: "text-sky-950", shadow: "rgba(135, 206, 235, 0.4)" },
  };

  const UnearnedColor = { stops: ["#E5E7EB", "#D1D5DB", "#E5E7EB"], highlight: "#F9FAFB", text: "text-gray-500", shadow: "rgba(209, 213, 219, 0.2)" };

  const colors = badge.isEarned ? LEVEL_COLORS[badge.level || 'Bronze'] : UnearnedColor;
  const shape = badge.shape || 'circle';

  const isLarge = size === 'large';
  const sizeClasses = isLarge ? "w-40 h-40" : "w-14 h-14 md:w-20 md:h-20";
  const iconSizeClasses = isLarge ? "w-16 h-16" : "w-6 h-6 md:w-9 md:h-9";
  const textSizeClasses = isLarge ? "text-3xl mt-2" : "text-xs mt-1 md:text-sm";
  
  const bgGradientId = `bg-gradient-${badge.id.replace(/[^a-zA-Z0-9-]/g, '')}`;
  const highlightGradientId = `highlight-gradient-${badge.id.replace(/[^a-zA-Z0-9-]/g, '')}`;
  const filterId = `filter-${badge.id.replace(/[^a-zA-Z0-9-]/g, '')}`;

  return (
    <div className={cn("relative group", sizeClasses, !badge.isEarned && "saturate-0 opacity-70")}>
        <svg viewBox="0 0 100 100" className={cn("absolute inset-0 w-full h-full")}>
            <defs>
                <linearGradient id={bgGradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={colors.stops[0]} />
                    <stop offset="50%" stopColor={colors.stops[1]} />
                    <stop offset="100%" stopColor={colors.stops[2]} />
                </linearGradient>
                <radialGradient id={highlightGradientId} cx="50%" cy="0%" r="75%">
                    <stop offset="0%" stopColor={colors.highlight} stopOpacity="0.6"/>
                    <stop offset="100%" stopColor={colors.highlight} stopOpacity="0"/>
                </radialGradient>
                <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy={isLarge ? "4" : "2"} stdDeviation={isLarge ? "3" : "2"} floodColor={colors.shadow} />
                </filter>
            </defs>
            
            <g style={{ filter: `url(#${filterId})` }}>
              <path d={SHAPE_PATHS[shape]} fill={`url(#${bgGradientId})`} />
              <path d={SHAPE_PATHS[shape]} fill="transparent" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
              <path d={SHAPE_PATHS[shape]} fill={`url(#${highlightGradientId})`} />
              <path d={SHAPE_PATHS[shape]} fill="transparent" stroke={colors.stops[1]} strokeWidth="0.5" />
            </g>
        </svg>
        
        <div className={cn("relative z-10 flex flex-col items-center justify-center w-full h-full p-2 text-center", colors.text)}>
            <badge.icon 
              className={cn(iconSizeClasses)} 
              style={{ filter: `drop-shadow(0px 1px 1px rgba(0,0,0,0.2))`}}
            />
            <span 
              className={cn("font-bold", textSizeClasses)}
              style={{ textShadow: '0px 1px 2px rgba(0,0,0,0.15)' }}
            >
              {badge.description.match(/\d+/)?.[0] || ''}
            </span>
        </div>
    </div>
  );
};
