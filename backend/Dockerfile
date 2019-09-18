# Insert React build step here
# Once built, put into /public

# Backend Building and Deployment
FROM python:3.7.4-alpine
LABEL maintainer "Peyton Duncan <pduncan@hackucf.org>"
EXPOSE 5000

RUN apk add --update alpine-sdk
RUN apk add --no-cache libffi-dev

# Install Dependencies
COPY ./requirements.txt /app/requirements.txt
WORKDIR /app
RUN pip3 install -r requirements.txt

# Copy over and Run the thing
COPY . /app
ENTRYPOINT [ "python3" ]
CMD [ "app.py" ]