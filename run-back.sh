#!/bin/bash

cd back || exit

. venv/bin/activate

flask --debug --app run.py run --host=0.0.0.0 --port=8081
