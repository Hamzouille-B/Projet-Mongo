// pages/api/movie/[id].js
import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";
import commentRessource from "../../../../lib/commentRessource";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("sample_mflix");
  const idComment = req.query.id;

  switch (req.method) {
    case "GET":
      const dbComment = await db.collection("comments").findOne({ _id: new ObjectId(idComment) });
      res.json({ status: 200, data: { comments: dbComment } });
      break;

    case "POST":
      const dbCommentPOST = await db.collection("comments").insertOne({ commentRessource});
      const commentInserted = await db.collection("comments").findOne({ _id: new ObjectId(dbCommentPOST.insertedId) });
      res.json({ status: 200, data: { comments: commentInserted } });
      break;

    case "PUT":
      const dbCommentPut = await db.collection("comments").updateOne(
          { _id: new ObjectId(idComment) },
          { $set: { email: "zozo.momus@gmail.com" } }
        );
      res.json({ status: 200, data: { message: "Comment updated" }, dbCommentPut });
      break;

    case "DELETE":
      const dbCommentDelete = await db.collection("comments").deleteOne({ _id: new ObjectId(idComment) });
      res.json({ status: 200, data: { message: "Comment deleted" }, dbCommentDelete });
      break;

    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
}
