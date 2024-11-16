import React, { useState, useEffect, useContext } from 'react';
import { Container, Grid, Typography, CircularProgress, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GoalCard from '../components/GoalCard';
import WorkoutCard from '../components/WorkoutCard';
import { getGoals, getRecentWorkouts } from '../services/api';
import { useAuthContext } from '../hooks/useAuthContext';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const [isLoading, setIsLoading] = useState(true);
    const [goals, setGoals] = useState<any[]>([]);
    const [recentWorkouts, setRecentWorkouts] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                if (!user) {
                    navigate('/');
                    return;
                }
                const goalsData = await getGoals(user._id);
                const workoutsData = await getRecentWorkouts(user._id);
                setGoals(goalsData);
                setRecentWorkouts(workoutsData);
            } catch (error: any) {
                setError(error.message || 'Failed to fetch data');
                console.error('Error fetching dashboard data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (user) {
            fetchDashboardData();
        }
    }, [user, navigate]);

    if (isLoading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>;
    }

    if (error) {
        return <Typography variant="h6" color="error">Error: {error}</Typography>;
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>Dashboard</Typography>
            <Typography variant="h6" gutterBottom>Welcome, {user?.email}!</Typography>
            <Grid container spacing={4} mt={4}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" gutterBottom>Recent Goals</Typography>
                    {goals.length > 0 ? (
                        goals.slice(0, 3).map((goal: any) => (
                            <GoalCard key={goal._id} id={goal._id} title={goal.title} type={goal.type} target={goal.target} progress={goal.progress} deadline={new Date(goal.deadline)} onDelete={() => {}} onEdit={() => {}} />
                        ))
                    ) : (
                        <Typography variant="body2">No goals yet.</Typography>
                    )}
                    <Button variant="contained" onClick={() => navigate('/goals')} fullWidth>View All Goals</Button>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" gutterBottom>Recent Workouts</Typography>
                    {recentWorkouts.length > 0 ? (
                        recentWorkouts.slice(0, 3).map((workout: any) => (
                            <WorkoutCard key={workout._id} id={workout._id} date={new Date(workout.date)} type={workout.type} duration={workout.duration} distance={workout.distance} caloriesBurned={workout.caloriesBurned} onDelete={() => {}} onEdit={() => {}} />
                        ))
                    ) : (
                        <Typography variant="body2">No workouts yet.</Typography>
                    )}
                    <Button variant="contained" onClick={() => navigate('/workouts')} fullWidth>View All Workouts</Button>
                </Grid>
            </Grid>
            <Button variant="outlined" onClick={() => navigate('/profile')} fullWidth mt={4}>View Profile</Button>

        </Container>
    );
};

export default Dashboard;

```