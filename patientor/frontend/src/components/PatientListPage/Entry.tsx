import type { Entry } from '../../types';

const Entry = ({ entry }: { entry: Entry }) => {
  return (
    <div>
      <p>
        {entry.date} {entry.description}
      </p>
      {entry.diagnosisCodes ? (
        <ul>
          {entry.diagnosisCodes?.map((code) => (
            <li key={code}>{code}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Entry;
