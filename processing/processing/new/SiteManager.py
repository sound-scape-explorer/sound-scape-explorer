from collections import defaultdict

from processing.context import Context
from processing.new.FileConfigNew import FileConfigNew
from processing.new.SiteConfigNew import SiteConfigNew


class SiteManager:
    @staticmethod
    def sort_files_by_site(context: Context):
        files_by_site: dict[str, list[FileConfigNew]] = defaultdict(list)

        for file in context.config.files:
            site = file.site
            files_by_site[site].append(file)

        return files_by_site

    @staticmethod
    def sort_files_by_site_adapt(context: Context):
        future_map = SiteManager.sort_files_by_site(context)
        sites: list[SiteConfigNew] = []

        for s, site in enumerate(future_map):
            site = SiteConfigNew(
                index=s,
                name=site,
                files=future_map[site],
            )

            sites.append(site)

        return sites
