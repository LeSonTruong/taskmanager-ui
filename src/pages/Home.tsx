import React from 'react';
import { Link } from 'react-router-dom';

const spotlightMetrics = [
  {
    value: '01',
    label: 'Command hub',
    copy: 'Gom dashboard, auth va verification trong mot visual language lien mach.',
  },
  {
    value: '02',
    label: 'Responsive first',
    copy: 'Bo cuc duoc tinh lai de dep tren laptop, tablet va mobile.',
  },
  {
    value: '03',
    label: 'Realtime ready',
    copy: 'Khu quan tri user ro rang, de mo rong sang task board va analytics.',
  },
];

const featureCards = [
  {
    title: 'User operations',
    description: 'Them, tim kiem va xoa user bang giao dien dang dashboard thay vi mot danh sach thuan tuc.',
    accent: 'from-teal-500/20 to-teal-500/5',
  },
  {
    title: 'Authentication flow',
    description: 'Trang dang nhap, dang ky va verify duoc thiet ke nhu mot san pham SaaS thay vi demo page.',
    accent: 'from-orange-500/20 to-orange-500/5',
  },
  {
    title: 'System clarity',
    description: 'Thong tin, CTA va trang thai duoc sap xep de nguoi dung nhin mot lan la hieu ngay.',
    accent: 'from-blue-500/20 to-blue-500/5',
  },
];

const workflow = [
  {
    step: '01',
    title: 'Tao tai khoan',
    description: 'Nguoi dung vao landing, tao tai khoan va nhan huong dan xac thuc ro rang.',
  },
  {
    step: '02',
    title: 'Dang nhap',
    description: 'Phien dang nhap duoc dua vao mot shell sang trong, giup tac vu chinh duoc uu tien.',
  },
  {
    step: '03',
    title: 'Dieu hanh',
    description: 'Dashboard users tap trung vao hanh dong: quan sat, bo sung va don dep du lieu.',
  },
];

