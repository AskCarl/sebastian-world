'use client';

// 🧭 NAVIGATION BAR — shows on every page so Sebastian can hop between zones.

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useBashBucks } from '@/lib/useBashBucks';

const zones = [
  { href: '/', label: 'Home', emoji: '🏠' },
  { href: '/math', label: 'Math', emoji: '🧮' },
  { href: '/coding', label: 'Coding', emoji: '🤖' },
  { href: '/writing', label: 'Writing', emoji: '✍️' },
  { href: '/reading', label: 'Reading', emoji: '📚' },
  { href: '/science', label: 'Science', emoji: '🔬' },
  { href: '/playroom', label: 'Playroom', emoji: '🎮' },
];

export default function Nav() {
  const pathname = usePathname();
  const { bashBucks } = useBashBucks();

  return (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b-4 border-[#333] px-2 py-2">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1 md:gap-2 flex-wrap">
          {zones.map(zone => {
            const active = pathname === zone.href;
            return (
              <Link
                key={zone.href}
                href={zone.href}
                className={`px-2 md:px-3 py-1 rounded-lg font-bold text-sm md:text-base transition-all ${
                  active
                    ? 'bg-blue-500 text-white scale-105 shadow-[2px_2px_0_#333]'
                    : 'bg-blue-50 text-blue-800 hover:bg-blue-200 hover:scale-105'
                }`}
              >
                <span className="mr-1">{zone.emoji}</span>
                <span className="hidden sm:inline">{zone.label}</span>
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-1 bg-yellow-100 border-2 border-yellow-400 rounded-full px-3 py-1 font-bold text-yellow-800">
          🐷 ${bashBucks}
        </div>
      </div>
    </nav>
  );
}
