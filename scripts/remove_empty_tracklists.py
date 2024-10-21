import csv
import music_entries
from pathlib import Path

TRACKLISTS_PATH = Path.joinpath(music_entries.ENTRIES_PATH, "tracklists")

paths = [p for p in Path(TRACKLISTS_PATH).iterdir() if p.is_file()]

for path in paths:
    delete_file = False
    with open(path, newline="", encoding="utf-8") as file:
        if len(list(csv.reader(file))[1:]) < 1:
            delete_file = True
    if delete_file:
        print(f'Deleting {path}')
        path.unlink(True)