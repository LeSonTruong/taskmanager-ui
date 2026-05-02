import { type FormEvent, useEffect, useRef, useState } from 'react';
import api from './services/api';

interface User {
  id: number;
  name: string;
  email: string;
}

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [query, setQuery] = useState('');
  const [isFetching, setIsFetching] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const nameInputRef = useRef<HTMLInputElement>(null);

  const fetchUsers = async (options?: { silent?: boolean }) => {
    const silent = options?.silent ?? false;

    try {
      if (!silent) {
        setIsFetching(true);
      }

      const response = await api.get('/users');
      setUsers(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Khong the tai danh sach nguoi dung.');
    } finally {
      if (!silent) {
        setIsFetching(false);
      }
    }
  };

  useEffect(() => {
    let cancelled = false;

    api
      .get('/users')
      .then((response) => {
        if (cancelled) {
          return;
        }

        setUsers(response.data);
        setError('');
      })
      .catch((err) => {
        if (cancelled) {
          return;
        }

        console.error('Error fetching users:', err);
        setError('Khong the tai danh sach nguoi dung.');
      })
      .finally(() => {
        if (!cancelled) {
          setIsFetching(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleCreateUser = async (event: FormEvent) => {
    event.preventDefault();

    if (!name.trim() || !email.trim()) {
      setError('Vui long nhap day du ten va email.');
      return;
    }

    try {
      setIsCreating(true);
      await api.post('/users', { name: name.trim(), email: email.trim() });
      setName('');
      setEmail('');
      setError('');
      setSuccess('Da them nguoi dung moi vao he thong.');
      setTimeout(() => setSuccess(''), 3200);
      void fetchUsers({ silent: true });
    } catch (err) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      setError(axiosError.response?.data?.message || 'Loi khi them nguoi dung.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteUser = async (id: number) => {
    const confirmed = window.confirm('Ban chac chan muon xoa nguoi dung nay?');
    if (!confirmed) {
      return;
    }

    try {
      setDeletingUserId(id);
      await api.delete(`/users/${id}`);
      setUsers((currentUsers) => currentUsers.filter((user) => user.id !== id));
      setError('');
      setSuccess('Da xoa nguoi dung khoi he thong.');
      setTimeout(() => setSuccess(''), 3200);
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Loi khi xoa nguoi dung.');
    } finally {
      setDeletingUserId(null);
    }
  };

  const normalizedQuery = query.trim().toLowerCase();
  const filteredUsers = users.filter((user) => {
    if (!normalizedQuery) {
      return true;
    }

    const searchSource = `${user.name} ${user.email} ${user.id}`.toLowerCase();
    return searchSource.includes(normalizedQuery);
  });

  const uniqueDomains = new Set(
    users
      .map((user) => user.email.split('@')[1]?.toLowerCase())
      .filter((value): value is string => Boolean(value)),
  ).size;

  const latestUserId = users.length ? Math.max(...users.map((user) => user.id)) : 0;
  const isBusy = isFetching || isCreating || deletingUserId !== null;

  const statCards = [
    {
      label: 'Tong users',
      value: users.length.toString().padStart(2, '0'),
      note: 'So ban ghi hien co trong dashboard.',
    },
    {
      label: 'Khop tim kiem',
      value: filteredUsers.length.toString().padStart(2, '0'),
      note: 'So ket qua dang duoc hien thi theo bo loc.',
    },
    {
      label: 'Email domains',
      value: uniqueDomains.toString().padStart(2, '0'),
      note: 'So mien email khac nhau trong danh sach.',
    },
    {
      label: 'Ma moi nhat',
      value: latestUserId ? `#${latestUserId}` : '--',
      note: 'ID cao nhat giup theo doi nhom user moi.',
    },
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 pb-14 pt-8 sm:px-6 lg:px-8 lg:pb-20">
      <section className="rounded-[2rem] bg-slate-950 px-6 py-7 text-white shadow-sm sm:px-8 sm:py-8 lg:px-10 lg:py-10">
        <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-400">User control room</p>

            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-bold text-white sm:text-5xl">
                Dashboard users duoc lam lai de nhin la muon dung.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                Bo cuc moi tach ro phan nhap lieu, tim kiem, thong ke va danh sach user. Nhanh hon khi thao tac, dep hon khi trinh bay.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="rounded-full bg-white/10 px-4 py-2 text-sm text-slate-100">
                {isFetching ? 'Dang dong bo du lieu...' : 'He thong san sang cap nhat.'}
              </div>
              <div className="rounded-full bg-white/10 px-4 py-2 text-sm text-slate-100">
                {error ? 'Can xu ly loi hien tai.' : 'Khong co canh bao nghiem trong.'}
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {statCards.map((card) => (
              <div key={card.label} className="rounded-[1.5rem] bg-white/10 p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">{card.label}</p>
                <p className="mt-4 text-3xl font-bold text-white">{card.value}</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">{card.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
        <aside className="self-start space-y-6 xl:sticky xl:top-24">
          <section className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">Create user</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-950">Them thanh vien moi</h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 5v14M5 12h14" />
                </svg>
              </div>
            </div>

            <form className="space-y-4" onSubmit={handleCreateUser}>
              <label className="block space-y-2">
                <span className="text-sm font-semibold text-slate-700">Ten nguoi dung</span>
                <input
                  ref={nameInputRef}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  disabled={isCreating}
                  placeholder="VD: Nguyen Minh Anh"
                  className="w-full rounded-[1.2rem] border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-950 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-semibold text-slate-700">Email</span>
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                  disabled={isCreating}
                  placeholder="team.member@example.com"
                  className="w-full rounded-[1.2rem] border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-950 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </label>

              <button
                type="submit"
                disabled={isCreating}
                className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-slate-950 px-6 py-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isCreating ? 'Dang tao user...' : 'Them user moi'}
              </button>
            </form>
          </section>

          <section className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">Ops note</p>
            <div className="mt-5 grid gap-4">
              {[
                'Dung tim kiem de loc theo ten, email hoac ID.',
                'Xoa user duoc dua vao hanh dong ro rang tren tung card.',
                'Thanh thong bao giu he thong thong suot khi ban thao tac lien tuc.',
              ].map((item, index) => (
                <div key={item} className="flex items-start gap-4 rounded-[1.2rem] border border-slate-200 bg-slate-50 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-teal-50 text-sm font-bold text-teal-700">
                    0{index + 1}
                  </div>
                  <p className="text-sm leading-7 text-slate-600">{item}</p>
                </div>
              ))}
            </div>
          </section>
        </aside>

        <section className="space-y-6">
          {(error || success) && (
            <div
              className={`rounded-[1.5rem] border px-5 py-4 shadow-sm ${
                error
                  ? 'border-red-200 bg-red-50 text-red-700'
                  : 'border-emerald-200 bg-emerald-50 text-emerald-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/70">
                  {error ? (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M12 9v4m0 4h.01M5.93 19h12.14c1.54 0 2.5-1.67 1.73-3L13.73 5c-.77-1.33-2.69-1.33-3.46 0L4.2 16c-.77 1.33.19 3 1.73 3Z"
                      />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="m5 13 4 4L19 7" />
                    </svg>
                  )}
                </div>
                <p className="text-sm font-semibold">{error || success}</p>
              </div>
            </div>
          )}

          <div className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">Directory</p>
                <h2 className="mt-2 text-3xl font-bold text-slate-950">Danh sach nguoi dung</h2>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <label className="relative block min-w-[260px]">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
                      />
                    </svg>
                  </span>
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Tim theo ten, email hoac ID"
                    className="w-full rounded-full border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm text-slate-950 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100"
                  />
                </label>

                <button
                  type="button"
                  onClick={() => void fetchUsers()}
                  disabled={isBusy}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <svg className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 12a8 8 0 1 1-2.34-5.66M20 4v6h-6" />
                  </svg>
                  Lam moi
                </button>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
                Hien thi {filteredUsers.length} / {users.length} user
              </div>
              <div className="rounded-full bg-teal-50 px-4 py-2 text-sm font-medium text-teal-700">
                {uniqueDomains} email domain
              </div>
              <div className="rounded-full bg-orange-50 px-4 py-2 text-sm font-medium text-orange-700">
                {latestUserId ? `Latest ID ${latestUserId}` : 'Chua co du lieu'}
              </div>
            </div>
          </div>

          {isFetching && !users.length ? (
            <div className="rounded-[1.8rem] border border-slate-200 bg-white p-10 text-center shadow-sm">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-950 text-white">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/25 border-t-white"></div>
              </div>
              <h3 className="mt-6 text-2xl font-bold text-slate-950">Dang tai danh sach nguoi dung</h3>
              <p className="mt-3 text-base leading-7 text-slate-600">
                He thong dang dong bo du lieu de hien thi dashboard moi.
              </p>
            </div>
          ) : filteredUsers.length ? (
            <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
              {filteredUsers.map((user, index) => {
                const domain = user.email.split('@')[1]?.toLowerCase() || 'internal';
                const isDeleting = deletingUserId === user.id;

                return (
                  <article
                    key={user.id}
                    className="group rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-[1rem] bg-slate-950 text-lg font-bold text-white">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                            User #{user.id}
                          </p>
                          <h3 className="mt-1 text-xl font-bold text-slate-950">{user.name}</h3>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => void handleDeleteUser(user.id)}
                        disabled={isDeleting}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-red-200 bg-red-50 text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                        title="Xoa nguoi dung"
                      >
                        {isDeleting ? (
                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-red-300 border-t-red-600"></div>
                        ) : (
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.8}
                              d="M5 7h14M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7m-7 0 1 11.5A1.5 1.5 0 0 0 10.49 20h3.02a1.5 1.5 0 0 0 1.49-1.5L16 7M10 11v5m4-5v5"
                            />
                          </svg>
                        )}
                      </button>
                    </div>

                    <div className="mt-6 space-y-4">
                      <div className="rounded-[1.2rem] border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Email</p>
                        <p className="mt-2 break-all text-sm leading-7 text-slate-700">{user.email}</p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-teal-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
                          {domain}
                        </span>
                        <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                          active record
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-[1.8rem] border border-slate-200 bg-white p-10 text-center shadow-sm">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-slate-950 text-white">
                <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 7h16M7 12h10M9 17h6" />
                </svg>
              </div>
              <h3 className="mt-6 text-2xl font-bold text-slate-950">
                {users.length ? 'Khong co user nao khop bo loc' : 'Chua co user nao trong he thong'}
              </h3>
              <p className="mt-3 text-base leading-7 text-slate-600">
                {users.length
                  ? 'Thu doi tu khoa tim kiem hoac lam moi danh sach.'
                  : 'Them user dau tien de bat dau xay dung directory.'}
              </p>
              <button
                type="button"
                onClick={() => nameInputRef.current?.focus()}
                className="mt-6 inline-flex items-center justify-center gap-3 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Tap trung vao form tao user
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
