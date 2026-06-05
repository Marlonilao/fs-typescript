import { useState } from 'react';
import {
  Visibility,
  type DiaryEntry,
  type NewDiaryEntry,
  Weather,
} from '../../../backend/src/types';

const AddNewEntry = ({
  handleCreateNew,
  handleCancelAdding,
}: {
  handleCreateNew: (
    object: NewDiaryEntry,
  ) => Promise<void> | Promise<DiaryEntry>;
  handleCancelAdding: () => void;
}) => {
  const [weather, setWeather] = useState<Weather | ''>('');
  const [visibility, setVisibility] = useState<Visibility | ''>('');
  const [date, setDate] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!weather || !visibility) return;

    await handleCreateNew({ weather, visibility, date, comment });

    setWeather('');
    setVisibility('');
    setDate('');
    setComment('');
  };

  const handleCancel = () => {
    handleCancelAdding();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Date
          <input
            type='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Weather
          <select
            value={weather}
            onChange={(e) => setWeather(e.target.value as Weather)}
          >
            <option value=''>-- select weather --</option>
            {Object.values(Weather).map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Visibility
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value as Visibility)}
          >
            <option value=''>-- select visibility --</option>
            {Object.values(Visibility).map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Comment
          <input
            type='text'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>
      </div>
      <button type='submit'>Add entry</button>{' '}
      <button onClick={handleCancel}>Cancel</button>
    </form>
  );
};

export default AddNewEntry;
