import React from 'react';
import { Link, useLocation } from 'react-router';
import { Home, Grid, ShoppingCart, User, Smartphone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const MobileBottomNav = () => {
  const { isAuthenticated } = useAuth();

  const profilePath = isAuthenticated ? '/dashboard/user' : '/login';

  const items = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/products', label: 'Products', icon: Grid },
    { to: '/cart', label: 'Cart', icon: ShoppingCart },
    { to: profilePath, label: 'Profile', icon: User },
    { to: '/sell', label: 'Sell', icon: Smartphone },
  ];
  const { pathname, search } = useLocation();

  const isActive = (it) => {
    // Home
    if (it.to === '/') return pathname === '/';

    if (it.to === '/sell') return pathname === '/sell';

    if (it.to === '/products') {
      return pathname === '/products' && !search.includes('location=');
    }

    return pathname === it.to;
  };

  return (
    <nav className="sm:hidden fixed w-full bottom-0 z-30">
      <div className="rounded-lg bg-white border border-slate-200 border-t-custom shadow-xl shadow-custom/5">
        <ul className="flex items-center justify-between px-3 py-2">
          {items.map((it) => {
            const Icon = it.icon;
            const active = isActive(it);
            return (
              <li key={it.to} className="w-1/5">
                <Link to={it.to} className={`flex py-2 flex-col items-center gap-1 text-sm font-semibold ${active ? 'nav-link-active text-custom' : 'text-slate-700 hover:text-custom'}`}>
                  <div className="p-1 rounded-md bg-transparent">
                    <Icon size={23} />
                  </div>
                  <span className="text-[10px] tracking-wide">{it.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default MobileBottomNav;
