import PostModel from "@/models/post";


export default async function handler(req, res) {

    const posts = await PostModel.find({});
    res.status(200).json({posts: posts });

}