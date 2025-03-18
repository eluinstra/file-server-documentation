---
sidebar_position: 1
---

# Introduction

:::info
this site is still under construction
:::

## File Server

The File Server can be used to exchange files with other parties. The tus protocol can be used to upload files to the File Server. The HTTP protocol can be used to download Files from the File Server. SSL client certificates are used to authenticate the client.

![Context Diagram](img/Context%20Digram%20-%20File%20Server.svg)

The File Server can be used by a REST or SOAP client or a custom application that uses the SOAP or REST intercace. The application can exchange files with the File Server through the SOAP or REST interface directly or through the File Share.

Before the File Server can exchange files with a client, the client has to be registered with the File Server. 

The FileServer can be used for Grote Berichten file transfer.

## File Client

The File Client can be used to upload and download files with the [File Server](#file-server).

![Context Diagram](img/Context%20Digram%20-%20File%20Client.svg)

The File Client can be used by a REST or SOAP client or a custom application that uses the SOAP or REST intercace. The application can exchange files with the File Client through the SOAP or REST interface directly or through the File Share.

Before the File Client can exchange files with the File Server, the File Client has to be registered with the File Server. 

The File Client can also be used for Grote Berichten file transfer.
