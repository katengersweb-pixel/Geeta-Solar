import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  theme?: 'light' | 'dark';
}

export const GeetaLogoIcon: React.FC<{ sizeClass?: string; className?: string }> = ({
  sizeClass = 'w-10 h-10',
  className = '',
}) => {
  return (
    <div
      className={`relative flex-shrink-0 ${sizeClass} rounded-full overflow-hidden bg-transparent transition-transform duration-300 hover:scale-105 ${className}`}
      style={{ aspectRatio: '1 / 1' }}
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full block"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
      >
        {/* Transparent background outer circle with white disc core */}
        <circle cx="100" cy="100" r="98" fill="#FFFFFF" />

        {/* Outer Red "G" Emblem Ring */}
        <path
          d="M 152 28
             A 90 90 0 1 0 186 112
             C 186 96 172 100 156 104
             C 136 110 120 120 112 124
             C 134 116 160 102 174 100
             C 174 135 145 174 100 174
             A 74 74 0 1 1 140 44
             C 146 38 149 32 152 28 Z"
          fill="#E11D2A"
        />

        {/* Dynamic Red Swoosh Arrow Inward */}
        <path
          d="M 184 94
             C 184 94 150 104 114 123
             C 142 118 174 106 184 94 Z"
          fill="#E11D2A"
        />

        {/* 9 Sun Rays in Radiant Golden Orange */}
        <g fill="#F59E0B">
          <polygon points="100,22 96,44 104,44" />
          <polygon points="117,27 110,48 118,45" />
          <polygon points="132,36 122,54 129,49" />
          <polygon points="144,50 131,64 137,58" />
          <polygon points="149,67 135,74 139,68" />
          <polygon points="83,27 82,45 90,48" />
          <polygon points="68,36 71,49 78,54" />
          <polygon points="56,50 63,58 69,64" />
          <polygon points="51,67 61,68 65,74" />
        </g>

        {/* Golden Semicircle Sun Core */}
        <path
          d="M 72 74 A 28 28 0 0 1 128 74 Z"
          fill="#F59E0B"
        />

        {/* Blue Photovoltaic Solar Panel Array */}
        <path
          d="M 72 74
             C 80 72 120 72 128 74
             C 142 75 152 86 148 96
             C 144 106 128 114 100 114
             C 72 114 56 106 52 96
             C 48 86 58 75 72 74 Z"
          fill="#1665C1"
        />

        {/* White Grid Lines on Solar Panel */}
        <path
          d="M 57 87 C 80 84 120 84 143 87"
          stroke="#FFFFFF"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M 64 100 C 80 98 120 98 136 100"
          stroke="#FFFFFF"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M 100 73 L 100 114"
          stroke="#FFFFFF"
          strokeWidth="1.6"
        />
        <path
          d="M 85 73 C 84 85 82 100 80 112"
          stroke="#FFFFFF"
          strokeWidth="1.6"
        />
        <path
          d="M 115 73 C 116 85 118 100 120 112"
          stroke="#FFFFFF"
          strokeWidth="1.6"
        />
        <path
          d="M 72 75 C 69 86 66 98 64 106"
          stroke="#FFFFFF"
          strokeWidth="1.6"
        />
        <path
          d="M 128 75 C 131 86 134 98 136 106"
          stroke="#FFFFFF"
          strokeWidth="1.6"
        />

        {/* Red Inward Accent Point */}
        <path
          d="M 174 94
             C 160 102 138 114 114 123
             C 134 115 158 106 174 94 Z"
          fill="#E11D2A"
        />

        {/* Centered Typography: GEETA */}
        <text
          x="100"
          y="148"
          textAnchor="middle"
          fontFamily="'Plus Jakarta Sans', Outfit, sans-serif"
          fontWeight="900"
          fontSize="21"
          fill="#0B1E36"
          letterSpacing="0.5"
        >
          GEETA
        </text>

        {/* Centered Typography: SOLARS */}
        <text
          x="100"
          y="164"
          textAnchor="middle"
          fontFamily="'Plus Jakarta Sans', Outfit, sans-serif"
          fontWeight="800"
          fontSize="12"
          fill="#0B1E36"
          letterSpacing="2"
        >
          SOLARS
        </text>
      </svg>
    </div>
  );
};

export const GeetaLogo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showTagline = true,
  theme = 'light',
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  const textSizes = {
    sm: { title: 'text-base font-black', sub: 'text-[8px] font-bold tracking-widest' },
    md: { title: 'text-xl font-black', sub: 'text-[9px] font-bold tracking-widest' },
    lg: { title: 'text-2xl font-black', sub: 'text-[10px] font-bold tracking-widest' },
    xl: { title: 'text-4xl font-black', sub: 'text-xs font-bold tracking-widest' },
  };

  const isDark = theme === 'dark';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Crisp 16K Ultra-HD Vector Round Emblem without black background */}
      <GeetaLogoIcon sizeClass={iconSizes[size]} />

      {/* Brand Name Typography */}
      <div className="flex flex-col leading-tight">
        <div className={`${textSizes[size].title} tracking-tight ${isDark ? 'text-white' : 'text-slate-950'} flex items-center gap-1.5`}>
          <span className="font-black tracking-tight">GEETA</span>
          <span className="text-red-600 font-black">SOLARS</span>
        </div>
        {showTagline && (
          <span className={`${textSizes[size].sub} ${isDark ? 'text-red-400' : 'text-slate-500'} uppercase font-bold`}>
            KOTHAVALASA &bull; VIZIANAGARAM
          </span>
        )}
      </div>
    </div>
  );
};

export const AdityaLogo = GeetaLogo;
export const SolarGridLogo = GeetaLogo;
export default GeetaLogo;
