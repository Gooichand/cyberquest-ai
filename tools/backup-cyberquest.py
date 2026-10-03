#!/usr/bin/env python3
import argparse, datetime, zipfile
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
DEFAULT_OUT=ROOT/'backups'
EXCLUDE_PARTS={'.git','__pycache__','submission','backups','.venv'}

def main():
    parser=argparse.ArgumentParser(description='Create a local CyberQuest backup')
    parser.add_argument('--output', default='', help='output zip path')
    args=parser.parse_args()
    DEFAULT_OUT.mkdir(exist_ok=True)
    destination=Path(args.output) if args.output else DEFAULT_OUT/f"cyberquest-backup-{datetime.datetime.now().strftime('%Y%m%d-%H%M%S')}.zip"
    if not destination.is_absolute(): destination=ROOT/destination
    destination.parent.mkdir(parents=True,exist_ok=True)
    count=0
    with zipfile.ZipFile(destination,'w',zipfile.ZIP_DEFLATED) as archive:
        for path in ROOT.rglob('*'):
            if not path.is_file() or any(part in EXCLUDE_PARTS for part in path.relative_to(ROOT).parts): continue
            archive.write(path,path.relative_to(ROOT)); count+=1
    print(f'BACKUP_CREATED={destination}')
    print(f'FILES_INCLUDED={count}')
    return 0

if __name__=='__main__': raise SystemExit(main())
