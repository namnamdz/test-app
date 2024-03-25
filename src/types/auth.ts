import { UserProfile } from "./user";

export interface JWTDataProps {
  userId: string;
}

export type JWTContextType = {
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoggedIn: boolean;
  isInitialized?: boolean;
  user?: UserProfile | null | undefined;
};

export interface InitialLoginContextProps {
  isLoggedIn: boolean;
  user?: UserProfile | null | undefined;
  isInitialized?: boolean;
}
