---
sidebar_position: 4
---

# Database support

The File Server and Client support the following databases:

- [Database support](#database-support)
  - [Database Scripts](#database-scripts)
  - [Database Configuration](#database-configuration)
    - [Common Properties](#common-properties)
    - [DB2](#db2)
    - [H2](#h2)
    - [HSQLDB](#hsqldb)
    - [MariaDB](#mariadb)
    - [MS SQL Server](#ms-sql-server)
    - [MySQL](#mysql)
    - [Oracle](#oracle)
    - [PostgreSQL](#postgresql)

## Database Scripts

The File-Server and File-Client support automatic database migration through Flyway. You have to provide a database user with create table permissions so the tables are created automatically when the application is started for the first time.

The database scripts for the File-Server can also be found [here](https://github.com/eluinstra/file-server-core/tree/@branch@/src/main/resources/dev/luin/file/server/core/db/migration) and the database scripts for the File-Server can also be found [here](https://github.com/eluinstra/file-client-core/tree/@branch@/src/main/resources/dev/luin/file/client/core/db/migration).

## Database Configuration

You can find the JDBC settings for the supported databases as well as links to the JDBC drivers below.

### Common Properties

```properties
jdbc.username=<username>
jdbc.password=<password>
```

### DB2

```properties
# JDBC driver
jdbc.driverClassName=com.ibm.db2.jcc.DB2Driver
# or XA driver
jdbc.driverClassName=com.ibm.db2.jcc.DB2XADataSource
jdbc.url=jdbc:db2://<host>:<port>/<dbname>
```

Download drivers [here](https://www.ibm.com/support/pages/db2-jdbc-driver-versions-and-downloads)

### H2

```properties
# JDBC and XA driver
jdbc.driverClassName=org.h2.Driver
# or XA driver
jdbc.driverClassName=org.h2.jdbcx.JdbcDataSource
# In memory
jdbc.url=jdbc:h2:mem:<dbname>
# or file
jdbc.url=jdbc:h2:<path>
# or server
jdbc.url=jdbc:h2:tcp://<host>:<port>/<path>
```

### HSQLDB

```properties
# JDBC driver
jdbc.driverClassName=org.hsqldb.jdbcDriver
# or XA driver
jdbc.driverClassName=org.hsqldb.jdbc.pool.JDBCXADataSource
# In memory
jdbc.url=jdbc:hsqldb:mem:<dbname>
# or file
jdbc.url=jdbc:hsqldb:file:<path>
# or server
jdbc.url=jdbc:hsqldb:hsql://<host>:<port>/<dbname>
```

### MariaDB

```properties
# JDBC driver
jdbc.driverClassName=org.mariadb.jdbc.Driver
# or XA driver
jdbc.driverClassName=org.mariadb.jdbc.MySQLDataSource
jdbc.url=jdbc:mariadb://<host>:<port>/<dbname>
```

Download drivers [here](https://downloads.mariadb.org/connector-java/)

Download the right flyway-mysql driver [here](https://mvnrepository.com/artifact/org.flywaydb/flyway-mysql) and add it to the classpath next to the database driver
Check the pom.xml of File-Server or File-Client for the right version of the flyway-mysql library

### MS SQL Server

We strongly advise to **not** use a MSSQL Database with the File-Server or File-Client if you expect a moderate to high message load, because MSSQL cannot handle that because of Page Locking.

```properties
# JDBC driver
jdbc.driverClassName=com.microsoft.sqlserver.jdbc.SQLServerDriver
# or XA driver
jdbc.driverClassName=com.microsoft.sqlserver.jdbc.SQLServerXADataSource
jdbc.url=jdbc:sqlserver://<host>:<port>;[instanceName=<instanceName>;]databaseName=<dbname>;
```

Download drivers [here](https://docs.microsoft.com/en-us/sql/connect/jdbc/download-microsoft-jdbc-driver-for-sql-server)

Download the right flyway-sqlserver driver [here](https://mvnrepository.com/artifact/org.flywaydb/flyway-sqlserver) and add it to the classpath next to the database driver
Check the pom.xml of File-Server or File-Client for the right version of the flyway-sqlserver library

### MySQL

```properties
# JDBC driver
jdbc.driverClassName=com.mysql.cj.jdbc.Driver
# or XA driver
jdbc.driverClassName=com.mysql.cj.jdbc.MysqlXADataSource
jdbc.url=jdbc:mysql://<host>:<port>/<dbname>
```

Download drivers [here](https://dev.mysql.com/downloads/connector/j/)

### Oracle

```properties
# JDBC driver
jdbc.driverClassName=oracle.jdbc.OracleDriver
# or XA driver
jdbc.driverClassName=oracle.jdbc.xa.client.OracleXADataSource
jdbc.url=jdbc:oracle:thin:@<host>:<port>:<dbname>
```

Download drivers [here](https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html)

### PostgreSQL

```properties
# JDBC driver
jdbc.driverClassName=org.postgresql.Driver
# or XA driver
jdbc.driverClassName=org.postgresql.xa.PGXADataSource
jdbc.url=jdbc:postgresql://<host>:<port>/<dbname>
```

Download drivers [here](https://jdbc.postgresql.org/download.html)
