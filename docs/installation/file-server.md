---
sidebar_position: 2
---

# Install the FileServer

## Prerequisites

- download [file-server-@file.server.version@](https://github.com/eluinstra/file-server/releases/download/@file.server.version@/file-server-@file.server.version@.jar)
- JDBC driver for the database (see [here](database.md))
- Database and user account with create table permissions

### Optional

- [OpenAPI Spec](https://github.com/eluinstra/file-server/blob/master/resources/file-server.yml)
- [SoapUI project file](https://github.com/eluinstra/file-server/raw/master/resources/file-server-soapui-project.xml)
- [REST project file](https://github.com/eluinstra/file-server/blob/master/resources/file-server.rest) for [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

## Installation

`file-server-@file.server.version@.jar` contains the FileServer. You first have to [configure](#configuration) the File Server. The application uses [log4j](#start-with-a-custom-log4j2-file-log4j2xml) for logging. The application also uses a [database](database.md)  to store user and file information for configuration and writes the files to the [filesystem](#filesystem-properties).

- create directory `file-server`
- copy `file-server-@file.server.version@.jar` to `file-server`
- create directory `file-server/files`

## Configuration

This section describes how to configure the File Server.

Create the file `file-server/file-server.properties` and [configure the basic properties](#basic-properties).

## Start

Start the file-server with the SOAP and REST endpoints default on port 8080 and the File endpoint on port 8443, using JDBC driver \<jdbc-driver>.jar. See [here](database.md) for the supported databases.

```sh
java -cp <jdbc-driver>.jar:file-server-@file.server.version@.jar dev.luin.file.server.Start
```

See [here](#commandline-configuration) for more command line options. See [here](https://eluinstra.github.io/ebms-admin/docs/ebms-admin/ssl) for Keystore Configuration.

## Properties

### Basic Properties

#### Server Properties

```properties
server.protocol=https
server.host=localhost
server.port=8443
server.path=/files
server.ssl=true
server.clientCertificateHeader=
server.baseUrl=${server.protocol}://${server.host}:${server.port}${server.path}
```

#### SSL Keystore Properties

```properties
keystore.type=PKCS12
keystore.path=dev/luin/file/server/core/keystore.p12
keystore.password=password
```

#### SSL Truststore Properties

```properties
truststore.type=PKCS12
truststore.path=dev/luin/file/server/core/truststore.p12
truststore.password=password
```

#### Database Properties

```properties
jdbc.driverClassName=org.hsqldb.jdbcDriver
# jdbc.url=jdbc:hsqldb:mem:file_server
jdbc.url=jdbc:hsqldb:hsql://localhost:9001/file_server
jdbc.username=sa
jdbc.password=
```

#### FileSystem Properties

```properties
file.virtualPathLength=127
file.baseDir=files
file.filenameLength=32
file.maxFileSize=1073741824
```

#### FileShare Properties

```properties
file.share.upload.location=shared/upload
file.share.download.location=shared/download
```

#### Database Properties

```properties
jdbc.driverClassName=org.hsqldb.jdbcDriver
jdbc.url=jdbc:hsqldb:hsql://localhost:9001/file_server
jdbc.username=sa
jdbc.password=
```

### Advanced Properties

#### SSL properties

```properties
server.ssl.protocols=TLSv1.3,TLSv1.2
server.ssl.cipherSuites=TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256,TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256
```

#### Soap/Rest Attachment Properties

```properties
attachment.memoryTreshold=131072
attachment.outputDirectory=
attachment.cipherTransformation=
```

#### JDBC Connection Pool Properties

```properties
jdbc.pool.autoCommit=true
jdbc.pool.connectionTimeout=30000
jdbc.pool.maxIdleTime=600000
jdbc.pool.maxLifetime=1800000
jdbc.pool.testQuery=
jdbc.pool.minPoolSize=16
jdbc.pool.maxPoolSize=32
```

### Optional Properties

#### Grote Berichten Server Properties

```properties
server.baseUrl=
```

## CommandLine Configuration

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

### Basic Configuration

#### Start using a PostgreSQL JDBC driver

```sh
java -cp postgresql-42.7.3.jar:file-server-@file.server.version@.jar dev.luin.file.server.Start
```

#### Start on port 8000

Start SOAP/REST endpoint on port 8000 (instead of 8080)

```sh
java -cp file-server-@file.server.version@.jar dev.luin.file.server.Start -port 8000
```

#### Start with config directory conf/

By default the config directory is the directory from which you start the file-server. You can change the config directory by setting `configDir`

```sh
java -cp file-server-@file.server.version@.jar dev.luin.file.server.Start -configDir conf/
```

#### Start with a custom log4j2 file log4j2.xml

See [here](https://github.com/eluinstra/file-server/blob/master/src/main/resources/log4j2.xml) for an example `log4j2.xml`.

```sh
java -Dlog4j.configurationFile=log4j2.xml -cp file-server-@file.server.version@.jar dev.luin.file.server.Start
```

#### Start without using the default Java truststore

```sh
java -Djavax.net.ssl.trustStore= -cp file-server-@file.server.version@.jar dev.luin.file.server.Start
```

#### Start with HTTPS

Start with HTTPS SOAP/REST endpoint using keystore `keystore.p12`

```sh
java -Djavax.net.ssl.trustStore= -cp file-server-@file.server.version@.jar dev.luin.file.server.Start \
-ssl -keyStoreType PKCS12 -keyStorePath keystore.p12 -keyStorePassword password
```

### Advanced Configuration

#### Start using IPv4 only sockets

```sh
java -Djava.net.preferIPv4Stack=true -cp file-server-@file.server.version@.jar dev.luin.file.server.Start
```

#### Start using basic authentication

Start using basic authentication on SOAP/REST endpoint.

```sh
java -cp file-server-@file.server.version@.jar dev.luin.file.server.Start -authentication
```

#### Start with HTTPS and client authentication

Start with HTTPS SOAP/REST endpoint using keystore `keystore.p12`
and require SSL client authentication using truststore `truststore.p12` (which holds the client's certificate chain)

```sh
java -Djavax.net.ssl.trustStore= -cp file-server-@file.server.version@.jar dev.luin.file.server.Start \
-ssl -keyStoreType PKCS12 -keyStorePath keystore.p12 -keyStorePassword password \
-clientAuthentication -trustStoreType PKCS12 -trustStorePath truststore.p12 -trustStorePassword password
```

#### Start with HTTPS, client authentication and client certifiate authentication

Start with HTTPS Web/SOAP interface using keystore `keystore.p12`
and require SSL client authentication using truststore `truststore.p12` (which holds the client's certificate chain)
and authenticate client SSL certificate using `clientTruststore.p12` (which holds the client's certificate)

```sh
java -Djavax.net.ssl.trustStore= -cp file-server-@file.server.version@.jar dev.luin.file.server.Start \
-ssl -keyStoreType PKCS12 -keyStorePath keystore.p12 -keyStorePassword password \
-clientAuthentication -trustStoreType PKCS12 -trustStorePath truststore.p12 -trustStorePassword password \
-authentication -clientTrustStoreType PKCS12 -clientTrustStorePath clientTruststore.p12 -clientTrustStorePassword password
```

#### Start Health service on port 8089

Start Health service on port 8089 (instead of default port 8008)

```sh
java -Djavax.net.ssl.trustStore= -cp file-server-@file.server.version@.jar dev.luin.file.server.Start -health -healthPort 8089
```
