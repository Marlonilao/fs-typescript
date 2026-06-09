import { useState, SyntheticEvent } from 'react';
import { assertNever } from '../../utils';
import {
  TextField,
  Chip,
  Box,
  Select,
  MenuItem,
  SelectChangeEvent,
  Grid,
  Button,
  InputLabel,
  FormControl,
} from '@mui/material';
import {
  Type,
  HealthCheckRating,
  Discharge,
  EntryFormValues,
} from '../../types';
import diagnosisEntries from '../../../../backend/data/diagnosesData';

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

interface TypeOptions {
  value: Type;
  label: string;
}

const typeOptions: TypeOptions[] = Object.values(Type).map((v) => ({
  value: v,
  label: v.toString(),
}));

interface HealthCheckRatingOptions {
  value: HealthCheckRating;
  label: string;
}

const healthCheckRatingOptions: HealthCheckRatingOptions[] = Object.entries(
  HealthCheckRating,
).map(([key, value]) => ({
  value: value,
  label: key,
}));

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [type, setType] = useState(Type.HealthCheck);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy,
  );
  const [discharge, setDischarge] = useState<Discharge>({
    date: '',
    criteria: '',
  });
  const [employerName, setEmployerName] = useState('');
  const [sickLeave, setSickleave] = useState({ startDate: '', endDate: '' });

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    switch (type) {
      case 'HealthCheck':
        onSubmit({
          description,
          date,
          specialist,
          diagnosisCodes,
          type,
          healthCheckRating,
        });
        break;
      case 'Hospital':
        onSubmit({
          description,
          date,
          specialist,
          diagnosisCodes,
          type,
          discharge,
        });
        break;
      case 'OccupationalHealthcare':
        onSubmit({
          description,
          date,
          specialist,
          diagnosisCodes,
          type,
          employerName,
          sickLeave,
        });
        break;
      default:
        assertNever(type);
    }
  };

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === 'string') {
      const value = event.target.value;
      const type = Object.values(Type).find((t) => t === value);
      if (type) {
        setType(type);
      }
    }
  };

  const onHealthCheckRatingChange = (event: SelectChangeEvent<number>) => {
    const value = event.target.value;
    const rating = Object.values(HealthCheckRating).find((r) => r === value);
    if (rating !== undefined) {
      setHealthCheckRating(rating);
    }
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <h1>New Entry</h1>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select label='Type' value={type} onChange={onTypeChange}>
              {typeOptions.map((option) => (
                <MenuItem key={option.label} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label='Date'
            type='date'
            fullWidth
            value={date}
            onChange={({ target }) => setDate(target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <TextField
            label='Description'
            fullWidth
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          <TextField
            label='Specialist'
            fullWidth
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />
          <FormControl fullWidth>
            <InputLabel>Diagnosis Codes (optional)</InputLabel>
            <Select<string[]>
              multiple
              value={diagnosisCodes}
              onChange={(e: SelectChangeEvent<string[]>) =>
                setDiagnosisCodes(
                  typeof e.target.value === 'string'
                    ? e.target.value.split(',')
                    : e.target.value,
                )
              }
              label='Diagnosis Codes (optional)'
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((code) => (
                    <Chip key={code} label={code} />
                  ))}
                </Box>
              )}
            >
              {diagnosisEntries.map(({ code, name }) => (
                <MenuItem key={code} value={code}>
                  {code} — {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {type === 'HealthCheck' && (
            <FormControl fullWidth>
              <InputLabel>HealthCheck Rating</InputLabel>
              <Select
                label='HealthCheck Rating'
                fullWidth
                value={healthCheckRating}
                onChange={onHealthCheckRatingChange}
              >
                {healthCheckRatingOptions.map((option) => (
                  <MenuItem key={option.label} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {type === 'Hospital' && (
            <div>
              <h3>Discharge</h3>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label='Date'
                  type='date'
                  slotProps={{ inputLabel: { shrink: true } }}
                  fullWidth
                  value={discharge.date}
                  onChange={({ target }) =>
                    setDischarge({ ...discharge, date: target.value })
                  }
                />
                <TextField
                  label='Criteria'
                  fullWidth
                  value={discharge.criteria}
                  onChange={({ target }) =>
                    setDischarge({ ...discharge, criteria: target.value })
                  }
                />
              </Box>
            </div>
          )}
          {type === 'OccupationalHealthcare' && (
            <div>
              <TextField
                label='Employer Name'
                fullWidth
                value={employerName}
                onChange={({ target }) => setEmployerName(target.value)}
              />
              <div>
                <h3>Sick Leave</h3>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    label='Start Date'
                    type='date'
                    slotProps={{ inputLabel: { shrink: true } }}
                    fullWidth
                    value={sickLeave.startDate}
                    onChange={({ target }) =>
                      setSickleave({ ...sickLeave, startDate: target.value })
                    }
                  />
                  <TextField
                    label='End Date'
                    type='date'
                    slotProps={{ inputLabel: { shrink: true } }}
                    fullWidth
                    value={sickLeave.endDate}
                    onChange={({ target }) =>
                      setSickleave({ ...sickLeave, endDate: target.value })
                    }
                  />
                </Box>
              </div>
            </div>
          )}
        </Box>
        <Grid container justifyContent='space-between' sx={{ marginTop: 2 }}>
          <Grid size='auto'>
            <Button
              color='secondary'
              variant='contained'
              type='button'
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid size='auto'>
            <Button type='submit' variant='contained'>
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
