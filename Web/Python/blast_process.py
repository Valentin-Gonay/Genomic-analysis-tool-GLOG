import subprocess

def create_serv(PATH,OS):
    PATH = PATH.strip('\n')
    PATH = PATH.strip('\r')
    p1 = subprocess.run([PATH+'makeblastdb', '-in', 'Data/BD/test.fsa','-dbtype', 'nucl'], capture_output=True, text=True, shell=(OS=='True'))
    print(p1.stdout)

def blastn(PATH,OS):
    PATH = PATH.strip('\n')
    PATH = PATH.strip('\r')
    # DB CREMI : Data/BD/blast_2-9/
    # DB home : Data/BD/blast_2-12/
    p1 = subprocess.run([PATH+'blastn','-db', 'Data/BD/blast_2-9/test.fsa', '-query' ,'Data/data/input.fasta','-out','Data/data/resu.txt'], capture_output=True, text=True,shell=(OS=='True'))
    print(p1.stdout)

def writeinput(title,data):
    with open('Data/data/input.fasta','w') as f:
        towrite=title+'\n'
        f.write(towrite)
        f.write(data)
        f.close()
        return

    
