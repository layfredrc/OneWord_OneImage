FROM python:3.10.10-bullseye

RUN apt-get update

RUN apt-get install -y nodejs
RUN apt-get install -y npm

RUN DEBIAN_FRONTEND=noninteractive apt install ffmpeg --yes
RUN apt install -y imagemagick

RUN mkdir /app/
WORKDIR /app/
COPY . /app/


RUN pip install "poetry==1.2.2"
RUN poetry install

WORKDIR /
WORKDIR /app/one_word_one_image/src/frontend/

RUN npm install --legacy-peer-deps
RUN npm run build

WORKDIR /
WORKDIR /app/one_word_one_image/src/

ENV GOOGLE_APPLICATION_CREDENTIALS="url"
ENV GOOGLE_SEARCH_ID="id"
ENV GOOGLE_IMAGES_SEARCH_TOKEN="token"

ENTRYPOINT ["poetry", "run", "python", "manage.py", "runserver", "0.0.0.0:8000"]