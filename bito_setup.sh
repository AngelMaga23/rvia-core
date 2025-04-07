#!/bin/sh

BITO_SETUP_DONE="/app/.bito_setup_done"

echo "🔍 Verificando que bito_setup.sh se está ejecutando..."
set -x  # Activar modo de depuración

echo "📂 Archivos en /app antes de ejecutar Bito:"
ls -la /app

echo "🔑 Iniciando configuración automática de Bito CLI..."

# Verificar si ya se intentó ejecutar el setup antes
if [ -f "$BITO_SETUP_DONE" ]; then
    echo "⚠️  La configuración de Bito CLI ya se intentó previamente. No se repetirá."
    exit 0
fi

# Verificar si la variable BITO_ACCESS_KEY está disponible
if [ -z "$BITO_ACCESS_KEY" ]; then
    echo "❌ ERROR: BITO_ACCESS_KEY no está configurado. Abortando..."
    touch "$BITO_SETUP_DONE"
    exit 1
fi

# Verificar si `expect` está instalado
if ! command -v expect >/dev/null 2>&1; then
    echo "⚠️  Instalando expect..."
    apt-get update && apt-get install -y expect
fi

echo "⏳ Accediendo a Bito CLI..."
sleep 2

# Ejecutar Bito y proporcionar la clave de acceso automáticamente
expect <<EOF
spawn bito
expect {
    "Please enter your email address or Bito Access Key" { send "$BITO_ACCESS_KEY\r" }
    timeout { exit 1 }
}
expect eof
EOF

if [ $? -ne 0 ]; then
    echo "❌ Error al configurar Bito CLI"
    exit 1
fi

# Marcar que ya se intentó la configuración para no repetirla
touch "$BITO_SETUP_DONE"

# Iniciar la aplicación
echo "🚀 Iniciando la aplicación..."
set +x  # Desactivar depuración

# exec node dist/main.js
