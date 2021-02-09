import { createSchema, Type, typedModel } from 'ts-mongoose';

import { QuestionSchema } from './Question';

const AnswerSchema = createSchema(
  {
    name: Type.string({ required: true }),
    list: Type.array({ required: true }).of(
      Type.ref({
        question: Type.ref(QuestionSchema),
        index: Type.number(),
      }),
    ),
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const Answer = typedModel('Answer', AnswerSchema);

export default Answer;
