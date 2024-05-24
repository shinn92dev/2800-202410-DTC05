"use client";

import React, { useState } from 'react';
import AiLines from '@/components/global/AiLines';
import PreferencesForm from './PreferencesForm';
import PreferencesSummary from './PreferencesSummary';
import GeneratedMenu from './GeneratedMenu';

const DietAiSupportWrapper: React.FC = () => {
    const [preferences, setPreferences] = useState<any>(null);
    const [generated, setGenerated] = useState(false);
    const [generatedMenu, setGeneratedMenu] = useState<string>('');

    const handleFormSubmit = async (prefs: any) => {
        setPreferences(prefs);
        setGenerated(true);

        // Call the API to generate the diet plan
        const response = await fetch('/api/generate-diet-plan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(prefs),
        });

        if (response.ok) {
            const data = await response.json();
            setGeneratedMenu(data.result);
        } else {
            console.error('Failed to generate diet plan');
            setGeneratedMenu('Failed to generate diet plan');
        }
    };

    const message: string = "Hi! I'm BODY BUDDY AI.\nI'll suggest a menu that includes the nutrients you should be taking.\n\nPlease fill out your preferences in the form below.";

    return (
        <div className="p-4 w-full max-w-lg">
            <AiLines messageBody={message} />
            {!generated && <PreferencesForm onSubmit={handleFormSubmit} />}
            {preferences && <PreferencesSummary preferences={preferences} />}
            {generated && <GeneratedMenu generatedMenu={generatedMenu} />}
        </div>
    );
};

export default DietAiSupportWrapper;