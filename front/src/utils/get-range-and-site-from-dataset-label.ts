interface GetRangeAndSiteFromDatasetLabel {
  range: string;
  site: string;
}

export function getRangeAndSiteFromDatasetLabel(label: string): GetRangeAndSiteFromDatasetLabel {
  let separator = '/';

  if (label.includes('//')) {
    separator = '//';
  }

  const [range, site] = label.split(separator);

  return {
    range,
    site,
  };
}
