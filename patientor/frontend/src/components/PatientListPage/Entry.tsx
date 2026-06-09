import type { Entry, Diagnosis } from '../../types';
import { assertNever } from '../../utils';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from '@mui/material/Box';

const Entry = ({
  entry,
  diagnosis,
}: {
  entry: Entry;
  diagnosis: Diagnosis[];
}) => {
  const getByCode = (code: string) => diagnosis.find((d) => d.code === code);

  switch (entry.type) {
    case 'HealthCheck':
      return (
        <Box sx={{ p: 2, border: '1px solid grey', mb: 1, borderRadius: 2 }}>
          <p>
            {entry.date}: {entry.description}
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
          {entry.healthCheckRating === 0 && (
            <FavoriteIcon sx={{ color: '#22C55E' }} />
          )}
          {entry.healthCheckRating === 1 && (
            <FavoriteIcon sx={{ color: '#EAB308' }} />
          )}
          {entry.healthCheckRating === 2 && (
            <FavoriteIcon sx={{ color: '#F97316' }} />
          )}
          {entry.healthCheckRating === 3 && (
            <FavoriteIcon sx={{ color: '#EF4444' }} />
          )}
          <p>
            Diagnose by <em>{entry.specialist}</em>
          </p>
        </Box>
      );
    case 'Hospital':
      return (
        <Box sx={{ p: 2, border: '1px solid grey', mb: 1, borderRadius: 2 }}>
          <p>
            {entry.date}: {entry.description}
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
          <p>Discharge Date: {entry.discharge.date}</p>
          <p>Criteria: {entry.discharge.criteria}</p>
          <p>
            Diagnose by <em>{entry.specialist}</em>
          </p>
        </Box>
      );
    case 'OccupationalHealthcare':
      return (
        <Box sx={{ p: 2, border: '1px solid grey', mb: 1, borderRadius: 2 }}>
          <p>
            {entry.date}: {entry.description}
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
          <p>Employer: {entry.employerName}</p>
          {entry.sickLeave && (
            <p>
              Sick Leave: {entry.sickLeave.startDate} –{' '}
              {entry.sickLeave.endDate}
            </p>
          )}
          <p>
            Diagnose by <em>{entry.specialist}</em>
          </p>
        </Box>
      );
    default:
      return assertNever(entry);
  }
};

export default Entry;
