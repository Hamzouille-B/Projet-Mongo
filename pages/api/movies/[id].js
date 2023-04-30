// pages/api/movie/[id].js
import clientPromise from "../../../lib/mongodb";
import movieRessource from "../../../lib/movieRessource";
import { ObjectId } from "mongodb";
import { METHODS } from "http";
export default async function handler(req, res) {

    // console.log("movieRessource: ", movieRessource)
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const idMovie = req.query.id;

    switch(req.method){
        case "GET":
            const dbMovieGET = await db.collection("movies").findOne({ _id : new ObjectId(idMovie) });
            res.json({ status: 200, data: {movie: dbMovieGET} });
        break;

        case "POST":
            const returnFromInsertion = await db.collection("movies").insertOne(movieRessource);
            const movieInserted = await db.collection("movies").findOne({ _id: new ObjectId(returnFromInsertion.insertedId) });
            res.json({ status: 200, data: movieInserted })
        break;

        case "PUT":
            const dbMoviePUT = await db.collection("movies").findOneAndUpdate({ _id : new ObjectId(idMovie) }, {$set :{title: "Nouveau texte de film"}});
            res.json({ status: 200, data: dbMoviePUT });
        break;

        case "DELETE":
            const dbMovieDELETE = await db.collection("movies").deleteOne({ _id: new ObjectId(idMovie) });
        break;
    }
}