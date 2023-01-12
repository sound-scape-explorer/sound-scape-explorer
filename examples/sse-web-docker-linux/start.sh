#!/bin/bash

function print_separator {
    echo "---"
}

function print_welcome {
    print_separator
    echo "Welcome to SSE Web Docker for Linux."
    echo "This version only allows web visualization, it will not process your audio files!"
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

print_welcome

print_update

docker compose pull

print_start

docker compose up
