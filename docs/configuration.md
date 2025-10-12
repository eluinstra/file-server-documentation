---
sidebar_position: 3
---

# User Manual

## File Server

Before you can exchange files you have to [register a user](#manage-users). After that you can [exchange files](#exchange-files) with the registered users.

### Manage Users

You can manage users using the SOAP and REST UserService.

![](<img/Sequence Diagram - Manage Users.svg>)

### Exchange Files

The FileServer can exchange files with registered users using the SOAP and REST FileService.

![alt text](<img/Sequence Diagram - Exchange Files.svg>)

The FileServer uses SSL clientAuthentication, so the user must authenticate itself using an SSL certificate and the FileServer must trust this certificate. The clientCertificate is registered with the user on the FileServer and will be used to authenticate the user when up- or downloading a file.

Files can also be exchanged with the FileServer via a FileShare:

![alt text](<img/Sequence Diagram - Exchange Files via FileShare.svg>)

The FileServer can also operate behind a (reverse) proxy server.

#### File download

![alt text](<img/Sequence Diagram - File Download.svg>)

1. upload a file for the registered user `userId` to the FileServer and receive the path to the download file  
   Note: alternively use the action `uploadFileFromFs` if you use a [FileShare](installation/file-server#fileshare-properties) to transfer files
2. Optional: download the `external-data-reference` for Grote Berichten file transfer  
   Note: The `external-data-reference` contains the full download url to the file
3. after the url is communicated, the user can download the file from the FileServer with a browser using the path and is authenticated with its SSL certificate. Therefore the user must have its SSL keystore installed in the browser. The user can also use another HTTP download tool such as curl or wget or the FileClient to download the file (see )  
4. after the user downloaded the file, delete the file  

#### File upload

![alt text](<img/Sequence Diagram - File Upload.svg>)

1. the user can upload the file to the FileServer using a tus client.  
2. after the url is communicated, download the file 
3. proces the file
4. delete the file

#### Manage Files

You can manage users using the SOAP and REST FileService.

![](<img/Sequence Diagram - Manage Files.svg>)

## File Client

### Exchange Files

The FileClient can exchange files using the [download](#file-download-1) and [upload](#file-upload-1) SOAP and REST interfaces.

#### File download

![alt text](<img/Sequence Diagram - File Download 1.svg>)

#### File upload

![alt text](<img/Sequence Diagram - File Upload 1.svg>)
