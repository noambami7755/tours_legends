
import { useState, useCallback, useMemo } from 'react';
import { CleanPost } from '../types';

export type GameStatus = 'loading' | 'playing' | 'finished';

export interface TriviaQuestion {
    targetPost: CleanPost;
    options: string[]; // 4 titles
    correctAnswerIndex: number;
}

export const useTriviaGame = (posts: CleanPost[]) => {
    const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [mistakes, setMistakes] = useState<CleanPost[]>([]);
    const [status, setStatus] = useState<GameStatus>('loading');

    // Helper: Shuffle array (Fisher-Yates)
    const shuffleArray = <T,>(array: T[]): T[] => {
        const newArr = [...array];
        for (let i = newArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        }
        return newArr;
    };

    const startGame = useCallback(() => {
        if (!posts || posts.length < 4) return; // Need at least 4 posts for options

        setStatus('loading');
        setScore(0);
        setMistakes([]);
        setCurrentIndex(0);

        // 1. Shuffle posts to pick targets
        const shuffledPosts = shuffleArray(posts);
        
        // 2. Pick top 20 (or less if not enough)
        const targets = shuffledPosts.slice(0, 20);
        
        const newQuestions: TriviaQuestion[] = targets.map((target) => {
            // Pick 3 distractors
            const otherPosts = posts.filter(p => p.id !== target.id);
            const shuffledDistractors = shuffleArray(otherPosts).slice(0, 3);
            
            // Combine and shuffle options
            const options = shuffleArray([target.title, ...shuffledDistractors.map(d => d.title)]);
            const correctIndex = options.indexOf(target.title);

            return {
                targetPost: target,
                options,
                correctAnswerIndex: correctIndex
            };
        });

        setQuestions(newQuestions);
        setStatus('playing');
    }, [posts]);

    const submitAnswer = useCallback((selectedOptionIndex: number) => {
        const currentQuestion = questions[currentIndex];
        const isCorrect = selectedOptionIndex === currentQuestion.correctAnswerIndex;

        if (isCorrect) {
            setScore(prev => prev + 1);
        } else {
            setMistakes(prev => [...prev, currentQuestion.targetPost]);
        }
        
        return isCorrect;
    }, [questions, currentIndex]);

    const nextQuestion = useCallback(() => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            setStatus('finished');
        }
    }, [currentIndex, questions.length]);

    return {
        questions,
        currentQuestion: questions[currentIndex],
        currentIndex,
        totalQuestions: questions.length,
        score,
        mistakes,
        status,
        startGame,
        submitAnswer,
        nextQuestion
    };
};
