export interface AccountRequest {
  email: string;
  password: string;
  'password-confirm': string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface VerifyAccountResendRequest {
  'e-mail': string;
}

export interface VerifyAccountRequest {
  key: string;
}

export interface ChangePasswordRequest {
  password: string;
  'new-password': string;
  'password-confirm': string;
}

export interface ChangeLoginRequest {
  password: string;
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface ResetPasswordPayload {
  key: string;
  password: string;
  'password-confirm': string;
}

export interface VerifyLoginChangeRequest {
  key: string;
}

export interface CloseAccountRequest {
  password: string;
}
