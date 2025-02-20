import axios from 'axios';
import { BACKEND_URL_WITH_API } from '@/env-constants';

export class EmploymentService {
  static async createEmployment(payload: any) {
    return axios.post(`${BACKEND_URL_WITH_API}/employments`, payload, {
      headers: { 'Content-Type': 'application/vnd.api+json' }
    });
  }

  static async updateEmployment(id: string, payload: any) {
    return axios.patch(`${BACKEND_URL_WITH_API}/employments/${id}`, payload, {
      headers: { 'Content-Type': 'application/vnd.api+json' }
    });
  }

  static async deleteEmployment(id: string) {
    return axios.delete(`${BACKEND_URL_WITH_API}/employments/${id}`);
  }
}
