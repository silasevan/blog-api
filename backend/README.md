# API Documentation: Blog Post Endpoints

## Base URL: https://example.com/api

### This API provides endpoints for performing CRUD operations on Blog Posts.

## Authentication
### Authentication is required for all endpoints except for the GET /posts endpoint.

### Error Response
### All endpoints can return the following error response:

- 400 Bad Request - The request was invalid or could not be understood.
- 401 Unauthorized - Authentication failed or user does not have permissions for the requested operation.
- 403 Forbidden - User does not have permissions for the requested operation.
- 404 Not Found - The requested resource was not found.
- 500 Internal Server Error - An unexpected error occurred on the server.
## Endpoints
### GET /posts
#### Returns a list of all blog posts.

## Response:

- 200 OK - The request was successful. The response body contains an array of blog post objects.
- Example Request:



GET https://example.com/api/posts
Example Response:

json

[
  {
    "_id": "60f66c9f4837f500156e8c8a",
    "title": "My First Blog Post",
    "content": "This is the content of my first blog post.",
    "imageUrl": "https://example.com/image.jpg",
    "user": "60f66c9f4837f500156e8c8b",
    "createdAt": "2021-07-19T12:34:56.789Z",
    "updatedAt": "2021-07-19T12:34:56.789Z",
    "__v": 0
  },
  {
    "_id": "60f66c9f4837f500156e8c8c",
    "title": "My Second Blog Post",
    "content": "This is the content of my second blog post.",
    "imageUrl": "https://example.com/image.jpg",
    "user": "60f66c9f4837f500156e8c8b",
    "createdAt": "2021-07-19T12:34:56.789Z",
    "updatedAt": "2021-07-19T12:34:56.789Z",
    "__v": 0
  }
]
## POST /posts
### Adds a new blog post.

### Request Body:

title (string, required) - The title of the blog post.
content (string, required) - The content of the blog post.
imageUrl (string, optional) - The URL of an image to include in the blog post.
Response:

- 201 Created - The blog post was created successfully. The response body contains the created blog post object.
Example Request:


- POST https://example.com/api/posts
Content-Type: application/json

{
  "title": "My Third Blog Post",
  "content": "This is the content of my third blog post.",
  "imageUrl": "https://example.com/image.jpg"
}
Example Response:


{
  "_id": "60f66c9f4837f500156e8c8d",
  "title": "My Third Blog Post",
  "content": "This is the content of my third blog post.",
  "imageUrl": "https://example.com/image.jpg",
  "user": "60f66c9f4837f500156e8c8b",
  "createdAt": "2021-07-19T12:34:56.789Z",
  "updatedAt": "2021-07


}

