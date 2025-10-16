---
sidebar_position: 4
---

# Example

## Prerequisites

- Install JDK/JRE 11
- download [file-server-@file.server.version@](https://github.com/eluinstra/file-server/releases/download/@file.server.version@/file-server-@file.server.version@.jar) into directory file-server
- download [file-client-@file.client.version@](https://github.com/eluinstra/file-client/releases/download/@file.client.version@/file-client-@file.client.version@.jar) into directory file-client

**Or** use the [Docker example](https://github.com/eluinstra/file-server-docker).

### Start the File Server

```
java -cp file-server-@file.server.version@.jar dev.luin.file.server.StartGB -hsqldb
```

### Start the File Server

```
java -cp file-client-@file.client.version@.jar dev.luin.file.client.StartGB -hsqldb -port 8000
```

## Example

### Preparation

- Use SoapUI to manage the File Server and File Client **or** use VSCode
- import [file-server](https://github.com/eluinstra/file-server/raw/@branch@/resources/file-server-soapui-project.xml) and [file-client](https://raw.githubusercontent.com/eluinstra/file-client/raw/@branch@/resources/file-client-soapui-project.xml) into SoapUI (these projects already contain some predefined SOAP Requests) **or** download [file-server](https://github.com/eluinstra/file-server/blob/@branch@/resources/file-server.rest) and [file-client](https://github.com/eluinstra/file-client/blob/@branch@/resources/file-client.rest) for [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
- Start the File Server and File Client

### Usage

1. create user `user` (using certificate `localhost.pem`) on the File Server  
   run in SoapUI `file-server -> UserServiceSoapBinding -> createUser -> Create User user`

2. upload file `Lorem Ipsum.txt` for user `user` to the File Server  
   run in SoapUI `file-server -> FileServiceSoapBinding -> uploadFile -> Upload Lorem Ipsum.txt`  
   The response contains the `path` of the file download in `xpath://Envelope/Header/Body/uploadFileResponse/path`
3. download Grote Berichten external-data-reference  
   run in SoapUI using `path` from step 2 in `file-server -> GBServiceSoapBinding -> getExternalDataReference -> Request 1`  
   The response contains the `URL` of the file download in `xpath://Envelope/Header/Body/getExternalDataReferenceResponse/external-data-reference/data-reference/transport/location/senderUrl`

4. download the file `Lorem Ipsum.txt` from the File Server using the File Client  
   run in SoapUI using `URL` from step 3 in `file-client -> FileServiceSoapBinding -> downloadFile -> Request 1`  
5. download the file `Lorem Ipsum.txt` from the File Client  
   run in SoapUI `file-client -> FileServiceSoapBinding -> getFile -> Request 1`  

6. upload the file `Mauris nisl.txt` to the File Server using the File Client  
   run in SoapUI `file-client -> FileServiceSoapBinding -> uploadFile -> Upload Mauris nisl.txt`  
7. download Grote Berichten external-data-reference  
   run in SoapUI `file-client -> GBServiceSoapBinding -> getExternalDataReference -> Request 1`  
   The response contains the `URL` of the file download in `xpath://Envelope/Header/Body/getExternalDataReferenceResponse/external-data-reference/data-reference/transport/location/receiverUrl`

8. download the file `Mauris nisl.txt` from the File Server  
   run in SoapUI using the path portion from `URL` (so minus the base upload portion https://localhost:8443/files/upload) from step 7 as `path` in `file-server -> FileServiceSoapBinding -> downloadFile -> Request 1`