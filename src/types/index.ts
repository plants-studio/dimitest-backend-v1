import { QuestionProps } from '../models/Question';

type answerList = {
  question: QuestionProps;
  index: number;
};

export type CreateQuestionListRequestBody = {
  chapter:
    | 'common'
    | 'common sub'
    | 'position'
    | 'position sub'
    | 'detail'
    | 'detail sub'
    | 'nonsense1'
    | 'nonsense2'
    | 'nonsense3';
  result?: answerList[];
};
