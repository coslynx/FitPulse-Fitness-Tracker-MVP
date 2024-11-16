import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Container, Button } from '@mui/material';
import MyButton from '../components/Button';
import { AuthContext } from '../context/AuthContext';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useContext(AuthContext);

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          Fitness Tracker
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Track your progress, stay motivated!
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Box p={3} border={1} borderColor="grey.300" borderRadius="8px">
            <Typography variant="h5" gutterBottom>
              Key Features
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography>Goal Setting: Define your fitness targets</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>Progress Tracking: Monitor your journey</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>Workout Logging: Easily record your sessions</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>Progress Visualization: See your achievements</Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      <Box textAlign="center" mt={4}>
        {user ? (
          <Typography>Welcome, {user.email}! Navigate to Dashboard</Typography>
        ) : (
          <>
            <MyButton text="Sign Up" onClick={handleSignUp} variant="contained" />
            <Box mt={2}>
              <MyButton text="Login" onClick={handleLogin} variant="outlined" />
            </Box>
          </>
        )}
      </Box>
      <Box mt={8} textAlign="center">
        <Typography variant="body2" color="textSecondary">
          &copy; {new Date().getFullYear()} Fitness Tracker
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
```