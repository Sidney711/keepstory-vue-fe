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
          shortMessage: item.attributes['short-message'],
          birthLastName: item.attributes['birth-last-name'],
          birthPlace: item.attributes['birth-place'],
          birthTime: item.attributes['birth-time'],
          gender: item.attributes['gender'],
          religion: item.attributes['religion'],
          deceased: item.attributes.deceased,
          shortDescription: item.attributes['short-description'],
          deathTime: item.attributes['death-time'],
          deathPlace: item.attributes['death-place'],
          causeOfDeath: item.attributes['cause-of-death'],
          burialPlace: item.attributes['burial-place'],
          burialDate: item.attributes['burial-date'],
          intermentPlace: item.attributes['internment-place'],
          relationShipTree: item.attributes['relationship-tree'].map((relation) => ({
            id: relation.id,
            firstName: relation['first-name'],
            lastName: relation['last-name'],
            relationship: relation.relationship,
          })),
        }));
      } catch (err: any) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
