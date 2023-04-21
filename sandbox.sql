-- CREATING DATABASE
CREATE DATABASE IF NOT EXISTS sandbox;

-- USING DATABASE
USE sandbox;

-- CREATING TABLE FOR PERMISSIONS
CREATE TABLE IF NOT EXISTS Permissions
(
    id                INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    description       VARCHAR(50) NOT NULL,
    creation_date     DATETIME    NOT NULL DEFAULT NOW(),
    modification_date DATETIME    NOT NULL,
    active            BOOL        NOT NULL DEFAULT 1
);

-- CREATING TABLE FOR USERS
CREATE TABLE IF NOT EXISTS User
(
    id                INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_permission     INT UNSIGNED,
    user_name         VARCHAR(50)  NOT NULL,
    password          VARCHAR(255) NOT NULL,
    creation_date     DATETIME     NOT NULL DEFAULT NOW(),
    modification_date DATETIME     NOT NULL,
    active            BOOL         NOT NULL DEFAULT 0,
    CONSTRAINT FK_UserPermission FOREIGN KEY (id_permission) REFERENCES Permissions (id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- CREATING TABLE FOR PRODUCTS
CREATE TABLE IF NOT EXISTS Product
(
    id             INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name           VARCHAR(100),
    description    VARCHAR(255),
    stock_quantity INT,
    price          DECIMAL(8, 2)
);

-- INSERTING SOME DATA TO BEGIN WITH
INSERT INTO Permissions
    (description, modification_date)
VALUES ('Administrator', NOW()),
       ('User', NOW()),
       ('Moderator', NOW());

INSERT INTO Product (name, description, stock_quantity, price)
VALUES ('Razer Naga Trinity',
        'Souris Gaming Filaire Modulaire avec Panneaux latéraux Interchangeables (Capteur Optique 5G de 16000 DPI, 19+1 Boutons programmables, 3 Panneaux Latéraux) Noir',
        5, 99.99),
       ('MacBook Pro 2018',
        'Ordinateur portable avec écran Retina 15,4" - Processeur Intel Core i7 quadricœur à 2,5 GHz - Mémoire 16Go - Stockage SSD 512Go - WiFi - Bluetooth - Lecteur de cartes SD - Port HDMI - 2 ports Thunderbolt 2 - Jusqu\'à 8h d\'autonomie - Mac OS X Maverick',
        1, 1499.99);

INSERT INTO User (id_permission, user_name, password, modification_date)
VALUES (1, 'admin', '$2b$10$afRlx8Ao19st0We/8/FR6ONSQDYsFpTebqhZ.lDGfGiGPrvvrr1Gi', NOW()),
       (2, 'test', '$2b$10$scwLnDny150hvz5ojUqqe.v7PcPq/7r3eMyuAmLUzZ6SGoaDCMLOe', NOW()),
       (3, 'mod', '$2b$10$11wOc9V0YSXTEDu0pLPmVej2679jfTGGBfJbpIWeAXka0WV/emnw6', NOW());