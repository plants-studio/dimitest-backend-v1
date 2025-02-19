import { createSchema, Type, typedModel } from 'ts-mongoose';

import { typeEnum } from './Question';

const AnswerSchema = createSchema(
  {
    name: Type.string({ required: true }),
    gender: Type.string({ required: true, enum: ['남자', '여자'] }),
    result: Type.string({ required: true, enum: typeEnum }),
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const Answer = typedModel('Answer', AnswerSchema);

export default Answer;
