import {parse} from 'date-fns';

// LLM generated
export function extractDatesFromPaths(
  paths: string[],
  template: string,
): Date[] {
  const dates: Date[] = [];
  const referenceDate = new Date();

  // Map date-fns format tokens to regex patterns
  const tokenPatterns: Record<string, string> = {
    yyyy: '\\d{4}',
    yy: '\\d{2}',
    yyy: '\\d{3}',
    y: '\\d{1,4}',
    MM: '\\d{2}',
    M: '\\d{1,2}',
    dd: '\\d{2}',
    d: '\\d{1,2}',
    HH: '\\d{2}',
    H: '\\d{1,2}',
    hh: '\\d{2}',
    h: '\\d{1,2}',
    mm: '\\d{2}',
    m: '\\d{1,2}',
    ss: '\\d{2}',
    s: '\\d{1,2}',
    SSS: '\\d{3}',
    SS: '\\d{2}',
    S: '\\d{1,3}',
  };

  // Build a regex pattern from the template
  let regexPattern = '';
  let i = 0;

  while (i < template.length) {
    // Handle escaped characters (enclosed in single quotes)
    if (template[i] === "'") {
      i += 1;

      let escaped = '';

      while (i < template.length && template[i] !== "'") {
        escaped += template[i];
        i += 1;
      }

      // Escape special regex characters
      regexPattern += escaped.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      i += 1; // Skip closing quote

      continue;
    }

    // Check for date-fns tokens
    let matched = false;

    for (const [token, pattern] of Object.entries(tokenPatterns)) {
      if (template.substring(i, i + token.length) === token) {
        regexPattern += `(${pattern})`;
        i += token.length;
        matched = true;
        break;
      }
    }

    if (!matched) {
      // Regular character - escape if it's a special regex char
      if (/[.*+?^${}()|[\]\\]/.test(template[i])) {
        regexPattern += '\\' + template[i];
      } else {
        regexPattern += template[i];
      }
      i += 1;
    }
  }

  // Match the pattern anywhere in the path (with wildcards before and after)
  const regex = new RegExp(regexPattern);

  for (const path of paths) {
    const match = path.match(regex);
    if (match) {
      // Extract the matched date string (everything after the first group)
      const dateStr = match[0];

      try {
        const date = parse(dateStr, template, referenceDate);

        // Validate that parse actually succeeded
        if (!Number.isNaN(date.getTime())) {
          dates.push(date);
        }
      } catch {
        // Skip invalid dates
      }
    }
  }

  return dates;
}
