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
        <fieldset>
          <legend>Weather</legend>
          {Object.values(Weather).map((w) => (
            <label key={w}>
              <input
                type='radio'
                name='weather'
                value={w}
                checked={weather === w}
                onChange={(e) => setWeather(e.target.value as Weather)}
              />
              {w}
            </label>
          ))}
        </fieldset>
      </div>
      <div>
        <fieldset>
          <legend>Visibility</legend>
          {Object.values(Visibility).map((v) => (
            <label key={v}>
              <input
                type='radio'
                name='visibility'
                value={v}
                checked={visibility === v}
                onChange={(e) => setVisibility(e.target.value as Visibility)}
              />
              {v}
            </label>
          ))}
        </fieldset>
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
