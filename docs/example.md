---
sidebar_position: 4
---

# Example

### Start the FileServer

```
java -cp file-server-1.0.0.jar dev.luin.file.server.StartGB -hsqldb
```

### Start the FileServer

```
java -cp file-client-1.0.0.jar dev.luin.file.client.StartGB -hsqldb -port 8000
```

## Example

### Preparation

- Download and install SoapUI to manage the FileServer and FileClient
- import [file-server-1.0.0](https://github.com/eluinstra/file-server/releases/download/1.0.0/file-server-1.0.0.jar) and [file-client-1.0.0](https://github.com/eluinstra/file-client/releases/download/1.0.0/file-client-1.0.0.jar) into SoapUI (these projects already contain some predefined SOAP Requests)
- Start the FileServer and FileClient

### Usage

1. create user `user` (using certificate `localhost.pem`) on the FileServer  
   run in SoapUI `file-server -> UserServiceSoapBinding -> createUser -> Create User user`

2. upload file `Lorem Ipsum.txt` for user `user` to the FileServer  
   run in SoapUI `file-server -> FileServiceSoapBinding -> uploadFile -> Upload Lorem Ipsum.txt`  
   The response contains the `path` of the file download in `xpath://Envelope/Header/Body/uploadFileResponse/path`
3. download Grote Berichten external-data-reference  
   run in SoapUI using `path` from step 2 in `file-server -> GBServiceSoapBinding -> getExternalDataReference -> Request 1`
   The response contains the `URL` of the file download in `xpath://Envelope/Header/Body/getExternalDataReferenceResponse/external-data-reference/data-reference/transport/location/senderUrl`

4. download the file `Lorem Ipsum.txt` from the FileServer using the FileClient
   run in SoapUI using `URL` from step 3 in `file-client -> FileServiceSoapBinding -> downloadFile -> Request 1`  
5. download the file `Lorem Ipsum.txt` from the FileClient
   run in SoapUI `file-client -> FileServiceSoapBinding -> getFile -> Request 1`  

6. upload the file `Mauris nisl.txt` to the FileServer using the FileClient
   run in SoapUI `file-client -> FileServiceSoapBinding -> uploadFile -> Upload Mauris nisl.txt`  
7. download Grote Berichten external-data-reference  
   run in SoapUI `file-client -> GBServiceSoapBinding -> getExternalDataReference -> Request 1`
   The response contains the `URL` of the file download in `xpath://Envelope/Header/Body/getExternalDataReferenceResponse/external-data-reference/data-reference/transport/location/receiverUrl`

8. download the file `Mauris nisl.txt` from the FileServer
   run in SoapUI using the path portion from `URL` (so minus the base upload portion https://localhost:8443/files/upload) from step 7 as `path` in `file-server -> FileServiceSoapBinding -> downloadFile -> Request 1`  