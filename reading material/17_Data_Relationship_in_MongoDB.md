# Data RelationShip in MongoDB
- Connection between document in collections.
- Two main types: Embedding and Referencing.

## Embedding:
- Embedding is the process of storing related data in a single document.
- It is useful when you have a one-to-few relationship.
- Example: A blog post with comments can be stored in a single document.
```json
{
  "_id": 1,
  "title": "My First Blog Post",
  "content": "This is the content of my first blog post.",
  "comments": [
    {
      "user": "John",
      "comment": "Great post!"
    },
    {
      "user": "Jane",
      "comment": "Thanks for sharing!"
    }
  ]
}
``` 

## Referencing:
- Referencing is the process of storing related data in separate documents and linking them using references.
- It is useful when you have a one-to-many or many-to-many relationship.
- Example: A user can have multiple orders, and each order can be stored in a separate
    document.
    ```json
    {
    "_id": 1,
    "name": "John Doe",
    "email": "John@gmail.com'
    }
    ```
    ```json
    {
    "_id": 101,
    "user_id": 1,
    "product": "Laptop",
    "quantity": 1
    }
    ```     

## Types of Relationships in MongoDB:

1. one-to-one relationship: A single document is related to another single document. For example, a user profile and its corresponding user account.
2. one-to-many relationship: A single document is related to multiple documents. For example, a blog post can have multiple comments.
3. many-to-many relationship: Multiple documents are related to multiple documents. For example, students and courses, where a student can enroll in multiple courses and a course can have multiple students.
