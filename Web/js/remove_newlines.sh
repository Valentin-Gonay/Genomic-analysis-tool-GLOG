#filepath="/home/waren/Desktop/cours_M2/projet_GLOG/Genomic-analysis-tool-GLOG/Web/js/tmp_ALPHA.fasta"
tmp_filepath=$2
#this copies ref_ALPHA.fasta into tmp_ALPHA.fasta.
cp /home/waren/Desktop/cours_M2/projet_GLOG/Genomic-analysis-tool-GLOG/Web/js/ref_ALPHA.fasta /home/waren/Desktop/cours_M2/projet_GLOG/Genomic-analysis-tool-GLOG/Web/js/tmp_ALPHA.fasta
echo copying was done:
head $1
# this replaces '\n' with "x"
paste -s -d"x" $1 > $tmp_filepath
#echo action 1 was done:
#head $tmp_filepath
# this replaces "x" with ""
sed -i 's/x//g' $tmp_filepath 
#echo action 2 was done:
#head $tmp_filepath

