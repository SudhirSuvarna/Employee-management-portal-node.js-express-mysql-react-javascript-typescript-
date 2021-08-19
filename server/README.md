## Database setup

Install mysql server 8.0.26 
create database myDatabase.
database username should be : "root"
database password should be : "Tel@12345"


#### Project setup
In the project directory, run
``` 
npm install
```

### Run
```
node server.js
```

When you run the server, admin user will be created by default.
{   username: "admin",
    email: "admin@paypay.com",
    password: "Test@12345"
    role : "admin"
}

Please use register option for creating new user.
