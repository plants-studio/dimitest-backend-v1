import { Request, Response } from 'express';

import Question from '../models/Question';
import { CreateQuestionListRequestBody } from '../types';
import getDuplicateKeys from '../utils/getDuplicateKeys';
import getMaxKey from '../utils/getMaxKey';
import isDuplicate from '../utils/isDuplicate';
import shuffle from '../utils/shuffle';

export const createQuestionList = async (req: Request, res: Response): Promise<void> => {
  const { chapter, result }: CreateQuestionListRequestBody = req.body;

  if (chapter === 'common') {
    const list = await Question.find({ chapter });
    res.json(shuffle(list).slice(0, 5));
    return;
  }

  if (!result) {
    res.sendStatus(412);
    return;
  }

  if (chapter === 'common sub') {
    const score: { [key: string]: number } = { developer: 0, designer: 0, manager: 0 };

    result.forEach((v) => {
      v.question.content[v.index].data.forEach((d) => {
        score[d.type] += d.score;
      });
    });

    const list = await Question.find(
      isDuplicate(score) ? { chapter, sub: getDuplicateKeys(score) } : { chapter: 'nonsense1' },
    );
    res.json(shuffle(list).slice(0, 1));
  } else if (chapter === 'position') {
    const score: { [key: string]: number } = { developer: 0, designer: 0, manager: 0 };

    result.forEach((v) => {
      v.question.content[v.index].data.forEach((d) => {
        score[d.type] += d.score;
      });
    });

    const questionType = getMaxKey(score);
    const list = await Question.find({ chapter, type: questionType });
    res.json(shuffle(list).slice(0, 4));
  } else if (chapter === 'position sub') {
    const score: { [key: string]: number } = {
      'software developer': 0,
      'service developer': 0,
      'engineering developer': 0,
      '2d graphic designer': 0,
      '3d graphic designer': 0,
      'ui ux designer': 0,
      'sfx designer': 0,
      'lead manager': 0,
      'business manager': 0,
      'marketing manager': 0,
    };

    result.forEach((v) => {
      v.question.content[v.index].data.forEach((d) => {
        score[d.type] += d.score;
      });
    });

    const list = await Question.find(
      isDuplicate(score) ? { chapter, sub: getDuplicateKeys(score) } : { chapter: 'nonsense2' },
    );
    res.json(shuffle(list).slice(0, 1));
  } else if (chapter === 'detail') {
    const score: { [key: string]: number } = {
      'software developer': 0,
      'service developer': 0,
      'engineering developer': 0,
      '2d graphic designer': 0,
      '3d graphic designer': 0,
      'ui ux designer': 0,
      'sfx designer': 0,
      'lead manager': 0,
      'business manager': 0,
      'marketing manager': 0,
    };

    result.forEach((v) => {
      v.question.content[v.index].data.forEach((d) => {
        score[d.type] += d.score;
      });
    });

    const questionType = getMaxKey(score);
    const list = await Question.find({ chapter, type: questionType });
    res.json(shuffle(list).slice(0, 3));
  } else if (chapter === 'detail sub') {
    const score: { [key: string]: number } = {
      'application developer': 0,
      'game developer': 0,
      'white hacker': 0,
      'frontend developer': 0,
      'backend developer': 0,
      'mobile developer': 0,
      'machine learning engineer': 0,
      'iot and robotics engineer': 0,
      illustrator: 0,
      'editing designer': 0,
      'product designer': 0,
      animator: 0,
      'ui designer': 0,
      'ux designer': 0,
      'video designer': 0,
      'computer graphic designer': 0,
      'product manager': 0,
      'human resource manager': 0,
      'business development manager': 0,
      'business analyst': 0,
      'finance manager': 0,
      'communication manager': 0,
      marketer: 0,
      'customer manager': 0,
    };

    result.forEach((v) => {
      v.question.content[v.index].data.forEach((d) => {
        score[d.type] += d.score;
      });
    });

    const list = await Question.find(
      isDuplicate(score) ? { chapter, sub: getDuplicateKeys(score) } : { chapter: 'nonsense3' },
    );
    res.json(shuffle(list).slice(0, 1));
  } else {
    const score: { [key: string]: number } = {
      'application developer': 0,
      'game developer': 0,
      'white hacker': 0,
      'frontend developer': 0,
      'backend developer': 0,
      'mobile developer': 0,
      'machine learning engineer': 0,
      'iot and robotics engineer': 0,
      illustrator: 0,
      'editing designer': 0,
      'product designer': 0,
      animator: 0,
      'ui designer': 0,
      'ux designer': 0,
      'video designer': 0,
      'computer graphic designer': 0,
      'product manager': 0,
      'human resource manager': 0,
      'business development manager': 0,
      'business analyst': 0,
      'finance manager': 0,
      'communication manager': 0,
      marketer: 0,
      'customer manager': 0,
    };

    result.forEach((v) => {
      v.question.content[v.index].data.forEach((d) => {
        score[d.type] += d.score;
      });
    });

    const questionType = getMaxKey(score);
    res.json(questionType);
  }
};

export const addQuestion = (req: Request, res: Response) => {};
