import {
  createSchema, ExtractProps, Type, typedModel,
} from 'ts-mongoose';

const typeEnum = [
  // #region base type
  'developer',
  'designer',
  'manager',
  // #endregion

  // #region developer category
  'software developer',
  'service developer',
  'engineering developer',
  // #endregion

  // #region designer category
  '2d graphic designer',
  '3d graphic designer',
  'ui ux designer',
  'sfx designer',
  // #endregion

  // #region manager category
  'lead manager',
  'business manager',
  'marketing manager',
  // #endregion

  // #region developer type
  'application developer',
  'game developer',
  'white hacker',
  'frontend developer',
  'backend developer',
  'mobile developer',
  'machine learning engineer',
  'iot and robotics engineer',
  // #endregion

  // #region designer type
  'illustrator',
  'editing designer',
  'product designer',
  'animator',
  'ui designer',
  'ux designer',
  'video designer',
  'computer graphic designer',
  // #endregion

  // #region manager type
  'product manager',
  'human resource manager',
  'business development manager',
  'business analyst',
  'finance manager',
  'communication manager',
  'marketer',
  'customer manager',
  // #endregion
];

const chapterEnum = ['common', 'common sub', 'position', 'position sub', 'detail', 'detail sub', 'nonsense1', 'nonsense2', 'nonsense3'];

export const QuestionSchema = createSchema(
  {
    title: Type.string({ required: true, unique: true }),
    content: Type.array({ required: true }).of({
      text: Type.string({ required: true }),
      data: Type.array({ required: true }).of({
        type: Type.string({ required: true, enum: typeEnum }),
        score: Type.number({ required: true }),
      }),
    }),
    chapter: Type.string({ required: true, enum: chapterEnum }),
    type: Type.string({ enum: typeEnum }),
    sub: Type.array().of(Type.string({ enum: typeEnum })),
  },
  {
    versionKey: false,
  },
);

export type QuestionProps = ExtractProps<typeof QuestionSchema>;

const Question = typedModel('Question', QuestionSchema);

export default Question;
