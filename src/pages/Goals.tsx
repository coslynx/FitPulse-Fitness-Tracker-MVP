import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Container, Button, TextField } from '@mui/material';
import Input from '../components/Input';
import GoalCard from '../components/GoalCard';
import { createGoal, getGoals, deleteGoal, updateGoal } from '../services/goals';
import { useAuthContext } from '../hooks/useAuthContext';

const Goals: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const [isLoading, setIsLoading] = useState(true);
    const [goals, setGoals] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [goalData, setGoalData] = useState({
        title: '',
        type: '',
        target: 0,
        deadline: new Date(),
    });

    useEffect(() => {
        const fetchGoals = async () => {
            setIsLoading(true);
            try {
                if (!user) {
                    navigate('/');
                    return;
                }
                const fetchedGoals = await getGoals(user._id);
                setGoals(fetchedGoals);
            } catch (error: any) {
                setError(error.message || 'Failed to fetch goals');
                console.error('Error fetching goals:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (user) {
            fetchGoals();
        }
    }, [user, navigate]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setGoalData({ ...goalData, [name]: value });
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGoalData({ ...goalData, deadline: new Date(event.target.value) });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            if (!user) {
              throw new Error("User not authenticated");
            }
            await createGoal(user._id, goalData);
            setGoalData({ title: '', type: '', target: 0, deadline: new Date() });
            const updatedGoals = await getGoals(user._id);
            setGoals(updatedGoals);
        } catch (error: any) {
            setError(error.message || 'Failed to create goal');
            console.error('Error creating goal:', error);
        } finally {
            setIsLoading(false);
        }
    };


    const handleDelete = async (goalId: string) => {
        setIsLoading(true);
        setError(null);
        try {
            await deleteGoal(goalId);
            const updatedGoals = await getGoals(user._id);
            setGoals(updatedGoals);
        } catch (error: any) {
            setError(error.message || 'Failed to delete goal');
            console.error('Error deleting goal:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = async (goalId: string, updatedGoalData: any) => {
        setIsLoading(true);
        setError(null);
        try {
            await updateGoal(goalId, updatedGoalData);
            const updatedGoals = await getGoals(user._id);
            setGoals(updatedGoals);
        } catch (error: any) {
            setError(error.message || 'Failed to update goal');
            console.error('Error updating goal:', error);
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
            <Typography variant="h4" component="h1" gutterBottom>Goals</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Input label="Title" name="title" value={goalData.title} onChange={handleInputChange} required />
                    </Grid>
                    <Grid item xs={12}>
                        <Input label="Type" name="type" value={goalData.type} onChange={handleInputChange} select required>
                            <option value="">Select Type</option>
                            <option value="weight loss">Weight Loss</option>
                            <option value="distance run">Distance Run</option>
                            {/* Add more goal types as needed */}
                        </Input>
                    </Grid>
                    <Grid item xs={12}>
                        <Input label="Target" name="target" value={goalData.target} onChange={handleInputChange} type="number" required />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Deadline"
                            type="date"
                            name="deadline"
                            value={goalData.deadline.toISOString().slice(0, 10)}
                            onChange={handleDateChange}
                            InputLabelProps={{ shrink: true }}
                            required
                            fullWidth
                            variant="outlined"
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
                            {isLoading ? 'Creating...' : 'Create Goal'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Grid container spacing={4} mt={4}>
                {goals.map((goal: any) => (
                    <Grid item xs={12} md={6} key={goal._id}>
                        <GoalCard
                            id={goal._id}
                            title={goal.title}
                            type={goal.type}
                            target={goal.target}
                            progress={goal.progress}
                            deadline={new Date(goal.deadline)}
                            onDelete={() => handleDelete(goal._id)}
                            onEdit={(id) => {
                                //Implement Edit Functionality here if needed for future expansion. 
                                //This would involve opening a modal or form to allow modification of goal details,
                                //followed by a call to handleEdit.
                            }}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Goals;
```