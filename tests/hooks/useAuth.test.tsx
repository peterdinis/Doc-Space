"use client"

import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react-hooks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { api } from "@/lib/api";
import { useLogin, useRegister, useMe } from "@/hooks/auth/useAuth";

vi.mock("@/lib/api", async () => ({
  api: vi.fn(),
}));

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe("auth hooks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("should login successfully", async () => {
    const mockResponse = { accessToken: "token", user: { id: "123", email: "test@example.com" } };
    (api as any).mockResolvedValueOnce(mockResponse);

    const { result, waitFor } = renderHook(() => useLogin(), { wrapper });

    act(() => {
      result.current.mutate({ email: "test@example.com", password: "password123" });
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual(mockResponse);
    expect(api).toHaveBeenCalledWith("/auth/login", expect.anything());
  });

  it("should register successfully", async () => {
    const mockResponse = { accessToken: "token", user: { id: "123", email: "new@example.com" } };
    (api as any).mockResolvedValueOnce(mockResponse);

    const { result, waitFor } = renderHook(() => useRegister(), { wrapper });

    act(() => {
      result.current.mutate({ email: "new@example.com", password: "secure123", name: "New User" });
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual(mockResponse);
    expect(api).toHaveBeenCalledWith("/auth/register", expect.anything());
  });

  it("should fetch current user when token exists", async () => {
    const mockUser = { id: "123", email: "user@example.com" };
    localStorage.setItem("access_token", "mock-token");
    (api as any).mockResolvedValueOnce(mockUser);

    const { result, waitFor } = renderHook(() => useMe(), { wrapper });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual(mockUser);
    expect(api).toHaveBeenCalledWith("/user/me", {
      headers: { Authorization: "Bearer mock-token" },
    });
  });

  it("should throw error when no token in localStorage", async () => {
    const { result, waitFor } = renderHook(() => useMe(), { wrapper });

    await waitFor(() => result.current.isError);

    expect(result.current.error?.message).toBe("No access token found");
  });

  it("should handle invalid/expired token", async () => {
    localStorage.setItem("access_token", "invalid-token");
    (api as any).mockRejectedValueOnce(new Error("Invalid or expired token"));

    const { result, waitFor } = renderHook(() => useMe(), { wrapper });

    await waitFor(() => result.current.isError);

    expect(localStorage.getItem("access_token")).toBeNull(); // token should be removed
    expect(result.current.error?.message).toBe("Invalid or expired token");
  });
});
