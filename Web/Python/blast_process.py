import subprocess

def create_serv(PATH):
    p1 = subprocess.run([PATH+'makeblastdb', '-in', '../Data/BD/test.fsa','-dbtype', 'nucl'], capture_output=True, text=True)
    print(p1.stdout)

def blastn(PATH):
    p1 = subprocess.run([PATH+'blastn','-db', '../Data/BD/test.fsa', '-query' ,'js/ref_ALPHA.fasta','-out','../Data/data/resu.txt'], capture_output=True, text=True)
    print(p1.stdout) 