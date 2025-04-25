# Usar Ubuntu 24.04 como base
FROM ubuntu:24.04

# Establecer el directorio de trabajo
WORKDIR /app

# Actualizar el sistema y realizar la instalación de dependencias
RUN apt-get update && apt-get upgrade -y && apt-get install -y \
    build-essential \
    software-properties-common \
    wget \
    git \
    libnss3 \
    libcrypto++-dev \
    gh \
    php \
    php8.3 \
    php8.3-cli \
    php8.3-mysql \
    php8.3-pgsql \
    php8.3-curl \
    php8.3-xml \
    python3 \
    python3-pip \
    clang \
    make \
    g++ \
    gcc \
    libstdc++-10-dev \
    bash \
    p7zip-full \
    file \
    linux-headers-generic \
    libpq-dev \
    libuv1-dev \
    libicu-dev \
    libarchive-dev \
    curl \
    libssl-dev \
    cmake \
    cloc \
    sudo \
    postgresql-contrib \
    libpq++-dev \
    libpq5 \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Instalar CLI de Bito
RUN sudo curl https://alpha.bito.ai/downloads/cli/install.sh -fsSL | bash

RUN pip3 install --break-system-packages PyPDF2

# Instalar Node.js 23.6.0 desde el repositorio oficial de NodeSource
RUN curl -fsSL https://deb.nodesource.com/setup_23.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Instalar node-gyp globalmente
RUN npm install -g node-gyp

# Instalar Mermaid CLI para diagramas
RUN npm install -g @mermaid-js/mermaid-cli

# Instalar bcrypt para NodeJS (para compatibilidad con scripts que lo requieren)
RUN npm install bcrypt

# Copiar archivos de configuración y dependencias de Node.js
COPY package.json ./ 
COPY package-lock.json ./ 

# Instalar dependencias del proyecto
RUN npm install

# Copiar el resto del código fuente
COPY . . 

# Construir la aplicación
RUN npm run build

# Crear el directorio y mover el archivo rvia.node
RUN mkdir -p /sysx && \
    cp -r /app/bito /sysx/ && \
    cp -r /app/dev /sysx/ && \
    cp -r /app/progs /sysx/

RUN chmod +x /app/bito_setup.sh

# Exponer el puerto donde la aplicación escuchará
EXPOSE 3001

# Comando para iniciar la aplicación
CMD ["/bin/sh", "-c", "./bito_setup.sh && node dist/main.js"]

