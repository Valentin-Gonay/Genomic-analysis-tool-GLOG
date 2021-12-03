import blast_process
import init
import sys

if sys.argv[1]=='init':
    print(init.exec_init())

if sys.argv[1]=='blastn':
    print(blast_process.blastn(sys.argv[2],sys.argv[3]))

if sys.argv[1]=='input':
    blast_process.writeinput(sys.argv[3],sys.argv[3])