# <span id="docs"> **FIND SIMRAN API DOCUMENTATION**</span>

## Base URL - https://findsimran-backend.herokuapp.com

## **List of All Endpoints**

| Name                                                     | Method | Endpoint                             |
| :------------------------------------------------------- | :----: | ------------------------------------ |
| <a href="#authentication"> **Authentication**            |        |                                      |
| <a  href="#signup" >Signup</a>                           |  POST  | /api/auth/signup                     |
| <a  href="#login" >Login</a>                             |  POST  | /api/auth/login                      |
| <a  href="#googlelogin" >Google Login</a>                |  POST  | /api/auth/googlelogin                |
| <a  href="#updatename" >Update name</a>                  |  POST  | /api/auth/updatename                 |
| <a  href="#updateusername" >Update Username</a>          |  POST  | /api/auth/updateusername             |
| <a  href="#changepassword" >Change password</a>          |  POST  | /api/auth/changepassword             |
| <a  href="#getcurrentuser" >Get current user details</a> |  GET   | /api/auth/getcurrentuser             |
|                                                          |        |                                      |
| <a href="#profile"> **Profile Management**               |        |                                      |
| <a  href="#create" >Create Profile</a>                   |  POST  | /api/profile/createProfile           |
| <a  href="#update" >Update Profile</a>                   |  POST  | /api/profile/updateProfile           |
| <a  href="#get" >Get Profile</a>                         |  POST  | /api/profile/getProfile              |
| <a  href="#delete" >Delete Profile</a>                   | DELETE | /api/profile/deleteProfile           |
| <a  href="#getall" >Get All Profiles</a>                 |  GET   | /api/profile/getAllProfiles          |
| <a  href="#getbyid" >Get User Profile By ID</a>          |  GET   | /api/profile/getUserProfile/{UserId} |

---

---

# <span id="authentication"> Authentication </span>

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
    "_id": "615efda38ee4fd4ae29eff9e",
    "userName": "jo_do@123"
  },
  "AuthToken": "eyJhbGciOiJIUzI1NiIsInR5cC..."
}
```

### Failure response

```json
{
  "success": false,
  "error": {
    "code": "...",
    "message": "..."
  }
}
```

\*Refer <a href="#errors"> errors </a> for more information

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
    "_id": "615efda38ee4fd4ae29eff9e",
    "userName": "jo_do@123"
  },
  "AuthToken": "eyJhbGciOiJIUzI1NiIsInR5cC..."
}
```

### Failure response

```json
{
  "success": false,
  "error": {
    "code": "...",
    "message": "..."
  }
}
```

\*Refer <a href="#errors"> errors </a> for more information

---

## <span id="googlelogin">**GOOGLE LOGIN**</span>

POST `/api/auth/googlelogin`  
_Google login integration is done with firebase_  
_Sign in with google on frontend using firebase and pass the idToken recieved to the backend_ (Visit firebase docs for more info)

### Input Data

```json
{
  "idToken": "..."
}
```

### Success response

```json
{
  "success": true,
  "user": {
    "name": "John Doe",
    "email": "jdoe@gmail.com",
    "_id": "615efda38ee4fd4ae29eff9e",
    "userName": "jdoe"
  },
  "AuthToken": "eyJhbGciOiJIUzI1NiIsInR5cC..."
}
```

### Failure response

```json
{
  "success": false,
  "error": {
    "code": "...",
    "message": "..."
  }
}
```

---

## **Authorisation**

<span style="font-size:18px" > _Pass the AuthToken from login and signup in request header for all routes marked as protected_  
Key : "AuthToken"
</span>

### Authorisation token not present

```json
{
  "success": false,
  "error": {
    "code": "auth/tkn-abs",
    "message": "AuthToken not present in headers"
  }
}
```

### Authorisation token does not match

```json
{
  "success": false,
  "error": {
    "code": "auth/tkn-inc",
    "message": "Authorisation failed - Access denied"
  }
}
```

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

### Failure response

```json
{
  "success": false,
  "error": {
    "code": "...",
    "message": "..."
  }
}
```

\*Refer <a href="#errors"> errors </a> for more information

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

### Failure response

```json
{
  "success": false,
  "error": {
    "code": "...",
    "message": "..."
  }
}
```

