import type { AccountRequest } from '@/interfaces/accounts/createAccount.ts'
import axios from 'axios'
import { BACKEND_URL } from '@/env-constants.ts'

export class AccountService {
  static async createAccount(account: AccountRequest) {
    return axios.post(BACKEND_URL + '/create-account', account);
  }
}
