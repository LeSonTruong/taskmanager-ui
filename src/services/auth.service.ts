import api from "./api";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const authService = {
  // Gửi thông tin đăng ký
  register: (data: RegisterData) => api.post("/auth/register", data),

  // Gửi thông tin đăng nhập và nhận Token
  login: async (data: LoginData) => {
    const response = await api.post("/auth/login", data);
    if (response.data.access_token) {
      localStorage.setItem("token", response.data.access_token);
    }
    return response.data;
  },

  // Gọi API xác thực email từ token trên URL
  verifyEmail: (token: string) => api.get(`/auth/verify?token=${token}`),
};
