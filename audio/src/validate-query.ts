import {type ParsedQs} from 'qs';

interface Query {
  file: string;
  start: number;
  end: number;
}

export function validateQuery(query: ParsedQs): Query {
  const file = query.file;

  if (typeof file !== 'string') {
    throw new TypeError('File is not a string');
  }

  const start = query.start;

  if (typeof start !== 'string') {
    throw new TypeError('Start is not a string');
  }

  const end = query.end;

  if (typeof end !== 'string') {
    throw new TypeError('End is not a string');
  }

  return {
    file,
    start: Number(start),
    end: Number(end),
  };
}
