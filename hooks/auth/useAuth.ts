"use client"

import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';

interface AuthResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    name?: string;
    createdAt: string;
    updatedAt: string;
  };
}

interface LoginDto {
  email: string;
  password: string;
}

interface RegisterDto extends LoginDto {
  name?: string;
}

export function useLogin() {
  return useMutation<AuthResponse, Error, LoginDto>({
    mutationKey: ["login"],
    mutationFn: (data) => api<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  });
}

export function useRegister() {
  return useMutation<AuthResponse, Error, RegisterDto>({
    mutationKey: ["register"],
    mutationFn: (data) => api<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  });
}
