import { ReactElement, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export function DropletIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2.5s7 7.6 7 12.4a7 7 0 1 1-14 0c0-4.8 7-12.4 7-12.4Z" />
    </svg>
  );
}

export function BoltIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    </svg>
  );
}

export function FlameIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2.5c1 3-3 4-3 8a3 3 0 0 0 6 0c1.5 1 2 2.7 2 4.3a5 5 0 1 1-10 0c0-4.7 3-6 5-12.3Z" />
    </svg>
  );
}

export function PaintbrushIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M14.6 3.4 20.6 9.4 10.4 19.6a3.5 3.5 0 0 1-2.5 1H4v-3.9a3.5 3.5 0 0 1 1-2.5L14.6 3.4Z" />
      <path d="M13 5 19 11" />
    </svg>
  );
}

export function BrickIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="6" width="8" height="5" rx="0.5" />
      <rect x="13" y="6" width="8" height="5" rx="0.5" />
      <rect x="7" y="13" width="8" height="5" rx="0.5" />
      <rect x="1" y="13" width="4" height="5" rx="0.5" />
      <rect x="17" y="13" width="6" height="5" rx="0.5" />
    </svg>
  );
}

export function HammerIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m14 6 4 4-2 2-4-4 2-2Z" />
      <path d="m12 8-8 8 2 2 8-8" />
      <path d="M16 4l4 4" />
    </svg>
  );
}

export function KeyIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="8" cy="15" r="4.5" />
      <path d="M11.5 11.5 20 3M16 7l3 3M13 4l3 3" />
    </svg>
  );
}

export function WindIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 8h11a3 3 0 1 0-3-3" />
      <path d="M3 13h15a3 3 0 1 1-3 3" />
      <path d="M3 18h9a2.5 2.5 0 1 0-2.5-2.5" />
    </svg>
  );
}

export function LeafIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20 4S8 4 5 9s0 13 0 13 13-1.5 15-8c1.4-4.6 0-10 0-10Z" />
      <path d="M5 22 15 10" />
    </svg>
  );
}

export function SparklesIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3v4M12 17v4M4 12h4M16 12h4M6.5 6.5l2 2M15.5 15.5l2 2M17.5 6.5l-2 2M8.5 15.5l-2 2" />
    </svg>
  );
}

export function CheckCircleIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12.5 2.5 2.5 4.5-5" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 4.5 5.8v5.6c0 4.8 3.2 8.2 7.5 9.6 4.3-1.4 7.5-4.8 7.5-9.6V5.8L12 3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.6l-5.9 3 1.3-6.6-4.9-4.6 6.6-.8L12 2.5Z" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12h16M13 5l7 7-7 7" />
    </svg>
  );
}

export function WalletIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18" />
      <circle cx="16" cy="14" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function ClipboardIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="6" y="4" width="12" height="17" rx="2" />
      <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1M9 11h6M9 15h6" />
    </svg>
  );
}

export function HandshakeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M2 12h4l3-3 3 3 3-3 3 3h4" />
      <path d="M6 12v3l4 4 2-2M18 12v3l-4 4-1.5-1.5" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function XIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export const categoryIcons: Record<string, (props: IconProps) => ReactElement> = {
  droplet: DropletIcon,
  bolt: BoltIcon,
  flame: FlameIcon,
  paintbrush: PaintbrushIcon,
  brick: BrickIcon,
  hammer: HammerIcon,
  key: KeyIcon,
  wind: WindIcon,
  leaf: LeafIcon,
  sparkles: SparklesIcon,
};
