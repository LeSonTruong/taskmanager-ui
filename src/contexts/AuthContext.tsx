import React, { useState } from 'react';
import type { ReactNode } from 'react';
import api from '../services/api';
import { AuthContext } from './AuthContextTypes';
import type { User } from './AuthContextTypes';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      try {
        return JSON.parse(storedUser) as User;
      } catch {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        return null;
      }
    }

    return null;
  });
  const [loading, setLoading] = useState(false);

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/register', { name, email, password });
      return {
        success: true,
        message: response.data.message || 'Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.',
      };
    } catch (err) {
      const axiosError = err as {
        response?: { data?: { message?: string; error?: string } };
      };
      const errorMessage =
        axiosError.response?.data?.message ||
        axiosError.response?.data?.error ||
        'Có lỗi xảy ra khi đăng ký.';
      return {
        success: false,
        message: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });
      const nextUser = {
        id: response.data.user.id,
        name: response.data.user.name,
        email: response.data.user.email,
      };

      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(nextUser));
      setUser(nextUser);
    } catch (err) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
