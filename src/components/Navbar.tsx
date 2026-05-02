import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    [
      'rounded-full px-4 py-2 text-sm font-semibold transition',
      isActive
        ? 'bg-slate-950 text-white shadow-[0_10px_35px_rgba(15,23,42,0.18)]'
        : 'text-slate-600 hover:bg-white/70 hover:text-slate-950',
    ].join(' ');

  return (
    <nav className="sticky top-0 z-50 border-b border-white/60 bg-[rgba(251,246,238,0.72)] backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link to="/" className="group flex items-center gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/40 bg-slate-950 shadow-[0_18px_40px_rgba(15,23,42,0.18)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.45),transparent_55%),radial-gradient(circle_at_bottom_right,_rgba(251,146,60,0.45),transparent_55%)] opacity-90 transition duration-300 group-hover:scale-110"></div>
              <svg className="relative h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M8 7h8M8 12h8M8 17h5M6 5.5h12A2.5 2.5 0 0 1 20.5 8v8A2.5 2.5 0 0 1 18 18.5H6A2.5 2.5 0 0 1 3.5 16V8A2.5 2.5 0 0 1 6 5.5Z"
                />
              </svg>
            </div>

            <div>
              <p className="font-['Space_Grotesk'] text-lg font-bold tracking-[-0.04em] text-slate-950">
                Task Manager
              </p>
              <p className="hidden text-xs uppercase tracking-[0.28em] text-slate-400 sm:block">
                Control room for modern teams
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-2 rounded-full border border-white/70 bg-white/55 p-1 shadow-[0_10px_30px_rgba(15,23,42,0.06)] md:flex">
            <NavLink to="/" className={navItemClass}>
              Trang chu
            </NavLink>
            <NavLink to="/users" className={navItemClass}>
              Dashboard
            </NavLink>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <div className="hidden items-center gap-3 rounded-full border border-white/70 bg-white/70 px-3 py-2 shadow-[0_10px_30px_rgba(15,23,42,0.06)] sm:flex">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white shadow-[0_10px_25px_rgba(15,23,42,0.18)]">
                  {user?.name?.charAt(0).toUpperCase() ?? 'U'}
                </div>
                <div className="min-w-0">
                  <p className="max-w-[11rem] truncate text-sm font-semibold text-slate-900">
                    {user?.name ?? 'Tai khoan'}
                  </p>
                  <p className="max-w-[11rem] truncate text-xs text-slate-500">
                    {user?.email ?? 'authenticated session'}
                  </p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M15 8.5 18.5 12 15 15.5M18.5 12H9m4 7H6.5A2.5 2.5 0 0 1 4 16.5v-9A2.5 2.5 0 0 1 6.5 5H13"
                  />
                </svg>
                <span className="hidden sm:inline">Dang xuat</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-full px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-white/70 hover:text-slate-950"
              >
                Dang nhap
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                <span>Tao tai khoan</span>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 5v14M5 12h14" />
                </svg>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
