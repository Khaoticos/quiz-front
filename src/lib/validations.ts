import { z } from "zod";

/**
 * Zod schemas for runtime validation of quiz data
 * Ensures data integrity and type safety at runtime
 */

// Alternative (quiz answer option)
export const alternativeSchema = z.object({
  letra: z.enum(["A", "B", "C", "D"]),
  texto: z.string().min(1, "Alternative text cannot be empty"),
  correta: z.boolean(),
});

// Question
export const questionSchema = z.object({
  id: z.string().min(1),
  texto: z.string().min(1, "Question text cannot be empty"),
  alternativas: z
    .array(alternativeSchema)
    .length(4, "Question must have exactly 4 alternatives")
    .refine(
      (alternatives) => alternatives.filter((alt) => alt.correta).length === 1,
      {
        message: "Question must have exactly one correct answer",
      }
    ),
  timer: z.number().positive(),
});

// Quiz
export const quizSchema = z.object({
  id: z.string().min(1),
  nome: z.string().min(1, "Quiz name cannot be empty"),
  descricao: z.string().min(1, "Quiz description cannot be empty"),
  perguntas: z
    .array(questionSchema)
    .min(1, "Quiz must have at least one question"),
});

// Theme
export const themeSchema = z.object({
  id: z.string().min(1),
  nome: z.string().min(1, "Theme name cannot be empty"),
  descricao: z.string().min(1, "Theme description cannot be empty"),
  icon: z.string(),
  quizzes: z.array(quizSchema),
});

// Quiz result
export const quizResultSchema = z.object({
  quizId: z.string().min(1),
  quizName: z.string().min(1),
  score: z.number().int().min(0),
  totalQuestions: z.number().int().positive(),
  totalTime: z.number().int().positive(),
  answers: z.array(
    z.object({
      questionId: z.string().min(1),
      selectedAnswer: z.string().min(1),
      correct: z.boolean(),
      timeSpent: z.number().int().min(0),
    })
  ),
});

// Establishment
export const establishmentSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1, "Establishment name cannot be empty"),
  type: z.string().min(1),
  shortDescription: z.string().min(1),
  longDescription: z.string().optional(),
  address: z.object({
    street: z.string().min(1),
    number: z.string().min(1),
    neighborhood: z.string().min(1),
    city: z.string().min(1),
    state: z.string().length(2),
    zipCode: z.string().min(1),
  }),
  contact: z.object({
    phone: z.string().optional(),
    email: z.string().email().optional(),
    website: z.string().url().optional(),
  }),
  socialMedia: z
    .array(
      z.object({
        platform: z.string().min(1),
        url: z.string().url(),
      })
    )
    .optional(),
  openingHours: z.string().optional(),
  isOpenNow: z.boolean(),
  rating: z.number().min(0).max(5).optional(),
  popularityRanking: z.number().int().min(0),
  imageUrl: z.string().url().optional(),
  badges: z.array(z.string()).optional(),
  quizzes: z.array(quizSchema).optional(),
});

// TypeScript types inferred from schemas
export type Alternative = z.infer<typeof alternativeSchema>;
export type Question = z.infer<typeof questionSchema>;
export type Quiz = z.infer<typeof quizSchema>;
export type Theme = z.infer<typeof themeSchema>;
export type QuizResult = z.infer<typeof quizResultSchema>;
export type Establishment = z.infer<typeof establishmentSchema>;

/**
 * Validate data at runtime
 * Throws ZodError if validation fails
 */
export const validateQuizData = (themes: unknown) => {
  return z.array(themeSchema).parse(themes);
};

export const validateEstablishmentData = (establishments: unknown) => {
  return z.array(establishmentSchema).parse(establishments);
};

export const validateQuizResult = (result: unknown) => {
  return quizResultSchema.parse(result);
};
