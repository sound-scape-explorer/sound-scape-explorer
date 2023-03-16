function PrintSeparator()
{
    echo "---"
}

function PrintSplash()
{
    PrintSeparator
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

PrintSplash

PrintUpdate
docker compose --env-file project.env pull

PrintStart
docker compose --env-file project.env up
