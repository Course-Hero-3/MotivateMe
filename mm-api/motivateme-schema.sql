
-- Create all necessary table schema's
-- DATE: just day,month,year; 
-- TIME: just hour,minute,sec; 
-- TIMESTAMP: both DATE and TIME
-- entity
CREATE TABLE users (
    user_id SERIAL,
    email TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1), -- Must be in it, plus cannot be first character
    password TEXT NOT NULL CHECK (POSITION(' ' IN password) = 0), -- No spaces allowed in password
    username TEXT NOT NULL UNIQUE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    image TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    made_from TEXT DEFAULT 'APP', --two options: APP or GOOGLE and if from google, can only log in using google sign in
    phone TEXT NOT NULL DEFAULT '',
    PRIMARY KEY (user_id)
);

-- entity
CREATE TABLE tasks (
    task_id SERIAL,
    user_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT 'No description', -- If not supplied, empty string
    category TEXT NOT NULL DEFAULT 'No category', -- If not supplied, empty string
    due_date DATE NOT NULL DEFAULT (NOW() + INTERVAL '1 day'), -- Default to "today" if user doesn't specify when (this shouldn't be allowed in the frondend though
    due_time TIME NOT NULL DEFAULT (NOW()), -- From lines 17 and 18, default due date+time will be tomorrow at the time the activity was created 
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY (task_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE CASCADE
);

-- relationship
CREATE TABLE completed ( 
    task_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    score DOUBLE PRECISION,
    time_spent INTEGER NOT NULL DEFAULT 60, -- In minutes, default avg task is 1 hour
    people_with INTEGER NOT NULL DEFAULT 0,
    comment TEXT NOT NULL DEFAULT 'No comment',
    on_time BOOLEAN DEFAULT TRUE,
    public BOOLEAN DEFAULT TRUE,
    completed_at TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, task_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE CASCADE,
    FOREIGN KEY (task_id) REFERENCES tasks(task_id)
        ON DELETE CASCADE
);

-- relationship
CREATE TABLE follow (
    follower_id INTEGER NOT NULL,
    followee_id INTEGER NOT NULL,
    PRIMARY KEY (follower_id, followee_id),
    FOREIGN KEY (follower_id) REFERENCES users(user_id)
        ON DELETE CASCADE,
    FOREIGN KEY (followee_id) REFERENCES users(user_id)
        ON DELETE CASCADE
);
