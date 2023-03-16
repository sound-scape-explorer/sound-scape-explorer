#!/bin/bash

function print_separator {
    echo "---"
}

function print_splash {
    print_separator
    echo "Press CTRL+C to stop the app and exit."
    print_separator
}

function print_update {
    print_separator
    echo "Updating docker images..."
    print_separator
}

function print_start {
    print_separator
    echo "Starting docker containers..."
    print_separator
}

# Runtime

print_splash

print_update
docker compose --env-file project.env pull

print_start
docker compose --env-file project.env up
