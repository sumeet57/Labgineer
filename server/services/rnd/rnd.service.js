import Rnd from "../../models/rnd.model.js";
import { ApiError } from "../../utils/api-response.js";

export const createRndPost = async (data) => {
  const post = await Rnd.create(data);
  return post;
};

export const getAllRndPosts = async (query = {}) => {
  const filter = query.publishedOnly ? { isPublished: true } : {};
  const posts = await Rnd.find(filter).sort({ createdAt: -1 });
  return posts;
};

export const getRndPostBySlug = async (slug) => {
  const post = await Rnd.findOne({ slug });
  if (!post) {
    throw new ApiError(404, "R&D entry not found");
  }
  return post;
};

export const updateRndPost = async (id, updateData) => {
  const updatedPost = await Rnd.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!updatedPost) {
    throw new ApiError(404, "R&D entry not found");
  }

  return updatedPost;
};