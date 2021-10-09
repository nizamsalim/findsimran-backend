# **FIND SIMRAN API DOCUMENTATION**

## **List of All Endpoints**

| Name                                            | Method | Endpoint                 |
| :---------------------------------------------- | :----: | ------------------------ |
| **Authentication**                              |        |                          |
| <a  href="#signup" >Signup</a>                  |  POST  | /api/auth/signup         |
| <a  href="#login" >Login</a>                    |  POST  | /api/auth/login          |
| <a  href="#updatename" >Update name</a>         |  POST  | /api/auth/updatename     |
| <a  href="#updateusername" >Update Username</a> |  POST  | /api/auth/updateusername |
| <a  href="#changepassword" >Change password</a> |  POST  | /api/auth/changepassword |

---

---

## <span id="signup">**SIGNUP**</span>

POST `/api/auth/signup`

### Input Data

```json
{
  "name": "John Doe",
  "email": "jdoe@gm.com",
  "userName": "jo_do",
  "password": "johndoe@123"
}
```

### Success response

```json
{
  "success": true,
  "user": {
    "name": "John Doe",
    "email": "jdoe@gm.com",
    "id": "615efda38ee4fd4ae29eff9e",
    "userName": "jo_do@123"
  },
  "authToken": "eyJhbGciOiJIUzI1NiIsInR5cC..."
}
```

### Failure response

```json
{
  "success": false,
  "error": "error message..."
}
```

---

## <span id="login">**LOGIN**</span>

POST `/api/auth/login`

### Input Data

```json
{
  "email": "jdoe@gm.com",
  "password": "johndoe@123"
}
```

### Success response

```json
{
  "success": true,
  "user": {
    "name": "John Doe",
    "email": "jdoe@gm.com",
    "id": "615efda38ee4fd4ae29eff9e",
    "userName": "jo_do@123"
  },
  "authToken": "eyJhbGciOiJIUzI1NiIsInR5cC..."
}
```

### Failure response

```json
{
  "success": false,
  "error": "error message..."
}
```

---

## _Pass the AuthToken from login and signup in request header for all routes marked as protected_

---

## <span id="updatename">**UPDATE NAME** (protected) </span>

POST `/api/auth/updatename`

### Input Data

```json
{
  "newName": "Jane Doe"
}
```

### Success response

```json
{
  "success": true,
  "updatedUser": {
    "name": "Jane Doe",
    "email": "jdoe@gm.com",
    "_id": "615efda38ee4fd4ae29eff9e",
    "userName": "jo_do@123"
  }
}
```

---

## <span id="updateusername">**UPDATE USERNAME** (protected) </span>

POST `/api/auth/updateusername`

### Input Data

```json
{
  "newUserame": "ja_doe"
}
```

### Success response

```json
{
  "success": true,
  "updatedUser": {
    "name": "Jane Doe",
    "email": "jdoe@gm.com",
    "_id": "615efda38ee4fd4ae29eff9e",
    "userName": "ja_doe"
  }
}
```

---

## <span id="changepassword">**CHANGE PASSWORD** (protected) </span>

POST `/api/auth/changepassword`

### Input Data

```json
{
  "oldPassword": "johndoe@123",
  "newPassword": "janedoe@123"
}
```

### Success response

```json
{
  "success": true
}
```

---
