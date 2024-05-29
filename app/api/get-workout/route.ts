// // pages/api/get-workout.ts

// import { NextRequest, NextResponse } from "next/server";
// import WorkoutModel from "../../../models/Workout";
// import { connectMongoDB } from "@/config/db";

// export async function GET(req: NextRequest) {
//     await connectMongoDB();

//     const { searchParams } = new URL(req.url);
//     const userId = searchParams.get("userId");

//     if (!userId) {
//         return NextResponse.json(
//             { error: "User ID is required" },
//             { status: 400 }
//         );
//     }

//     try {
//         const workouts = await WorkoutModel.findOne({ userId: userId });

//         if (!workouts) {
//             return NextResponse.json(
//                 { error: "No workout data found for this user." },
//                 { status: 404 }
//             );
//         }

//         return NextResponse.json(workouts, { status: 200 });
//     } catch (error) {
//         console.error("Error fetching workout data:", error);
//         return NextResponse.json(
//             { error: "Internal Server Error" },
//             { status: 500 }
//         );
//     }
// }
import { NextRequest, NextResponse } from "next/server";
import WorkoutModel from "../../../models/Workout";
import { connectMongoDB } from "@/config/db";
import { getAuth } from "@clerk/nextjs/server";
import { fetchWorkoutForSpecificDate } from "@/app/_helper/workout";

export async function GET(req: NextRequest) {
    await connectMongoDB();

    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");
        const date = searchParams.get("date");
        if (!userId || !date) {
            console.error("Missing userId or date parameter");
            return NextResponse.json(
                { message: "Missing userId or date parameter" },
                { status: 400 }
            );
        }
        const workoutsForCurrentUser = await WorkoutModel.findOne({ userId });
        if (!workoutsForCurrentUser) {
            console.log(`No workout found for userId: ${userId}`);
            return (
                NextResponse.json({ achieved: [], onGoing: [] }),
                { status: 200 }
            );
        }
        const dateObj = new Date(date).toISOString().split("T")[0];
        const filteredWorkout = fetchWorkoutForSpecificDate(
            workoutsForCurrentUser,
            dateObj
        );
        if (
            filteredWorkout.achieved.length === 0 &&
            filteredWorkout.onGoing.length === 0
        ) {
            console.log("No workout found for date:", date);
            return NextResponse.json(filteredWorkout, { status: 200 });
        }
        return NextResponse.json(filteredWorkout, { status: 200 });
    } catch (error) {
        console.error("Error fetching workouts:", error);
        return NextResponse.json(
            {
                message: "Error fetching workouts",
                error: (error as Error).message,
            },
            { status: 500 }
        );
    }
}
