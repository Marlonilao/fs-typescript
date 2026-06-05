import { useEffect, useState } from 'react';
import type { NonSensitiveDiaryEntry } from '../../backend/src/types';
import diaryService from './diaryService';
import Diary from './components/Diary';

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    const fetchDiaries = async () => {
      const response = await diaryService.getAll();
      setDiaries(response.data);
      console.log(response.data);
    };
    fetchDiaries();
  }, []);

  return (
    <div>
      <h1>My flight diary</h1>
      <ol>
        {diaries.map((diary) => (
          <li key={diary.id}>
            <Diary diary={diary} />
          </li>
        ))}
      </ol>
    </div>
  );
};

export default App;
