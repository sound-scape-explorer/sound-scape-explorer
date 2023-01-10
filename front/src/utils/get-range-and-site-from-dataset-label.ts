interface GetRangeAndSiteFromDatasetLabel {
  range: string;
  site: string;
}

export function getRangeAndSiteFromDatasetLabel(label: string): GetRangeAndSiteFromDatasetLabel {
  const [range, site] = label.split(' ');

  return {
    range,
    site,
  };
}
