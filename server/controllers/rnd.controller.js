import {
  createRndPost,
  getAllRndPosts,
  getRndPostBySlug,
  updateRndPost,
} from "../services/rnd/rnd.service.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

export const createRndController = asyncHandler(async (req, res) => {
  const post = await createRndPost(req.body);
  new ApiResponse(201, "R&D entry created successfully", post).send(res);
});

export const getAllRndController = asyncHandler(async (req, res) => {
  const posts = await getAllRndPosts(req.query);
  new ApiResponse(200, "R&D entries fetched successfully", posts).send(res);
});

export const getRndBySlugController = asyncHandler(async (req, res) => {
  const post = await getRndPostBySlug(req.params.slug);
  new ApiResponse(200, "R&D entry fetched successfully", post).send(res);
});

export const updateRndController = asyncHandler(async (req, res) => {
  const updatedPost = await updateRndPost(req.params.id, req.body);
  new ApiResponse(200, "R&D entry updated successfully", updatedPost).send(res);
});