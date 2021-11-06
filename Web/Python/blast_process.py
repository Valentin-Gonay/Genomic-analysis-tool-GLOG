import subprocess

def create_serv(PATH,OS):
    PATH = PATH.strip('\n')
    PATH = PATH.strip('\r')
    p1 = subprocess.run([PATH+'makeblastdb', '-in', '../Data/BD/test.fsa','-dbtype', 'nucl'], capture_output=True, text=True, shell=(OS=='True'))
    print(p1.stdout)

def blastn(PATH,OS):
    PATH = PATH.strip('\n')
    PATH = PATH.strip('\r')
    p1 = subprocess.run(['blastn','-db', '../Data/BD/test.fsa', '-query' ,'js/ref_ALPHA.fasta','-out','../Data/data/resu.txt'], capture_output=True, text=True,shell=(OS=='True'))
    print(p1.stdout)
    print(p1.stderr)
    
