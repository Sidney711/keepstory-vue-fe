// src/stores/authorizationStore.ts
import { defineStore } from 'pinia';
import type { LoggedInResponse } from '@/interfaces/accounts';
import { AccountService } from '@/services/accountService';
import router from '@/router';

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
      if (this.loggedIn == true) {
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
    async logout() {
      try {
        await AccountService.logout();
      } catch (error) {
        console.error('Chyba při odhlašování:', error);
      }
      this.loggedIn = false;
      this.account = null;
      await router.push({ name: 'login' });
    },
  },
});
