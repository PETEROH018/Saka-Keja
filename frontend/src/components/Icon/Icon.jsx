export default function Icon({ name, size = 16, className = "" }){
     const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
  };

  const icons = {
    check: (
      <svg {...common}>
        <path d="m5 12 4 4L19 6" />
      </svg>
    ),

    arrowLeft: (
      <svg {...common}>
        <path d="M19 12H5" />
        <path d="m11 18-6-6 6-6" />
      </svg>
    ),

    image: (
      <svg {...common}>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="8.5" cy="9" r="1.5" />
        <path d="m21 15-5-5L5 20" />
      </svg>
    ),

    home: (
      <svg {...common}>
        <path d="m3 10 9-7 9 7" />
        <path d="M5 9v11h14V9" />
        <path d="M9 20v-6h6v6" />
      </svg>
    ),

    shield: (
      <svg {...common}>
        <path d="M12 3 20 6v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),

    wifi: (
      <svg {...common}>
        <path d="M5 9.5a11 11 0 0 1 14 0" />
        <path d="M8 13a6.5 6.5 0 0 1 8 0" />
        <path d="M11 16.5a2 2 0 0 1 2 0" />
      </svg>
    ),

    water: (
      <svg {...common}>
        <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z" />
        <path d="M9 15c.4 1.3 1.4 2 3 2" />
      </svg>
    ),

    bed: (
      <svg {...common}>
        <path d="M3 18v-8" />
        <path d="M21 18v-8" />
        <path d="M3 14h18" />
        <path d="M6 14V9h5a3 3 0 0 1 3 3v2" />
      </svg>
    ),

    bath: (
      <svg {...common}>
        <path d="M4 12h16" />
        <path d="M5 12v4a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-4" />
        <path d="M7 12V6a2 2 0 0 1 4 0v1" />
      </svg>
    ),
    
    plus: (
      <svg {...common}>
        <path d="M12 5v14M5 12h14" />
      </svg>
    ),

    arrowRight: (
      <svg {...common}>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </svg>
    ),

    chevronDown: (
      <svg {...common}>
        <path d="m6 9 6 6 6-6" />
      </svg>
    ),

    edit: (
      <svg {...common}>
        <path d="M4 20h4L19 9l-4-4L4 16v4Z" />
        <path d="m13 6 4 4" />
      </svg>
    ),

    trash: (
      <svg {...common}>
        <path d="M5 7h14" />
        <path d="M10 11v5M14 11v5" />
        <path d="M8 7l1-3h6l1 3" />
        <path d="M7 7l1 14h8l1-14" />
      </svg>
    ),
       sofa: (
    <svg {...common}>
        <path d="M5 11V8a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3" />
        <path d="M4 14v-2a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v2" />
        <path d="M4 14h16v4H4z" />
        <path d="M6 18v2M18 18v2" />
        <path d="M7 9V7M17 9V7" />
    </svg>
    ),
    dashboard: (
      <svg {...common}>
        <rect x="4" y="4" width="6" height="6" rx="1" />
        <rect x="14" y="4" width="6" height="6" rx="1" />
        <rect x="4" y="14" width="6" height="6" rx="1" />
        <rect x="14" y="14" width="6" height="6" rx="1" />
      </svg>
    ),

    building: (
      <svg {...common}>
        <path d="M4 21V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v16" />
        <path d="M8 8h2M14 8h2M8 12h2M14 12h2M8 16h2M14 16h2" />
        <path d="M3 21h18" />
      </svg>
    ),

    plusCircle: (
      <svg {...common}>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 8v8M8 12h8" />
      </svg>
    ),

    message: (
      <svg {...common}>
        <path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.6 8.6 0 0 1-3.4-.7L4 20l1.7-3.7A7.2 7.2 0 0 1 4.5 12 7.5 7.5 0 0 1 12 4.5a7.5 7.5 0 0 1 8 7Z" />
      </svg>
    ),

    mail: (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    ),

    user: (
      <svg {...common}>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20c.7-3.3 3-5 7-5s6.3 1.7 7 5" />
      </svg>
    ),

    search: (
      <svg {...common}>
        <circle cx="10.8" cy="10.8" r="6.3" />
        <path d="m16 16 4 4" />
      </svg>
    ),

    location: (
      <svg {...common}>
        <path d="M19 10c0 5-7 10-7 10S5 15 5 10a7 7 0 1 1 14 0Z" />
        <circle cx="12" cy="10" r="2.2" />
      </svg>
    ),

    apartment: (
      <svg {...common}>
        <path d="M4 20V7h12v13" />
        <path d="M16 11h4v9" />
        <path d="M7 10h2M11 10h2M7 14h2M11 14h2M7 18h2M11 18h2" />
        <path d="M3 20h18" />
      </svg>
    ),

    upload: (
      <svg {...common}>
        <path d="M12 16V4" />
        <path d="m7 9 5-5 5 5" />
        <path d="M5 20h14" />
      </svg>
    ),

    image: (
      <svg {...common}>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="8.5" cy="9" r="1.5" />
        <path d="m4 17 5-5 3 3 2-2 6 5" />
      </svg>
    ),

    plus: (
      <svg {...common}>
        <path d="M12 5v14M5 12h14" />
      </svg>
    ),

    trash: (
      <svg {...common}>
        <path d="M5 7h14M10 11v5M14 11v5" />
        <path d="M8 7l1-3h6l1 3M7 7l1 14h8l1-14" />
      </svg>
    ),

    close: (
      <svg {...common}>
        <path d="m6 6 12 12M18 6 6 18" />
      </svg>
    ),

    chevronDown: (
      <svg {...common}>
        <path d="m6 9 6 6 6-6" />
      </svg>
    ),

    furniture: (
      <svg {...common}>
        <path d="M5 11V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3" />
        <path d="M4 14v-2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2" />
        <path d="M4 14h16v4H4zM6 18v2M18 18v2" />
      </svg>
    ),

  };

  return icons[name] || null;
};
