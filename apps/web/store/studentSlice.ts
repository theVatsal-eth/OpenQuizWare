import { StateCreator } from "zustand";
import { IStudent } from './storeTypes'

export const createStudentSlice: StateCreator<
    IStudent,
    [],
    [],
    IStudent
> = (set) => ({
    name: "",
    address: "",
    did: "",
    colleges: [],
    isWalletConnected: false
})