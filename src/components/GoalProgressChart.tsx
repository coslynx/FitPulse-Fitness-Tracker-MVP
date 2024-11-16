import React, { useState, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { ChartData } from 'chart.js';
import { getGoalProgress } from '../services/goals';
import { LinearProgress, Typography } from '@mui/material';

interface GoalProgressChartProps {
    goalId: string;
    chartType?: 'bar' | 'line';
    title?: string;
}

const GoalProgressChart: React.FC<GoalProgressChartProps> = ({ goalId, chartType = 'line', title }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [chartData, setChartData] = useState<ChartData | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        Chart.register(...registerables);
    }, []);

    useEffect(() => {
        const fetchProgress = async () => {
            setIsLoading(true);
            try {
                const progressData = await getGoalProgress(goalId);
                setChartData(prepareChartData(progressData));
            } catch (error) {
                setError('Failed to fetch goal progress');
                console.error('Error fetching goal progress:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProgress();
    }, [goalId]);

    useEffect(() => {
        if (chartData && canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
                new Chart(ctx, {
                    type: chartType,
                    data: chartData,
                    options: {
                        responsive: true,
                        plugins: {
                            title: {
                                display: !!title,
                                text: title,
                            },
                        },
                    },
                });
            }
        }
        return () => {
            const chartInstance = Chart.getChart(canvasRef.current);
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, [chartData, chartType, title]);


    const prepareChartData = (progressData: any): ChartData => {
        if (!progressData || !progressData.dates || !progressData.progress) {
            return { datasets: [], labels: [] };
        }
        return {
            labels: progressData.dates,
            datasets: [
                {
                    label: 'Progress',
                    data: progressData.progress,
                    borderColor: '#008000',
                    backgroundColor: 'rgba(0, 128, 0, 0.2)',
                    fill: true,
                },
            ],
        };
    };

    return (
        <div>
            {isLoading && <LinearProgress />}
            {error && <Typography color="error">{error}</Typography>}
            {chartData && (
                <canvas ref={canvasRef} />
            )}
        </div>
    );
};

export default GoalProgressChart;
```