import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Button, Divider, Container, Typography } from '@mui/material';
import { Patient, Diagnosis } from './types';

import patientService from './services/patients';
import PatientListPage from './components/PatientListPage';
import PatientPage from './components/PatientListPage/PatientPage';
import diagnosisService from './services/diagnosis';

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  useEffect(() => {
    const fetchDiagnosis = async () => {
      const diagnosis = await diagnosisService.getDiagnosis();
      setDiagnosis(diagnosis);
    };

    fetchDiagnosis();
  }, []);

  return (
    <div className='App'>
      <Router>
        <Container>
          <Typography variant='h3' sx={{ marginBottom: '0.5em' }}>
            Patientor
          </Typography>
          <Button component={Link} to='/' variant='contained' color='primary'>
            Home
          </Button>
          <Divider sx={{ marginY: 2 }} />
          <Routes>
            <Route
              path='/'
              element={
                <PatientListPage
                  patients={patients}
                  setPatients={setPatients}
                />
              }
            />
            <Route
              path='/patients/:id'
              element={<PatientPage diagnosis={diagnosis} />}
            />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
