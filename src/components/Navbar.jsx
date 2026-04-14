'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiClock, FiHome, FiTrendingUp } from 'react-icons/fi';

const navItems = [
  { href: '/', label: 'Home', Icon: FiHome },
  { href: '/timeline', label: 'Timeline', Icon: FiClock },
  { href: '/stats', label: 'Stats', Icon: FiTrendingUp },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className="w-full border-b border-zinc-200 bg-white">
      <div className="flex w-full items-center justify-between gap-3 px-4 py-3 sm:h-20 sm:px-6 sm:py-0">
        <Link
          href="/"
          className="text-xl font-extrabold tracking-tight leading-none sm:text-[28px]"
          aria-label="KeenKeeper"
        >
          <span className="text-[#1f2a44]">Keen</span>
          <span className="text-[#2f6b5d]">Keeper</span>
        </Link>

        <nav aria-label="Main navigation" className="ml-auto">
          <ul className="flex flex-wrap items-center justify-center gap-2 rounded-lg bg-white p-1">
            {navItems.map(({ href, label, Icon }) => {
              const isActive = pathname === href;

              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium transition-colors sm:px-4 sm:text-sm ${
                      isActive
                        ? 'bg-[#115843] text-white shadow-sm'
                        : 'text-[#5f6d80] hover:bg-zinc-100 hover:text-[#0f2747]'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon className="text-[15px]" />
                    <span>{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;