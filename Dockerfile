FROM python:3.6.1
ENV PYTHONUNBUFFERED 1
WORKDIR /django

# Install system dependencies
RUN apt-get update && apt-get install -y \
    netcat

# Add dependency files to the FS
ADD requirements.txt /django/

# Install python dependencies
RUN pip install -r /django/requirements.txt
