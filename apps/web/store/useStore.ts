import create, { StateCreator } from "zustand";

import quizStoreSlice, { IQuizState } from "./quizSlice";
import { IQuestion, IStudent } from "./storeTypes";
import { createStudentSlice } from "./studentSlice";

type IState =
    IQuizState &
    IStudent 

const createRootSlice: StateCreator <
IState,
[],
[],
IState
> = (...a) => ({
    ...quizStoreSlice(...a),
    ...createStudentSlice(...a)
})

const useStore = create<IState>(createRootSlice)

const { getState } = useStore
export { getState }

export default useStore;