import axios from 'axios';
import {
  type DiaryEntry,
  type NewDiaryEntry,
  type NonSensitiveDiaryEntry,
} from '../../backend/src/types';

const baseUrl = 'http://localhost:3000/api/diaries';

const getAll = async () => {
  return await axios.get<DiaryEntry[]>(baseUrl);
};

const getNonsensitiveEntries = async () => {
  return await axios.get<NonSensitiveDiaryEntry[]>(
    `${baseUrl}/nonSensitiveEntries`,
  );
};

const add = async (object: NewDiaryEntry) => {
  return axios.post<DiaryEntry>(baseUrl, object);
};

export default { getAll, add, getNonsensitiveEntries };
