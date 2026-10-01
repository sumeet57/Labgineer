import Joi from "joi";

export const createRndSchema = Joi.object({
  title: Joi.string().min(3).max(150).required().messages({
    "string.empty": "Title is required",
    "string.min": "Title must be at least 3 characters long",
  }),
  summary: Joi.string().min(10).max(300).required().messages({
    "string.empty": "Summary is required",
    "string.min": "Summary must be at least 10 characters long",
  }),
  content: Joi.string().min(10).required().messages({
    "string.empty": "Content (Markdown) is required",
  }),
  tags: Joi.array().items(Joi.string()).default([]),
  isPublished: Joi.boolean().default(false),
});

export const updateRndSchema = Joi.object({
  title: Joi.string().min(3).max(150),
  summary: Joi.string().min(10).max(300),
  content: Joi.string().min(10),
  tags: Joi.array().items(Joi.string()),
  isPublished: Joi.boolean(),
}).min(1);