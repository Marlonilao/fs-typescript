import axios from 'axios';
import type { NonSensitiveDiaryEntry } from '../../backend/src/types';

const baseUrl = 'http://localhost:3000/api/diaries';

const getAll = async () => {
  return await axios.get<NonSensitiveDiaryEntry[]>(baseUrl);
};

export default { getAll };
