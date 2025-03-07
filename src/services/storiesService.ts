import axios from 'axios';
import type { StoriesResponse, NewStoryPayload } from '@/interfaces/stories';
import { BACKEND_URL_WITH_API } from '@/env-constants';

export class StoriesService {
  static async fetchStoriesForFamilyMember(familyMemberId: string) {
    return axios.get<StoriesResponse>(`${BACKEND_URL_WITH_API}/family-members/${familyMemberId}/stories`);
  }

  static async createStory(payload: NewStoryPayload) {
    return axios.post(`${BACKEND_URL_WITH_API}/stories`, payload);
  }

  static async fetchStory(storyId: string) {
    return axios.get(`${BACKEND_URL_WITH_API}/stories/${storyId}?include=family-members&fields[family-members]=id,first-name,last-name,date-of-birth`);
  }

  static async deleteStory(id: string) {
    return axios.delete(`${BACKEND_URL_WITH_API}/stories/${id}`);
  }

  static async updateStory(id: string, payload: NewStoryPayload) {
    return axios.patch(`${BACKEND_URL_WITH_API}/stories/${id}`, payload, {
      headers: {
        'Content-Type': 'application/vnd.api+json'
      }
    });
  }
}
