
# Iron-CV

## Description

This is a website that creates CV for those ones who are sick of filling out infinite forms to apply to different positions. The process is simple - the user can save the user's infomation to get a CV with their details, ready to be used.

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Signup:** As an anon I can sign up in the platform so that I can start creating CVs.
-  **Login:** As a user I can login to the platform so that I can see my CVs.
-  **Logout:** As a user I can logout from the platform so no one else can use it.
-  **Add profile** As a user I can add the profile infomation.
-  **Edit profile** As a user I can edit the profile infomation.
-  **Create CV** As a user I can create CV.
-  **Edit CV** As a user I can edit CV.
-  **Delete CV** As a user I can delete CV.

## Backlog

User profile:
- upload my profile picture
- select infomation

CV:
- create new CV
- download cv as PDF
- send cv through email

Template:
- edit font(style,size,color)
- add icon
- edit space
- change the order of the components

Etc:
- splash screen

# Client

## Routes
| Method | Path | Component | Permissions | Behavior |
|--------|------|-----------|-------------|----------|
| `post` | `/auth/signup` | SignupPageComponent| anon only| signup form, link to login, navigate to homepage after signup|
| `post` | `/auth/login` | LoginPageComponent | anon only |login form, link to signup, navigate to homepage after login |
| `post` | `/auth/logout` | n/a| anon only | navigate to homepage after logout, expire session |
| `get`  | `/home` | HomePageComponent| user only | create a new CV or edit profile |
| `get`  | `/profile` | ProfilePageComponent| user only | shows all profile that the user already saved |
| `put` | `/profile` | ProfilePageComponent| user only | fill out regarding to the personal, background and academic details|
| `post` | `/edit/:cvId` | EditComponent  | user only | user can create the profile regarding to the personal, background and academic details|
| `put` | `/edit/:cvId` | EditComponent  | user only | user can update the profile regarding to the personal, background and academic details|
| `delete` | `/edit/:cvId` | n/a | user only | delete cv|
| `get` | `/edit/:cvId/:contentId` | ContentComponent  | user only | user can get the profile infomation|
| `post` | `/edit/:cvId/:contentId` | ContentComponent  | user only | user can update the profile infomation|
| `put` | `/edit/:cvId/:contentId` | ContentComponent  | user only | user can update the profile infomation|
| `delete` | `/edit/:cvId/:contentId` | n/a | user only | delete content|
| `get` | `**` | NotFoundPageComponent | public |


## Components

- NavBar componant
- CV component
   - Input: user infomation
- Edit component
   - Output: update the components
- Tab component
  - Input: click
  - Output: infomation of the matched component
- Container component
   - selected component
- Content component
  - Input: user profile
  - Output: update user infomation


## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser() // synchronous
- CV Service
  - CV.create()
  - CV.delete(cvId)
  - CV.edit(cvId)
- Content Service
  - Content.create()
  - Content.edit(contentId)
  - Content.delete(contentId)


# Server

## Models

User model
```
username - String // required
email - String // required & unique
password - String // required
content - [ObjectID<Content>]
cv - [ObjectID<CV>]
```

Content model
```
type - String // reqired
name - String // requred
start-date - Date
end-date - Date
description - String
list - [String]
```

CV model
```
name - String // required
content - [ObjectID<Content>]
```

## API Endpoints (backend routes)

- GET /auth/me
  - 404 if no user in session
  - 200 with user object
- POST /auth/signup
  - 401 if user logged in
  - body:
    - username
    - email
    - password
  - validation
    - fields not empty (422)
    - user not exists (409)
  - create user with encrypted password
  - store user in session
  - 200 with user object
- POST /auth/login
  - 401 if user logged in
  - body:
    - username
    - password
  - validation
    - fields not empty (422)
    - user exists (404)
    - password matches (404)
  - store user in session
  - 200 with user object
- POST /auth/logout
  - body: (empty)
  - 204
- GET /home
  - 200 with user object
- GET /edit/:cvId
  - user see the page
  - 200 with cv object
- POST /edit/:cvId
  - body:
    - cvId
  - validation
    - id is valid (404)
    - id exists (404)
  - add contents to cv
- PUT /edit/:cvId
  - body:
    - cvId
  - validation
    - id is valid (404)
    - id exists (404)
  - update contents to cv
- DELETE /edit/:cvId
  - validation
    - id is valid (404)
    - id exists (404)
  - body: (empty - the user is already stored in the session)
  - remove from user
  - updates user in session
- GET /edit/:cvId/:contentId
  - user see the edit page
  - 200 with cv object
- POST /edit/:cvId/:contentId
  - body:
    - contentId
  - validation
    - id is valid (404)
    - id exists (404)
  - add text to contents
- PUT /edit/:cvId/:contentId
  - body:
    - contentId
  - validation
    - id is valid (404)
    - id exists (404)
  - update text to contents
- DELETE /edit/:cvId/:contentId
  - validation
    - id is valid (404)
    - id exists (404)
  - body: (empty - the user is already stored in the session)
  - remove from user
  - updates user in session


## Links

### Trello/Kanban

[Link to your trello board](https://trello.com) or picture of your physical board

### Git

The url to your repository and to your deployed project.

[Client repository Link](http://github.com)
[Server repository Link](http://github.com)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)