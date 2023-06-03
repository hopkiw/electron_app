#!/usr/bin/env python3

import sqlite3


def main():
  con = sqlite3.connect('./test.db')
  cur = con.cursor()

  for row in cur.execute('SELECT id, path FROM paths'):
    print(row)


main()
