---
sidebar_position: 1
---

# Introduction

:::info
this site is still under construction
:::

## File Server

The File Server is developed to exchange files with other parties. The tus protocol is used to upload files to the File Server. The HTTP protocol is used to download Files from the File Server. The File Server uses SSL client certificates to authenticate clients.
You can use the [File Client](#file-client) to exchange files with the File Server.

The File Server stores client and file data in the database and the files on the filesystem.

![Context Diagram](img/Context%20Digram%20-%20File%20Server.svg)

The File Server offers a REST and a SOAP interface. Applications can exchange files with the File Server through these interfaces directly or use a File Share instead.

Before the File Server can exchange files with a client, the client has to be registered with the File Server using SSL client certificates.

The FileServer can be used for Grote Berichten file transfer.

## File Client

The File Client can be used to upload and download files with the [File Server](#file-server).

The File Client stores file data in the database and the files on the filesystem.

![Context Diagram](img/Context%20Digram%20-%20File%20Client.svg)

The File Client also offers a REST and SOAP interface. Applications can exchange files with the File Client through these interfaces directly or use a File Share instead.

Before the File Client can exchange files with the File Server, the File Client has to be registered with the File Server using the clients' SSL client certificates. 

The File Client can also be used for Grote Berichten file transfer.