const Home: React.FC = () => {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <section className="mx-auto max-w-7xl px-4 pb-14 pt-8 sm:px-6 lg:px-8 lg:pb-20 lg:pt-14">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-8 animate-rise-in">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-700 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
              <span className="h-2.5 w-2.5 animate-pulse-glow rounded-full bg-teal-500"></span>
              Task Ops Interface
            </div>

            <div className="space-y-5">
              <h1 className="max-w-3xl text-5xl font-bold leading-[0.95] text-slate-950 sm:text-6xl xl:text-7xl">
                Giao dien task manager duoc lam lai de trong nhu mot san pham that.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                Khong chi la mot form CRUD. Day la mot command room gon, sang, co trong tam thi giac ro
                rang va san sang mo rong thanh he thong quan tri cong viec day du.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                to="/users"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-slate-950 px-7 py-4 text-sm font-semibold text-white shadow-[0_20px_45px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Mo dashboard users
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-slate-300/70 bg-white/70 px-7 py-4 text-sm font-semibold text-slate-900 shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:bg-white"
              >
                Tao tai khoan moi
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {spotlightMetrics.map((metric, index) => (
                <div
                  key={metric.label}
                  className="rounded-[1.8rem] border border-white/70 bg-white/72 p-5 shadow-[0_14px_40px_rgba(15,23,42,0.06)] backdrop-blur-xl"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">
                    {metric.value}
                  </p>
                  <h2 className="mt-3 text-xl font-bold text-slate-950">{metric.label}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{metric.copy}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-rise-in [animation-delay:120ms]">
            <div className="absolute left-10 top-8 h-32 w-32 rounded-full bg-teal-400/20 blur-3xl"></div>
            <div className="absolute bottom-10 right-0 h-40 w-40 rounded-full bg-orange-400/20 blur-3xl"></div>

            <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-900/10 bg-slate-950 p-7 text-white shadow-[0_30px_120px_rgba(15,23,42,0.22)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(45,212,191,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(251,146,60,0.2),transparent_32%)]"></div>

              <div className="relative space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Live preview</p>
                    <h2 className="mt-2 text-3xl font-bold text-white">Control room</h2>
                  </div>
                  <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-slate-100">
                    Syncing now
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[2rem] border border-white/10 bg-white/10 p-5 backdrop-blur">
                    <p className="text-sm text-slate-300">Operations focus</p>
                    <p className="mt-3 text-4xl font-bold text-white">78%</p>
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      Hero, auth pages va dashboard duoc can bang lai de CTA chinh luon noi bat.
                    </p>
                  </div>

                  <div className="rounded-[2rem] border border-white/10 bg-white/10 p-5 backdrop-blur">
                    <p className="text-sm text-slate-300">Visual coherence</p>
                    <div className="mt-4 space-y-3">
                      {['Landing page', 'Authentication', 'User management'].map((item) => (
                        <div key={item} className="flex items-center justify-between rounded-2xl bg-white/8 px-4 py-3">
                          <span className="text-sm text-slate-100">{item}</span>
                          <span className="text-xs uppercase tracking-[0.26em] text-teal-300">active</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-[0.72fr_1fr]">
                  <div className="rounded-[2rem] border border-white/10 bg-white/10 p-5">
                    <p className="text-sm text-slate-300">Team pulse</p>
                    <div className="mt-4 flex items-end gap-2">
                      {[38, 52, 44, 72, 66, 84].map((height, index) => (
                        <div key={height} className="flex-1 rounded-full bg-white/10 p-1">
                          <div
                            className={`rounded-full bg-gradient-to-t ${index % 2 === 0 ? 'from-teal-400 to-teal-300' : 'from-orange-400 to-amber-300'}`}
                            style={{ height: `${height}px` }}
                          ></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative rounded-[2rem] border border-white/10 bg-white/12 p-5">
                    <div className="absolute -right-6 -top-6 h-24 w-24 animate-float rounded-full border border-white/10 bg-white/5"></div>
                    <div className="absolute bottom-4 right-8 h-16 w-16 animate-float-wide rounded-full border border-teal-300/20 bg-teal-300/10"></div>
                    <p className="text-sm text-slate-300">What changed</p>
                    <h3 className="mt-3 text-2xl font-bold text-white">
                      Bold typography, warmer palette, cleaner hierarchy.
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-6 text-slate-300">
                      Giao dien moi bo cam giac template bang layout co do sau, motion nhe va surface nhieu lop.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {featureCards.map((card) => (
            <article
              key={card.title}
              className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/74 p-6 shadow-[0_16px_45px_rgba(15,23,42,0.08)] backdrop-blur-xl"
            >
              <div className={`h-24 rounded-[1.5rem] bg-gradient-to-br ${card.accent}`}></div>
              <h2 className="mt-6 text-2xl font-bold text-slate-950">{card.title}</h2>
              <p className="mt-3 text-base leading-7 text-slate-600">{card.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="grid gap-8 rounded-[2.5rem] border border-white/70 bg-white/74 p-7 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:grid-cols-[0.85fr_1.15fr] lg:p-10">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">Workflow narrative</p>
            <h2 className="text-4xl font-bold text-slate-950">
              Luong trai nghiem duoc xep lai theo hanh vi that cua nguoi dung.
            </h2>
            <p className="text-lg leading-8 text-slate-600">
              Muc tieu khong chi dep hon, ma con giup nguoi dung moi biet nen bam dau tien vao dau, va sau do di tiep nhu the nao.
            </p>
          </div>

          <div className="grid gap-4">
            {workflow.map((item) => (
              <div
                key={item.step}
                className="flex flex-col gap-4 rounded-[1.8rem] border border-slate-200/70 bg-slate-50/80 p-5 sm:flex-row sm:items-start"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-lg font-bold text-white shadow-[0_14px_30px_rgba(15,23,42,0.14)]">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-base leading-7 text-slate-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
