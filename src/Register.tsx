import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

const registerHighlights = [
  {
    title: 'Nhanh de bat dau',
    description: 'Cac truong nhap duoc rut gon, tap trung vao thong tin cot loi de tao tai khoan.',
  },
  {
    title: 'Dep ma ro',
    description: 'Typography, khoang trang va hierarchy duoc tinh lai de page trong nhu mot SaaS that.',
  },
  {
    title: 'San sang verify',
    description: 'Sau khi tao tai khoan, luong xac thuc email tiep tuc giu cung mot cam giac giao dien.',
  },
];

const Register: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { register, loading } = useAuth();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    try {
      const result = await register(form.name, form.email, form.password);
      if (result.success) {
        setSuccess(result.message);
        setForm({ name: '', email: '', password: '' });
      } else {
        setError(result.message);
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('Co loi xay ra khi dang ky.');
    }
  };

  return (
    <main className="min-h-[calc(100vh-8rem)] mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="grid gap-8 items-center lg:grid-cols-[0.95fr_1.05fr]">
        <section className="overflow-hidden rounded-[2.5rem] border border-slate-200/70 bg-white/85 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.12)] lg:p-10">
          <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.12),transparent_70%)]"></div>

          <div className="relative space-y-8">
            <div className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.28em] text-orange-700">
              New account
            </div>

            <div className="space-y-4">
              <h1 className="max-w-3xl text-5xl font-bold leading-[0.96] text-slate-950 sm:text-6xl">
                Bat dau voi mot khu dashboard dep, gon va de mo rong.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                Trang dang ky moi duoc thiet ke de tao cam giac san pham cao cap ngay tu diem cham dau tien.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {registerHighlights.map((item) => (
                <div key={item.title} className="rounded-[1.7rem] border border-slate-200/70 bg-slate-50/80 p-5">
                  <h2 className="text-xl font-bold text-slate-950">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-[0_20px_60px_rgba(15,23,42,0.16)]">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-400">What this redesign improves</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {[
                  { value: '01', label: 'Nhieu contrast hon' },
                  { value: '02', label: 'Button ro muc tieu' },
                  { value: '03', label: 'Forms nhin co chat luong' },
                ].map((item) => (
                  <div key={item.value} className="rounded-[1.4rem] border border-white/10 bg-white/10 p-4">
                    <p className="text-2xl font-bold text-white">{item.value}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 p-8 text-white shadow-[0_30px_120px_rgba(15,23,42,0.22)] lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(45,212,191,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(251,146,60,0.22),transparent_34%)]"></div>
          <div className="absolute right-8 top-8 h-24 w-24 animate-float rounded-full border border-white/10 bg-white/5"></div>

          <div className="relative">
            <div className="mb-8 space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">Register</p>
              <h2 className="text-4xl font-bold text-white">Tao tai khoan</h2>
              <p className="text-base leading-7 text-slate-300">
                Dien thong tin ben duoi de khoi tao mot session moi cho he thong.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {error && (
                <div className="rounded-[1.6rem] border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                  {error}
                </div>
              )}
              {success && (
                <div className="rounded-[1.6rem] border border-emerald-400/25 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
                  {success}
                </div>
              )}

              <label className="block space-y-2">
                <span className="text-sm font-semibold text-slate-100">Ho va ten</span>
                <input
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Nhap ten cua ban"
                  className="w-full rounded-[1.5rem] border border-white/10 bg-white/10 px-4 py-3.5 text-white outline-none transition placeholder:text-slate-400 focus:border-orange-300 focus:bg-white/12 focus:ring-4 focus:ring-orange-400/10"
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-semibold text-slate-100">Email</span>
                <input
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full rounded-[1.5rem] border border-white/10 bg-white/10 px-4 py-3.5 text-white outline-none transition placeholder:text-slate-400 focus:border-orange-300 focus:bg-white/12 focus:ring-4 focus:ring-orange-400/10"
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-semibold text-slate-100">Mat khau</span>
                <input
                  name="password"
                  type="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full rounded-[1.5rem] border border-white/10 bg-white/10 px-4 py-3.5 text-white outline-none transition placeholder:text-slate-400 focus:border-orange-300 focus:bg-white/12 focus:ring-4 focus:ring-orange-400/10"
                />
              </label>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-semibold text-slate-950 shadow-[0_20px_40px_rgba(255,255,255,0.12)] transition hover:-translate-y-0.5 hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Dang tao tai khoan...' : 'Tao tai khoan'}
              </button>
            </form>

            <p className="mt-8 text-sm leading-7 text-slate-300">
              Da co tai khoan?{' '}
              <Link to="/login" className="font-semibold text-orange-300 transition hover:text-orange-200">
                Dang nhap ngay
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Register;
