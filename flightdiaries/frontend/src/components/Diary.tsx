import type { NonSensitiveDiaryEntry } from '../../../backend/src/types';

const Diary = ({ diary }: { diary: NonSensitiveDiaryEntry }) => {
  return (
    <p>
      {diary.date} {diary.weather} {diary.visibility}
    </p>
  );
};

export default Diary;