\*Refer <a href="#errors"> errors </a> for more information

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

### Failure response

```json
{
  "success": false,
  "error": {
    "code": "...",
    "message": "..."
  }
}
```

\*Refer <a href="#errors"> errors </a> for more information

---

## <span id="getcurrentuser">**GET CURRENT USER** (protected) </span>

GET `/api/auth/getcurrentuser`

### Success response

```json
{
  "success": true,
  "user": {
    "_id": "615efda38ee4fd4ae29eff9e",
    "name": "John Doe",
    "userName": "jo_do",
    "email": "jd@gm.com"
  }
}
```

### Failure response

```json
{
  "success": false,
  "error": {
    "code": "...",
    "message": "..."
  }
}
```

---

---

# <span id="profile"> Profile Management</span>

## <span id="create" > **CREATE PROFILE** (protected) </span>

POST `/api/profile/createProfile`

### Input Data

```json
{
  "academicDetails": [
    {
      "nameOfInstitution": "Rajagiri",
      "description": "School",
      "time": 2,
      "percentage": "95"
    },
    {
      "nameOfInstitution": "FISAT",
      "time": 4,
      "degree": "B.Tech",
      "percentage": "80"
    }
  ],
  "professionalExperience": [
    {
      "nameOfCompany": "ABC Tech",
      "jobPosition": "Jr Developer",
      "jobDescription": "Ecommerce apps",
      "jobDuration": "2"
    },
    {
      "nameOfCompany": "EFG Tech",
      "jobPosition": "Sr Developer",
      "jobDescription": "Mobile apps",
      "jobDuration": "3"
    }
  ],
  "skills": [
    {
      "nameOfSkill": "Node JS",
      "experienceLevel": "Advanced"
    },
    {
      "nameOfSkill": "React JS",
      "experienceLevel": "Intermediate"
    }
  ],
  "projects": [
    {
      "nameOfProject": "Tech Chat",
      "projectDescription": "Chat application with React Native",
      "links": {
        "projectGithub": "www.github.com/abcd/techchat"
      }
    },
    {
      "nameOfProject": "Rimsha Pharmaceuticals",
      "links": {
        "projectGithub": "www.github.com/abcd/rimsha",
        "hostedLink": "www.rimshapharma.com"
      }
    }
  ],
  "socialLinks": {
    "github": "www.github.com/abcd",
    "linkedin": "www.linkedin.com/abcd",
    "portfolio": "www.myportfolio.com"
  },
  "preferredLocation": "Kochi",
  "preferredModeOfWork": "Online",
  "workingHoursPerDay": 5,
  "expectedWagePerHour": 500
}
```

<div style="font-size:18px" > <u> academicDetails </u>

type : Array  
 required : false  
 Each element in the array should be an object with details of educational institutions attended by the user.

The object can have 5 properties :

 <ul>
  <span style="font-size:17px" >
      <li> <b>nameOfInstitution</b> </li>
      <li> <b> time (in number of years)</b> </li>
      <li> <b> percentage </b> </li>
      <li>description</li>
      <li>degree</li>
 </span>
 </ul>
</div>   
 *Required properties are written in bold
   
<br /> <br>
<div style="font-size:18px" > <u> professionalExperience </u>

type : Array  
 required : false  
 Each element in the array should be an object with details of companies the user has worked for.

The object can have 4 properties :

 <ul>
  <span style="font-size:17px" >
      <li> <b>nameOfCompany</b> </li>
      <li> <b> jobPosition </b> </li>
      <li> <b> jobDuration (in number of years) </b> </li>
      <li>jobDescription</li>
 </span>
 </ul>
 
</div>
 *Required properties are written in bold

<br /> <br>

<div style="font-size:18px" > <u> skills </u>

type : Array  
 required : false  
 Each element in the array should be an object with details of technical skills possessed by the user.

The object can have 2 properties :

 <ul>
  <span style="font-size:17px" >
      <li> <b>nameOfSkill</b> </li>
      <li> <b> experienceLevel  </b> (Beginner/Intermediate/Advanced) </li>
 </span>
 </ul>
</div>
 *Required properties are written in bold

<br> <br>

<div style="font-size:18px" > <u> projects </u>

type : Array  
 required : false  
 Each element in the array should be an object with details of projects done by the user.

