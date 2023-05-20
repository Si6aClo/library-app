import os
import sqlite3

from config import get_settings


def main():
    files = os.listdir("migrations")
    engine = sqlite3.connect("../../" + get_settings().SQLITE_PATH)
    cursor = engine.cursor()
    for name in files:
        file = open(f"./migrations/{name}", 'r')
        query = file.read()
        cursor.execute(query)
        print(query, "complete")


if __name__ == "__main__":
    main()
