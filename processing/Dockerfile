FROM python:3.8-slim
LABEL maintainer="Bamdad Sabbagh <hi@bamdad.fr>"

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

RUN pip install -e .

RUN python prepare.py

CMD ["./run.sh", "/sample"]
