FROM python:alpine
LABEL maintainer="Bamdad Sabbagh <hi@bamdad.fr>"

WORKDIR /app

COPY . .

RUN python -m venv venv

RUN source venv/bin/activate

RUN pip install -r requirements.txt

EXPOSE 8081

CMD ["flask", "--debug", "--app", "run.py", "run", "--host=0.0.0.0", "--port=8081"]
