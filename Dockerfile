# Stage 1: Resolve dependencies (cached layer)
FROM eclipse-temurin:21-jdk-alpine AS deps
WORKDIR /app
COPY mvnw mvnw.cmd pom.xml ./
COPY .mvn .mvn
RUN ./mvnw dependency:go-offline -DskipTests

# Stage 2: Build the application
FROM deps AS build
COPY src src
RUN ./mvnw package -DskipTests

# Stage 3: Minimal runtime image
FROM eclipse-temurin:21-jre-alpine AS runtime
WORKDIR /app

RUN apk add --no-cache curl

RUN addgroup -g 1000 spring && adduser -u 1000 -G spring -D spring

COPY --from=build /app/target/ai-personal-knowledge-assistant-0.0.1-SNAPSHOT.jar app.jar

USER spring:spring

EXPOSE 8081

ENTRYPOINT ["java", "-Xmx1024m", "-jar", "app.jar"]