# 3DHub
Proyecto ISST -Grupo 10 -AMaaS - Marketplace de fabricación aditiva como servicio


# Fronted
Sobre node 18.20

## Dependencias

El proyecto utiliza las siguientes dependencias:

- "@testing-library/jest-dom": "6.4.2"
- "@testing-library/react": "14.2.2"
- "@testing-library/user-event": "14.5.2"
- "axios": "1.6.8"
- "bootstrap": "5.3.3"
- "file-saver": "^2.0.5"
- "http-proxy-middleware": "3.0.0"
- "react": "18.2.0"
- "react-bootstrap": "2.10.2"
- "react-dom": "18.2.0"
- "react-geolocated": "4.1.2"
- "react-router-dom": "6.22.3"
- "react-scripts": "5.0.1"
- "react-star-ratings": "^2.3.0"
- "react-validation": "3.0.7"
- "validator": "13.11.0"
- "web-vitals": "3.5.2"

# Servidor Backend con Java Spring Boot

# Instalaciones Windows
## Visual Studio Code
- Extensiones:
  - Extension Pack for Java
  - Spring Boot Extension Pack

## Java
Java JDK 17

## Maven
Apache Maven 3.9.6 - https://maven.apache.org/download.cgi
Descargar ZIP Binario y descomprimirlo en un directorio

## Necesita crear variables de entorno Windows:
- JAVA_HOME = C:\Program Files\Java\jdk-21 (Por defecto)
- MAVEN_HOME = (Directorio donde esta el directorio apache-maven-3.9.6 )
- Agregar a la variable PATH la ruta apache-maven-3.9.6/bin

## MySQL
- MySQL 8.0.36 - https://dev.mysql.com/downloads/installer/
- Nombre y contraseña root

## Python

Phyton3
pip3


## Dependencias

El proyecto utiliza las siguientes dependencias:

- `spring-boot-starter-data-jpa` de `org.springframework.boot`
- `spring-boot-starter-security` de `org.springframework.boot`
- `spring-boot-starter-thymeleaf` de `org.springframework.boot`
- `spring-boot-starter-web` de `org.springframework.boot`
- `thymeleaf-extras-springsecurity6` de `org.thymeleaf.extras`
- `mysql-connector-j` de `com.mysql`
- `lombok` de `org.projectlombok`
- `spring-boot-devtools` de `org.springframework.boot`
- `spring-boot-starter-validation` de `org.springframework.boot`
- `jjwt`, `jjwt-jackson`, `jjwt-impl` de `io.jsonwebtoken`
- `spring-boot-starter-mail` de `org.springframework.boot`
- `spring-cloud-gcp-starter-storage` de `com.google.cloud`
- `guava` de `com.google.guava`
- `spring-boot-starter-test` de `org.springframework.boot` (solo para pruebas)
- `spring-security-test` de `org.springframework.security` (solo para pruebas)

Además, el proyecto utiliza el plugin `spring-boot-maven-plugin` de `org.springframework.boot` para la construcción. Este plugin está configurado para excluir `lombok` de `org.projectlombok` durante la construcción.

# Arrancar Servidor

- Crear tabla en Base de Datos MySQL con nombre: testdb
y definir la contraseña en application.properties
- Ir al directorio backend\src\main\java\com\dhub\backend\BackendApplication.java
- Pegar credenciales Json en la carpeta \backend\src\main\resources\credentials.json
- Debería aparecer un boton "run" en el codigo, si no esperar.
- Hay que tener instalado python3 y pip3
En una terminal con Linux escribir los comandos:
$ python3 iniciar.py
$ cd microservicios
python3 microspervicios.py
- Arrancar servidor frontend con NodeJs
Escribir en la terminal:
$ npm install
$ npm start
 -Escribir en un navegador localhost:3000
 

Para comprobar como se conectan servidor de back con front se pueden hacer pruebas con los siguientes repositorios:

# Referencias
- Frontend: https://github.com/bezkoder/react-js-login-registration-hooks
- Backend: https://github.com/bezkoder/spring-boot-security-login
- BBDD: MySQL (hace falta modificar el application.properties)
