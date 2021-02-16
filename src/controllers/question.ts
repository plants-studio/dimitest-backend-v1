import { Request, Response } from 'express';

import { logger } from '../configs/winston';
import Answer from '../models/Answer';
import Question, { QuestionProps } from '../models/Question';

const getRandomList = <T>(list: T[], length: number): T[] => {
  const array = list;
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array.slice(0, length);
};

const getDuplicateType = (score: { [key: string]: number }): string[] => {
  const result: string[] = [];
  const value = Math.max(...Object.values(score));
  Object.entries(score).forEach((v) => {
    if (v[1] === value) {
      result.push(v[0]);
    }
  });
  return result;
};

const isDuplicate = (score: { [key: string]: number }): boolean => {
  const value = Object.values(score);
  const max = Math.max(...value);
  let count = 0;
  value.forEach((v) => {
    if (v === max) {
      count += 1;
    }
  });
  if (count > 1) {
    return true;
  }
  return false;
};

const getScoreResult = (score: { [key: string]: number }): string => {
  let result: string = '';
  const value = Math.max(...Object.values(score));
  Object.entries(score).forEach((v) => {
    if (v[1] === value) {
      [result] = v;
    }
  });
  return result;
};

export const ch1 = async (req: Request, res: Response) => {
  const question = await Question.find({ sequence: 'ch1' });
  const list = getRandomList(question, 6);
  res.json(list);
};

export const ch2 = async (req: Request, res: Response) => {
  const {
    result,
  }: {
    result: {
      type: 'developer' | 'designer' | 'manager';
      num: number;
    }[];
  } = req.body;

  const score = { developer: 0, designer: 0, manager: 0 };
  result.forEach((v) => {
    score[v.type] += v.num;
  });

  if (isDuplicate(score)) {
    const question = await Question.find({ sequence: 'bridge1', sub: getDuplicateType(score) });
    const list = getRandomList(question, 1);
    res.json(list);
    return;
  }

  const non = await Question.find({ sequence: 'non1' });
  const question = await Question.find({ sequence: 'ch2', sub: getScoreResult(score) });

  if (result.length !== 6) {
    const list = getRandomList(question, 5);
    res.json(list);
    return;
  }

  const nonList = getRandomList(non, 1);
  const questionList = getRandomList(question, 5);
  res.json(nonList.concat(questionList));
};

export const ch3 = async (req: Request, res: Response) => {
  const {
    result,
  }: {
    result: {
      type: 'p1' | 'p2' | 'p3' | 'p4' | 'd1' | 'd2' | 'd3' | 'd4' | 'm1' | 'm2' | 'm3' | 'm4';
      num: number;
    }[];
  } = req.body;

  const score = {
    p1: 0,
    p2: 0,
    p3: 0,
    p4: 0,
    d1: 0,
    d2: 0,
    d3: 0,
    d4: 0,
    m1: 0,
    m2: 0,
    m3: 0,
    m4: 0,
  };
  result.forEach((v) => {
    score[v.type] += v.num;
  });

  if (isDuplicate(score)) {
    const question = await Question.find({ sequence: 'bridge2', sub: getDuplicateType(score) });
    const list = getRandomList(question, 1);
    res.json(list);
    return;
  }

  const non = await Question.find({ sequence: 'non2' });
  const question = await Question.find({ sequence: 'ch3', sub: getScoreResult(score) });

  if (result.length !== 5) {
    const list = getRandomList(question, 3);
    res.json(list);
    return;
  }

  const nonList = getRandomList(non, 1);
  const questionList = getRandomList(question, 3);
  res.json(nonList.concat(questionList));
};

export const typeResult = async (req: Request, res: Response) => {
  const {
    result,
    name,
    gender,
  }: {
    result: {
      type:
        | 'application developer'
        | 'game developer'
        | 'frontend developer'
        | 'mobile application developer'
        | 'machine learning engineer'
        | 'iot & robotics engineer'
        | 'information security professional'
        | 'backend developer'
        | 'illustrator'
        | 'editing designer'
        | 'product designer'
        | 'animator'
        | 'ui designer'
        | 'ux designer'
        | 'video designer'
        | 'computer graphics professor'
        | 'product manager'
        | 'business development manager'
        | 'business analyst'
        | 'accounting manager'
        | 'communication manager'
        | 'personnel manager';
      num: number;
    }[];
    name: string;
    gender: string;
  } = req.body;

  const score = {
    'application developer': 0,
    'game developer': 0,
    'frontend developer': 0,
    'mobile application developer': 0,
    'machine learning engineer': 0,
    'iot & robotics engineer': 0,
    'information security professional': 0,
    'backend developer': 0,
    illustrator: 0,
    'editing designer': 0,
    'product designer': 0,
    animator: 0,
    'ui designer': 0,
    'ux designer': 0,
    'video designer': 0,
    'computer graphics professor': 0,
    'product manager': 0,
    'business development manager': 0,
    'business analyst': 0,
    'accounting manager': 0,
    'communication manager': 0,
    'personnel manager': 0,
  };
  result.forEach((v) => {
    score[v.type] += v.num;
  });

  const r = getScoreResult(score);
  const answer = new Answer({
    name,
    gender,
    result: r,
  });
  await answer.save();

  res.json(r);
};

export const createQuestion = async (req: Request, res: Response) => {
  const { key } = req.params;
  const { data }: { data: QuestionProps } = req.body;

  if (key !== process.env.ADMIN_KEY) {
    logger.info(`admin failed ip: ${req.socket.remoteAddress}`);
    res.sendStatus(403);
    return;
  }

  const question = new Question(data);
  await question.save();
  res.sendStatus(200);
};
