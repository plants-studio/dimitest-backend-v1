import { ParameterizedContext } from 'koa';

import { logger } from '../configs/winston';
import Answer from '../models/Answer';
import Question, { QuestionProps } from '../models/Question';
import getDuplicateType from '../utils/getDuplicateType';
import getRandomList from '../utils/getRandomList';
import getScoreResult from '../utils/getScoreResult';
import isDuplicate from '../utils/isDuplicate';

export const ch1 = async (ctx: ParameterizedContext) => {
  const question = await Question.find({ sequence: 'ch1' });
  const list = getRandomList(question, 6);
  ctx.status = 200;
  ctx.body = {
    status: ctx.status,
    data: list,
  };
};

export const ch2 = async (ctx: ParameterizedContext) => {
  const {
    result,
  }: {
    result: {
      type: 'developer' | 'designer' | 'manager';
      num: number;
    }[];
  } = ctx.request.body;

  if (!result || (result.length !== 12 && result.length < 1)) {
    ctx.status = 412;
    ctx.body = {
      status: ctx.status,
      data: null,
    };
    return;
  }

  const score = { developer: 0, designer: 0, manager: 0 };
  result.forEach((v) => {
    score[v.type] += v.num;
  });

  if (isDuplicate(score)) {
    const question = await Question.find({ sequence: 'bridge1', sub: getDuplicateType(score) });
    const list = getRandomList(question, 1);
    ctx.status = 200;
    ctx.body = {
      status: ctx.status,
      data: list,
    };
    return;
  }

  const non = await Question.find({ sequence: 'non1' });
  const question = await Question.find({ sequence: 'ch2', sub: getScoreResult(score) });

  if (result.length !== 12) {
    const list = getRandomList(question, 1);
    ctx.status = 200;
    ctx.body = {
      status: ctx.status,
      data: list,
    };
    return;
  }

  const nonList = getRandomList(non, 1);
  const questionList = getRandomList(question, 1);
  ctx.status = 200;
  ctx.body = {
    status: ctx.status,
    data: nonList.concat(questionList),
  };
};

export const ch3 = async (ctx: ParameterizedContext) => {
  const {
    result,
  }: {
    result: {
      type: 'pA' | 'pB' | 'dA' | 'dB' | 'mA' | 'mB';
      num: number;
    }[];
  } = ctx.request.body;

  if (!result || result.length < 1) {
    ctx.status = 412;
    ctx.body = {
      status: ctx.status,
      data: null,
    };
    return;
  }

  const score = {
    pA: 0,
    pB: 0,
    dA: 0,
    dB: 0,
    mA: 0,
    mB: 0,
  };
  result.forEach((v) => {
    score[v.type] += v.num;
  });

  if (isDuplicate(score)) {
    const question = await Question.find({ sequence: 'bridge2', sub: getDuplicateType(score) });
    const list = getRandomList(question, 1);
    ctx.status = 200;
    ctx.body = {
      status: ctx.status,
      data: list,
    };
    return;
  }

  const question = await Question.find({ sequence: 'ch3', sub: getScoreResult(score) });
  const questionList = getRandomList(question, 1);
  ctx.status = 200;
  ctx.body = {
    status: ctx.status,
    data: questionList,
  };
};

export const ch4 = async (ctx: ParameterizedContext) => {
  const {
    result,
  }: {
    result: {
      type:
        | 'pA1'
        | 'pA2'
        | 'pB1'
        | 'pB2'
        | 'dA1'
        | 'dA2'
        | 'dB1'
        | 'dB2'
        | 'mA1'
        | 'mA2'
        | 'mB1'
        | 'mB2';
      num: number;
    }[];
  } = ctx.request.body;

  if (!result || result.length < 1) {
    ctx.status = 412;
    ctx.body = {
      status: ctx.status,
      data: null,
    };
    return;
  }

  const score = {
    pA1: 0,
    pA2: 0,
    pB1: 0,
    pB2: 0,
    dA1: 0,
    dA2: 0,
    dB1: 0,
    dB2: 0,
    mA1: 0,
    mA2: 0,
    mB1: 0,
    mB2: 0,
  };
  result.forEach((v) => {
    score[v.type] += v.num;
  });

  const question = await Question.find({ sequence: 'ch4', sub: getScoreResult(score) });
  const questionList = getRandomList(question, 1);
  ctx.status = 200;
  ctx.body = {
    status: ctx.status,
    data: questionList,
  };
};

export const typeResult = async (ctx: ParameterizedContext) => {
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
        | 'finance manager'
        | 'communication manager'
        | 'personnel manager'
        | 'marketer'
        | 'customer representative';
      num: number;
    }[];
    name: string;
    gender: string;
  } = ctx.request.body;
  console.log(result);

  if (!result || result.length < 1 || !name || !gender) {
    ctx.status = 412;
    ctx.body = {
      status: ctx.status,
      data: null,
    };
    return;
  }

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
    'finance manager': 0,
    'communication manager': 0,
    'personnel manager': 0,
    marketer: 0,
    'customer representative': 0,
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

  ctx.status = 200;
  ctx.body = {
    status: ctx.status,
    data: r,
  };
};

export const createQuestion = async (ctx: ParameterizedContext) => {
  const { key } = ctx.params;
  const { data }: { data: QuestionProps } = ctx.request.body;
  console.log(data);

  logger.info('admin tried');

  if (key !== process.env.ADMIN_KEY) {
    logger.error('admin failed');
    ctx.status = 403;
    ctx.body = {
      status: ctx.status,
      data,
    };
    return;
  }

  const question = new Question(data);
  await question.save();
  logger.info('admin succeed');
  ctx.status = 200;
  ctx.body = {
    status: ctx.status,
    data,
  };
};
