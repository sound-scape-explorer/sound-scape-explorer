from collections import defaultdict
from typing import NamedTuple

from processing.config.FileConfig import FileConfig
from processing.context import Context


class SiteWithFiles(NamedTuple):
    name: str
    files: list[FileConfig]  # sorted chronologically


class SiteService:
    @staticmethod
    def _get_files_by_site(context: Context):
        files_by_site: dict[str, list[FileConfig]] = defaultdict(list)

        for file in context.config.files:
            site = file.site
            files_by_site[site].append(file)

        return files_by_site

    @staticmethod
    def get_sites(context: Context):
        files_by_site = SiteService._get_files_by_site(context)

        sites: list[SiteWithFiles] = []

        for site, files in files_by_site.items():
            files_sorted = sorted(files, key=lambda f: f.timestamp)
            site = SiteWithFiles(
                name=site,
                files=files_sorted,
            )

            sites.append(site)

        return sites
