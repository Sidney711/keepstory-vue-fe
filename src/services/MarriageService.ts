import axios from 'axios';
import { BACKEND_URL_WITH_API } from '@/env-constants';

export class MarriageService {
  static async createMarriage(payload: any) {
    return axios.post(`${BACKEND_URL_WITH_API}/marriages`, payload);
  }

  static async updateMarriage(id: string, payload: any) {
    return axios.patch(`${BACKEND_URL_WITH_API}/marriages/${id}`, payload, {
      headers: { 'Content-Type': 'application/vnd.api+json' }
    });
  }

  static async deleteMarriage(id: string) {
    return axios.delete(`${BACKEND_URL_WITH_API}/marriages/${id}`);
  }
}
