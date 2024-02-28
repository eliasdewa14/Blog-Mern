import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "https://th.bing.com/th/id/R.4dbed3174c94ae2543b07b0b5eeaf570?rik=f9JwEnN%2bXCnvYg&pid=ImgRaw&r=0"
  },
  category: {
    type: String,
    default: "uncategorized",
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
}, {
  timestamps: true
});

// Create a model for post
const Post = mongoose.model('Post', postSchema);
export default Post;