import os
import subprocess

# Comprobar si Python está instalado
try:
    subprocess.check_call(['python3', '--version'])
except subprocess.CalledProcessError:
    print("Python no está instalado. Por favor, instálalo primero.")
    exit(1)

# Comprobar si pip está instalado
try:
    subprocess.check_call(['pip3', '--version'])
except subprocess.CalledProcessError:
    print("pip no está instalado. Intentando instalarlo...")
    os.system('sudo apt install python3-pip')

# Comprobar si snap está instalado
try:
    subprocess.check_call(['snap', '--version'])
except subprocess.CalledProcessError:
    print("snap no está instalado. Intentando instalarlo...")
    os.system('sudo apt install snapd')

# Comprobar si prusa-slicer está instalado
try:
    subprocess.check_call(['snap', 'list', 'prusa-slicer'])
except subprocess.CalledProcessError:
    print("prusa-slicer no está instalado. Intentando instalarlo...")
    os.system('sudo snap install prusa-slicer')

# Comprobar si flask está instalado
try:
    subprocess.check_call(['pip3', 'show', 'flask'])
except subprocess.CalledProcessError:
    print("flask no está instalado. Intentando instalarlo...")
    os.system('pip3 install flask')