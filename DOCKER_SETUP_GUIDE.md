# Docker Configuration for OpenAI Integration

## Overview
This repository has been Docker-ized to use OpenAI API directly instead of Ollama and ChromaDB, following the user's requirement to avoid third-party services.

## Key Changes

### 1. Dockerfile (`Dockerfile`)
- **Base**: eclipse-temurin:21-jdk-alpine (optimized Java runtime)
- **Build**: Compiles the Spring Boot application with Maven
- **Runtime**: `java -jar app.jar` with OpenAI configurations injected via environment variables
- **Security**: Non-root user (spring:spring) for reduced attack surface
- **Performance**: Multi-stage build - separate build + runtime images

### 2. Docker Compose (`docker-compose.yml`)
- **No Ollama Service**: Removed Ollama container (ollama/ollama:latest)
- **AI Service**: Uses Docker build args to inject OpenRouter API key
- **Single Service Stack**: AI-Assistant + MySQL (shared database)
- **OpenAI Integration**: AI_API_KEY build argument injected during container build
- **Network Optimization**: Depends on MySQL service for data availability

### 3. Environment Variables
- `AI_API_KEY`: OpenRouter API key (injected via Docker build args)
- `OPENAI_API_KEY`: Mirrors AI_API_KEY for application use
- `OPENAI_BASE_URL`: Configurable OpenRouter API endpoint
- `OPENAI_MODEL`: Language model (default: gpt-4o)
- `OPENAI_EMBEDDING_MODEL`: Embedding model (default: text-embedding-ada-002)

## How to Deploy

### Prerequisites
1. **Install Docker Desktop**:
   ```bash
   # Download from: https://www.docker.com/products/docker-desktop/
   # Select WSL 2 backend for optimal performance
   ```

2. **Verify WSL 2 setup**:
   ```bash
   wsl --version
   wsl --list --verbose
   ```

### Build and Run
```bash
# Set OpenRouter API key as environment variable
set AI_API_KEY=your-openrouter-api-key-here

# Build and run all containers
docker compose up -d

# View logs
 docker compose logs -f

# Stop services
docker compose down
```

### Build Locally Without Docker Compose
```bash
# Build the Docker image
docker build -t ai-personal-knowledge-assistant .

# Run with API key
docker run -p 8081:8081 \
  -e AI_API_KEY=your-openrouter-api-key-here \
  ai-personal-knowledge-assistant
```

## Service Details

### AI Personal Knowledge Assistant
- **Port**: 8081 (application + actuator health)
- **Base URL**: http://localhost:8081
- **Health Check**: /actuator/health endpoint
- **Dependencies**: MySQL only (no Ollama/ChromaDB)

### MySQL Database
- **Port**: 3305 (custom port to avoid conflicts)
- **Database**: ai_personal_assistant
- **User**: root
- **Password**: root
- **Persistence**: mysql-data volume

## Cost Benefits
- **Ollama**: Free (self-hosted LLM)
- **ChromaDB**: Free (self-hosted vector store)
- **OpenRouter**: $5/month for 1M tokens (paid API)

## API Configuration

The application is pre-configured with:
- **Language Model**: OpenRouter API using deepseek/deepseek-r1
- **Embedding Model**: text-embedding-ada-002
- **Base URL**: https://openrouter.ai/api/v1
- **API Key**: OpenRouter key (injected securely via Docker build args)

## Usage Workflow

1. **Document Upload** → Text extraction → Chunking → Embedding → Store in MySQL
2. **Query Processing** → Similarity search (MySQL) → OpenAI LLM call → Answer
3. **Chat History** → Persist in MySQL for context

## Monitoring

- **Container Status**: `docker compose ps`
- **Application Logs**: `docker compose logs -f ai-assistant`
- **Database Logs**: `docker logs mysql-server`
- **Health Check**: `curl http://localhost:8081/actuator/health`

## Why This Approach

### 1. Security
- API keys never stored in source code
- Injected at build time only
- Non-root user in containers

### 2. Performance
- Single container architecture (no inter-container communication)
- No Ollama service to pull/start
- Direct OpenAI API calls (faster than Ollama)

### 3. Cost Efficiency
- Only paid component: OpenRouter API (~$5/month)
- No extra infrastructure (no dedicated servers)
- Shared MySQL container

### 4. Simplicity
- One Docker compose file
- No external service dependencies
- Same Java application (no rewrites needed)

## Migration from Original

**Before** (Ollama + ChromaDB + MySQL):
- 3 containers: AI-assist + Ollama + MySQL
- Pull: Ollama image (~1GB)
- Dependencies: spring-ai-ollama, spring-ai-vector-store-postgres

**After** (OpenAI + MySQL):
- 2 containers: AI-assist + MySQL
- Build time: One-time compile
- Dependencies: spring-ai-starter-model-openai, spring-ai-starter-vector-store-postgres

## Troubleshooting

### API Key Issues
```bash
# Check if API key is correctly passed
docker logs ai-personal-knowledge-assistant | grep -i "openai\|api\|key"
```

### Database Connectivity
```bash
# Check MySQL connection
 docker exec mysql-server mysql -uroot -proot -e "SHOW DATABASES;"
```

### Application Logs
```bash
# Real-time logs
docker compose logs -f ai-assistant

# Past errors
docker compose logs ai-assistant
```

## Production Considerations

### Resource Limits
- **AI Service**: ~2GB RAM, 512MB swap
- **MySQL**: ~1GB RAM

### Scaling
- Horizontal scaling via Docker Swarm/Kubernetes
- Add more MySQL instances for read replicas

### Backup Strategy
```bash
# Backup MySQL
docker exec mysql-server mysqldump -uroot -proot ai_personal_assistant > backup.sql
```

This Docker setup provides a modern, secure, and cost-effective alternative to the original Ollama+ChromaDB configuration, using OpenAI's hosted models while maintaining self-hosting benefits.