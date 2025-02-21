import axios from 'axios';
import { BACKEND_URL_WITH_API } from '@/env-constants';

export class EducationService {
  static async createEducation(payload: any) {
    return axios.post(`${BACKEND_URL_WITH_API}/educations`, payload, {
      headers: { 'Content-Type': 'application/vnd.api+json' }
    });
  }

  static async updateEducation(id: string, payload: any) {
    return axios.patch(`${BACKEND_URL_WITH_API}/educations/${id}`, payload, {
      headers: { 'Content-Type': 'application/vnd.api+json' }
    });
  }

  static async deleteEducation(id: string) {
    return axios.delete(`${BACKEND_URL_WITH_API}/educations/${id}`);
  }
}
