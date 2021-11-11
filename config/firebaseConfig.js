const admin = require("firebase-admin");
exports.connectFirebase = () => {
  const credentials = {
    type: "service_account",
    project_id: "find-simran",
    private_key_id: "22f23f0703c6cfa84afe81e5b4af37827b755292",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC9zs0YLSt/q7D/\nj5X992hLJ07Ft9xyNcYzamF7eoWCPYIczu9dfA5Y1kOyiW4BT3jyZzUN3myANrJ5\nZQWptVZHh7+qZz6+8VhweJwcV82kKjquOxxOQLye7WgF3fxsmkHBMjLhpJyDROTk\nRXIUvAb6esOqgUA8+Jt9tMy+Vmty20aY7b/JJrVrfvLKhn8eWdjk3Dc7F7L3foEV\nWQYI9x7J/7cG+DBALUZ/elhU5hSeVnLii3LJ/sKP09VddKkKCs8UO3sTxhdphHoG\nFLhnO8fCA8en0IZS+imEHtuRSFcP6KA6Ze2qFRjJt884Hr7irPtn4SLA/L49nRKj\nMdYdVdNFAgMBAAECggEAHV0wdTSLvbZ3Qq+D12Seob3PiHQPf9XE4hsWQK7tl6li\nBzNBFxfZn7G/iw/gJltqon8IAgDD4rlTjByZBIPAI38jTj6nF41+jqEsxDprNHda\nA66zttbPYiY9SRG/eve0WNSmHYAaEeQnJbopUimH9Nk9ixPFjIkzg6jkYe/nCJS8\nwQMIGun95enRA5UWEN33lDmPQ9EDRtDPlSnK4N/NJs4UyK/VMi51lnn8s6LTLNy1\nQ8rVgQccvxJQHe+/FIvDsRkHqOv0emcJ1TesckkRn+oGWTErN3UsryFSuIRE4w00\nVO1KquaaTs8Vdk/KNPmn2+5zF0+UQxsthbYcvVFAUwKBgQD453hrwpLtnR2P6qbB\ngtsJo0G7cA1dB6lHDn3ykPUnULIC/UmyXEhb6XQg97YUfGyJXfyunD3nUghRAiJY\nAi3NHezpASnUu5pzb5aC3+m1EpgEzH256OZroIMgShKMkfhLZLZX5Ll2cx5RMQ5M\nOfcZ9fKHzelYS4TBGlWZi4T6swKBgQDDOAoCyXVhdKjTwkquVBW5BO8WGZFM0mkv\n05+iMg3B7gAo8tpoYJfW/WgB0caz0utnJGnnLqJW+MDJE0JED9vSx1IMa46esBBs\nmP0DDUBxVmM5c7/u4pU3pZqZXjRHSJJfaTG8NEN4JyM2ejzLO0uhg/POW/dT0OxF\nk9yITHbWJwKBgQC0Myh8o76p5qDba5/U437e6GITaJlUK9LDDdvjPE0wbHykK2oq\nhiMg39BiedRJ2pbdkLz6UUWD7mD0/R2OJ+2u3aaCPoRhbnzwa+5EzAUwQcjrWH0B\nlnsTmn60ZswtFxTyyHQ3B/G5rrhZQbG/QAwEsIopBcuVT/9Jql4krtzUfwKBgQCW\nPVmO/YZFw2du2TdqZLH3G3H5OyIU0lY7hY10YTsvRcB/wy8NZ1FUFt/ljpFysV+T\nmHWcgspTTsvns9eq092koNtnTZuMSwnI2hDWOWugDhD9FTTgXybhlaSeZd6sAZEM\ntsOdCUfnf49dDMQe0HqLSibnaOW2brJ3da0ihF5svwKBgCe7U3fkfa6gEr6lt80K\nV2BJ4nkrj8cW8/+ESXmJiCjxZF3QqEOtajF7IFfd+bPrAOjuu+YxfpZfLL3b6P3H\nPy1hXz4bNbf8lFrXrmaMSD+y134currUx3iPnOnuHNpyGG7RezoOpP3GaSckxrfW\nM1Ay+ZSlYl91Bcqfr1tdBa0l\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-qh15e@find-simran.iam.gserviceaccount.com",
    client_id: "101285808805168707664",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-qh15e%40find-simran.iam.gserviceaccount.com",
  };

  admin.initializeApp({
    credential: admin.credential.cert(
      credentials
    ),
  });
};