The object can have 3 properties :

 <ul>
  <span style="font-size:17px" >
      <li> <b>nameOfProject</b> </li>
      <li>  projectDescription  </li>
      <li> links <br>
      (<br>Object with properties <br> "projectGithub" - link to git repository <br> "hostedLink" - link to see the work done<br>)</li>
 </span>
 </ul>
</div>
 *Required properties are written in bold

<br> <br>

<span style="font-size:18px" > <u> socialLinks </u>  
type : Object  
 required : true  
 Object containing links to linkedin, github and portfolio

The object can have 3 properties :

 <ul>
  <span style="font-size:17px" >
      <li> <b>github</b> </li>
      <li> <b> linkedin  </b> (Beginner/Intermediate/Advanced) </li>
      <li>portfolio</li>
 </span>
 </ul>
</div>
 *Required properties are written in bold

<br> <br>

<span style="font-size:18px" > <u> preferredLocation </u>  
type : String  
 required : false  
<br>
<span style="font-size:18px" > <u> preferredModeOfWork </u>  
type : String  
 required : true  
<br>
<span style="font-size:18px" > <u> workingHoursPerDay </u>  
type : String  
 required : true  
<br>
<span style="font-size:18px" > <u> expectedWagePerHour (in INR) </u>  
type : String  
 required : true

---

### Success response

```json
{
  "success": true,
  "newProfile": {
    "name": "John Doe",
    "academicDetails": [
      {
        "nameOfInstitution": "Rajagiri",
        "description": "School",
        "time": 2,
        "percentage": "95"
      },
      {
        "nameOfInstitution": "FISAT",
        "time": 4,
        "degree": "B.Tech",
        "percentage": "80"
      }
    ],
    "professionalExperience": [
      {
        "nameOfCompany": "ABC Tech",
        "jobPosition": "Jr Developer",
        "jobDescription": "Ecommerce apps",
        "jobDuration": "2"
      },
      {
        "nameOfCompany": "EFG Tech",
        "jobPosition": "Sr Developer",
        "jobDescription": "Mobile apps",
        "jobDuration": "3"
      }
    ],
    "skills": [
      {
        "nameOfSkill": "Node JS",
        "experienceLevel": "Advanced"
      },
      {
        "nameOfSkill": "React JS",
        "experienceLevel": "Intermediate"
      }
    ],
    "projects": [
      {
        "nameOfProject": "Tech Chat",
        "projectDescription": "Chat application with React Native",
        "links": {
          "projectGithub": "www.github.com/abcd/techchat"
        }
      },
      {
        "nameOfProject": "Rimsha Pharmaceuticals",
        "links": {
          "projectGithub": "www.github.com/abcd/rimsha",
          "hostedLink": "www.rimshapharma.com"
        }
      }
    ],
    "socialLinks": {
      "github": "www.github.com/abcd",
      "linkedin": "www.linkedin.com/abcd",
      "portfolio": "www.myportfolio.com"
    },
    "preferredLocation": "Kochi",
    "preferredModeOfWork": "Online",
    "workingHoursPerDay": 5,
    "expectedWagePerHour": 500
  }
}
```

### Failure response

```json
{
  "success": false,
  "error": {
    "code": "...",
    "message": "..."
  }
}
```

\*Refer <a href="#errors"> errors </a> for more information

---

## <span id="update" > **UPDATE PROFILE** (protected) </span>

POST `/api/profile/updateProfile`

### Input Data

_Similar to data passed in create profile endpoint.
Pass full data after updating required fields_

### Examples

To update name of first educational institution in academicDetails array from "Rajagiri" to "Rajagiri Public School"

```json
{
  "academicDetails": [
    {
      "nameOfInstitution": "Rajagiri Public School",
      "description": "School",
      "time": 2,
      "percentage": "95"
    },
    {
      "nameOfInstitution": "FISAT",
      "time": 4,
      "degree": "B.Tech",
      "percentage": "80"
    }
  ]
}
```

To add description to a project which does not have a description(2nd project in the create profile example) and to add a new project

