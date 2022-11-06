import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("in the api")
    try {
        const address = req.body
        console.log(address)
        const { data } = await axios.get(`${process.env.SERVER_URL}/students/${address}`)
        res.send(data)
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
}