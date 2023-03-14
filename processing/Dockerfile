FROM python:3.8-slim as dependencies

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY prepare.py .
RUN python3 prepare.py

ENV PYTHONPATH=.

ARG storage

ENV storage ${storage}

ENV config /project/config.xlsx

WORKDIR /app

COPY . .

ENTRYPOINT ["python3", "processing/actions/all.py"]
