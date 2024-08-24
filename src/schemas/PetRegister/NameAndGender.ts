import { z } from 'zod';

export const nameAndGenderSchema = z.object({
  petName: z.string()
    .min(2, { message: "*O nome fornecido deve ter entre 2 e 30 caracteres, não são permitidos caracteres especiais, nem números. Por favor, insira um nome válido." })
    .max(30, { message: "*O nome fornecido deve ter entre 2 e 30 caracteres, não são permitidos caracteres especiais, nem números. Por favor, insira um nome válido." })
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, {
      message: "*O nome fornecido deve ter entre 2 e 30 caracteres, não são permitidos caracteres especiais, nem números. Por favor, insira um nome válido.",
    }),
  gender: z.string(),
});

export type NameAndGenderProps = z.infer<typeof nameAndGenderSchema>;
