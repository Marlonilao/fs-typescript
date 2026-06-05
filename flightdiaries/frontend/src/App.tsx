import { useEffect, useState } from 'react';
import type {
  NewDiaryEntry,
  NonSensitiveDiaryEntry,
} from '../../backend/src/types';
import diaryService from './diaryService';
import Diary from './components/Diary';
import AddNewEntry from './components/AddNewEntry';
import axios from 'axios';
import ErrorNotif from './components/ErrorNotif';

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchDiaries = async () => {
      const response = await diaryService.getAll();
      setDiaries(response.data);
      console.log(response.data);
    };
    fetchDiaries();
  }, []);

  const handleAddNew = async (object: NewDiaryEntry) => {
    try {
      const response = await diaryService.add(object);
      setDiaries(diaries.concat(response.data));
      setIsAdding(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response);
        setErrorMessage('Failed to add entry: ' + error.message);
        setTimeout(() => setErrorMessage(''), 5000);
      } else {
        console.error(error);
        setErrorMessage('An unexpected error occurred');
        setTimeout(() => setErrorMessage(''), 5000);
      }
    }
  };

  const handleCancelAdding = () => setIsAdding(false);

  return (
    <div>
      {errorMessage && <ErrorNotif message={errorMessage} />}
      {isAdding ? (
        <AddNewEntry
          handleCreateNew={handleAddNew}
          handleCancelAdding={handleCancelAdding}
        />
      ) : (
        <button onClick={() => setIsAdding(true)}>Add new</button>
      )}
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
