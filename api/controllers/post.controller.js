import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

export const createPost = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You do not have permission to create a post"));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "Please provide all the required fields"));
  }
  // Create a slug
  const slug = req.body.title.split(" ").join("-").toLowerCase().replace(/[^a-zA-Z0-9-]/g, "");
  // create a new post
  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id
  });
  // Save the new post
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    // Get some posts and remaining posts after show more button clicked
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    // Sort directions
    const sortDirection = req.query.order === 'asc' ? 1 : -1;
    // Create posts
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId}),
      ...(req.query.category && { category: req.query.category}),
      ...(req.query.slug && { slug: req.query.slug}),
      ...(req.query.postId && { _id: req.query.postId}),
      ...(req.query.searchTerm && {
        $or: [
          {title: {$regex: req.query.searchTerm, $option: "i"}},
          {content: {$regex: req.query.searchTerm, $option: "i"}},
        ]
      }),
    }).sort({ updatedAt: sortDirection}).skip(startIndex).limit(limit)
    // To get the total posts
    const totalPosts = await Post.countDocuments();
    // To get the total posts in last month
    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    
    const lastMonthPosts = await Post.countDocuments({
      createdAt: {$gte: oneMonthAgo}
    });
    res.status(200).json({posts, totalPosts, lastMonthPosts});
  } catch (error) {
    next(error);
  }
};