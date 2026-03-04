import { getToken } from "./token";

export const isAuthenticated = (): boolean => {
  return !!getToken();
};

export const extractEmailFromToken = (jwt: string): string | null => {
  try {
    const payload = jwt.split(".")[1];
    if (!payload) return null;

    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      "=",
    );
    const json = atob(padded);
    const data = JSON.parse(json) as { sub?: string };
    return data.sub ?? null;
  } catch {
    return null;
  }
};

export const getUserEmail = (): string | null => {
  const token = getToken();
  return token ? extractEmailFromToken(token) : null;
};
