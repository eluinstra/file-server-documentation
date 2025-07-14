---
sidebar_position: 2
---

# Installation and Configuration Guide

## Prerequisites

- install JDK/JRE 11

### Optional

- download and install SoapUI to test the File Server or File Client

## Install the FileServer

### Prerequisites

- download [file-server-1.0.0](https://github.com/eluinstra/file-server/releases/download/1.0.0/file-server-1.0.0.jar)  
- JDBC driver for the database (see here)
- Database with user account

#### Optional

- download [file-server-soapui-project.xml](https://github.com/eluinstra/file-server/raw/master/resources/file-server-soapui-project.xml)

### Installation

De File Server consists of the following file: file-server-1.0.0.jar
For configuration of the File Server see here. The application writes logging to a logfile (see here). The application also uses a database (see here)

- create directory `file-server`
- copy file-server-1.0.0 to file-server
- cd file-server
- create directory `files`

### Configuration

This section describes the properties to configure the File Server up- and downoad interfaces. You can override these properties in `$CONFIG_DIR/file-server.properties`.

#### Basic Properties

##### Server Properties

```properties
server.protocol=https
server.host=localhost
server.port=8443
server.path=/files
server.ssl=true
server.clientCertificateHeader=
server.baseUrl=${server.protocol}://${server.host}:${server.port}${server.path}
```

##### SSL Keystore Properties

```properties
keystore.type=PKCS12
keystore.path=dev/luin/file/server/core/keystore.p12
keystore.password=password
```

##### SSL Truststore Properties

```properties
truststore.type=PKCS12
truststore.path=dev/luin/file/server/core/truststore.p12
truststore.password=password
```

##### File Properties

```properties
file.virtualPathLength=127
file.baseDir=files
file.filenameLength=32
file.maxFileSize=1073741824
file.share.upload.location=shared/upload
file.share.download.location=shared/download
```

##### Database Properties

```properties
jdbc.driverClassName=org.hsqldb.jdbcDriver
jdbc.url=jdbc:hsqldb:hsql://localhost:9001/file_server
jdbc.username=sa
jdbc.password=
```

#### Advanced Properties

##### Soap/Rest Attachment Properties
```properties
attachment.memoryTreshold=131072
attachment.outputDirectory=
attachment.cipherTransformation=
```

##### JDBC Connection Pool Properties

```properties
jdbc.pool.autoCommit=true
jdbc.pool.connectionTimeout=30000
jdbc.pool.maxIdleTime=600000
jdbc.pool.maxLifetime=1800000
jdbc.pool.testQuery=
jdbc.pool.minPoolSize=16
jdbc.pool.maxPoolSize=32
```

#### Optional Properties

##### Grote Berichten Server Properties

```properties
server.baseUrl=
```

### CommandLine Configuration

```sh
usage: Start [-authentication] [-cipherSuites <arg>]
       [-clientAuthentication] [-clientCertificateHeader <arg>]
       [-clientTrustStorePassword <arg>] [-clientTrustStorePath <arg>]
       [-clientTrustStoreType <arg>] [-configDir <arg>] [-connectionLimit
       <arg>] [-h] [-health] [-healthPort <arg>] [-host <arg>] [-hsqldb]
       [-hsqldbDir <arg>] [-jmx] [-jmxAccessFile <arg>] [-jmxPasswordFile
       <arg>] [-jmxPort <arg>] [-keyStorePassword <arg>] [-keyStorePath
       <arg>] [-keyStoreType <arg>] [-path <arg>] [-port <arg>]
       [-protocols <arg>] [-ssl] [-trustStorePassword <arg>]
       [-trustStorePath <arg>] [-trustStoreType <arg>]
 -authentication                   enable basic | client certificate authentication
 -cipherSuites <arg>               set SSL CipherSuites [default: <none>]
 -clientAuthentication             enable SSL client authentication
 -clientCertificateHeader <arg>    set client certificate header [default: <none>]
 -clientTrustStorePassword <arg>   set client truststore password [default: <none>]
 -clientTrustStorePath <arg>       set client truststore path [default: <none>]
 -clientTrustStoreType <arg>       set client truststore type [default: PKCS12]
 -configDir <arg>                  set config directory [default: <startup_directory>]
 -connectionLimit <arg>            set connection limit [default: <none>]
 -h                                print this message
 -health                           start health service
 -healthPort <arg>                 set health service port [default: 8008]
 -host <arg>                       set host [default: 0.0.0.0]
 -hsqldb                           start HSQLDB server
 -hsqldbDir <arg>                  set HSQLDB location [default: hsqldb]
 -jmx                              start JMX server
 -jmxAccessFile <arg>              set JMX access file [default: <none>]
 -jmxPasswordFile <arg>            set JMX password file [default: <none>]
 -jmxPort <arg>                    set JMX port [default: 1999]
 -keyStorePassword <arg>           set keystore password [default: password]
 -keyStorePath <arg>               set keystore path [default: dev/luin/file/server/core/keystore.p12]
 -keyStoreType <arg>               set keystore type [default: PKCS12]
 -path <arg>                       set path [default: /]
 -port <arg>                       set port [default: <8080|8443>]
 -protocols <arg>                  set SSL Protocols [default: <none>]
 -ssl                              enable SSL
 -trustStorePassword <arg>         set truststore password [default: <none>]
 -trustStorePath <arg>             set truststore path [default: <none>]
 -trustStoreType <arg>             set truststore type [default: PKCS12]
```

## Install the FileClient

### Prerequisites

- download [file-client-1.0.0](https://github.com/eluinstra/file-client/releases/download/1.0.0/file-client-1.0.0.jar)
- JDBC driver for the database (see here)
- Database with user account

#### Optional

- download [file-client-soapui-project.xml](https://github.com/eluinstra/file-client/raw/master/resources/file-client-soapui-project.xml)

### Installation

De File Client consists of the following file: file-client-1.0.0.jar
For configuration of the File Server see here. The application writes logging to a logfile (see here). The application also uses a database (see here) an writes the files to a file share.

- create directory `file-client`
- copy file-client-1.0.0 to file-client
- cd file-client
- create directory `files`

### Configuration

This section describes the properties to configure the File Server up- and downoad interfaces. You can override these properties in `$CONFIG_DIR/file-client.properties`.

#### Basic Properties

##### Server Properties

```properties
file.baseDir=
file.directoryDepth=3
file.filenameLength=32
file.share.upload.location=shared/upload
file.share.download.location=shared/download
```

##### SSL Keystore Properties

```properties
client.keystore.type=PKCS12
client.keystore.path=dev/luin/file/client/core/keystore.p12
client.keystore.password=password
client.keystore.keyPassword=${client.keystore.password}
client.keystore.defaultAlias=
```

##### SSL Truststore Properties

```properties
truststore.type=PKCS12
truststore.path=dev/luin/file/client/core/truststore.p12
truststore.password=password
```

##### Database Properties

```properties
jdbc.driverClassName=org.hsqldb.jdbcDriver
jdbc.url=jdbc:hsqldb:mem:file_client
jdbc.username=sa
jdbc.password=
```

#### Advanced Properties

##### Soap/Rest Attachment Properties

```properties
attachment.memoryTreshold=131072
attachment.outputDirectory=
attachment.cipherTransformation=
```

##### Download Properties

```properties
downloadTaskHandler.delay=3000
downloadTask.retry.maxAttempts=5
downloadTask.retry.interval=5
downloadTask.retry.maxMultiplier=1
```

##### Upload Properties

```properties
uploadTaskHandler.delay=3000
uploadTask.retry.maxAttempts=5
uploadTask.retry.interval=5
uploadTask.retry.maxMultiplier=1
```

##### SSL Properties

```properties
client.ssl.protocols=TLSv1.3,TLSv1.2
client.ssl.cipherSuites=TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256,TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256
client.ssl.enabledProtocols=TLSv1.3,TLSv1.2
client.ssl.enabledCipherSuites=TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256,TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256
client.ssl.verifyHostnames=true
```

##### JDBC Connection Pool Properties

```properties
jdbc.pool.autoCommit=true
jdbc.pool.connectionTimeout=30000
jdbc.pool.maxIdleTime=600000
jdbc.pool.maxLifetime=1800000
jdbc.pool.testQuery=
jdbc.pool.minPoolSize=16
jdbc.pool.maxPoolSize=32
```

### CommandLine Configuration

```sh
usage: Start [-authentication] [-cipherSuites <arg>]
       [-clientAuthentication] [-clientCertificateHeader <arg>]
       [-clientTrustStorePassword <arg>] [-clientTrustStorePath <arg>]
       [-clientTrustStoreType <arg>] [-configDir <arg>] [-connectionLimit
       <arg>] [-h] [-health] [-healthPort <arg>] [-host <arg>] [-hsqldb]
       [-hsqldbDir <arg>] [-jmx] [-jmxAccessFile <arg>] [-jmxPasswordFile
       <arg>] [-jmxPort <arg>] [-keyStorePassword <arg>] [-keyStorePath
       <arg>] [-keyStoreType <arg>] [-path <arg>] [-port <arg>]
       [-protocols <arg>] [-trustStorePassword <arg>] [-trustStorePath
       <arg>] [-trustStoreType <arg>]
 -authentication                   enable basic | client certificate authentication
 -cipherSuites <arg>               set SSL CipherSuites [default: TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256,TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256]
 -clientAuthentication             enable SSL client authentication
 -clientCertificateHeader <arg>    set client certificate header [default: <none>]
 -clientTrustStorePassword <arg>   set client truststore password [default: <none>]
 -clientTrustStorePath <arg>       set client truststore path [default: <none>]
 -clientTrustStoreType <arg>       set client truststore type [default: PKCS12]
 -configDir <arg>                  set config directory [default: <startup_directory>]
 -connectionLimit <arg>            set connection limit [default: <none>]
 -h                                print this message
 -health                           start health service
 -healthPort <arg>                 set health service port [default: 8008]
 -host <arg>                       set host [default: 0.0.0.0]
 -hsqldb                           start HSQLDB server
 -hsqldbDir <arg>                  set HSQLDB location [default: hsqldb]
 -jmx                              start JMX server
 -jmxAccessFile <arg>              set JMX access file [default: <none>]
 -jmxPasswordFile <arg>            set JMX password file [default: <none>]
 -jmxPort <arg>                    set JMX port [default: 1999]
 -keyStorePassword <arg>           set keystore password [default: password]
 -keyStorePath <arg>               set keystore path [default: dev/luin/file/client/core/keystore.p12]
 -keyStoreType <arg>               set keystore type [default: PKCS12]
 -path <arg>                       set path [default: /]
 -port <arg>                       set port [default: 8080]
 -protocols <arg>                  set SSL Protocols [default: TLSv1.3,TLSv1.2]
 -trustStorePassword <arg>         set truststore password [default: <none>]
 -trustStorePath <arg>             set truststore path [default: <none>]
 -trustStoreType <arg>             set truststore type [default: PKCS12]
```
