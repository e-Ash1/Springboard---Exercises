DROP DATABASE IF EXISTS medical_center;

CREATE DATABASE medical_center;

\c medical_center;

CREATE TABLE centers(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE doctors(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    center_id INTEGER REFERENCES centers(id)
);

CREATE TABLE patients(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    age INT NOT NULL
);

CREATE TABLE patient_doctor(
    patient_id INT REFERENCES patients(id),
    doctor_id INT REFERENCES doctors(id),
    PRIMARY KEY (patient_id, doctor_id)
);

CREATE TABLE visits(
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(id),
    doctor_id INTEGER REFERENCES doctors(id),
    visit_date TIMESTAMP NOT NULL
);

CREATE TABLE diseases(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE visit_diseases(
    visit_id INTEGER REFERENCES visits(id),
    disease_id INTEGER REFERENCES diseases(id),
    PRIMARY KEY (visit_id, disease_id)
);

-- Inserts example data
INSERT INTO centers (name) VALUES ('Drexler Medical Center');


INSERT INTO doctors (name, center_id) VALUES ('Dr. Fennick', 1);

-- Inserts a patient
INSERT INTO patients (name, age) VALUES ('Adam Leary', 30);


INSERT INTO patient_doctor (patient_id, doctor_id) VALUES (1, 1);

-- Insert a visit records

INSERT INTO visits (patient_id, doctor_id, visit_date) VALUES (1, 1, '2023-11-25 10:00:00');
