import { useState } from "react";
import TagsWithAddingField from '@/components/global/TagsWithAddingField';

type WorkoutAiSupportInputProps = {
    onGenerateAlternative: (selectedItems: any[], selectedTags: string[]) => void;
    onGenerateItems: (response: string) => void;
};

// Sample workout menu items
const workoutMenuItems = [
    { "title": "Crunches", "quantity": 50, "unit": "reps", "kcalPerUnit": 4.92 },
    { "title": "Cycling", "quantity": 4, "unit": "km", "kcalPerUnit": 30 }
];

// Default tags for reasons to replace workout items
const defaultTags = [
    "Looks too hard",
    "I have muscle pain",
    "Want to feel outside",
    "Prefer to stay inside",
    "I don’t have equipment",
];

const inputFieldPlaceHolder = "Add another reason";

// WorkoutAiSupportInput component
export default function WorkoutAiSupportInput({ onGenerateAlternative, onGenerateItems }: WorkoutAiSupportInputProps) {
    const [selectedItemTitles, setSelectedItemTitles] = useState<string[]>([]); // State to track selected item titles
    const [selectedTagTitles, setSelectedTagTitles] = useState<string[]>([]);   // State to track selected tag titles
    const [generated, setGenerated] = useState(false);                          // State to track if suggestions are generated

    // Handle click event for generating alternative suggestions
    const handleGenerateAlternative = async () => {
        const selectedItems = workoutMenuItems.filter(item => selectedItemTitles.includes(item.title));
        const selectedTags = defaultTags.filter(tag => selectedTagTitles.includes(tag));
        onGenerateAlternative(selectedItems, selectedTags);
        setGenerated(true);

        // Create the prompt and fetch AI response
        const prompt = `Please consider alternative options for the workout menu below, taking into account the reasons provided.\n\nWorkout menu to replace:\n${selectedItems.map(item => `・${item.title} - ${item.quantity} ${item.unit} (${Math.round(item.kcalPerUnit * item.quantity * 10) / 10} kcal)`).join('\n')}\n\nReasons why I want to replace:\n・${selectedTags.join('\n・')}\n\nThe alternative must include the same number of items and must have the same estimated calorie consumption in total.\nEach item must be output in the following format:\n・[item_name] - [quantity] [unit] ([estimated_calorie_consume] kcal)`;

        try {
            const response = await fetch('/api/generate-alternative', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });
            const data = await response.json();
            onGenerateItems(data.result);
        } catch (error) {
            console.error("Error generating alternative:", error);
        }
    };

    // Toggle selection state for a workout item
    const toggleItem = (title: string) => {
        if (selectedItemTitles.includes(title)) {
            setSelectedItemTitles(selectedItemTitles.filter((t) => t !== title));
        } else {
            setSelectedItemTitles([...selectedItemTitles, title]);
        }
    };

    // Toggle selection state for a tag
    const toggleTag = (tag: string) => {
        if (selectedTagTitles.includes(tag)) {
            setSelectedTagTitles(selectedTagTitles.filter((t) => t !== tag));
        } else {
            setSelectedTagTitles([...selectedTagTitles, tag]);
        }
    };

    return (
        <div className="flex flex-col items-center p-2">
            <div className="relative speech-bubble-user bg-beige rounded-lg">
                <h2 className="text-lg font-bold">{generated ? "Items to replace" : "Which items to replace?"}</h2>
                {workoutMenuItems.map((item, index) => (
                    generated ? (
                        selectedItemTitles.includes(item.title) && (
                            <div key={index} className="flex items-center justify-between py-1">
                                <div className="flex items-center">
                                    <span className="mr-2">・</span>
                                    <div>
                                        <h2 className="font-bold">{item.title}</h2>
                                        <h3 className="text-sm text-gray-500">{item.quantity} {item.unit}</h3>
                                    </div>
                                </div>
                                <div>
                                    <h2 className="font-bold">{(item.kcalPerUnit * item.quantity).toFixed(0)} kcal</h2>
                                </div>
                            </div>
                        )
                    ) : (
                        <div key={index} className="flex items-center justify-between py-1">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={item.title}
                                    name={item.title}
                                    value={item.title}
                                    className="mr-2 w-6 h-6"
                                    onChange={() => toggleItem(item.title)}
                                />
                                <div>
                                    <h2 className="font-bold">{item.title}</h2>
                                    <h3 className="text-sm text-gray-500">{item.quantity} {item.unit}</h3>
                                </div>
                            </div>
                            <div>
                                <h2 className="font-bold">{(item.kcalPerUnit * item.quantity).toFixed(0)} kcal</h2>
                            </div>
                        </div>
                    )
                ))}
                <h2 className="text-lg font-bold border-t py-1 mt-1">{generated ? "Reasons to replace" : "Why would you like to replace?"}</h2>
                {generated ? (
                    <div className="flex flex-wrap gap-2 mb-2">
                        <div>
                            {selectedTagTitles.map((tag, index) => (
                                <p key={index}>
                                    ・{tag}
                                </p>
                            ))}
                        </div>
                    </div>
                ) : (
                    <TagsWithAddingField
                        defaultTags={defaultTags}
                        inputFieldPlaceHolder={inputFieldPlaceHolder}
                        selectedTags={selectedTagTitles}
                        onToggleTag={toggleTag}
                    />
                )}
                {!generated && (
                    <div className="flex justify-center border-t pt-2">
                        <button
                            onClick={handleGenerateAlternative}
                            className="px-4 py-2 bg-dark-blue text-white rounded-full"
                        >
                            Generate Alternative
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
