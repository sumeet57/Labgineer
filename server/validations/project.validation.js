import Joi from "joi";

export const createProjectSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    "string.empty": "Project name is required",
    "string.min": "Project name must be at least 3 characters long",
    "string.max": "Project name must be at most 100 characters long",
  }),
  context: Joi.string().min(3).max(5000).required().messages({
    "string.empty": "Project context is required",
    "string.min": "Project context must be at least 3 characters long",
    "string.max": "Project context must be at most 5000 characters long",
  }),
  price: Joi.number().min(1).required().messages({
    "number.min": "Project price must be a positive number",
  }),
  imageUrl: Joi.string().uri().messages({
    "string.uri": "Project image URL must be a valid URI",
  }),
  imageFileId: Joi.string().messages({
    "string.empty": "Project image file ID is required",
  }),
  includes: Joi.array().items(Joi.string()).min(1).required().messages({
    "array.min": "Project must include at least one item",
  }),
  link: Joi.string().uri().required().messages({
    "string.uri": "Project link must be a valid URI",
  }),
  available: Joi.boolean().default(true),
});

export const updateProjectSchema = Joi.object({
  name: Joi.string().min(3).max(100).messages({
    "string.min": "Project name must be at least 3 characters long",
    "string.max": "Project name must be at most 100 characters long",
  }),
  context: Joi.string().min(3).max(5000).messages({
    "string.min": "Project context must be at least 3 characters long",
    "string.max": "Project context must be at most 5000 characters long",
  }),
  price: Joi.number().min(1).messages({
    "number.min": "Project price must be a positive number",
  }),
  imageUrl: Joi.string().uri().messages({
    "string.uri": "Project image URL must be a valid URI",
  }),
  imageFileId: Joi.string().messages({
    "string.empty": "Project image file ID is required",
  }),
  includes: Joi.array().items(Joi.string()).min(1).messages({
    "array.min": "Project must include at least one item",
  }),
  link: Joi.string().uri().messages({
    "string.uri": "Project link must be a valid URI",
  }),
  available: Joi.boolean(),
}).min(1);