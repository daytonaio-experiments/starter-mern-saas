FROM ubuntu:22.04

ARG USERNAME=daytona
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# Avoid warnings by switching to noninteractive
ENV DEBIAN_FRONTEND=noninteractive

RUN set -eux; \
    apt-get update; \
    apt-get install -y --no-install-recommends \
        apt-transport-https \
        ca-certificates \
        curl \
        gnupg \
        netbase \
        wget \
        sudo \
        tzdata \
        zsh \
        protobuf-compiler \
        libprotobuf-dev \
        openjdk-11-jdk

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - \
    && apt-get install -y nodejs \
    && npm install -g npm@10.8.1 nodemon

RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m -s /bin/zsh $USERNAME \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# Create /workspaces directory and set permissions
RUN mkdir -p /workspaces \
    && chown -R $USER_UID:$USER_GID /workspaces \
    && chmod -R 775 /workspaces

USER $USERNAME

# Add package-import-method to npmrc
RUN echo 'package-import-method=clone-or-copy' >> ~/.npmrc