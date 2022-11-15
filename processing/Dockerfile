FROM python:3.8-slim
LABEL maintainer="Bamdad Sabbagh <hi@bamdad.fr>"

WORKDIR /app

COPY . .

RUN pip install torchaudio==0.11.0 pandas==1.4.2 matplotlib==3.5.2 openpyxl==3.0.10 umap-learn==0.5.3 seaborn==0.11.2

RUN pip install -e .

RUN python prepare.py

CMD ["./run.sh", "/sample"]
