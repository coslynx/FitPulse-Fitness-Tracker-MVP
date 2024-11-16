import React from 'react';
import { Card, CardContent, Typography, LinearProgress, CardHeader, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MyButton from './Button';

interface GoalCardProps {
  id: string;
  title: string;
  type: string;
  target: number;
  progress: number;
  deadline: Date;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ id, title, type, target, progress, deadline, onDelete, onEdit }) => {
  const formattedDeadline = deadline.toDateString();
  const progressValue = progress > 100 ? 100 : progress < 0 ? 0 : progress;

  return (
    <Card>
      <CardHeader
        title={<Typography variant="h6">{title}</Typography>}
        subheader={<Typography>{type}</Typography>}
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
        <LinearProgress variant="determinate" value={progressValue} />
        <Typography variant="body2">
          Target: {target}, Progress: {progressValue}%, Deadline: {formattedDeadline}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default GoalCard;
```