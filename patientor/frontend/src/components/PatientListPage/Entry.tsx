import type { Entry, Diagnosis } from '../../types';

const Entry = ({
  entry,
  diagnosis,
}: {
  entry: Entry;
  diagnosis: Diagnosis[];
}) => {
  const getByCode = (code: string) => diagnosis.find((d) => d.code === code);

  return (
    <div>
      <p>
        {entry.date} {entry.description}
      </p>
      {entry.diagnosisCodes ? (
        <ul>
          {entry.diagnosisCodes?.map((code) => (
            <li key={code}>
              {code} {getByCode(code)?.name}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Entry;
