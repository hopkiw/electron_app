#!/usr/bin/env python3

import sqlite3


def main():
  con = sqlite3.connect('./test.db')
  cur = con.cursor()

  sql = '''
SELECT paths.path, tags.tag
FROM filetags
INNER JOIN paths ON paths.id = filetags.pathId
INNER JOIN tags ON tags.id = filetags.tagId
'''
  for row in cur.execute(sql):
    print(row)


main()
