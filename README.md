﻿# AI Web Researcher

Este proyecto utiliza las librerías `@ai-sdk/openai`, `ai` y `exa-js` para buscar información y sintetizar respuestas utilizando llms (Perplexity like)

## Instalación

1. Tener Node.js instalado.
2. Clona este repositorio.

3. ```bash
   yarn
   ```

## Configuración

1. Obtener las claves de API necesarias:
   - Token de GitHub para acceder a los modelos de OpenAI
   - Clave API de Exa para búsquedas

2. En el archivo `index.js`, reemplaza:
   - `githubToken`: Con tu token de GitHub
   - `exaApiKey`: Con tu clave API de Exa
   - Opcionalmente, ajusta `endpoint` y `modelName` según tus necesidades

## Uso

1. ```bash
   yarn start
   ```
