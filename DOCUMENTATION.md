# **FIND SIMRAN API DOCUMENTATION**

## **List of All Endpoints**

| Name                                              | Method | Endpoint         |
| :------------------------------------------------ | :----: | ---------------- |
| **Authentication**                                |        |                  |
| <a style="color:white" href="#signup" >Signup</a> |  POST  | /api/auth/signup |
| <a style="color:white" href="#login" >Login</a>   |  POST  | /api/auth/login  |

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
