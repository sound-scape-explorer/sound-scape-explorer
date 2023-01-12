from processing.classes.BuilderIndicatorEquivalentLevel import \
    BuilderIndicatorEquivalentLevel


class BuilderIndicators:
    """
    List all indicators builders
    """

    def __init__(self):
        # TODO: Add builder selection from configuration
        self.__run()

    def __run(self):
        BuilderIndicatorEquivalentLevel()
