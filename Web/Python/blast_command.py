import blast_process
import init
import sys

if sys.argv[1]=='init':
    print(init.exec_init())

if sys.argv[1]=='blastn':
    print(blast_process.blastn())