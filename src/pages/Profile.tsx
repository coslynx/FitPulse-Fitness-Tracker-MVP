import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Box, TextField, Button, CircularProgress } from '@mui/material';
import { useAuthContext } from '../hooks/useAuthContext';
import Input from '../components/Input';
import { updateUserProfile, getUserProfile } from '../services/api';

const Profile: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userProfile, setUserProfile] = useState<any | null>(null);
    const [updatedProfile, setUpdatedProfile] = useState<any | null>(null);
    const [isEditing, setIsEditing] = useState(false);


    useEffect(() => {
        const fetchUserProfile = async () => {
            setIsLoading(true);
            try {
                if (user) {
                    const data = await getUserProfile(user._id);
                    setUserProfile(data);
                    setUpdatedProfile({...data});
                }
            } catch (error) {
                setError("Failed to load profile");
            } finally {
                setIsLoading(false);
            }
        };
        fetchUserProfile();
    }, [user]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUpdatedProfile({ ...updatedProfile, [name]: value });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            if (user && updatedProfile) {
                await updateUserProfile(user._id, updatedProfile);
                const updatedUserData = await getUserProfile(user._id);
                setUserProfile(updatedUserData);
                setUpdatedProfile(updatedUserData);
                setIsEditing(false);
            }
        } catch (error: any) {
            setError(error.message || 'Failed to update profile');
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
            <Typography variant="h4" component="h1" gutterBottom>Profile</Typography>
            {userProfile && (
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Input label="Name" name="name" value={isEditing ? updatedProfile.name : userProfile.name} onChange={handleInputChange} required />
                        </Grid>
                        <Grid item xs={12}>
                            <Input label="Email" name="email" value={isEditing ? updatedProfile.email : userProfile.email} onChange={handleInputChange} type="email" required />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" onClick={() => setIsEditing(!isEditing)} >
                                {isEditing ? 'Cancel' : 'Edit Profile'}
                            </Button>
                            {isEditing && (
                                <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
                                    {isLoading ? 'Updating...' : 'Update Profile'}
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                </form>
            )}
        </Container>
    );
};

export default Profile;
```