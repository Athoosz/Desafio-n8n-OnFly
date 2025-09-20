# Usar imagem oficial do n8n
FROM docker.n8n.io/n8nio/n8n:latest

# Copiar custom nodes para o diretório que será preservado
COPY --chown=node:node dist/.n8n/custom /home/node/.n8n/custom

# Manter usuário não-root por segurança
USER node
