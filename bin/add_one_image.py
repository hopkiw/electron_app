#!/usr/bin/env python3

import os
import sys
import sqlite3


def get_files(extensions, root):
  def valid_ext(filename):
    return any(map(lambda x: filename.endswith(x), extensions))

  paths = []
  for dirname, _, filenames in os.walk(root, followlinks=True):
    for filename in filenames:
      if valid_ext(filename):
        path = os.path.join(dirname, filename)
        paths.append(path.lstrip(root))

  return paths


def main():
  path = sys.argv[1]

  con = sqlite3.connect('test.db')
  cur = con.cursor()

  cur.execute('INSERT OR IGNORE INTO paths (path) VALUES(?)', (path,))
  con.commit()


main()
