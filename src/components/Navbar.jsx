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
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-[30px] font-bold tracking-tight text-[#0d2747]"
        >
          KeenKeeper
        </Link>

        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-2 rounded-lg bg-white p-1">
            {navItems.map(({ href, label, Icon }) => {
              const isActive = pathname === href;

              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
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