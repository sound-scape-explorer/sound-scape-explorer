from processing.interfaces import Interval, SerializedTag


class IntervalSerializationService:
    @staticmethod
    def serialize(
        intervals: list[Interval],  # enriched intervals
    ) -> list[SerializedTag]:
        # build tag names
        tag_names: list[str] = []
        for interval in intervals:
            for tag_name in interval.tags.keys():
                if tag_name not in tag_names:
                    tag_names.append(tag_name)

        serialized_tags: list[SerializedTag] = []
        for i, tag_name in enumerate(tag_names):
            tag_values: list[str] = []
            tag_uniques: list[str] = []

            for interval in intervals:
                tag_value = interval.joined_tags[tag_name]

                tag_values.append(tag_value)

                if tag_value not in tag_uniques:
                    tag_uniques.append(tag_value)

            serialized_tag = SerializedTag(
                i=i,
                name=tag_name,
                values=tag_values,
                uniques=tag_uniques,
            )

            serialized_tags.append(serialized_tag)

        return serialized_tags
