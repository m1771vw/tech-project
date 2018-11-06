### Installing The Back End

Return to the root of the project folder and go to the `tech-back-end` directory and run `npm install`:
```
$ cd ..
$ cd tech-back-end
$ npm install
```
After the dependencies have been installed, you have to create a `.env` file. 
In the root of the `tech-back-end`, create a new file named `.env` and paste the following:
```
DB_URL=postgres://localhost:5432/technoprojectdb
PORT=5000
SECRET_KEY=SECRETKEY123
```
Here I have the `DB_URL` set to the default PostgreSQL port (5432), please change that to the port your PostgreSQL is set up to.

`PORT` can be changed to whatever port is available for you.

`SECRET_KEY` is used for signing the JWT Token.

### Running The Backend

To run the back end, you will need to have a console window open in the `tech-back-end` directory. 

<p align="center">
  <img src="../assets/screenshots/terminal2.png" alt="Back End Terminal"/>
</p>

Run `npm start` with the `tech-back-end` first. Once it is running, you can open another console window to run the `tech-front-end`.

To confirm it has started, you should see something similar to the following with no errors:

```
[nodemon] 1.18.5
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node server.js`
Server running on port: 5000
```