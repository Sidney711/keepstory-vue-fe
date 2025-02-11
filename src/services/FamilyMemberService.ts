import axios from 'axios';
import type { FamilyMembersResponse, NewFamilyMemberPayload } from '@/interfaces/familyMembers'
import { BACKEND_URL_WITH_API } from '@/env-constants.ts'

export class FamilyMembersService {
  static async fetchFamilyMembers() {
    return axios.get<FamilyMembersResponse>(`${BACKEND_URL_WITH_API}/family-members`);
  }

  static async createFamilyMember(payload: NewFamilyMemberPayload) {
    return axios.post(`${BACKEND_URL_WITH_API}/family-members`, payload);
  }
}
