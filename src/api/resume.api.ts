import { ApiService } from '../services/api.service';

class ResumeApi extends ApiService {
  fetchResumes = () => this.get('/resume');

  fetchResume = (resumeId: string) => this.get(`/resume/${resumeId}`);
}

export default new ResumeApi();
