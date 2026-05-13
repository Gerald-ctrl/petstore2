@echo off
set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.19.10-hotspot"
set "PATH=%JAVA_HOME%\bin;%PATH%"
echo Starting Backend with JAVA_HOME=%JAVA_HOME%
mvnw.cmd spring-boot:run
