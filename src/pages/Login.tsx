import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const loginBenefits = [
  'Truy cap nhanh vao khu dashboard users va he thong task.',
  'Session duoc duy tri gon gang de thao tac lien tuc khong dut mach.',
  'Bo cuc uu tien hanh dong chinh thay vi day nhieu khung phu.',
];

const Login: React.FC = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    try {
      await login(form.email, form.password);
      navigate('/users');
    } catch (err) {
      const axiosError = err as {
        response?: { data?: { message?: string; error?: string } };
      };
      const errorMessage =
        axiosError.response?.data?.message ||
        axiosError.response?.data?.error ||
        'Dang nhap that bai. Vui long kiem tra email va mat khau.';
      setError(errorMessage);
    }
  };

  return (
    <main className="min-h-[calc(100vh-8rem)] mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="grid gap-8 items-center lg:grid-cols-[1.12fr_0.88fr]">
        <section className="overflow-hidden rounded-[2.5rem] bg-slate-950 p-8 text-white shadow-[0_20px_60px_rgba(15,23,42,0.14)] lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(45,212,191,0.14),transparent_28%)]"></div>
          <div className="relative space-y-8">
            <div className="inline-flex rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm font-semibold uppercase tracking-[0.28em] text-slate-200">
              Secure access
            </div>

            <div className="space-y-4">
              <h1 className="max-w-3xl text-5xl font-bold leading-[0.96] text-white sm:text-6xl">
                Quay lai command room va tiep tuc dieu hanh cong viec.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                Form dang nhap duoc dat trong mot shell sach, nhan manh tac vu chinh va loai bo cam giac demo page.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { value: 'Fast', label: 'vao thang dashboard' },
                { value: 'Clear', label: 'nhin mot lan la hieu' },
                { value: 'Safe', label: 'session ro rang' },
              ].map((item) => (
                <div key={item.value} className="rounded-[1.7rem] border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <p className="text-2xl font-bold text-white">{item.value}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-4">
              {loginBenefits.map((item, index) => (
                <div key={item} className="flex items-start gap-4 rounded-[1.7rem] border border-white/10 bg-white/8 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-sm font-bold text-white">
                    0{index + 1}
                  </div>
                  <p className="text-sm leading-7 text-slate-200">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[2.5rem] border border-white/70 bg-white/80 p-8 shadow-[0_24px_90px_rgba(15,23,42,0.12)] backdrop-blur-xl lg:p-10">
          <div className="mb-8 space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">Login</p>
            <h2 className="text-4xl font-bold text-slate-950">Dang nhap tai khoan</h2>
            <p className="text-base leading-7 text-slate-600">
              Nhap thong tin de mo lai khong gian quan tri cua ban.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-[1.6rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <label className="block space-y-2">
              <span className="text-sm font-semibold text-slate-700">Email</span>
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-[1.5rem] border border-slate-200/80 bg-slate-50/80 px-4 py-3.5 text-slate-950 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100"
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-semibold text-slate-700">Mat khau</span>
              <input
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full rounded-[1.5rem] border border-slate-200/80 bg-slate-50/80 px-4 py-3.5 text-slate-950 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-slate-950 px-6 py-4 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Dang dang nhap...' : 'Dang nhap'}
            </button>
          </form>

          <div className="mt-8 rounded-[1.8rem] border border-slate-200/70 bg-slate-50/80 p-5">
            <p className="text-sm leading-7 text-slate-600">
              Chua co tai khoan?{' '}
              <Link to="/register" className="font-semibold text-teal-700 transition hover:text-teal-600">
                Tao tai khoan moi
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;
