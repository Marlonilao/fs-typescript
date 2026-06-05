import { useEffect, useState } from 'react';
import type {
  NewDiaryEntry,
  NonSensitiveDiaryEntry,
} from '../../backend/src/types';
import diaryService from './diaryService';
import Diary from './components/Diary';
import AddNewEntry from './components/AddNewEntry';

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchDiaries = async () => {
      const response = await diaryService.getAll();
      setDiaries(response.data);
      console.log(response.data);
    };
    fetchDiaries();
  }, []);

  const handleAddNew = async (object: NewDiaryEntry) => {
    const response = await diaryService.add(object);

    setDiaries(diaries.concat(response.data));
  };

  const handleCancelAdding = () => setIsAdding(false);

  return (
    <div>
      {isAdding ? null : (
        <button onClick={() => setIsAdding(true)}>Add new</button>
      )}
      {isAdding ? (
        <AddNewEntry
          handleCreateNew={handleAddNew}
          handleCancelAdding={handleCancelAdding}
        />
      ) : null}
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