```json
{
  "projects": [
    {
      "nameOfProject": "Tech Chat",
      "projectDescription": "Chat application with React Native",
      "links": {
        "projectGithub": "www.github.com/abcd/techchat"
      }
    },
    {
      "nameOfProject": "Rimsha Pharmaceuticals",
      "projectDescription": "Static website",
      "links": {
        "projectGithub": "www.github.com/abcd/rimsha",
        "hostedLink": "www.rimshapharma.com"
      }
    },
    {
      "nameOfProject": "CodeQuery",
      "projectDescription": "Discussion forum"
    }
  ]
}
```

To update preferred location from Kochi to Bangalore and increase wage per hour to 600

```json
{
  "preferredLocation": "Bangalore",
  "expectedWagePerHour": 600
}
```

### Success response

```json
{
  "success": true,
  "updatedProfile":{
    ...
  }
}
```

### Failure response

```json
{
  "success": false,
  "error": {
    "code": "...",
    "message": "..."
  }
}
```

\*Refer <a href="#errors"> errors </a> for more information

---

## <span id="get" > **GET PROFILE** (protected) </span>

GET `/api/profile/getProfile`  
_Used for getting profile details of currently logged in user_

### Success reponse

```json
{
  "success": true,
  "profile": {
    "name": "John Doe",
    "academicDetails": [
      {
        "nameOfInstitution": "Rajagiri",
        "description": "School",
        "time": 2,
        "percentage": "95"
      },
      {
        "nameOfInstitution": "FISAT",
        "time": 4,
        "degree": "B.Tech",
        "percentage": "80"
      }
    ],
    "professionalExperience": [
      {
        "nameOfCompany": "ABC Tech",
        "jobPosition": "Jr Developer",
        "jobDescription": "Ecommerce apps",
        "jobDuration": "2"
      },
      {
        "nameOfCompany": "EFG Tech",
        "jobPosition": "Sr Developer",
        "jobDescription": "Mobile apps",
        "jobDuration": "3"
      }
    ],
    "skills": [
      {
        "nameOfSkill": "Node JS",
        "experienceLevel": "Advanced"
      },
      {
        "nameOfSkill": "React JS",
        "experienceLevel": "Intermediate"
      }
    ],
    "projects": [
      {
        "nameOfProject": "Tech Chat",
        "projectDescription": "Chat application with React Native",
        "links": {
          "projectGithub": "www.github.com/abcd/techchat"
        }
      },
      {
        "nameOfProject": "Rimsha Pharmaceuticals",
        "links": {
          "projectGithub": "www.github.com/abcd/rimsha",
          "hostedLink": "www.rimshapharma.com"
        }
      }
    ],
    "socialLinks": {
      "github": "www.github.com/abcd",
      "linkedin": "www.linkedin.com/abcd",
      "portfolio": "www.myportfolio.com"
    },
    "preferredLocation": "Kochi",
    "preferredModeOfWork": "Online",
    "workingHoursPerDay": 5,
    "expectedWagePerHour": 500
  }
}
```

### Failure response

```json
{
  "success": false,
  "error": {
    "code": "...",
    "message": "..."
  }
}
```

\*Refer <a href="#errors"> errors </a> for more information

---

## <span id="delete" > **DELETE PROFILE** (protected) </span>

DELETE `/api/profile/deleteProfile`

### Success response

```json
{
  "success": true
}
```

### Failure response

```json
{
  "success": false,
  "error": {
    "code": "...",
    "message": "..."
  }
}
```

\*Refer <a href="#errors"> errors </a> for more information

---

## <span id="getall" > **GET ALL PROFILES** (protected) </span>

GET `/api/profile/getAllProfiles`  
_Used for getting profiles of all users for listing (except current user). Does not contain all information_

Information present :

<ul>
  <li> name 
  <li> preferredLocation
  <li> preferredModeOfWork
  <li> workingHoursPerDay
  <li> expectedWagePerHour
  <li> skills
</ul>

### Success response

