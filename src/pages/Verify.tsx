import React, { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { authService } from '../services/auth.service';

const Verify: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const token = searchParams.get('token');

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setStatus('error');
        setMessage('Khong tim thay token xac thuc.');
        return;
      }

      try {
        await authService.verifyEmail(token);
        setStatus('success');
        setMessage('Tai khoan cua ban da duoc xac thuc thanh cong.');
      } catch (error) {
        setStatus('error');
        const axiosError = error as AxiosError;
        setMessage(
          (axiosError.response?.data as { message?: string } | undefined)?.message ||
            'Token khong hop le hoac da het han.',
        );
      }
    };

    void verifyToken();
  }, [token]);

  const tone =
    status === 'success'
      ? {
          badge: 'Verified',
          card: 'border-emerald-200 bg-emerald-50',
          iconWrap: 'bg-emerald-500 text-white',
          title: 'Xac thuc thanh cong',
          titleColor: 'text-emerald-700',
        }
      : status === 'error'
      ? {
          badge: 'Attention',
          card: 'border-red-200 bg-red-50',
          iconWrap: 'bg-red-500 text-white',
          title: 'Khong the xac thuc',
          titleColor: 'text-red-700',
        }
      : {
          badge: 'Checking',
          card: 'border-slate-200 bg-white',
          iconWrap: 'bg-slate-950 text-white',
          title: 'Dang xac thuc token',
          titleColor: 'text-slate-950',
        };

  return (
    <main className="flex min-h-[calc(100vh-8rem)] items-center justify-center bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="rounded-[1.8rem] bg-slate-950 p-8 text-white">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Verification flow</p>
              <h1 className="text-4xl font-bold text-white">Trang thai email duoc hien thi ro rang.</h1>
              <p className="text-sm leading-7 text-slate-300">
                Trang verify duoc don sach de nguoi dung biet ngay dang xac thuc, thanh cong hay can hanh dong tiep.
              </p>
              <div className="grid gap-3 rounded-[1.6rem] bg-white/10 p-5 text-sm text-slate-200">
                <p>- Loading state nhe nhang, khong lam gay roi.</p>
                <p>- Success state ro rang, day ve login.</p>
                <p>- Error state co lua chon ro rang va thong diep thuc te.</p>
              </div>
            </div>
          </section>

          <section className={`rounded-[1.8rem] border p-8 shadow-sm ${tone.card}`}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500">{tone.badge}</p>
                <h2 className={`mt-3 text-3xl font-bold ${tone.titleColor}`}>{tone.title}</h2>
              </div>
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${tone.iconWrap}`}>
                {status === 'success' ? (
                  <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="m5 13 4 4L19 7" />
                  </svg>
                ) : status === 'error' ? (
                  <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M6 6l12 12M18 6 6 18" />
                  </svg>
                ) : (
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/20 border-t-white"></div>
                )}
              </div>
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 text-slate-700">
              <p className="text-sm leading-7">
                {status === 'loading'
                  ? 'He thong dang doi phan hoi tu token xac thuc. Viec nay thuong chi mat vai giay.'
                  : message}
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {status === 'success' ? (
                <>
                  <button
                    onClick={() => navigate('/login')}
                    className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Dang nhap ngay
                  </button>
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-50"
                  >
                    Ve trang chu
                  </Link>
                </>
              ) : status === 'error' ? (
                <>
                  <Link
                    to="/register"
                    className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Tao lai tai khoan
                  </Link>
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-50"
                  >
                    Thu dang nhap
                  </Link>
                </>
              ) : (
                <div className="inline-flex items-center justify-center rounded-full bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-900">
                  Dang xac thuc...
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Verify;
