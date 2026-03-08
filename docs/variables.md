# Variable and file name guidelines

## Before change
```

❯ tree .
.
├── LICENSE
├── README.md
├── build.sh
├── clean.sh
├── database
│   ├── regex_problems.db
│   ├── regex_problems.db-shm
│   └── regex_problems.db-wal
├── docs
│   ├── Nea-Student-Raport.docx
│   ├── bettersqlite3.md
│   ├── log.md
│   ├── nea-student-raport.md
│   ├── requirements.md
│   ├── tree.md
│   └── variables.md
├── package-lock.json
├── package.json
├── public
│   ├── css
│   │   └── style.css
│   ├── fonts
│   │   ├── Ubuntu-Light.woff2
│   │   ├── Ubuntu-Medium.woff2
│   │   └── Ubuntu-Regular.woff2
│   └── js
├── routes
├── src
│   ├── public
│   │   ├── create.ts
│   │   ├── login.ts
│   │   ├── search.ts
│   │   ├── signup.ts
│   │   └── solve.ts
│   ├── routes
│   │   ├── browse.ts
│   │   ├── create-problem.ts
│   │   ├── get-problem.ts
│   │   ├── get-session.ts
│   │   ├── index.ts
│   │   ├── problem.ts
│   │   ├── search-request.ts
│   │   ├── submit-attempt.ts
│   │   ├── submit-login.ts
│   │   ├── submit-signup.ts
│   │   └── user.ts
│   └── server.ts
├── tsconfig.json
├── tsconfig.public.json
└── views
    ├── account.ejs
    ├── browse.ejs
    ├── create-success.ejs
    ├── create.ejs
    ├── dev-clear.ejs
    ├── dev.ejs
    ├── index.ejs
    ├── login-success.ejs
    ├── login.ejs
    ├── problem.ejs
    ├── search.ejs
    ├── signup-success.ejs
    ├── signup.ejs
    └── user.ejs

```

### Problems
- Inconsistent naming conventions (using nix style naming for files, half JS and rust style for variables)
- Using different names for files that are associated with one another
- Some names don't properly describe their aim

> (More practically)
- "/get-problem" -> gets the answer and test case for solve.ts
- Mixed use of "solve", "problem" and "solution"
- "submit-login.ts" could become "submit.route.ts"
- views/ should share the same name as their public or route associate;
  with the exception of (solve = { problem_srv, solution_srv })
- Snake case should be used for files (hello_world)



## After
```

❯ tree .
.
├── LICENSE
├── README.md
├── build.sh
├── clean.sh
├── database
│   ├── regex_problems.db
│   ├── regex_problems.db-shm
│   └── regex_problems.db-wal
├── docs
│   ├── nea_student_raport.docx
│   ├── better_sqlite3.md
│   ├── log.md
│   ├── nea_student_raport.md
│   ├── requirements.md
│   ├── tree.md
│   └── variables.md
├── package-lock.json (can't change this one :( )
├── package.json
├── public
│   ├── css
│   │   └── style.css
│   ├── fonts
│   │   ├── Ubuntu-Light.woff2
│   │   ├── Ubuntu-Medium.woff2
│   │   └── Ubuntu-Regular.woff2
│   └── js
├── routes
├── src
│   ├── public
│   │   ├── create.ts
│   │   ├── login.ts
│   │   ├── search.ts
│   │   ├── signup.ts
│   │   └── solve.ts
│   ├── routes
│   │   ├── browse.route.ts
│   │   ├── create.route.ts
│   │   ├── solution.route.ts
│   │   ├── session.route..ts
│   │   ├── index.ts
│   │   ├── problem.route.ts
│   │   ├── request.route.ts
│   │   ├── attempt.route.ts
│   │   ├── login.route.ts
│   │   ├── signup.route.ts
│   │   └── user.route.ts
│   └── server.ts
├── tsconfig.json
├── tsconfig.public.json
└── views
    ├── account.ejs
    ├── browse.ejs
    ├── create_success.ejs
    ├── create.ejs
    ├── dev_clear.ejs
    ├── dev.ejs
    ├── index.ejs
    ├── login_success.ejs
    ├── login.ejs
    ├── solve.ejs
    ├── search.ejs
    ├── signup_success.ejs
    ├── signup.ejs
    └── user.ejs

```
