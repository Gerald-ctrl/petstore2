FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app
COPY .mvn/ .mvn/
COPY mvnw .
COPY backend/pom.xml backend/pom.xml
COPY backend/src/ backend/src/
RUN chmod +x mvnw && ./mvnw clean package -f backend/pom.xml -DskipTests

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/backend/target/petstore-backend-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
