import axios from "axios";

const calculateBmr = (
    age: number,
    height: number,
    weight: number,
    gender: string
): number => {
    if (gender === "male") {
        return (
            ((0.0481 * weight + 0.0234 * height - 0.0138 * age - 0.4235) *
                1000) /
            4.186
        );
    } else {
        return (
            ((0.0481 * weight + 0.0234 * height - 0.0138 * age - 0.9708) *
                1000) /
            4.186
        );
    }
};

const factorByActivityLevel = (age: number, activityLevel: number): number => {
    const table: { [key: string]: { [key: number]: number } } = {
        "1-2": { 1: 1.35, 2: 1.35, 3: 1.35 },
        "3-5": { 1: 1.45, 2: 1.45, 3: 1.45 },
        "6-7": { 1: 1.35, 2: 1.55, 3: 1.75 },
        "8-9": { 1: 1.4, 2: 1.6, 3: 1.8 },
        "10-11": { 1: 1.45, 2: 1.65, 3: 1.85 },
        "12-14": { 1: 1.5, 2: 1.75, 3: 1.9 },
        "15-17": { 1: 1.55, 2: 1.75, 3: 1.95 },
        "18-29": { 1: 1.5, 2: 1.75, 3: 2.0 },
        "30-49": { 1: 1.5, 2: 1.75, 3: 2.0 },
        "50-64": { 1: 1.5, 2: 1.75, 3: 2.0 },
        "65-74": { 1: 1.45, 2: 1.7, 3: 1.95 },
        "75+": { 1: 1.4, 2: 1.65, 3: 1.65 },
    };

    let ageRange: string;
    if (age >= 1 && age <= 2) ageRange = "1-2";
    else if (age >= 3 && age <= 5) ageRange = "3-5";
    else if (age >= 6 && age <= 7) ageRange = "6-7";
    else if (age >= 8 && age <= 9) ageRange = "8-9";
    else if (age >= 10 && age <= 11) ageRange = "10-11";
    else if (age >= 12 && age <= 14) ageRange = "12-14";
    else if (age >= 15 && age <= 17) ageRange = "15-17";
    else if (age >= 18 && age <= 29) ageRange = "18-29";
    else if (age >= 30 && age <= 49) ageRange = "30-49";
    else if (age >= 50 && age <= 64) ageRange = "50-64";
    else if (age >= 65 && age <= 74) ageRange = "65-74";
    else ageRange = "75+";

    return table[ageRange][activityLevel];
};

// energyRequirements = bmr * factor
const calculateEnergyRequirementsPerDay = (
    bmr: number,
    factor: number
): number => {
    return bmr * factor;
};

// weightGap = weight - targetWeight
const calculateCaloriesPerDay = (
    energyRequirements: number,
    numberOfDays: number,
    weightGap: number,
    preference: string
): { targetCaloriesIntake: number; targetCaloriesBurn: number } => {
    if (weightGap === 0) {
        return {
            targetCaloriesIntake: energyRequirements,
            targetCaloriesBurn: energyRequirements,
        };
    } else if (weightGap > 0) {
        return calculateCaloriesToLoseWeight(
            energyRequirements,
            numberOfDays,
            weightGap,
            preference
        );
    } else {
        return calculateCaloriesToGainWeight(
            energyRequirements,
            numberOfDays,
            weightGap
        );
    }
};

const calculateCaloriesToLoseWeight = (
    energyRequirements: number,
    numberOfDays: number,
    weightGap: number,
    preference: string
): { targetCaloriesIntake: number; targetCaloriesBurn: number } => {
    if (preference === "workout") {
        let caloriesBurn: number =
            energyRequirements + (7305 * weightGap) / numberOfDays;
        if (caloriesBurn > energyRequirements * 1.5) {
            caloriesBurn = energyRequirements * 1.5;
        }
        return {
            targetCaloriesIntake: Math.round(energyRequirements),
            targetCaloriesBurn: Math.round(caloriesBurn),
        };
    } else {
        let caloriesBurn: number =
            energyRequirements - 200 + (7305 * weightGap) / numberOfDays;
        if (caloriesBurn > (energyRequirements - 200) * 1.5) {
            caloriesBurn = (energyRequirements - 200) * 1.5;
        }
        return {
            targetCaloriesIntake: Math.round(energyRequirements - 200),
            targetCaloriesBurn: Math.round(caloriesBurn),
        };
    }
};

const calculateCaloriesToGainWeight = (
    energyRequirements: number,
    numberOfDays: number,
    weightGap: number
): { targetCaloriesIntake: number; targetCaloriesBurn: number } => {
    let caloriesBurn: number =
        energyRequirements + 200 + (7305 * weightGap) / numberOfDays;
    if (caloriesBurn < (energyRequirements + 200) / 1.5) {
        caloriesBurn = (energyRequirements + 200) / 1.5;
    }
    return {
        targetCaloriesIntake: energyRequirements + 200,
        targetCaloriesBurn: caloriesBurn,
    };
};

const fetchTargetCaloriesBurn = async (userId?: string): Promise<number> => {
    const profileResponse = await axios.get(`/api/profile`);
    const profileData = profileResponse.data;
    const { age, gender, height, weight, activityLevel } = profileData;
    const targetResponse = await axios.get(`/api/targets`);
    const targetData = targetResponse.data;
    const { targetCaloriesBurn } = targetData;
    const bmr = calculateBmr(age, height, weight, gender);
    const activityFactor = factorByActivityLevel(age, activityLevel);
    const energyRequirements = calculateEnergyRequirementsPerDay(
        bmr,
        activityFactor
    );

    if (targetCaloriesBurn < energyRequirements) {
        return 0;
    } else {
        return Math.round(targetCaloriesBurn - energyRequirements);
    }
};

export {
    calculateCaloriesPerDay,
    calculateBmr,
    factorByActivityLevel,
    calculateEnergyRequirementsPerDay,
    fetchTargetCaloriesBurn,
};
