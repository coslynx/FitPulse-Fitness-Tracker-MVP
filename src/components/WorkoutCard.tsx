import React from 'react';
import { Card, CardContent, Typography, CardHeader, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface WorkoutCardProps {
  id: string;
  date: Date;
  type: string;
  duration: number;
  distance?: number;
  caloriesBurned?: number;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({
  id,
  date,
  type,
  duration,
  distance,
  caloriesBurned,
  onDelete,
  onEdit,
}) => {
  const formattedDate = date.toLocaleDateString();
  const durationString = `${Math.floor(duration / 60)}h ${duration % 60}m`;

  return (
    <Card>
      <CardHeader
        title={<Typography variant="h6">{type}</Typography>}
        subheader={<Typography>{formattedDate}</Typography>}
        action={
          <>
            <IconButton aria-label="edit" onClick={() => onEdit(id)}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={() => onDelete(id)}>
              <DeleteIcon />
            </IconButton>
          </>
        }
      />
      <CardContent>
        <Typography variant="body2">Duration: {durationString}</Typography>
        {distance && <Typography variant="body2">Distance: {distance} km</Typography>}
        {caloriesBurned && (
          <Typography variant="body2">Calories Burned: {caloriesBurned}</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default WorkoutCard;
```