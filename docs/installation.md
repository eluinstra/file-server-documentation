---
sidebar_position: 2
---

# Installation Guide

### Prerequisites

- install JDK/JRE 11

#### Optional

- download and install SoapUI to test the File Server or File Client

### Install the FileServer

#### Prerequisites

- download [file-server-1.0.0](https://github.com/eluinstra/file-server/releases/download/1.0.0/file-server-1.0.0.jar)  
- JDBC driver for the database (see here)

##### Optional

- download [file-server-soapui-project.xml](https://github.com/eluinstra/file-server/raw/master/resources/file-server-soapui-project.xml)

#### Installation

De File Server consists of the following file: file-server-1.0.0.jar
For configuration of the File Server see here. The application writes logging to a logfile (see here). The application also uses a database (see here)

- create directory `file-server`
- copy file-server-1.0.0 to file-server
- cd file-server
- create directory `files`

### Install the FileClient

#### Prerequisites

- download [file-client-1.0.0](https://github.com/eluinstra/file-client/releases/download/1.0.0/file-client-1.0.0.jar)
- JDBC driver for the database (see here)

##### Optional

- download [file-client-soapui-project.xml](https://github.com/eluinstra/file-client/raw/master/resources/file-client-soapui-project.xml)

#### Installation

De File Client consists of the following file: file-client-1.0.0.jar
For configuration of the File Server see here. The application writes logging to a logfile (see here). The application also uses a database (see here) an writes the files to a file share.

- create directory `file-client`
- copy file-client-1.0.0 to file-client
- cd file-client
- create directory `files`
