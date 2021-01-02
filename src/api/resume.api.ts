import { ApiService } from '../services/api.service';
import { ResumeDto } from '../services/types';

class ResumeApi extends ApiService {
  fetchResumes = () => this.get('/resume');

  fetchResume = (resumeId: string) => this.get(`/resume/${resumeId}`);

  createResume = (createResumeDto: ResumeDto) =>
    this.post(`/resume`, createResumeDto);

  updateResume = (updateResumeDto: ResumeDto, id: string) =>
    this.put(`/resume/${id}`, updateResumeDto);

  fetchViewResume = (userLogin: string, resumeId: string) =>
    this.get(`/resume/${userLogin}/${resumeId}`);
}

export default new ResumeApi();
