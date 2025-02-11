import { defineStore } from 'pinia';
import { FamilyMembersService } from '@/services/FamilyMemberService.ts'
import type { FamilyMember } from '@/interfaces/familyMembers.ts'

interface FamilyState {
  familyMembers: FamilyMember[];
  loading: boolean;
  error: string | null;
}

export const useFamilyMembersStore = defineStore('familyMembers', {
  state: (): FamilyState => ({
    familyMembers: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchFamilyMembers() {
      this.loading = true;
      this.error = null;
      try {
        const response = await FamilyMembersService.fetchFamilyMembers();
        this.familyMembers = response.data.data.map((item) => ({
          id: item.id,
          firstName: item.attributes['first-name'],
          lastName: item.attributes['last-name'],
          dateOfBirth: item.attributes['date-of-birth'],
          dateOfDeath: item.attributes['date-of-death'],
        }));
      } catch (err: any) {
        this.error = err.message || 'Chyba při načítání dat';
      } finally {
        this.loading = false;
      }
    },
  },
});
