# Derived from official mysql image (our base image)
FROM mysql:5.7.27

ARG DATABASE_NAME
# Add a database
ENV MYSQL_DATABASE ${DATABASE_NAME}
# Add the content of the sql-scripts/ directory to your image
# All scripts in docker-entrypoint-initdb.d/ are automatically
# executed during container startup
COPY ./initdb /docker-entrypoint-initdb.d/