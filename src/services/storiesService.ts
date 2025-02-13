import axios from 'axios';
import type { NewStoryPayload } from '@/interfaces/stories';
import { BACKEND_URL_WITH_API } from '@/env-constants';

export class StoriesService {
  static async createStory(payload: NewStoryPayload) {
    return axios.post(`${BACKEND_URL_WITH_API}/stories`, payload);
  }
}
