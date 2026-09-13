---
sidebar_position: 8
---

# Resumable Upload (IETF)

The File Server supports the [IETF Resumable Upload protocol](https://httpwg.org/http-extensions/draft-ietf-httpbis-resumable-upload.html)
(`draft-ietf-httpbis-resumable-upload`) in addition to the default [TUS](https://tus.io/) protocol.

The IETF protocol is **opt-in**: it is disabled by default and enabled with a single configuration
property. TUS remains the default and is unaffected.

## Enabling

Set the following property in the server configuration (default `false`):

```properties
server.upload.ietf.enabled = true
```

When enabled, the File Server registers an additional servlet at
`${server.path}/resumable` next to the TUS `${server.path}/upload` servlet. Authentication is
identical to TUS: the request is authenticated via the SSL client certificate and the
certificate must be registered to a user.

## How it works

Uploads are driven by the `Upload-Complete` header field. A request **is** a resumable upload
operation only if it carries `Upload-Complete`; its value is a Boolean structured field
(`?1` = complete, `?0` = not complete).

| Operation | Method        | `Upload-Complete` | Request `Content-Type`        | Success     |
| --------- | ------------- | ----------------- | ----------------------------- | ----------- |
| Create    | `POST`/`PUT`  | `?0`              | —                             | `201` + `Location` |
| Create & finalize (one-shot) | `POST`/`PUT` | `?1`        | media type of the file        | `200` + `Location` |
| Append    | `PATCH`       | `?0`              | `application/partial-upload`  | `204` + `Upload-Offset` |
| Append & finalize | `PATCH`  | `?1`              | `application/partial-upload`  | `200` + `Upload-Offset` |
| Offset    | `HEAD`/`GET`  | —                 | —                             | `204` + `Upload-Offset` |
| Cancel    | `DELETE`      | —                 | —                             | `204`       |

The create request identifies the file by its representation metadata:

- `Content-Disposition: inline; filename="name"` — the file name
- `Content-Type: <media-type>` — the file's content type (for a one-shot create this is the
  file's actual media type, not `application/partial-upload`)
- `Upload-Length: <n>` — optional; the total length of the representation, used to validate
  the `max-size` limit early.

### Offset retrieval and resuming

A `HEAD`/`GET` on the upload resource returns the current `Upload-Offset`, `Upload-Complete`,
`Upload-Limit` and `Cache-Control: no-store`. A client that lost its position calls this to
discover where to resume. An `Upload-Offset` mismatch on `PATCH` is answered with `409`
carrying the correct `Upload-Offset`.

### Creation strategy

The server implements the **careful upload creation** strategy
([Section 10.2](https://httpwg.org/http-extensions/draft-ietf-httpbis-resumable-upload.html#name-careful-upload-creation)):
`Upload-Complete: ?0` reserves the resource first, so the client learns the upload URI before
transferring content. Interim `104` responses are not used.

### Limits

The server advertises its limits via the `Upload-Limit` dictionary field (e.g.
`max-size=<file.maxFileSize>`). An append that would exceed the limit, or a request carrying an
inconsistent `Upload-Length`, is rejected.

## Example

```bash
# 1. create the upload resource (reserves it, returns the Location)
curl --cacert server-crt.pem --cert client.pem \
     -X POST \
     -H 'Upload-Complete: ?0' \
     -H 'Upload-Length: 4' \
     -H 'Content-Disposition: inline; filename="hello.txt"' \
     -H 'Content-Type: text/plain' \
     https://localhost:8443/files/resumable

# 2. append the content and finalize (Location from step 1)
curl --cacert server-crt.pem --cert client.pem \
     -X PATCH \
     -H 'Upload-Complete: ?1' \
     -H 'Upload-Offset: 0' \
     -H 'Content-Type: application/partial-upload' \
     --data 'hello' \
     "<location-from-step-1>"
```

## Architecture

The IETF implementation lives in a separate package
(`dev.luin.file.server.core.server.resumable`) and is intentionally **decoupled from the TUS
code**. Both protocols:

- authenticate via the same `AuthenticationManager` (SSL client certificate),
- operate on the same `FileSystem` (`createEmptyFile`, `appendToFile`, `findFile`,
  `deleteFile`), and
- store files as the same `FSFile` records.

Because the two protocols share the `FileSystem` and the storage layer — rather than
interleaving their logic — the TUS protocol can later be removed in a single, self-contained
step (drop the `server.upload` package and the `UploadServlet` registration) without touching
the IETF path, and vice versa.

## Client

Client-side support for the IETF protocol is a follow-up. The `file-client` currently uploads
via TUS; a parallel IETF upload task will be added that posts/patches against the
`${server.path}/resumable` endpoint.
