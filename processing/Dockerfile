FROM python:3.8-slim

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY prepare.py .
RUN python3 prepare.py

ENV PYTHONPATH .

ENV IS_DOCKER True

WORKDIR /app

COPY . .

ENTRYPOINT ["python3", "processing/actions/all.py"]
