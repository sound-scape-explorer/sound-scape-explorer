from processing.constants import DOCKER_BASE_PATH


def read_audio_path_in_docker(audio_path: str) -> str:
    base_path = DOCKER_BASE_PATH
    audio_folder = audio_path.split("/")[-1]
    docker_path = f"{base_path}/{audio_folder}"
    return docker_path
