import {
  createSchema, ExtractProps, Type, typedModel,
} from 'ts-mongoose';

export const typeEnum = [
  // #region base
  'developer',
  'designer',
  'manager',
  // #endregion

  // #region developer
  'p1',
  'p2',
  'p3',
  'p4',
  // #endregion

  // #region designer
  'd1',
  'd2',
  'd3',
  'd4',
  // #endregion

  // #region manager
  'm1',
  'm2',
  'm3',
  'm4',
  // #endregion

  // #region p1
  'application developer',
  'game developer',
  // #endregion

  // #region p2
  'frontend developer',
  'mobile application developer',
  // #endregion

  // #region p3
  'machine learning engineer',
  'iot & robotics engineer',
  // #endregion

  // #region p4
  'information security professional',
  'backend developer',
  // #endregion

  // #region d1
  'illustrator',
  'editing designer',
  // #endregion

  // #region d2
  'product designer',
  'animator',
  // #endregion

  // #region d3
  'ui designer',
  'ux designer',
  // #endregion

  // #region d4
  'video designer',
  'computer graphics professor',
  // #endregion

  // #region m1
  'product manager',
  'business development manager',
  // #endregion

  // #region m2
  'business analyst',
  'accounting manager',
  // #endregion

  // #region m3
  'communication manager',
  'personnel manager',
  // #endregion

  // #region m4
  'marketer',
  'customer representative',
  // #endregion
];

const QuestionSchema = createSchema(
  {
    sequence: Type.string({
      required: true,
      enum: ['ch1', 'bridge1', 'non1', 'ch2', 'bridge2', 'non2', 'ch3'],
    }),
    sub: Type.string({ enum: typeEnum }),
    question: Type.string({ required: true, unique: true }),
    answer: Type.array({ required: true }).of({
      text: Type.string({ required: true }),
      score: {
        type: Type.string({
          required: true,
          enum: typeEnum,
        }),
        num: Type.number({ required: true }),
      },
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
