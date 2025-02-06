import { defineStore } from 'pinia';
import type { LoggedInResponse } from '@/interfaces/accounts';
import { AccountService } from '@/services/accountService.ts'

interface Account {
  id: number;
  email: string;
}

interface AuthState {
  loggedIn: boolean | null;
  account: Account | null;
}

export const useAuthorizationStore = defineStore('authorization', {
  state: (): AuthState => ({
    loggedIn: null,
    account: null,
  }),
  actions: {
    async checkLoggedIn() {
      if (this.loggedIn !== null) {
        return this.loggedIn;
      } else {
        try {
          const response = await AccountService.loggedIn();
          const data: LoggedInResponse = response.data;
          if (data.logged_in) {
            this.loggedIn = true;
            this.account = data.account || null;
          } else {
            this.loggedIn = false;
            this.account = null;
          }
          console.log(response);
        } catch {
          this.loggedIn = false;
          this.account = null;
        }

        return this.loggedIn;
      }
    },
  },
});
