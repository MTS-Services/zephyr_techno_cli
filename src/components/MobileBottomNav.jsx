import React from 'react';
import { Link, useLocation } from 'react-router';
import { Home, Grid, ShoppingCart, User, MapPin } from 'lucide-react';

const cities = ['Dhaka', 'Chittagong', 'Sylhet', 'Khulna', 'Barisal', 'Rangpur'];

const MobileBottomNav = () => {
  const isLoggedIn = Boolean(
    localStorage.getItem('user') ||
      localStorage.getItem('token') ||
      localStorage.getItem('accessToken') ||
      localStorage.getItem('auth')
  );

  const profilePath = isLoggedIn ? '/dashboard/user' : '/login';
  const randomCity = cities[Math.floor(Math.random() * cities.length)];
  const locationPath = `/products?location=${encodeURIComponent(randomCity)}`;

  const items = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/products', label: 'Products', icon: Grid },
    { to: '/cart', label: 'Cart', icon: ShoppingCart },
    { to: profilePath, label: 'Profile', icon: User },
    { to: locationPath, label: 'Location', icon: MapPin },
  ];
  const { pathname, search } = useLocation();

  const isActive = (it) => {
    // Home
    if (it.to === '/') return pathname === '/';

    // Products vs Location: location item contains a query
    if (it.to.startsWith('/products')) {
      if (it.to.includes('?')) {
        return search.includes('location=');
      }
      return pathname === '/products' && !search.includes('location=');
    }

    return pathname === it.to;
  };

  return (
    <nav className="sm:hidden fixed left-4 right-4 bottom-4 z-30">
      <div className="rounded-lg bg-white border border-slate-200 border-t-custom shadow-xl shadow-custom/5">
        <ul className="flex items-center justify-between px-3 py-2">
          {items.map((it) => {
            const Icon = it.icon;
            const active = isActive(it);
            return (
              <li key={it.to} className="w-1/5">
                <Link to={it.to} className={`flex flex-col items-center gap-1 text-xs ${active ? 'nav-link-active text-custom' : 'text-slate-700 hover:text-custom'}`}>
                  <div className="p-2 rounded-md bg-transparent">
                    <Icon size={20} />
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
