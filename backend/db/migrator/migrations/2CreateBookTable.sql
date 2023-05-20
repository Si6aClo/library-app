CREATE TABLE IF NOT EXISTS book
(
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER,
    name        TEXT(50),
    description TEXT(500),
    author      TEXT(30),
    count       INTEGER,
    FOREIGN KEY (category_id) REFERENCES category (id) ON DELETE CASCADE
)