CREATE DATABASE local_statistics;

CREATE TABLE statistics(
    id SERIAL PRIMARY KEY,
    concentration VARCHAR(255),
    measurement_date DATE
);