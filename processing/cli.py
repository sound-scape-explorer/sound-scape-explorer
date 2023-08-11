from processing.prompts.prompt_menu import prompt_menu
from processing.utils.get_yaml_data import get_yaml_data
from processing.utils.print_yaml_env import print_yaml_env


def main():
    env = get_yaml_data()
    print_yaml_env(env)
    prompt_menu(env)


if __name__ == "__main__":
    main()
