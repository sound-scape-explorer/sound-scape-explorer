def extract_name_from_digest_action(action_string):
    if '_' in action_string:
        return action_string.split(':')[0].split('_')[1]

    return action_string
