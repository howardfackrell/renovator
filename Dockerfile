FROM quay.octanner.io/base/oct-scala:2.11.7-sbt-0.13.12-play-2.5.9

RUN curl -sL https://deb.nodesource.com/setup_6.x | bash

RUN apt-get install -y nodejs

ADD . /app/

WORKDIR /app

RUN npm install

RUN npm install -g webpack

RUN webpack

RUN sbt stage

EXPOSE 9000

ENTRYPOINT ["./start.sh"]

