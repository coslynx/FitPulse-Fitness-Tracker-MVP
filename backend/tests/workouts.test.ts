import { WorkoutService } from '../src/services/workoutService';
import { Workout } from '../src/models/Workout';
import mongoose from 'mongoose';
import { CustomError } from '../src/utils/helpers';

describe('Workout Service', () => {
  let workoutService: WorkoutService;
  beforeAll(() => {
    workoutService = new WorkoutService();
  });

  describe('createWorkout', () => {
    it('should create a workout successfully with valid data', async () => {
      const mockWorkoutData: Partial<Workout> = {
        userId: new mongoose.Types.ObjectId(),
        date: new Date(),
        type: 'Running',
        duration: 30,
        distance: 5,
        caloriesBurned: 300,
      };
      const mockWorkout = new Workout(mockWorkoutData);
      jest.spyOn(Workout.prototype, 'save').mockResolvedValue(mockWorkout);
      const createdWorkout = await workoutService.createWorkout(mockWorkoutData.userId.toString(), mockWorkoutData);
      expect(createdWorkout).toBeDefined();
      expect(createdWorkout.type).toBe(mockWorkoutData.type);
      expect(createdWorkout.duration).toBe(mockWorkoutData.duration);
      expect(Workout.prototype.save).toHaveBeenCalled();
    });


    it('should throw an error if creating a workout fails due to missing fields', async () => {
      const incompleteWorkoutData = { userId: 'validUserId', type: 'Running' };
      await expect(workoutService.createWorkout('validUserId', incompleteWorkoutData)).rejects.toThrow('All fields are required and duration must be non-negative.');
    });

    it('should throw an error if creating a workout fails due to invalid data types', async () => {
      const invalidWorkoutData = { userId: 'validUserId', date: 'invalid', type: 'Running', duration: 'invalid' };
      await expect(workoutService.createWorkout('validUserId', invalidWorkoutData)).rejects.toThrow('All fields are required and duration must be non-negative.');
    });
  });

  describe('getWorkouts', () => {
    it('should return an empty array if no workouts are found', async () => {
      jest.spyOn(Workout, 'find').mockResolvedValue([]);
      const workouts = await workoutService.getWorkouts('nonexistentuser');
      expect(workouts).toBeDefined();
      expect(workouts).toEqual([]);
      expect(Workout.find).toHaveBeenCalled();
    });

    it('should return workouts for a given user', async () => {
      const mockWorkouts: Workout[] = [
        {
          _id: new mongoose.Types.ObjectId(),
          userId: new mongoose.Types.ObjectId(),
          date: new Date(),
          type: 'Running',
          duration: 30,
        },
        {
          _id: new mongoose.Types.ObjectId(),
          userId: new mongoose.Types.ObjectId(),
          date: new Date(),
          type: 'Cycling',
          duration: 60,
        },
      ];
      jest.spyOn(Workout, 'find').mockResolvedValue(mockWorkouts);
      const workouts = await workoutService.getWorkouts(mockWorkouts[0].userId.toString());
      expect(workouts).toBeDefined();
      expect(workouts.length).toBe(2);
      expect(Workout.find).toHaveBeenCalled();
    });
  });


  describe('updateWorkout', () => {
    it('should update an existing workout successfully', async () => {
      const mockWorkoutId = new mongoose.Types.ObjectId();
      const mockUpdatedWorkoutData: Partial<Workout> = { duration: 45 };
      const mockWorkout = new Workout({ _id: mockWorkoutId, userId: new mongoose.Types.ObjectId(), date: new Date(), type: 'Running', duration: 30 });
      jest.spyOn(Workout, 'findByIdAndUpdate').mockResolvedValue(mockWorkout);
      const updatedWorkout = await workoutService.updateWorkout(mockWorkoutId.toString(), mockUpdatedWorkoutData);
      expect(updatedWorkout).toBeDefined();
      expect(updatedWorkout?.duration).toBe(mockUpdatedWorkoutData.duration);
      expect(Workout.findByIdAndUpdate).toHaveBeenCalledWith(mockWorkoutId, mockUpdatedWorkoutData, { new: true });
    });

    it('should throw an error if updating a workout fails due to invalid ID', async () => {
      const updatedWorkoutData: Partial<Workout> = { duration: 45 };
      await expect(workoutService.updateWorkout('invalidid', updatedWorkoutData)).rejects.toThrow('Workout not found.');
    });
  });


  describe('deleteWorkout', () => {
    it('should delete an existing workout successfully', async () => {
      const mockWorkoutId = new mongoose.Types.ObjectId();
      jest.spyOn(Workout, 'findByIdAndDelete').mockResolvedValue({} as any);
      await workoutService.deleteWorkout(mockWorkoutId.toString());
      expect(Workout.findByIdAndDelete).toHaveBeenCalledWith(mockWorkoutId);
    });
    it('should throw an error if deleting a workout fails due to invalid ID', async () => {
      await expect(workoutService.deleteWorkout('invalidid')).rejects.toThrow('Workout not found.');
    });
  });
});
```