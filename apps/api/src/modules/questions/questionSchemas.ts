import Joi from '@hapi/joi';

import { questionCategories, questionStatuses, questionLevels } from '../../models-consts';

export const QuestionCategorySchema = Joi.string().valid(...questionCategories);

export const QuestionStatusSchema = Joi.string().valid(...questionStatuses);

export const QuestionLevelSchema = Joi.string().valid(...questionLevels);

export const QuestionSchema = Joi.object({
  id: Joi.number().integer().required(),
  question: Joi.string().required(),
  _categoryId: QuestionCategorySchema.required(),
  _levelId: QuestionLevelSchema.required(),
  _statusId: QuestionStatusSchema.required(),
  acceptedAt: Joi.date().allow(null),
});

export const GetQuestionsRequestSchema = {
  query: Joi.object({
    category: QuestionCategorySchema,
    status: QuestionStatusSchema,
    level: Joi.array().items(QuestionLevelSchema).single().optional(),
    limit: Joi.number().integer().optional(),
    offset: Joi.number().integer().optional(),
    orderBy: Joi.string().valid('acceptedAt', 'level', 'votesCount'),
    order: Joi.string().valid('asc', 'desc'),
  }).required(),
};

export const QuestionResponseSchema = QuestionSchema.keys({
  votesCount: Joi.number().integer().required(),
  currentUserVotedOn: Joi.bool(),
});

export const GetQuestionsResponseSchema = Joi.object({
  data: Joi.array().items(QuestionResponseSchema).required(),
  meta: Joi.object({
    total: Joi.number().required(),
  }).optional(),
});

export const GetOneQuestionRequestSchema = {
  params: Joi.object({
    id: Joi.number().integer().required(),
  }).required(),
};

export const GetOneQuestionResponseSchema = Joi.object({
  data: QuestionResponseSchema.required(),
}).required();

export const CreateQuestionRequestPayloadSchema = Joi.object({
  question: Joi.string().required(),
  level: QuestionLevelSchema.required(),
  category: QuestionCategorySchema.required(),
});

export const CreateQuestionRequestSchema = {
  payload: CreateQuestionRequestPayloadSchema.required(),
};

export const CreateQuestionResponseSchema = Joi.object({
  data: QuestionResponseSchema.required(),
}).required();

export const UpdateQuestionRequestSchema = {
  params: Joi.object({
    id: Joi.number().integer().required(),
  }).required(),
  payload: CreateQuestionRequestPayloadSchema.keys({
    status: QuestionStatusSchema.required(),
  }).required(),
};

export const UpdateQuestionResponseSchema = CreateQuestionResponseSchema;
