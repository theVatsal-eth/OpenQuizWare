interface IStudent {
    name: string;
    address: string;
    isWalletConnected: boolean;
    did: string | null;
    colleges: ICollege[]
}

interface ICollege {
    name: string;
    address: string;
    students: IStudent[];
    quizes: IQuiz[]
}

interface IQuestion {
    questionId: string;
    question: string;
    options: string[];
    correctOption: string;
    selectedOption?: string;
    level: "Beginner" | "Intermediate" | "Expert",
    isSolved?: boolean
}

interface IQuiz {
    quizId: string;
    name: string;
    questions: IQuestion[];
    selectedOption: string;
    levelPassed: "None" | "Beginner" | "Intermediate" | "Expert";
}

export type {
    IStudent,
    ICollege,
    IQuestion,
    IQuiz
}