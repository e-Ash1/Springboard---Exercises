DROP DATABASE IF EXIST soccer_db;

CREATE DATABASE soccer_db;

\c soccer_db;

CREATE TABLE teams (
    team_id SERIAL PRIMARY KEY,
    team_name TEXT NOT NULL,
    founded_year INT,
    coach_name TEXT
);


CREATE TABLE players (
    player_id SERIAL PRIMARY KEY,
    player_name TEXT NOT NULL,
    team_id INT REFERENCES teams(team_id),
    position TEXT,
    birth_date DATE
);


CREATE TABLE referees (
    referee_id SERIAL PRIMARY KEY,
    referee_name TEXT NOT NULL,
    experience_level TEXT
);

CREATE TABLE matches (
    match_id SERIAL PRIMARY KEY,
    home_team_id INT REFERENCES teams(team_id),
    away_team_id INT REFERENCES teams(team_id),
    match_date DATE NOT NULL,
    season_id INT, 
    referee_id INT REFERENCES referees(referee_id)
);

CREATE TABLE goals (
    goal_id SERIAL PRIMARY KEY,
    match_id INT REFERENCES matches(match_id),
    scoring_player_id INT REFERENCES players(player_id),
    goal_time TIME
);


CREATE TABLE seasons (
    season_id SERIAL PRIMARY KEY,
    season_start DATE NOT NULL,
    season_end DATE NOT NULL
);


CREATE TABLE standings (
    team_id INT REFERENCES teams(team_id),
    season_id INT REFERENCES seasons(season_id),
    points INT DEFAULT 0,
    goals_for INT DEFAULT 0,
    goals_against INT DEFAULT 0,
    PRIMARY KEY (team_id, season_id)
);

-- Inserting data into 'teams'
INSERT INTO teams (team_name, founded_year, coach_name) VALUES ('FC Barcelona', 1899, 'Xavi Hernandez');
INSERT INTO teams (team_name, founded_year, coach_name) VALUES ('Real Madrid', 1902, 'Carlo Ancelotti');
INSERT INTO teams (team_name, founded_year, coach_name) VALUES ('Manchester United', 1878, 'Erik ten Hag');


-- Inserting data into 'players'
INSERT INTO players (player_name, team_id, position, birth_date) VALUES ('Lionel Messi', 1, 'Forward', '1987-06-24');
INSERT INTO players (player_name, team_id, position, birth_date) VALUES ('Karim Benzema', 2, 'Forward', '1987-12-19');
INSERT INTO players (player_name, team_id, position, birth_date) VALUES ('Bruno Fernandes', 3, 'Midfielder', '1994-09-08');


-- Inserting data into 'referees'
INSERT INTO referees (referee_name, experience_level) VALUES ('Mark Clattenburg', 'International');
INSERT INTO referees (referee_name, experience_level) VALUES ('Pierluigi Collina', 'International');
INSERT INTO referees (referee_name, experience_level) VALUES ('Howard Webb', 'International');


-- Inserting data into 'matches'
INSERT INTO matches (home_team_id, away_team_id, match_date, season_id, referee_id) VALUES (1, 2, '2023-03-15', 1, 1);
INSERT INTO matches (home_team_id, away_team_id, match_date, season_id, referee_id) VALUES (3, 1, '2023-03-22', 1, 2);


-- Inserting data into 'goals'
INSERT INTO goals (match_id, scoring_player_id, goal_time) VALUES (1, 1, '00:30:00');
INSERT INTO goals (match_id, scoring_player_id, goal_time) VALUES (1, 2, '00:45:00');


-- Inserting data into 'seasons'
INSERT INTO seasons (season_start, season_end) VALUES ('2023-08-01', '2024-05-31');
INSERT INTO seasons (season_start, season_end) VALUES ('2024-08-01', '2025-05-31');


-- Inserting data into 'standings'
INSERT INTO standings (team_id, season_id, points, goals_for, goals_against) VALUES (1, 1, 30, 25, 10);
INSERT INTO standings (team_id, season_id, points, goals_for, goals_against) VALUES (2, 1, 28, 22, 12);
