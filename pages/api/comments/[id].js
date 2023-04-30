// pages/api/movie/[id].js
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";
export default async function handler(req, res) {
    const idComments = req.query.id
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const dbComments = await db.collection("comments").find({ movie_id : new ObjectId(idComments) }).toArray();
    res.json({ status: 200, data: {comments: dbComments} });
}