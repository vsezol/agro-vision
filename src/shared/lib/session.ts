import { Storage } from "./storage";

const STORAGE_KEY = "SESSION";

export interface Session {
  accessToken: string;
  refreshToken: string;
}

export const setSession = (session: Session | undefined): void =>
  Storage.set(STORAGE_KEY, session);

export const getSession = (): Session | undefined =>
  Storage.get<Session>(STORAGE_KEY);
