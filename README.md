# Workout-Log
This is a local server buildout for a Workout Logbook using Express, Sequelize, Bcrypt, JSONWebToken, and Node.js. 
It contains the following endpoints. 
<p>
/user/register	POST	Allows a new user to be created with a username and password.

<img src="./screenshots/user-post-register.png">
</p>
<p>
/user/login	POST	Allows log in with an existing user.

<img src="./screenshots/user-post-login.png">
</p>
<p>
/log/	POST	Allows users to create a workout log with descriptions, definitions, results, and owner properties.
<br>This screenshot shows a successful log creation with an Authenticated Token.
<img src="./screenshots/log-post-log-authenticated-sucess.png">

This screenshot shows the failure message when attempting to post a new log without an Authenticated Token from Login.
<img src="./screenshots/log-post-failure-no-token.png">
</p>
<p>
/log/	GET	Gets all logs for an individual user.

<img src="./screenshots/log-get-all-one-user.png">
</p>
<p>
/log/:id	GET	Gets individual logs by id for an individual user.<br>
This screenshot shows a successful GET of an entry by that id entry in the URL, but is only displayed because the headers contain the correct user Token.<br>
<img src="./screenshots/log-get-single-entry-by-id.png"><br>
This screen shows the failure message when a user attemps to see the log of another user, which it does not have ownership of.<br>
<img src="./screenshots/log-get-single-entry-by-id.png">
</p>
<p>
/log/:id	PUT	Allows individual logs to be updated by a user.

<img src="./screenshots/log-put-update log.png">
</p>
<p>
This screenshot shows the updated PgAdmin database, where the file has a new updated time.<br>
<img src="./screenshots/log-post-updated-PgAdmin.png">
</p>
<p>
/log/:id	DELETE	Allows individual logs to be deleted by a user.

<img src="./screenshots/Log-Delete.png">
