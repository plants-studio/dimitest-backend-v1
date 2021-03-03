import {
  createSchema, ExtractProps, Type, typedModel,
} from 'ts-mongoose';

export const typeEnum = [
  'developer',
  'designer',
  'manager',
  'pA',
  'pB',
  'dA',
  'dB',
  'mA',
  'mB',
  'pA1',
  'pA2',
  'pB1',
  'pB2',
  'dA1',
  'dA2',
  'dB1',
  'dB2',
  'mA1',
  'mA2',
  'mB1',
  'mB2',
  'application developer',
  'game developer',
  'frontend developer',
  'mobile application developer',
  'machine learning engineer',
  'iot & robotics engineer',
  'information security professional',
  'backend developer',
  'illustrator',
  'editing designer',
  'product designer',
  'animator',
  'ui designer',
  'ux designer',
  'video designer',
  'computer graphics professor',
  'product manager',
  'business development manager',
  'business analyst',
  'finance manager',
  'communication manager',
  'personnel manager',
  'marketer',
  'customer representative',
];

const QuestionSchema = createSchema(
  {
    sequence: Type.string({
      required: true,
      enum: ['ch1', 'bridge1', 'non1', 'ch2', 'bridge2', 'non2', 'ch3', 'ch4'],
    }),
    sub: Type.array().of(Type.string({ enum: typeEnum })),
    question: Type.string({ required: true }),
    answer: Type.array({ required: true }).of({
      text: Type.string({ required: true }),
      score: Type.array({ required: true }).of({
        type: Type.string({
          required: true,
          enum: typeEnum,
        }),
        num: Type.number({ required: true }),
      }),
    }),
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const Question = typedModel('Question', QuestionSchema);

export type QuestionProps = ExtractProps<typeof QuestionSchema>;

export default Question;
