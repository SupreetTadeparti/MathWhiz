import React, { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Questions from "../components/Questions";

const Quiz: React.FC = () => {
    const location = useLocation();
    const prompt = location.state?.prompt;
    const [state, setState] = useState<{
        questionData: any[];
        loading: boolean;
        error: string | null;
    }>({
        questionData: [],
        loading: true,
        error: null
    });

    // Initialize questions on mount
    React.useInsertionEffect(() => {
        const controller = new AbortController();

        if (prompt) {
            fetch("http://api.mathwhiz.biz:5000/generate_questions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt }),
                signal: controller.signal
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.quiz && Array.isArray(data.quiz)) {
                        setState({
                            questionData: data.quiz,
                            loading: false,
                            error: null
                        });
                    }
                })
                .catch((err) => {
                    if (!controller.signal.aborted) {
                        setState(prev => ({
                            ...prev,
                            loading: false,
                            error: "Failed to load questions"
                        }));
                        console.error("Error generating questions:", err);
                    }
                });
        }

        return () => controller.abort();
    }, []); // Empty dependency array - runs once on mount

    if (!prompt) {
        return <Navigate to="/generator" replace />;
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen">
                {state.loading ? (
                    <div className="h-screen flex items-center justify-center">
                        <div className="text-white text-2xl">Generating quiz questions...</div>
                    </div>
                ) : state.error ? (
                    <div className="h-screen flex items-center justify-center">
                        <div className="text-red-500 text-2xl">{state.error}</div>
                    </div>
                ) : (
                    <Questions questionData={state.questionData} />
                )}
            </div>
        </>
    );
};

export default Quiz;
