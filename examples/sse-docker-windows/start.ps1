function PrintSeparator()
{
    echo "---"
}

function PrintWelcome()
{
    PrintSeparator
    echo "Welcome to SSE Web Docker for Windows."
    echo "This version only allows web visualization, it will not process your audio files!"
    echo "Press CTRL+C to stop the app and exit."
    PrintSeparator
}

function PrintUpdate()
{
    PrintSeparator
    echo "Updating docker images..."
    PrintSeparator
}

function PrintStart()
{
    PrintSeparator
    echo "Starting docker containers..."
    PrintSeparator
}

# Runtime

PrintWelcome

PrintUpdate
docker compose pull

PrintStart
docker compose up
