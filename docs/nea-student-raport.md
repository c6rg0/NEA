# Analysis:

##  Objectives + Problems:
A lot of people (maybe?) and myself included struggle with focus, remembering school content and studying because reading a textbook and 
writting notes over and over eventually (well, pretty quickly) becomes tiring; and the next best use of time appears. I find memorization
difficult (if not annoying), and to fix that, making an effective and entertaining (to a sensible point) platform for revision and learning
would help alievate those problems.
I also want this project to be open to everyone who stumbles across it. Nearly all studying materials are locked behind a paywall, but my 
philosophy is that the same content should be accessable and free - also convenient to use. 
Research (end-user(s) and individual resarch):


Modelling of the problem:
The problem will be solved with a website - which is a lot simpler than having others download a program - and it will allow more for reach.
The idea of having a quiz application; that can be used offline, is appealing, if it wasn't for the fact that designing a package manager to
distrobute quiz content is overkill.
Taking inspiration from git and github, the idea of collaboration being possible will make the quality of content a lot higher; being able to
add content onto others projects means that a complete source for learning can be completed and polished a lot sooner (with the creators 
permission). The ability to fork projects also means that outdated or half-completed content can be completed on the behalf of somebody else. With this system, liscenses stating the rules for what you're allowed to do with work that isn't yours will be in place.

Project objectives:
To make it easier to revise and study even when the content is boring.
To make the quiz creation system easy and quick
To allow flexibility in the way you learn (i.e. having both questions and content to learn from)

#############################################################################################################################################

- Documented design:

Objectives:
The first objective for the project is to make set up a simple markdown environment from which I can work on the backend. The tactic is to 
work on the backend which will be used as the core of the whole project, which can easily be branched from and used as a template for more
complicated ideas. By backend, I'm specifically talking about the quiz logic. After I polish it, I'll set up an sql database, and do other
things around the website - making a system of submiting and requesting data for example.
I'll only begin to work on the frontend at the end (to a point - the buttons for the quiz will exist at the very beginning).

Structure/hierarchy diagrams:


System flowcharts:
(Made one on krita)

Data flow diagrams:
(make one that shows the flow of data: user action -> ts script -> server.js ->  database -> server.js -> ts script (e.x. game)

Object-oriented design:


Database design:
There will be two databases, one in which account logins are 
stored, and another with quiz content.
SQLite is going to be used so a database will be in a file 
(.db) format.
The account database will be straight forward, with one table.
The quiz database will be more complicated, and it'll have
interlinked tables - so the title for the quiz is in one 
table, the questions in another, and so on for the rest of 
the data (options, answers, settings, reading (content to read 
included in learning style quizes). 


Algorithms:
Binary search will be used to look up quizes in the database,
which the whole website will realistically depend on, to find and
play a quiz, a search of some kind will have to be done.
Different filters in the browse section will also exist.
A hashing algorithm will also be used (for the database).
An encryption algorithm will be used on the account logins to
ensure a degree of security.


Data structures and advanced technologies:
In the quiz logic ([src/play.ts] below), there will be use of 
a queue so data needed will be popped onto the queue from the 
database, and pushed once the user moves onto the next question.


File structures:
❯ tree .
.
├── LICENSE
├── README.md
├── build.sh
├── clean.sh
├── database
│   ├── account.db
│   ├── account.db-shm
│   ├── account.db-wal
│   ├── quiz.db
│   ├── quiz.db-shm
│   └── quiz.db-wal
├── docs
│   ├── Nea-Student-Raport.docx
│   ├── Nea-Student-Raport.txt
│   ├── bettersqlite3.md
│   ├── checklist.md
│   ├── log.md
│   └── tree.md
├── package-lock.json
├── package.json
├── public
│   ├── css
│   │   └── style.css
│   ├── fonts
│   │   ├── Ubuntu-Light.woff2
│   │   ├── Ubuntu-Medium.woff2
│   │   └── Ubuntu-Regular.woff2
│   ├── js
│   └── particles
│       ├── particles.json
│       └── particles_app.ts
├── routes
├── src
│   ├── public
│   │   ├── login.ts
│   │   ├── play.ts
│   │   └── signup.ts
│   ├── routes
│   │   ├── 404.ts
│   │   ├── browse.ts
│   │   ├── dev
│   │   │   ├── dev-clear.ts
│   │   │   └── dev.ts
│   │   ├── get-session.ts
│   │   ├── index.ts
│   │   ├── play.ts
│   │   ├── search-request.ts
│   │   ├── submit-login.ts
│   │   ├── submit-quiz-metadata.ts
│   │   └── submit-signup.ts
│   └── server.ts
├── tsconfig.frontend.json
├── tsconfig.json
├── tsconfig.public.json
└── views
    ├── account.html
    ├── browse.html
    ├── create-content.html
    ├── create-name.html
    ├── dev-clear.html
    ├── dev.html
    ├── index.ejs
    ├── index.html
    ├── login-success.html
    ├── login.html
    ├── play.html
    ├── signup-success.html
    ├── signup.html
    └── submit-quiz-metadata.html

13 directories, 56 files


HCI (Human-computer interaction) / Screen design:


Hardware selection:
I'm making use of standard hardware (I'm not using a rasbery-pi or anything), however, the operating system I'm using should be considered.
Using a distribution of linux on my laptop (arch linux), file paths use forward slashes, unlike windows back slashes. Statistically, if the 
website was to be ran on a server, it would most likely use debian or another linux distribution, and file paths wouldn't be a problem.
Still, if the website was to be run on windows, I should make sure that the file paths work.

Fully articulated design:



#############################################################################################################################################

- Technical solution




