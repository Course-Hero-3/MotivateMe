Things to do if you want to work on this by yourself..

1) npm install --save express@next morgan cors nodemon
2) npm install --save bcrypt colors dotenv pg
3) npm install --save jsonwebtoken
(you could do all the top 3 steps in 1 step but up to you)

4) psql -f motivateme.sql
    a) then click enter (to clear the database and start over if you want)

5) npm run dev

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