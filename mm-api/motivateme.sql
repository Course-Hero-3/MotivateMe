\echo 'Delete and recreate the motivateme database?'
\prompt 'Return for yes or Control-C to cancel > ' answer

DROP DATABASE motivateme;
CREATE DATABASE motivateme;
\connect motivateme;

\i motivateme-schema.sql
