from os import error
import platform
import subprocess

os=platform.system()
print(os)
typeerror=0
if os=="Linux":
    try:
        p1=subprocess.run(["blastn", "-version"] ,capture_output=True, text=True)
        print(p1.stdout[0:5])

    except(error):
        print(error)
        typeerror=2
elif "Windows" in os:
    try:
        p1=subprocess.run(["blastn", "-version"] ,capture_output=True, text=True,shell=True)
        print(p1.stdout[0:5])

    except(error):
        print(error)
        typeerror=2