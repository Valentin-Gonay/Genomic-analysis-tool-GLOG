import subprocess
#p1 = subprocess.run(['makeblastdb', '-in', '../Data/BD/test.fsa','-dbtype', 'nucl'], capture_output=True, text=True)
#print(p1.stdout)

p1 = subprocess.run(['blastn','-db', '../Data/BD/test.fsa', '-query' ,'js/ref_ALPHA.fasta','-out','../Data/data/resu.txt'], capture_output=True, text=True)
print(p1.stdout) 