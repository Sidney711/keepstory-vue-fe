import axios from 'axios'
import type {
  FamilyMembersResponse,
  NewFamilyMemberPayload,
  UpdateFamilyMemberPayload
} from '@/interfaces/familyMembers'
import { BACKEND_URL_WITH_API } from '@/env-constants.ts'

export class FamilyMembersService {
  static async fetchFamilyMembers() {
    return axios.get<FamilyMembersResponse>(`${BACKEND_URL_WITH_API}/family-members`)
  }

  static async createFamilyMember(payload: NewFamilyMemberPayload) {
    return axios.post(`${BACKEND_URL_WITH_API}/family-members`, payload)
  }

  static async updateFamilyMember(payload: UpdateFamilyMemberPayload) {
    return axios.patch(`${BACKEND_URL_WITH_API}/family-members/${payload.data.id}`, payload,
      { headers: { 'Content-Type': 'application/vnd.api+json' } })
  }
}
