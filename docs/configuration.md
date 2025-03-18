---
sidebar_position: 3
---

# Configuration

### Steps to configure a user and offer a file to download

1. create a user with its SSL clientCertificate on the FileServer using the SOAP action createUser from the UserService  
2. upload a file for the created user to the FileServer using the SOAP action uploadFile from the FileService and receive the path to the download file  
3. the user can download the file from the FileServer in a browser using the path and is authenticated with its SSL certificate. Therefore the user must have its SSL keystore installed in the browser   
4. Optional: download the external-data-reference for Grote Berichten file transfer  
   Note: The external-data-reference contains the full download url to the file

The FileServer uses SSL clientAuthentication, so the user must authenticate itself using an SSL key(/certificate) and the FileServer must trust this key (by trusting its certificate). Also the user must have its SSL keystore installed in the browser to download a file. The clientCertificate is registered to the user in the FileServer and will be used to authenticate the user when downloading a file. The FileServer can also operate behind a (reverse) proxy server.