```json
{
  "success": true,
  "profiles": [
    {
      "name": "Jane Doe",
      "preferredLocation": "banglore",
      "preferredModeOfWork": "full-time",
      "workingHoursPerDay": 2,
      "expectedWagePerHour": 2000,
      "skills": [
        {
          "nameOfSkill": "nodejs",
          "experienceLevel": "Advanced",
          "_id": "6169162f263334cd7f532034"
        }
      ]
    },
    {
      "name": "Shankar Das",
      "preferredLocation": "banglore",
      "preferredModeOfWork": "full-time",
      "workingHoursPerDay": 2,
      "expectedWagePerHour": 2000,
      "skills": [
        {
          "nameOfSkill": "reactjs",
          "experienceLevel": "Intermediate",
          "_id": "6169162f263334cd7f532034"
        },
        {
          "nameOfSkill": "nodejs",
          "experienceLevel": "Advanced",
          "_id": "6169162f263334cd7f532034"
        }
      ]
    }
  ]
}
```

### Failure response

```json
{
  "success": false,
  "error": {
    "code": "...",
    "message": "..."
  }
}
```

## <span id="getbyid" > **GET USER PROFILE BY ID** (protected) </span>

GET `/api/profile/getUserProfile/<UserID>`  
_Used for getting all profile details of a particular user.<br>
Not applicable for current user. For current user profile click <a href="#get">here</a>_

### Success response

```json
{
  "success": true,
  "profile": {
    "name": "Jane Doe",
    "academicDetails": [
      {
        "nameOfInstitution": "Rajagiri",
        "description": "School",
        "time": 2,
        "percentage": "95"
      },
      {
        "nameOfInstitution": "FISAT",
        "time": 4,
        "degree": "B.Tech",
        "percentage": "80"
      }
    ],
    "professionalExperience": [
      {
        "nameOfCompany": "ABC Tech",
        "jobPosition": "Jr Developer",
        "jobDescription": "Ecommerce apps",
        "jobDuration": "2"
      },
      {
        "nameOfCompany": "EFG Tech",
        "jobPosition": "Sr Developer",
        "jobDescription": "Mobile apps",
        "jobDuration": "3"
      }
    ],
    "skills": [
      {
        "nameOfSkill": "Node JS",
        "experienceLevel": "Advanced"
      },
      {
        "nameOfSkill": "React JS",
        "experienceLevel": "Intermediate"
      }
    ],
    "projects": [
      {
        "nameOfProject": "Tech Chat",
        "projectDescription": "Chat application with React Native",
        "links": {
          "projectGithub": "www.github.com/abcd/techchat"
        }
      },
      {
        "nameOfProject": "Rimsha Pharmaceuticals",
        "links": {
          "projectGithub": "www.github.com/abcd/rimsha",
          "hostedLink": "www.rimshapharma.com"
        }
      }
    ],
    "socialLinks": {
      "github": "www.github.com/abcd",
      "linkedin": "www.linkedin.com/abcd",
      "portfolio": "www.myportfolio.com"
    },
    "preferredLocation": "Kochi",
    "preferredModeOfWork": "Online",
    "workingHoursPerDay": 5,
    "expectedWagePerHour": 500
  }
}
```

### Failure response

```json
{
  "success": false,
  "error": {
    "code": "...",
    "message": "..."
  }
}
```

---

---

# <span id="errors"> Error Codes </span>

\*More information in the error object

## General

| Error Code   | Description                                 |
| ------------ | ------------------------------------------- |
| `server/ise` | Internal server error. Contact backend team |

## Authentication input validation

| Error Code     | Description                       |
| -------------- | --------------------------------- |
| `val/inp-inv ` | Invalid inputs for authentication |
| `val/un-tkn `  | Username already taken            |
| `val/em-ex `   | Email already exists              |
| `val/em-inv `  | Invalid email                     |
| `val/pwd-len ` | Password length not sufficient    |

## Authentication

| Error Code     | Description                      |
| -------------- | -------------------------------- |
| `auth/em-inc`  | Incorrect email                  |
| `auth/pwd-inc` | Incorrect password               |
| `auth/pwd-abs` | Password missing                 |
| `auth/id-abs`  | idToken missing (google sign in) |
| `user/unm-abs` | New username absent in body      |
| `user/nm-abs`  | New name absent in body          |
| `user/nf`      | User not found                   |

## Profile

| Error Code        | Description                                        |
| ----------------- | -------------------------------------------------- |
| `profile/ex`      | Profile already exists                             |
| `profile/ref-doc` | Invalid input. Refer <a href="#create" > docs </a> |
| `profile/nf`      | Profile not found                                  |
| `profile/emp`     | No profiles found                                  |
