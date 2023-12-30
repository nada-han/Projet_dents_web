import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const StudentPW = () => {
  const [studentPWs, setStudentPWs] = useState([]);
  const [pws, setPWs] = useState([]);
  const [students, setStudents] = useState([]);

  const fetchStudentPWs = async () => {
    try {
      const response = await axios.get('https://violet-quince-production.up.railway.app/api/students/pws');
      setStudentPWs(response.data);
    } catch (error) {
      console.error('Error fetching StudentPWs:', error);
    }
  };

  const fetchPWs = async () => {
    try {
      const response = await axios.get('https://violet-quince-production.up.railway.app/api/pws');
      setPWs(response.data);
    } catch (error) {
       console.error('Error fetching PWs:', error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get('https://violet-quince-production.up.railway.app/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchPWs(), fetchStudentPWs(), fetchStudents()]);
    };

    fetchData();
  }, []);

  return (
    <Container maxWidth="md" style={{ marginTop: 20 }}>
      <Typography variant="h4" gutterBottom>
        Student Travaux pratiques
      </Typography>

      {students.map(student => (
        <Card key={student.id} style={{ marginBottom: 20 }}>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              {student.firstName} {student.lastName}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Travaux pratiques:
            </Typography>
            {studentPWs
              .filter(studentPW => studentPW.id.student === student.id)
              .map(studentPW => (
                <Card key={studentPW.id.pw} style={{ marginTop: 10 }}>
                  <CardContent>
                    <Typography variant="body1" gutterBottom>
                      Title: {pws.find(pw => pw.id === studentPW.id.pw).titre}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Objectif: {pws.find(pw => pw.id === studentPW.id.pw).objectif}
                    </Typography>
                    {/* Ajoutez les autres détails du mot de passe que vous souhaitez afficher */}
                  </CardContent>
                </Card>
              ))}
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default StudentPW;
