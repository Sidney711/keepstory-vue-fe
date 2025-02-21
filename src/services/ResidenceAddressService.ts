import axios from 'axios';
import { BACKEND_URL_WITH_API } from '@/env-constants';

export class ResidenceAddressService {
  static async createResidenceAddress(payload: any) {
    return axios.post(`${BACKEND_URL_WITH_API}/residence-addresses`, payload, {
      headers: { 'Content-Type': 'application/vnd.api+json' }
    });
  }

  static async updateResidenceAddress(id: string, payload: any) {
    return axios.patch(`${BACKEND_URL_WITH_API}/residence-addresses/${id}`, payload, {
      headers: { 'Content-Type': 'application/vnd.api+json' }
    });
  }

  static async deleteResidenceAddress(id: string) {
    return axios.delete(`${BACKEND_URL_WITH_API}/residence-addresses/${id}`);
  }
}
