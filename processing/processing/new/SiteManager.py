from collections import defaultdict
from typing import NamedTuple

from processing.context import Context
from processing.new.FileConfigNew import FileConfigNew
from processing.new.SiteConfigOld import SiteConfigOld


class SiteWithFiles(NamedTuple):
    name: str
    files: list[FileConfigNew]  # sorted chronologically


class SiteManager:
    @staticmethod
    def _get_files_by_site(context: Context):
        files_by_site: dict[str, list[FileConfigNew]] = defaultdict(list)

        for file in context.config.files:
            site = file.site
            files_by_site[site].append(file)

        return files_by_site

    @staticmethod
    def get_sites(context: Context):
        files_by_site = SiteManager._get_files_by_site(context)

        sites: list[SiteWithFiles] = []
        for site, files in files_by_site.items():
            files_sorted = sorted(files, key=lambda f: f.timestamp)
            site = SiteWithFiles(site, files_sorted)
            sites.append(site)

        return sites

    @staticmethod
    def sort_files_by_site_adapt(context: Context):
        future_map = SiteManager._get_files_by_site(context)
        sites: list[SiteConfigOld] = []

        for s, site in enumerate(future_map):
            site = SiteConfigOld(
                index=s,
                name=site,
                files=future_map[site],
            )

            sites.append(site)

        return sites
