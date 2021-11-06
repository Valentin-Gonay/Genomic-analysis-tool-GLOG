from os import error
import platform
import subprocess



os=platform.system()
print(os)
typeerror=0
if os=="Linux":
    try:
        p1=subprocess.run(["blastn", "-version"] ,capture_output=True, text=True)
        res=(p1.stdout[0:5])
        if(res=='blast'):
            print('gg')
    except(error):
        print(error)
        typeerror=2
        print(typeerror)
elif "Windows" in os:
    try:
        p1=subprocess.run(["blastn", "-version"] ,capture_output=True, text=True,shell=True)
        res=(p1.stdout[0:5])
        if(res):
            print('gg')

    except(error):
        print(error)
        typeerror=2