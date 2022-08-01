Things to do if you want to work on this by yourself..

1) npm install --save express@next morgan cors nodemon
2) npm install --save bcrypt colors dotenv pg
3) npm install --save jsonwebtoken
4) npm install regex              
5) npm install unique-username-generator --save  (NECESSARY 7-27-2022)
6) npm install nodemailer --save

6) psql -f motivateme.sql (NECESSARY SINCE DATABASE CHANGED 7-27-2022)
    a) then click enter (to clear the database and start over if you want)

7) npm run dev


also:
.env should look SOMETHING LIKE...
PORT=3001
SECRET_KEY=changethistoalongerkey (I need to find what function generates the secret key that I used for lifetracker project)
BCRYPT_WORK_FACTOR=putsomenumberbetween10to15
DATABASE_USER=postgres
DATABASE_PASS=postgresORdefaultORyoursystempassword
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=motivateme


git issues....
command shift p for git graph
look at recording for July 14