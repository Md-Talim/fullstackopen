# Part 0: Fundamentals of Web Applications

## Task 1: New Note Diagram

### Steps:
1. Browser sends a `POST` request with form-data containing the new note.
2. Server responds with `302 Found`, redirecting the browser.
3. Browser reloads the page by sending a `GET` request for the notes page.
4. Server responds with `200 OK`, sending the updated page.
5. Browser makes additional requests for styles and JavaScript files.
6. Browser fetches the updated notes data from the server.

```mermaid
sequenceDiagram
    participant browser
    participant server

    Note over browser: 1. The browser sends a POST request with form-data <br/> { note: <note-content> }

    browser->>server: POST /exampleapp/new_note HTTP/1.1
    activate server
    server-->>browser: 🟡 HTTP/1.1 302 Found
    deactivate server

    Note over browser: 2. After receiving the 302 Found response, <br/> the browser reloads the page

    browser->>server: GET /exampleapp/notes HTTP/1.1
    activate server
    server-->>browser: 🟢 HTTP/1.1 200 OK
    deactivate server

    Note right of browser: 3. The browser sends additional requests for styles and JavaScript files
    Note right of browser: 4. The browser fetches the notes data with the newly added entry

    browser->>server: GET /exampleapp/data.json HTTP/1.1
    activate server
    server-->>browser: 🟢 HTTP/1.1 200 OK
    deactivate server
```

## Task 2: Single Page App - Homepage Loading

### Steps:
1. User opens the SPA homepage in their browser.
2. Browser sends a `GET` request for the main HTML file.
3. Server responds with the HTML file.
4. Browser sends additional `GET` requests for the required JavaScript and CSS files.
5. Server responds with the requested files.
6. JavaScript code runs in the browser, fetching existing notes as JSON.
7. Browser dynamically renders the notes on the page without additional page loads.

```mermaid
sequenceDiagram
    participant browser
    participant server

    Note over browser, server: 1. User opens the spa page

    browser->>server: GET /exampleapp/spa HTTP/1.1
    activate server
    server-->>browser: 🟢 HTTP/1.1 200 OK (HTML)
    deactivate server

    Note over browser: 2. Browser requests JavaScript & CSS files

    browser->>server: GET /exampleapp/spa.js HTTP/1.1
    activate server
    server-->>browser: 🟢 HTTP/1.1 200 OK (JavaScript)
    deactivate server

    browser->>server: GET /exampleapp/styles.css HTTP/1.1
    activate server
    server-->>browser: 🟢 HTTP/1.1 200 OK (CSS)
    deactivate server

    Note over browser: 3. JavaScript runs & fetches notes

    browser->>server: GET /exampleapp/data.json HTTP/1.1
    activate server
    server-->>browser: 🟢 HTTP/1.1 200 OK (JSON notes)
    deactivate server

    browser->>browser: 4. Render notes dynamically in the DOM
```

## Task 3: New note in Single page app diagram

### Steps:
1. User submits a new note in the form.
2. JavaScript intercepts the form submission and prevents the default page reload.
3. A new note object is created and added to the notes list in the browser.
4. Page is updated dynamically to show the new note.
5. Note is sent to the server as a `POST` request with JSON data.
6. Server responds with `201 Created`, confirming successful storage.
7. Browser remains on the same page without additional requests.

```mermaid
sequenceDiagram
    participant browser
    participant server

    Note over browser, server: 1. User submits a new note via form

    browser->>browser: 2. JavaScript intercepts submission (preventDefault)

    browser->>browser: 3. Create new note object { content, date }
    browser->>browser: 4. Add note to local list and update UI

    Note over browser: 5. Send note to the server as JSON

    browser->>server: POST /new_note_spa HTTP/1.1
    activate server
    server-->>browser: 🟢 HTTP/1.1 201 Created
    deactivate server

    Note over browser: 6. No redirect, page remains unchanged
```
