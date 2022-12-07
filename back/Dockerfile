FROM python:3.8-slim
LABEL maintainer="Bamdad Sabbagh <hi@bamdad.fr>"

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

EXPOSE 8081

CMD ["flask", "--debug", "--app", "run.py", "run", "--host=0.0.0.0", "--port=8081"]
