import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res: NextApiResponse) {
    try {
        const { data } = await axios.get(`${process.env.SERVER_URL}/students`)
        const studentIds = data.map((student: any) => {
            return student.address
        })
        console.log(studentIds)
        if (studentIds.length === 0) res.end("No Studnets")
        res.send(studentIds)
        res.end("Success")
    } catch (error) {
        return new Response("Internal Server Error", {status: 500})
    }
}