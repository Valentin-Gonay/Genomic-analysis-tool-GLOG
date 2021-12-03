import subprocess

def create_serv(PATH,OS):
    PATH = PATH.strip('\n')
    PATH = PATH.strip('\r')
    p1 = subprocess.run([PATH+'makeblastdb', '-in', '/Data/BD/test.fsa','-dbtype', 'nucl'], capture_output=True, text=True, shell=(OS=='True'))
    print(p1.stdout)

def blastn(PATH,OS):
    PATH = PATH.strip('\n')
    PATH = PATH.strip('\r')
    p1 = subprocess.run([PATH+'blastn','-db', '/Data/BD/test.fsa', '-query' ,'Data/data/input.fasta','-out','/Data/data/resu.txt'], capture_output=True, text=True,shell=(OS=='True'))
    print(p1.stdout)

def writeinput(PATH,title,data):
    with open('input.fasta','w') as f:
        f.write('<',title)
        f.write(data)
        f.close
        return

    
