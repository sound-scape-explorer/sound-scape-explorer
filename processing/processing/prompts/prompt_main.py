from processing.prompts.prompt_menu import prompt_menu
from processing.utils.get_yaml_data import get_yaml_data
from processing.utils.print_yaml_env import print_yaml_env
from processing.utils.update_python_path import update_python_path


def prompt_main():
    """CLI entry point"""

    update_python_path()

    env = get_yaml_data()
    print_yaml_env(env)
    prompt_menu(env)


if __name__ == "__main__":
    prompt_main()
