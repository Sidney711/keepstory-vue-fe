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
}
