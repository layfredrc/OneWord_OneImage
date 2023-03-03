FROM python:3.10.10-bullseye
ENV DEBIAN_FRONTEND noninteractive


RUN apt-get update && apt-get install -y nodejs npm libmagickwand-dev ffmpeg imagemagick cabextract xfonts-utils fonts-liberation

COPY ./docker-utils/sources.list /etc/apt/sources.list

RUN apt-get update && apt-get install ttf-mscorefonts-installer && \
    fc-cache -f

WORKDIR /app/
COPY . /app/

RUN pip install "poetry==1.2.2"
RUN poetry install

WORKDIR /app/one_word_one_image/src/frontend/

RUN npm install --legacy-peer-deps
RUN npm run build

WORKDIR /app/one_word_one_image/src/

ENV GOOGLE_APPLICATION_CREDENTIALS="./backend/secrets/credentials.json"
ENV GOOGLE_SEARCH_ID="id"
ENV GOOGLE_IMAGES_SEARCH_TOKEN="token"

COPY ./docker-utils/policy.xml /etc/ImageMagick-6/policy.xml

ENTRYPOINT ["poetry", "run", "python", "manage.py", "runserver", "0.0.0.0:8000"]

EXPOSE 8000