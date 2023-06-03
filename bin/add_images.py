#!/usr/bin/env python3

import argparse
import os
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
  parser = argparse.ArgumentParser()
  parser.add_argument('-r', '--root', help='the filesystem root to use.',
                      default='./')
  parser.add_argument('-e', '--extensions',
                      help='file extensions to accept.',
                      default='jpg,jpeg,png,gif,webp,webm,avi,mp4,wmv,ogg'
                      ',.mkv')
  args = parser.parse_args()

  files = get_files(args.extensions.split(','), args.root)
  files = [(x,) for x in files]

  con = sqlite3.connect('test.db')
  cur = con.cursor()

  cur.executemany('INSERT OR IGNORE INTO paths (path) VALUES(?)', files)
  con.commit()

  for row in cur.execute('SELECT path FROM paths'):
    print(row)


main()
