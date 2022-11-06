import { StateCreator } from "zustand";
import { IQuestion } from "./storeTypes";



export interface IQuizState {
    quizId: string;
    name: string;
    questions: IQuestion[];
    selectedOption: string;
    levelPassed: "None" | "Beginner" | "Intermediate" | "Expert";
    addQuizId: (quizId: string) => void;
    setQuizName: (name: string) => void;
    addQuestion: (question: IQuestion) => void;
    addSelectedOption: (option: string, questionId: string) => void;
    checkCorrectSolutions: () => void;
    setLevelPassed: (level: "Beginner" | "Intermediate" | "Expert") => void;
}



const quizStoreSlice: StateCreator<
    IQuizState,
    [],
    [],
    IQuizState
> = (set) => ({
    quizId: '',
    name: "",
    questions: [],
    selectedOption: "",
    levelPassed: "None",
    addQuizId(quizId) {
        set(() => ({
            quizId: quizId
        }))
    },
    setQuizName(name) {
        set(() => ({
            name: name
        }))
    },
    addQuestion(question) {
        set(state => ({
            questions: [...state.questions, question]
        }))
    },
    addSelectedOption(option, questionId) {
        set(state => ({
            questions: state.questions.filter(ques => {
                if (ques.questionId !== questionId) return
                ques.selectedOption = option
            })
        }))
    },
    checkCorrectSolutions() {
        set(state => ({
            questions: state.questions.filter(ques => {
                if (ques.correctOption === ques.selectedOption) {
                    ques.isSolved = true
                }
            })
        }))
    },
    setLevelPassed(level) {
        const intermediateQuestionsLength = this.questions.filter(ques => {
            ques.level === "Intermediate" &&
                ques.isSolved === true
        }).length

        const expertQuestionsLength = this.questions.filter(ques => {
            ques.level === "Expert" &&
                ques.isSolved === true
        }).length

        const beginnerQuestionsLength = this.questions.filter(ques => {
            ques.level === "Beginner" &&
                ques.isSolved === true
        }).length

        if (beginnerQuestionsLength === 5) {
            set(() => ({
                levelPassed: "Beginner"
            }))
        } else if (beginnerQuestionsLength === 5 && intermediateQuestionsLength === 3) {
            set(() => ({
                levelPassed: "Intermediate"
            }))
        } else if (beginnerQuestionsLength === 5 && intermediateQuestionsLength === 3 && expertQuestionsLength === 2) {
            set(() => ({
                levelPassed: "Expert"
            }))
        } else {
            set(() => ({
                levelPassed: "None"
            }))
        }
    },
})

export default quizStoreSlice