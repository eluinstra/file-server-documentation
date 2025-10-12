---
sidebar_position: 3
---

# User Manual

## File Server

Before you can exchange files you have to [register a user](#manage-users). After that you can [exchange files](#exchange-files) with the registered users.

The FileServer uses SSL clientAuthentication, so the user must authenticate itself using an SSL certificate and the FileServer must trust this certificate. The clientCertificate is registered with the user on the FileServer and will be used to authenticate the user when up- or downloading a file.

See [here](https://github.com/eluinstra/file-server/blob/master/resources/file-server.yml) for the OpenAPI Spec.

### Manage Users

You can manage users using the SOAP and REST UserService.

![](<img/Sequence Diagram - Server - Manage Users.svg>)

### Exchange Files

The FileServer can exchange files with registered users using the SOAP and REST FileService.

![](<img/Sequence Diagram - Server - Exchange Files.svg>)

#### File download

![](<img/Sequence Diagram - Server - File Download.svg>)

1. upload the `file` for the registered user `userId` to the `FileServer` and receive the `path` to the download file  
   Note: alternatively use the action `uploadFileFromFs` if you use a [FileShare](installation/file-server#fileshare-properties) to transfer files
2. Optional: download the `external-data-reference` for Grote Berichten file transfer  
   Note: The `external-data-reference` contains the full download url to the file
3. after the url is communicated, the user can download the file from the FileServer using a client. The user can use a browser using the path and with its SSL keystore installed in the browser. The user can also use another HTTP download tool such as curl or wget or the [FileClient](#file-client) to download the file
4. delete the `file`

#### File upload

![](<img/Sequence Diagram - Server - File Upload.svg>)

1. the `Client` uploads the `file` to the `FileServer` using a tus client
2. after the url is communicated, download the `file` from `path`  
   Note: alternatively use the action `downloadFileFromFs` if you use a [FileShare](installation/file-server#fileshare-properties) to transfer files
3. proces the `file`
4. delete the `file`

### Exchange Files via FileShare

Files can also be exchanged with the FileServer via a [FileShare](installation/file-server#fileshare-properties):

![](<img/Sequence Diagram - Server - Exchange Files via FileShare.svg>)

### Manage Files

You can manage files using the SOAP and REST FileService.

![](<img/Sequence Diagram - Server - Manage Files.svg>)

## File Client

See [here](https://github.com/eluinstra/file-client/blob/master/resources/file-client.yml) for the OpenAPI Spec.

### Exchange Files

The FileClient can exchange files using the [download](#file-download-1) and [upload](#file-upload-1) SOAP and REST interfaces.

![](<img/Sequence Diagram - Client - Exchange Files.svg>)

#### File download

![](<img/Sequence Diagram - Client - File Download.svg>)

1. create a `DownloadTask` to download `url`
2. the `FileClient` will start to download the `file`
3. the application checks the `status` of the `DownloadTask`  
4. if the status == `SUCCEEDED` then download the `File`
5. process the `file`
6. delete the `DownloadTask`

#### File upload

![](<img/Sequence Diagram - Client - File Upload.svg>)

1. create a `UploadTask` to upload `NewFile` to `creationUrl`
2. the `FileClient` will start to upload the `file`
3. the application checks the `status` of the `UploadTask`  
4. if the status == `SUCCEEDED` then delete the `UploadTask`

### Exchange Files via FileShare

Files can also be exchanged with the ClientServer via a [FileShare](installation/file-client#fileshare-properties):

![](<img/Sequence Diagram - Client - Exchange Files via FileShare.svg>)

### Manage Files

You can manage files using the SOAP and REST FileService.

![](<img/Sequence Diagram - Server - Manage Files.svg>)

### Manage DownloadTasks

You can manage DownloadTasks using the SOAP and REST DownloadService.

![](<img/Sequence Diagram - Client - Manage DownloadTasks.svg>)

### Manage UploadTasks

You can manage UploadTasks using the SOAP and REST UploadService.

![](<img/Sequence Diagram - Client - Manage UploadTasks.svg>)
