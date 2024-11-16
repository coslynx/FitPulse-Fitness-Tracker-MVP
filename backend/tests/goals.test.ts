import { goalService } from '../src/services/goalService';
import Goal from '../src/models/Goal';
import mongoose from 'mongoose';
import {test, expect, beforeAll, afterAll} from '@jest/globals';


beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/fitness-tracker-test');
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongoose.disconnect();
});


test('should create a new goal successfully', async () => {
    const goalData = { userId: 'validUserId', title: 'Test Goal', type: 'weight loss', target: 10, deadline: new Date() };
    const createdGoal = await goalService.createGoal('validUserId', goalData);
    expect(createdGoal).toBeDefined();
    expect(createdGoal._id).toBeDefined();
    expect(createdGoal.title).toBe(goalData.title);
    expect(createdGoal.type).toBe(goalData.type);
    expect(createdGoal.target).toBe(goalData.target);
    expect(createdGoal.deadline).toEqual(expect.any(Date));
    expect(createdGoal.progress).toBe(0);
    await Goal.findByIdAndDelete(createdGoal._id);

});

test('should throw an error if creating a goal fails due to missing fields', async () => {
    const incompleteGoalData = { userId: 'validUserId', title: 'Incomplete Goal', type: 'weight loss' };
    await expect(goalService.createGoal('validUserId', incompleteGoalData)).rejects.toThrow('All fields are required and target must be greater than 0.');
});

test('should throw an error if creating a goal fails due to invalid data types', async () => {
    const invalidGoalData = { userId: 'validUserId', title: 'Invalid Goal', type: 'weight loss', target: 'invalid', deadline: 'invalid' };
    await expect(goalService.createGoal('validUserId', invalidGoalData)).rejects.toThrow('All fields are required and target must be greater than 0.');
});


test('should get all goals for a user', async () => {
    const userId = 'testuser';
    const goal1 = await goalService.createGoal(userId, { userId, title: 'Goal 1', type: 'weight loss', target: 5, deadline: new Date() });
    const goal2 = await goalService.createGoal(userId, { userId, title: 'Goal 2', type: 'distance', target: 10, deadline: new Date() });
    const goals = await goalService.getGoals(userId);
    expect(goals).toBeDefined();
    expect(goals.length).toBe(2);
    expect(goals).toContainEqual(goal1);
    expect(goals).toContainEqual(goal2);
    await Goal.findByIdAndDelete(goal1._id);
    await Goal.findByIdAndDelete(goal2._id);

});


test('should return an empty array if no goals are found', async () => {
    const goals = await goalService.getGoals('nonexistentuser');
    expect(goals).toBeDefined();
    expect(goals).toEqual([]);
});


test('should update an existing goal successfully', async () => {
    const userId = 'testuser';
    const newGoal = await goalService.createGoal(userId, { userId, title: 'New Goal', type: 'weight loss', target: 5, deadline: new Date() });
    const updatedGoalData = { title: 'Updated Goal', target: 7 };
    const updatedGoal = await goalService.updateGoal(newGoal._id, updatedGoalData);

    expect(updatedGoal).toBeDefined();
    expect(updatedGoal?.title).toBe('Updated Goal');
    expect(updatedGoal?.target).toBe(7);
    await Goal.findByIdAndDelete(newGoal._id);

});


test('should throw an error if updating a goal fails due to invalid ID', async () => {
    const updatedGoalData = { title: 'Updated Goal', target: 7 };
    await expect(goalService.updateGoal('invalidid', updatedGoalData)).rejects.toThrow('Goal not found.');
});


test('should delete an existing goal successfully', async () => {
    const userId = 'testuser';
    const newGoal = await goalService.createGoal(userId, { userId, title: 'GoalToDelete', type: 'weight loss', target: 5, deadline: new Date() });
    await goalService.deleteGoal(newGoal._id);
    const remainingGoals = await goalService.getGoals(userId);
    expect(remainingGoals.length).toBe(0);
});

test('should throw an error if deleting a goal fails due to invalid ID', async () => {
    await expect(goalService.deleteGoal('invalidid')).rejects.toThrow('Goal not found.');
});

test('should get goal progress data', async () => {
  const userId = 'testuser';
  const newGoal = await goalService.createGoal(userId, { userId, title: 'GoalProgress', type: 'weight loss', target: 5, deadline: new Date() });
  const progressData = await goalService.getGoalProgress(newGoal._id);
  expect(progressData).toBeDefined();
  expect(progressData.dates).toBeDefined();
  expect(progressData.progress).toBeDefined();
  await Goal.findByIdAndDelete(newGoal._id);
});

test('should throw an error if fetching goal progress fails due to invalid ID', async () => {
  await expect(goalService.getGoalProgress('invalidid')).rejects.toThrow('Goal not found');
});

```