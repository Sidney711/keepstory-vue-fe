import axios from 'axios';
import { BACKEND_URL_WITH_API } from '@/env-constants';

export class FamilyMembersService {
  static async fetchFamilyMembers() {
    return axios.get(`${BACKEND_URL_WITH_API}/family-members`);
  }

  static async createFamilyMember(payload: any) {
    return axios.post(`${BACKEND_URL_WITH_API}/family-members`, payload);
  }

  static async updateFamilyMember(memberId: string, payload: any) {
    return axios.patch(`${BACKEND_URL_WITH_API}/family-members/${memberId}`, payload, {
      headers: { 'Content-Type': 'application/vnd.api+json' }
    });
  }

  static async updateProfilePicture(memberId: string, formData: FormData) {
    return axios.patch(`${BACKEND_URL_WITH_API}/family-members/${memberId}/update_profile_picture`, formData);
  }

  static async deleteProfilePicture(memberId: string) {
    return axios.delete(`${BACKEND_URL_WITH_API}/family-members/${memberId}/delete_profile_picture`);
  }

  static async updateSignature(memberId: string, formData: FormData) {
    return axios.patch(`${BACKEND_URL_WITH_API}/family-members/${memberId}/update_signature`, formData);
  }

  static async deleteSignature(memberId: string) {
    return axios.delete(`${BACKEND_URL_WITH_API}/family-members/${memberId}/delete_signature`);
  }
}
