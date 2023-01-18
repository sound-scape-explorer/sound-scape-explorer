interface GetRangeAndSiteFromDatasetLabel {
  range: string;
  site: string;
}

export function getRangeAndSiteFromDatasetLabel(label: string): GetRangeAndSiteFromDatasetLabel {
  let separator = '/';

  if (label.includes(' ')) {
    separator = ' ';
  }

  const [range, ...siteParts] = label.split(separator);

  let site = `${siteParts.join('/')}`;

  if (site.charAt(0) !== '/') {
    site = `/${site}`;
  }

  return {
    range,
    site,
  };
}
