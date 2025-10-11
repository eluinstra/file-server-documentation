---
sidebar_position: 3
---

# Install the FileClient

## Prerequisites

- download [file-client-@file.client.version@](https://github.com/eluinstra/file-client/releases/download/@file.client.version@/file-client-@file.client.version@.jar)
- JDBC driver for the database (see [here](database.md))
- Database and user account with create table permissions

### Optional

- [OpenAPI Spec](https://github.com/eluinstra/file-client/blob/master/resources/file-client.yml)
- [SoapUI project file](https://github.com/eluinstra/file-client/raw/master/resources/file-client-soapui-project.xml)
- [REST project file](https://github.com/eluinstra/file-client/blob/master/resources/file-client.rest) for [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

## Installation

`file-client-@file.client.version@.jar` contains the FileClient. You first have to [configure](#configuration) the File Client. The application uses [log4j](#start-with-a-custom-log4j2-file-log4j2xml) for logging. The application also uses a [database](database.md)  to store user and file information for configuration and writes the files to the [filesystem](#filesystem-properties).

- create directory `file-client`
- copy `file-client-@file.client.version@.jar` to `file-client`
- create directory `file-client/files`

## Configuration

This section describes how to configure the File Client.

Create the file `file-client/file-client.properties` and [configure the basic properties](#basic-properties).

## Start

Start the file-client with the SOAP and REST endpoints default on port 8000, using JDBC driver \<jdbc-driver>.jar. See [here](database.md) for the supported databases.

```sh
java -cp <jdbc-driver>.jar:file-client-@file.client.version@.jar dev.luin.file.client.Start
```

See [here](#commandline-configuration) for more command line options. See [here](https://eluinstra.github.io/ebms-admin/docs/ebms-admin/ssl) for Keystore Configuration.

## Properties

### Basic Properties

#### SSL Keystore Properties

```properties
keystore.type=PKCS12
keystore.path=dev/luin/file/client/core/keystore.p12
keystore.password=password
```

#### SSL Client Keystore Properties

```properties
client.keystore.type=PKCS12
client.keystore.path=dev/luin/file/client/core/keystore.p12
client.keystore.password=password
client.keystore.keyPassword=${client.keystore.password}
client.keystore.defaultAlias=
```

#### SSL Truststore Properties

```properties
truststore.type=PKCS12
truststore.path=dev/luin/file/client/core/truststore.p12
truststore.password=password
```

#### FileSystem Properties

```properties
file.baseDir=files
file.directoryDepth=3
file.filenameLength=32
```

#### FileShare Properties

```properties
file.share.upload.location=shared/upload
file.share.download.location=shared/download
```

#### Database Properties

```properties
jdbc.driverClassName=org.hsqldb.jdbcDriver
jdbc.url=jdbc:hsqldb:hsql://localhost:9000/file_client
jdbc.username=sa
jdbc.password=
```

### Advanced Properties

#### Soap/Rest Attachment Properties

```properties
attachment.memoryTreshold=131072
attachment.outputDirectory=
attachment.cipherTransformation=
```

#### Download Properties

```properties
downloadTaskHandler.delay=3000
downloadTask.retry.maxAttempts=5
downloadTask.retry.interval=5
downloadTask.retry.maxMultiplier=1
```

#### Upload Properties

```properties
uploadTaskHandler.delay=3000
uploadTask.retry.maxAttempts=5
uploadTask.retry.interval=5
uploadTask.retry.maxMultiplier=1
```

#### SSL Properties

```properties
client.ssl.enabledProtocols=TLSv1.3,TLSv1.2
client.ssl.enabledCipherSuites=TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256,TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256
client.ssl.verifyHostnames=true
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

### Basic Configuration

#### Start using a PostgreSQL JDBC driver

```sh
java -cp postgresql-42.7.3.jar:file-client-@file.client.version@.jar dev.luin.file.client.Start
```

#### Start on port 8000

Start SOAP/REST endpoint on port 8000 (instead of 8080)

```sh
java -cp file-client-@file.client.version@.jar dev.luin.file.client.Start -port 8000
```

#### Start with config directory conf/

By default the config directory is the directory from which you start the file-client. You can change the config directory by setting `configDir`

```sh
java -cp file-client-@file.client.version@.jar dev.luin.file.client.Start -configDir conf/
```

#### Start with a custom log4j2 file log4j2.xml

See [here](https://github.com/eluinstra/file-client/blob/master/src/main/resources/log4j2.xml) for an example `log4j2.xml`.

```sh
java -Dlog4j.configurationFile=log4j2.xml -cp file-client-@file.client.version@.jar dev.luin.file.client.Start
```

#### Start without using the default Java truststore

```sh
java -Djavax.net.ssl.trustStore= -cp file-client-@file.client.version@.jar dev.luin.file.client.Start
```

#### Start with HTTPS

Start with HTTPS SOAP/REST endpoint using keystore `keystore.p12`

```sh
java -Djavax.net.ssl.trustStore= -cp file-client-@file.client.version@.jar dev.luin.file.client.Start \
-ssl -keyStoreType PKCS12 -keyStorePath keystore.p12 -keyStorePassword password
```

### Advanced Configuration

#### Start using IPv4 only sockets

```sh
java -Djava.net.preferIPv4Stack=true -cp file-client-@file.client.version@.jar dev.luin.file.client.Start
```

#### Start using basic authentication

Start using basic authentication on SOAP/REST endpoint.

```sh
java -cp file-client-@file.client.version@.jar dev.luin.file.client.Start -authentication
```

#### Start with HTTPS and client authentication

Start with HTTPS SOAP/REST endpoint using keystore `keystore.p12`
and require SSL client authentication using truststore `truststore.p12` (which holds the client's certificate chain)

```sh
java -Djavax.net.ssl.trustStore= -cp file-client-@file.client.version@.jar dev.luin.file.client.Start \
-ssl -keyStoreType PKCS12 -keyStorePath keystore.p12 -keyStorePassword password \
-clientAuthentication -trustStoreType PKCS12 -trustStorePath truststore.p12 -trustStorePassword password
```

#### Start with HTTPS, client authentication and client certifiate authentication

Start with HTTPS Web/SOAP interface using keystore `keystore.p12`
and require SSL client authentication using truststore `truststore.p12` (which holds the client's certificate chain)
and authenticate client SSL certificate using `clientTruststore.p12` (which holds the client's certificate)

```sh
java -Djavax.net.ssl.trustStore= -cp file-client-@file.client.version@.jar dev.luin.file.client.Start \
-ssl -keyStoreType PKCS12 -keyStorePath keystore.p12 -keyStorePassword password \
-clientAuthentication -trustStoreType PKCS12 -trustStorePath truststore.p12 -trustStorePassword password \
-authentication -clientTrustStoreType PKCS12 -clientTrustStorePath clientTruststore.p12 -clientTrustStorePassword password
```

#### Start Health service on port 8089

Start Health service on port 8089 (instead of default port 8008)

```sh
java -Djavax.net.ssl.trustStore= -cp file-client-@file.client.version@.jar dev.luin.file.client.Start -health -healthPort 8089
```
