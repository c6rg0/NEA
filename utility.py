import subprocess
import os

def compile(): 
    if os.path.isdir("public/js/"):
        print("> directory (public/js/) exists!")
        subprocess.run(["rm", "-rf", "public/js/"])
        print(">> (public/js/) has been removed")
        print()

    print("> creating (public/js/)...")
    subprocess.run(["mkdir", "public/js/"])
    print(">> (public/js/) has been created")
    print()

    print("> Compiling source...")

    print("$tsc server.ts")
    subprocess.run(["tsc", "src/server.ts"])
    print(">> done")

    print("$ tsc public/ts/play.ts...")
    subprocess.run(["tsc", "src/play.ts"])
    print(">> done")

    #print("$ tsc public/ts/create.ts...")
    #subprocess.run(["tsc", "src/create.ts"])
    #print(">> done")

    #print("$ tsc public/ts/form.ts...")
    #subprocess.run(["tsc", "src/form.ts"])
    #print(">> done")

    print(">> All the source files have been compiled!")
    print()

    print("> Cleaning up...")
    subprocess.run(["cp", "-v", "src/server.js", "server.js"])
    subprocess.run(["cp", "-v", "src/play.js", "public/js/play.js"])
    #subprocess.run(["cp", "-v", "src/create.js", "public/js/create.js"])
    #subprocess.run(["cp", "-v", "src/form.js", "public/js/form.js"])

    subprocess.run(["rm", "-v", "src/server.js"])
    subprocess.run(["rm", "-v", "src/play.js"])
    #subprocess.run(["rm", "-v", "src/create.js"])
    #subprocess.run(["rm", "-v", "src/form.js"])
    print()
    print(">> All done! ")
    print()
    menu()

def website_run():
    print("> Running server.js")
    print("> (Press [crtl + c] to quit")
    subprocess.run(["node", "server.js"])
    print()
    print(">> The server has been stopped")
    print()
    menu()

def remove_compiled():
    print("> Removing preexisting javascript files:")
    subprocess.run(["rm", "-rfv", "public/js/"])
    subprocess.run(["rm", "-v", "server.js"])
    print()
    print(">> All done!")
    print()
    menu()

def menu():
    print("PROJECT TOOL:")
    print("#############")
    print("(1) compile source ")
    print("(2) run the website")
    print("(3) remove compiled code")
    print("(4) exit ")

    choice = int(input())
    print()

    if choice == 1:
        print("##########################")
        print()
        compile()

    if choice == 2:
        print("##########################")
        print()
        website_run()

    if choice == 3:
        print("##########################")
        print()
        remove_compiled()

    if choice == 4:
        print("##########################")
        print()
        print("Goodbye!")
        exit()

menu()


