// Hand-drawn style decorative SVGs for cafe atmosphere
// Used as scattered background elements across sections

interface DecoProps {
  className?: string;
}

export function LeafOne({ className = "" }: DecoProps) {
  return (
    <svg className={className} viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M40 10C25 25 15 50 20 80C25 95 35 105 40 110C45 105 55 95 60 80C65 50 55 25 40 10Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M40 20V100"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path d="M40 40C32 45 28 55 30 65" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" fill="none" />
      <path d="M40 50C48 55 52 62 50 72" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function LeafTwo({ className = "" }: DecoProps) {
  return (
    <svg className={className} viewBox="0 0 60 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M30 5C15 20 8 45 12 70C16 85 25 92 30 95C35 92 44 85 48 70C52 45 45 20 30 5Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M30 15V90" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M30 35L22 45" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" />
      <path d="M30 50L38 58" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" />
      <path d="M30 65L24 73" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" />
    </svg>
  );
}

export function LeafThree({ className = "" }: DecoProps) {
  return (
    <svg className={className} viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 60C20 30 45 10 80 15C85 20 88 35 80 50C65 70 35 75 10 60Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M15 58C30 45 55 30 75 20" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M35 55C40 45 50 38 60 32" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
    </svg>
  );
}

export function CoffeeBean({ className = "" }: DecoProps) {
  return (
    <svg className={className} viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse
        cx="20"
        cy="30"
        rx="14"
        ry="22"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        transform="rotate(-15 20 30)"
      />
      <path
        d="M14 15C18 22 18 38 14 45"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CoffeeCup({ className = "" }: DecoProps) {
  return (
    <svg className={className} viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Steam */}
      <path d="M25 15C25 10 30 8 30 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M35 12C35 7 40 5 40 0" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M45 15C45 10 50 8 50 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      {/* Cup body */}
      <path
        d="M15 25H60L55 75H20L15 25Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Handle */}
      <path
        d="M60 35C68 35 72 42 72 50C72 58 68 65 60 65"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Saucer */}
      <ellipse cx="37" cy="80" rx="30" ry="5" stroke="currentColor" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

export function SteamWisp({ className = "" }: DecoProps) {
  return (
    <svg className={className} viewBox="0 0 30 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15 48C15 40 8 35 8 28C8 20 15 18 15 10C15 5 12 2 15 0"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M20 45C20 38 25 33 25 26C25 20 20 17 20 12"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
    </svg>
  );
}

export function DiceIcon({ className = "" }: DecoProps) {
  return (
    <svg className={className} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="40" height="40" rx="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="17" cy="17" r="3" fill="currentColor" opacity="0.4" />
      <circle cx="33" cy="17" r="3" fill="currentColor" opacity="0.4" />
      <circle cx="25" cy="25" r="3" fill="currentColor" opacity="0.4" />
      <circle cx="17" cy="33" r="3" fill="currentColor" opacity="0.4" />
      <circle cx="33" cy="33" r="3" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

export function BookOpen({ className = "" }: DecoProps) {
  return (
    <svg className={className} viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M40 15C35 10 25 8 10 10V50C25 48 35 50 40 55C45 50 55 48 70 50V10C55 8 45 10 40 15Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M40 15V55" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M18 20H35" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" opacity="0.4" />
      <path d="M18 27H33" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" opacity="0.4" />
      <path d="M18 34H30" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" opacity="0.4" />
      <path d="M45 20H62" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" opacity="0.4" />
      <path d="M47 27H60" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

export function Sparkle({ className = "" }: DecoProps) {
  return (
    <svg className={className} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15 2L17 12L27 15L17 18L15 28L13 18L3 15L13 12L15 2Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
        fill="currentColor"
        opacity="0.3"
      />
    </svg>
  );
}

export function MusicNote({ className = "" }: DecoProps) {
  return (
    <svg className={className} viewBox="0 0 50 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 55V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 12C25 8 35 6 42 10C42 14 35 18 20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <ellipse cx="14" cy="57" rx="10" ry="7" stroke="currentColor" strokeWidth="1.5" fill="none" transform="rotate(-10 14 57)" />
    </svg>
  );
}

export function PizzaSlice({ className = "" }: DecoProps) {
  return (
    <svg className={className} viewBox="0 0 60 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 5L8 62C18 66 42 66 52 62L30 5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M12 55C22 58 38 58 48 55" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" />
      <circle cx="25" cy="35" r="3.5" stroke="currentColor" strokeWidth="1" fill="none" />
      <circle cx="35" cy="42" r="3" stroke="currentColor" strokeWidth="1" fill="none" />
      <circle cx="28" cy="50" r="2.5" stroke="currentColor" strokeWidth="1" fill="none" />
    </svg>
  );
}

export function WiFiIcon({ className = "" }: DecoProps) {
  return (
    <svg className={className} viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 18C15 8 30 4 55 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M13 28C20 20 33 17 47 28" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none" />
      <path d="M22 37C26 33 34 32 38 37" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <circle cx="30" cy="44" r="3" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

export function PlantPot({ className = "" }: DecoProps) {
  return (
    <svg className={className} viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Pot */}
      <path d="M15 50H45L40 75H20L15 50Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M12 47H48V52H12V47Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Stems and leaves */}
      <path d="M30 47V28" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M30 35C24 30 18 25 20 15C26 18 30 25 30 35Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" />
      <path d="M30 28C36 22 42 18 44 8C38 10 32 18 30 28Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" />
      <path d="M24 47C22 42 18 40 14 38" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M36 47C38 42 42 39 46 38" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
}

export function Guitar({ className = "" }: DecoProps) {
  return (
    <svg className={className} viewBox="0 0 40 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Neck */}
      <path d="M18 5H22V40H18V5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      {/* Tuning pegs */}
      <path d="M15 8H18M22 8H25M15 14H18M22 14H25" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      {/* Body */}
      <path d="M20 40C10 42 4 52 4 60C4 70 10 78 20 80C30 78 36 70 36 60C36 52 30 42 20 40Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Sound hole */}
      <circle cx="20" cy="60" r="7" stroke="currentColor" strokeWidth="1" fill="none" />
      {/* Strings hint */}
      <path d="M19 40V80M21 40V80" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" opacity="0.3" />
    </svg>
  );
}

export function Headphones({ className = "" }: DecoProps) {
  return (
    <svg className={className} viewBox="0 0 60 55" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 30C8 17 17 8 30 8C43 8 52 17 52 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <rect x="3" y="28" width="10" height="18" rx="4" stroke="currentColor" strokeWidth="1.3" fill="none" />
      <rect x="47" y="28" width="10" height="18" rx="4" stroke="currentColor" strokeWidth="1.3" fill="none" />
    </svg>
  );
}

export function CrossStitch({ className = "" }: DecoProps) {
  return (
    <svg className={className} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 5L25 25M25 5L5 25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function DotsPattern({ className = "" }: DecoProps) {
  return (
    <svg className={className} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="2" fill="currentColor" opacity="0.3" />
      <circle cx="30" cy="10" r="2" fill="currentColor" opacity="0.2" />
      <circle cx="50" cy="10" r="2" fill="currentColor" opacity="0.3" />
      <circle cx="10" cy="30" r="2" fill="currentColor" opacity="0.2" />
      <circle cx="30" cy="30" r="2" fill="currentColor" opacity="0.3" />
      <circle cx="50" cy="30" r="2" fill="currentColor" opacity="0.2" />
      <circle cx="10" cy="50" r="2" fill="currentColor" opacity="0.3" />
      <circle cx="30" cy="50" r="2" fill="currentColor" opacity="0.2" />
      <circle cx="50" cy="50" r="2" fill="currentColor" opacity="0.3" />
    </svg>
  );
}
