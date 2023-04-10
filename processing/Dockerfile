FROM python:3.8-slim AS build

RUN apt-get update
RUN apt-get install -y --no-install-recommends build-essential

RUN useradd -m sse
USER sse

ENV PATH "/home/sse/.local/bin:$PATH"

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY prepare.py .
RUN python3 prepare.py

FROM python:3.8-slim

RUN useradd -m sse
USER sse

ENV PATH "/home/sse/.local/bin:$PATH"
ENV PYTHONPATH .
ENV IS_DOCKER True

RUN mkdir /home/sse/.cache
RUN mkdir /home/sse/.cache/matplotlib
RUN mkdir /home/sse/.cache/torch
RUN mkdir /home/sse/.cache/torch/hub
RUN mkdir /home/sse/.cache/torch/kernels

COPY --from=build /home/sse/.local /home/sse/.local
COPY --from=build /home/sse/.cache/torch/hub /home/sse/.cache/torch/hub

WORKDIR /app
COPY processing processing
ENTRYPOINT ["python3", "processing/actions/all.py"]
