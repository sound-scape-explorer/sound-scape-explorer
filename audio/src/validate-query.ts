import {type ParsedQs} from 'qs';

interface ParsedQuery {
  [p: string]: string | string[] | ParsedQuery | ParsedQuery[] | undefined;
}

interface Query {
  file: string;
  start: number;
  end: number;
}

export function validateQuery(query: ParsedQs): Query {
  const file = query.file;

  if (typeof file !== 'string') {
    throw new Error('File is not a string');
  }

  const start = query.start;

  if (typeof start !== 'string') {
    throw new Error('Start is not a string');
  }

  const end = query.end;

  if (typeof end !== 'string') {
    throw new Error('End is not a string');
  }

  return {
    file,
    start: Number(start),
    end: Number(end),
  };
}
