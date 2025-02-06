import axios from 'axios';
import { BACKEND_URL, BACKEND_URL_WITH_API } from '@/env-constants.ts'
import type {
  AccountRequest, ChangeLoginRequest, ChangePasswordRequest, CloseAccountRequest, LoggedInResponse,
  LoginRequest, ResetPasswordPayload, ResetPasswordRequest, VerifyAccountRequest,
  VerifyAccountResendRequest, VerifyLoginChangeRequest
} from '@/interfaces/accounts.ts'

export class AccountService {
  static async createAccount(account: AccountRequest) {
    return axios.post(BACKEND_URL + '/create-account', account);
  }

  static async login(payload: LoginRequest) {
    return axios.post(BACKEND_URL + '/login', payload);
  }

  static async verifyAccountResend(payload: VerifyAccountResendRequest) {
    return axios.post(BACKEND_URL + '/verify-account-resend', payload);
  }

  static async verifyAccount(payload: VerifyAccountRequest) {
    return axios.post(BACKEND_URL + '/verify-account', payload);
  }

  static async changePassword(payload: ChangePasswordRequest) {
    return axios.post(BACKEND_URL + '/change-password', payload);
  }

  static async changeLogin(payload: ChangeLoginRequest) {
    return axios.post(BACKEND_URL + '/change-login', payload);
  }

  static async logout() {
    return axios.post(BACKEND_URL + '/logout', {});
  }

  static async resetPasswordRequest(payload: ResetPasswordRequest) {
    return axios.post(BACKEND_URL + '/reset-password-request', payload);
  }

  static async resetPassword(payload: ResetPasswordPayload) {
    return axios.post(BACKEND_URL + '/reset-password', payload);
  }

  static async verifyLoginChange(payload: VerifyLoginChangeRequest) {
    return axios.post(BACKEND_URL + '/verify-login-change', payload);
  }

  static async closeAccount(payload: CloseAccountRequest) {
    return axios.post(BACKEND_URL + '/close-account', payload);
  }

  static async loggedIn() {
    return axios.get<LoggedInResponse>(BACKEND_URL_WITH_API + '/accounts/logged_in');
  }
}
