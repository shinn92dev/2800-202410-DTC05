"use client";

import React, { useState, useEffect } from "react";
import Board from "@/components/global/Board";
import AskAiButton from "@/components/global/AskAiButton";
import axios from "axios";
import Image from "next/image";
import CalorieDistributionChart from "@/components/global/CalorieDistributionChart";
import TopCalendar from "@/components/global/TopCalendar";
import { format } from "date-fns";

interface Meal {
    name: string;
    quantity?: number;
    unit?: string;
    calories: number;
}

type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snacks';

const DietHomeWrapper: React.FC = () => {
    const [breakfasts, setBreakfasts] = useState<Meal[]>([]);
    const [lunches, setLunches] = useState<Meal[]>([]);
    const [dinners, setDinners] = useState<Meal[]>([]);
    const [snacks, setSnacks] = useState<Meal[]>([]);
    const [userId, setUserId] = useState<string>("");
    const [totalTargetCalories, setTotalTargetCalories] = useState<number>(2200);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const icon = (
        <Image
            src="/my_boddy_buddy_support_ai_logo.png"
            alt="support AI logo"
            width={30}
            height={30}
        />
    );

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const response = await axios.get('/api/get-user-id');
                setUserId(response.data.userId);
            } catch (error) {
                console.error("Error fetching user ID:", (error as Error).message);
            }
        };

        fetchUserId();
    }, []);

    useEffect(() => {
        const fetchMeals = async () => {
            if (!userId) return;
            const date = format(selectedDate, "yyyy-MM-dd");
            try {
                const response = await axios.get(`/api/get-meals?userId=${userId}&date=${date}`);
                const data = response.data;
                setBreakfasts(data.breakfast || []);
                setLunches(data.lunch || []);
                setDinners(data.dinner || []);
                setSnacks(data.snacks || []);
            } catch (error) {
                console.error("Error fetching meals:", (error as Error).message);
            }
        };

        fetchMeals();
    }, [userId, selectedDate]);

    const handleEdit = (mealType: MealType, index: number) => {
        // Handle edit logic here
    };

    const handleDelete = async (mealType: MealType, index: number) => {
        try {
            const date = format(selectedDate, "yyyy-MM-dd");
            await axios.delete("/api/delete-meal", {
                data: {
                    userId,
                    date,
                    mealType,
                    mealIndex: index,
                },
            });

            if (mealType === "breakfast") {
                setBreakfasts(breakfasts.filter((_, i) => i !== index));
            } else if (mealType === "lunch") {
                setLunches(lunches.filter((_, i) => i !== index));
            } else if (mealType === "dinner") {
                setDinners(dinners.filter((_, i) => i !== index));
            } else if (mealType === "snacks") {
                setSnacks(snacks.filter((_, i) => i !== index));
            }
        } catch (error) {
            console.error("Error deleting meal item:", (error as Error).message);
        }
    };

    const handleAdd = (mealType: MealType) => {
        window.location.href = `/diet/add-meals?mealType=${mealType}&date=${format(selectedDate, "yyyy-MM-dd")}`;
    };

    const handleOnClick = () => {
        window.location.href = "/diet/ai-support";
    };

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
    };

    const totalCalories = (meals: Meal[]) => meals.reduce((sum, meal) => sum + meal.calories, 0);

    return (
        <div className="bg-white min-h-screen p-4">
            <TopCalendar onDateSelect={handleDateSelect} />
            <h1 className="text-3xl font-bold flex flex-col items-center p-2 m-2">
                Diet Management Plan
            </h1>
            <div className="flex flex-col items-center p-2">
                <CalorieDistributionChart
                    breakfastCalories={totalCalories(breakfasts)}
                    lunchCalories={totalCalories(lunches)}
                    dinnerCalories={totalCalories(dinners)}
                    snackCalories={totalCalories(snacks)}
                    totalTargetCalories={totalTargetCalories}
                />
            </div>
            <div className="flex flex-col items-center p-4">
                <AskAiButton
                    forText="Menu"
                    icon={icon}
                    onClick={handleOnClick}
                />
            </div>
            <div className="p-4">
                <Board
                    icon={<span>🌅</span>}
                    title="Breakfast"
                    items={breakfasts}
                    onEdit={(index) => handleEdit("breakfast", index)}
                    onDelete={(index) => handleDelete("breakfast", index)}
                    onAdd={() => handleAdd("breakfast")}
                />
            </div>
            <div className="p-4">
                <Board
                    icon={<span>🌞</span>}
                    title="Lunch"
                    items={lunches}
                    onEdit={(index) => handleEdit("lunch", index)}
                    onDelete={(index) => handleDelete("lunch", index)}
                    onAdd={() => handleAdd("lunch")}
                />
            </div>
            <div className="p-4">
                <Board
                    icon={<span>🌜</span>}
                    title="Dinner"
                    items={dinners}
                    onEdit={(index) => handleEdit("dinner", index)}
                    onDelete={(index) => handleDelete("dinner", index)}
                    onAdd={() => handleAdd("dinner")}
                />
            </div>
            <div className="p-4">
                <Board
                    icon={<span>🍪</span>}
                    title="Snacks"
                    items={snacks}
                    onEdit={(index) => handleEdit("snacks", index)}
                    onDelete={(index) => handleDelete("snacks", index)}
                    onAdd={() => handleAdd("snacks")}
                />
            </div>
        </div>
    );
};

export default DietHomeWrapper;
