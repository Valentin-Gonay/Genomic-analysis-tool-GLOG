from os import error
import platform
import subprocess
import sys

def test_blastn(PATH=""):

    os=platform.system()
    type_error=0
    if PATH!="":
        PATH+'/'
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

def source_config():
    config=open('config.txt','r')
    for line in config:
        if line[0:2]=="OS":
            if line[3:len(line)-1]=="Linux":
                OS=False
                temp=config.readline()
                PATH=temp[11:len(temp)]
                if test_blastn(PATH)==0:
                    return [OS,PATH]
            else:
                OS=False
                temp=config.readline()
                PATH=temp[11:len(temp)]
                if test_blastn(PATH)==0:
                    return [OS,PATH]
    return ['Error','Error']

def exec_init():
    os=platform.system()
    if test_blastn()==0:
        if os=="Linux":
           sys.stdout.write(False,"")
        else:
            sys.stdout.write(True,"")
    else:
        a=source_config()
        print(a)

exec_init()
print("a m'en branle")