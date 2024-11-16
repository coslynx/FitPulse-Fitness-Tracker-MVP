import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Container, Button, TextField } from '@mui/material';
import Input from '../components/Input';
import WorkoutCard from '../components/WorkoutCard';
import { createWorkout, getWorkouts, deleteWorkout, updateWorkout } from '../services/workouts';
import { useAuthContext } from '../hooks/useAuthContext';

const Workouts: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const [isLoading, setIsLoading] = useState(true);
    const [workouts, setWorkouts] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [workoutData, setWorkoutData] = useState({
        date: new Date(),
        type: '',
        duration: 0,
        distance: 0,
        caloriesBurned: 0,
    });

    useEffect(() => {
        const fetchWorkouts = async () => {
            setIsLoading(true);
            try {
                if (!user) {
                    navigate('/');
                    return;
                }
                const fetchedWorkouts = await getWorkouts(user._id);
                setWorkouts(fetchedWorkouts);
            } catch (error: any) {
                setError(error.message || 'Failed to fetch workouts');
                console.error('Error fetching workouts:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (user) {
            fetchWorkouts();
        }
    }, [user, navigate]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setWorkoutData({ ...workoutData, [name]: parseFloat(value) || value });
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWorkoutData({ ...workoutData, date: new Date(event.target.value) });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            if (!user) {
                throw new Error("User not authenticated");
            }
            await createWorkout(user._id, workoutData);
            setWorkoutData({ date: new Date(), type: '', duration: 0, distance: 0, caloriesBurned: 0 });
            const updatedWorkouts = await getWorkouts(user._id);
            setWorkouts(updatedWorkouts);
        } catch (error: any) {
            setError(error.message || 'Failed to create workout');
            console.error('Error creating workout:', error);
        } finally {
            setIsLoading(false);
        }
    };


    const handleDelete = async (workoutId: string) => {
        setIsLoading(true);
        setError(null);
        try {
            await deleteWorkout(workoutId);
            const updatedWorkouts = await getWorkouts(user._id);
            setWorkouts(updatedWorkouts);
        } catch (error: any) {
            setError(error.message || 'Failed to delete workout');
            console.error('Error deleting workout:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = async (workoutId: string, updatedWorkoutData: any) => {
        setIsLoading(true);
        setError(null);
        try {
            await updateWorkout(workoutId, updatedWorkoutData);
            const updatedWorkouts = await getWorkouts(user._id);
            setWorkouts(updatedWorkouts);
        } catch (error: any) {
            setError(error.message || 'Failed to update workout');
            console.error('Error updating workout:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>;
    }

    if (error) {
        return <Typography variant="h6" color="error">Error: {error}</Typography>;
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>Workouts</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Date"
                            type="date"
                            name="date"
                            value={workoutData.date.toISOString().slice(0, 10)}
                            onChange={handleDateChange}
                            InputLabelProps={{ shrink: true }}
                            required
                            fullWidth
                            variant="outlined"
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Input label="Type" name="type" value={workoutData.type} onChange={handleInputChange} required />
                    </Grid>
                    <Grid item xs={12}>
                        <Input label="Duration (minutes)" name="duration" value={workoutData.duration} onChange={handleInputChange} type="number" required />
                    </Grid>
                    <Grid item xs={12}>
                        <Input label="Distance (km)" name="distance" value={workoutData.distance} onChange={handleInputChange} type="number" />
                    </Grid>
                    <Grid item xs={12}>
                        <Input label="Calories Burned" name="caloriesBurned" value={workoutData.caloriesBurned} onChange={handleInputChange} type="number" />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
                            {isLoading ? 'Logging...' : 'Log Workout'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Grid container spacing={4} mt={4}>
                {workouts.map((workout: any) => (
                    <Grid item xs={12} md={6} key={workout._id}>
                        <WorkoutCard
                            id={workout._id}
                            date={new Date(workout.date)}
                            type={workout.type}
                            duration={workout.duration}
                            distance={workout.distance}
                            caloriesBurned={workout.caloriesBurned}
                            onDelete={() => handleDelete(workout._id)}
                            onEdit={(id) => {
                                // Implement Edit Functionality here if needed for future expansion.
                                // This would involve opening a modal or form to allow modification of workout details,
                                // followed by a call to handleEdit.
                            }}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Workouts;
```