FROM python:3.8-slim

RUN useradd -m sse
USER sse

ENV PYTHONPATH .
ENV PATH "/home/sse/.local/bin:$PATH"
ENV IS_DOCKER True

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY prepare.py .
RUN python3 prepare.py

WORKDIR /app
COPY processing processing
ENTRYPOINT ["python3", "processing/actions/all.py"]
