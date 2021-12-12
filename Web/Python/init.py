'''
    12/12/2021

    Quentin CAPUZET
    Loïc PERON
    Valentin GONAY
    Gregory BORDIER
    Thomas BAUDEAU
    Elie BORDRON

    Python file for getting blast path and version

    version 1.0.0 
'''


from os import error
import platform
import subprocess
import sys

def test_blastn(PATH=""):

    os=platform.system()
    type_error=0
    if PATH!="":
        PATH+='/'
    if os=="Linux":
        try:
            p1=subprocess.run([PATH+"blastn", "-version"] ,capture_output=True, text=True)
            res=(p1.stdout[0:5])
            if(res != 'blast'):
                type_error = 1
        except(error):
            type_error=2

    elif "Windows" in os:
        try:
            p1=subprocess.run([PATH+"blastn", "-version"] ,capture_output=True, text=True,shell=True)
            res=(p1.stdout[0:5])
            if not (res):
                type_error = 1
        except(error):
            type_error = 2
    return type_error

def find_src_config():
    config=open('../config.txt','r')
    for line in config:
        if line[0:10] == "Blast_Path":
            PATH = line[11:len(line)-1]
            type_error=test_blastn(PATH)
            if type_error==0:
                return PATH
    raise  ValueError('Error blast directory not found',type_error) 


def exec_init():
    os=platform.system()
    a=find_src_config()
    if len(a)!=0:
        a+='/'
    return a