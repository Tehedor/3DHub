# Servidor Backend con Java Spring Boot

# Instalaciones Windows
## Visual Studio Code
- Extensiones:
  - Extension Pack for Java
  - Spring Boot Extension Pack

## Java
Java JDK 21

## Maven
Apache Maven 3.9.6 - https://maven.apache.org/download.cgi
Descargar ZIP Binario y descomprimirlo en un directorio

## Necesita crear variables de entorno Windows:
- JAVA_HOME = C:\Program Files\Java\jdk-21 (Por defecto)
- MAVEN_HOME = (Directorio donde esta el directorio apache-maven-3.9.6 )
- Agregar a la variable PATH la ruta apache-maven-3.9.6/bin

## MySQL
<<<<<<< Updated upstream
- MySQL 8.0.36 - https://dev.mysql.com/downloads/installer/
- Nombre y contraseña root
=======
MySQL 8.0.36 - https://dev.mysql.com/downloads/installer/
Nombre y contraseña root
>>>>>>> Stashed changes

# Arrancar Servidor

- Crear tabla en Base de Datos MySQL con nombre: testdb
- Ir al directorio backend\src\main\java\com\bezkoder\spring\login\SpringBootLoginExampleApplication.java
- Debería aparecer un boton "run" en el codigo, si no esperar.
- Arrancar servidor frontend con NodeJs


Para comprobar como se conectan servidor de back con front se pueden hacer pruebas con los siguientes repositorios:

# Referencias
- Frontend: https://github.com/bezkoder/react-js-login-registration-hooks
- Backend: https://github.com/bezkoder/spring-boot-security-login
- BBDD: MySQL (hace falta modificar el application.properties)
