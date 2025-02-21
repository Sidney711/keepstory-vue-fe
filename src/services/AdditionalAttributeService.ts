import axios from 'axios';
import { BACKEND_URL_WITH_API } from '@/env-constants';

export class AdditionalAttributeService {
  static async createAdditionalAttribute(payload: any) {
    try {
      const response = await axios.post(
        `${BACKEND_URL_WITH_API}/additional-attributes`,
        payload,
        {
          headers: { 'Content-Type': 'application/vnd.api+json' }
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async updateAdditionalAttribute(id: string, payload: any) {
    try {
      const response = await axios.patch(
        `${BACKEND_URL_WITH_API}/additional-attributes/${id}`,
        payload,
        {
          headers: { 'Content-Type': 'application/vnd.api+json' }
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async deleteAdditionalAttribute(id: string) {
    try {
      const response = await axios.delete(
        `${BACKEND_URL_WITH_API}/additional-attributes/${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
