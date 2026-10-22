# PowerPoint2Vid job runner. Build from the repo root:  docker build -f studio/Dockerfile -t p2v-runner .
FROM mcr.microsoft.com/playwright:v1.64.1-jammy
RUN apt-get update && apt-get install -y --no-install-recommends python3 python3-pip libreoffice-impress poppler-utils ffmpeg fonts-inter fonts-liberation fonts-noto-core curl \
 && rm -rf /var/lib/apt/lists/* \
 && pip3 install --no-cache-dir python-pptx piper-tts
WORKDIR /app/studio
COPY studio/package.json studio/package-lock.json ./
RUN npm ci
COPY studio/ ./
# Voice model (CC-licensed, see docs/ARCHITECTURE.md licences)
RUN mkdir -p /voices && curl -fsSL -o /voices/en_US-lessac-medium.onnx https://huggingface.co/rhasspy/piper-voices/resolve/main/en/en_US/lessac/medium/en_US-lessac-medium.onnx \
 && curl -fsSL -o /voices/en_US-lessac-medium.onnx.json https://huggingface.co/rhasspy/piper-voices/resolve/main/en/en_US/lessac/medium/en_US-lessac-medium.onnx.json
ENV DATA_DIR=/data PORT=8080 P2V_VOICE=/voices/en_US-lessac-medium.onnx
EXPOSE 8080
CMD ["node", "server.mjs"]
