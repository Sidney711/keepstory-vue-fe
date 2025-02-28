import axios from 'axios';
import { BACKEND_URL_WITH_API } from '@/env-constants';

export class ExportPdfService {
  static async exportFamily(): Promise<any> {
    try {
      const savedLocale = localStorage.getItem('locale');
      const response = await axios.post(`${BACKEND_URL_WITH_API}/export_to_pdf/family`, {'language': savedLocale});
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async exportFamilyMember(familyMemberId: string): Promise<any> {
    try {
      const savedLocale = localStorage.getItem('locale');
      const response = await axios.post(`${BACKEND_URL_WITH_API}/export_to_pdf/family_member/${familyMemberId}`, {'language': savedLocale});
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async exportFamilyTree(familyMemberId: string): Promise<any> {
    try {
      const savedLocale = localStorage.getItem('locale');
      const response = await axios.post(`${BACKEND_URL_WITH_API}/export_to_pdf/family_tree/${familyMemberId}`, {'language': savedLocale});
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
