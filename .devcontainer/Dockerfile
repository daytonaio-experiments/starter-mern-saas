FROM ubuntu:22.04

# Avoid warnings by switching to noninteractive
ENV DEBIAN_FRONTEND=noninteractive
# Use the default user 'daytona'
ARG USERNAME=daytona
ARG USER_UID=1001
ARG USER_GID=$USER_UID

# Create the user 'daytona' with sudo access
RUN groupadd --gid $USER_GID $USERNAME \
	&& useradd --uid $USER_UID --gid $USER_GID -m $USERNAME \
	&& apt-get update \
	&& apt-get install -y sudo \
	&& echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
	&& chmod 0440 /etc/sudoers.d/$USERNAME
    
# RUN set -eux; \
#     apt-get update; \
#     apt-get install -y --no-install-recommends \
#         apt-transport-https \
#         ca-certificates \
#         curl \
# # https://bugs.debian.org/929417
#         sudo \
# # daytona specific
#     rm -rf /var/lib/apt/lists/*

#     # Install Node.js
# RUN curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - \
#     && apt-get install -y nodejs \
#     && npm install -g npm@10.8.1 nodemon

# Create the user
# RUN groupadd --gid $USER_GID $USERNAME \
#     && useradd --uid $USER_UID --gid $USER_GID -m -s /bin/zsh $USERNAME \
#     # Add sudo support. We can omit if we're not going to support adding
#     # software after building the container.
#     && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
#     && chmod 0440 /etc/sudoers.d/$USERNAME


USER $USERNAME