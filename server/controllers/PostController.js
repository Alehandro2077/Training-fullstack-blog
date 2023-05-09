import { postCreateValidation } from "../validations/validations.js";
import PostModel from "../models/Post.js";

class PostController {
  async create(req, res) {
    try {
      const doc = new PostModel({
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.userId,
      });

      const post = await doc.save();

      res.json(post);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "creating post failed",
      });
    }
  }

  async getAll(req, res) {
    try {
      const posts = await PostModel.find()
        .populate("user", ["_id", "name", "email", "avatarUrl"])
        .exec();
      console.log(posts);

      res.json(posts);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "getting posts failed",
      });
    }
  }

  async getTags(req, res) {
    try {
      const posts = await PostModel.find().limit(5).exec();

      const tags = posts
        .map((obj) => obj.tags)
        .flat()
        .slice(0, 5);

      res.json(tags);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "getting tags failed",
      });
    }
  }

  async getOne(req, res) {
    try {
      const postId = req.params.id;

      const post = await PostModel.findOneAndUpdate(
        { _id: postId },
        { $inc: { viewsCount: 1 } },
        { new: true }
      )
        .populate("user", ["_id", "name", "email", "avatarUrl"])
        .exec();
      if (!post) {
        return res.status(404).json({ message: "post does not exist" });
      }

      res.json(post);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "getting post failed",
      });
    }
  }

  async remove(req, res) {
    try {
      const postId = req.params.id;

      const post = await PostModel.findOneAndDelete({ _id: postId });

      if (!post) {
        return res.status(404).json({ message: "post does not exist" });
      }

      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "deletting post failed",
      });
    }
  }

  async update(req, res) {
    try {
      const postId = req.params.id;

      const post = await PostModel.updateOne(
        { _id: postId },
        {
          title: req.body.title,
          text: req.body.text,
          imageUrl: req.body.imageUrl,
          tags: req.body.tags,
        }
      );

      if (!post) {
        return res.status(404).json({ message: "post does not exist" });
      }

      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "updating post failed",
      });
    }
  }
}

export default new PostController();
