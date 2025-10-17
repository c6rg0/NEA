import subprocess
import os
import time

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

    print("$ tsc public/particles/particles_app.ts...")
    subprocess.run(["tsc", "public/particles/particles_app.ts"])
    print(">> done")

    print("$ tsc public/ts/create.ts...")
    subprocess.run(["tsc", "src/create.ts"])
    print(">> done")

    #print("$ tsc public/ts/form.ts...")
    #subprocess.run(["tsc", "src/form.ts"])
    #print(">> done")

    print(">> All the source files have been compiled!")
    print()

    print("> Cleaning up...")
    subprocess.run(["cp", "-v", "src/server.js", "server.js"])
    subprocess.run(["cp", "-v", "src/play.js", "public/js/play.js"])
    subprocess.run(["cp", "-v", "src/create.js", "public/js/create.js"])
    #subprocess.run(["cp", "-v", "src/form.js", "public/js/form.js"])

    subprocess.run(["rm", "-v", "src/server.js"])
    subprocess.run(["rm", "-v", "src/play.js"])
    subprocess.run(["rm", "-v", "src/create.js"])
    #subprocess.run(["rm", "-v", "src/form.js"])
    print()
    print(">> All done! ")
    print()
    menu()

def remove_compiled():
    print("> Removing preexisting javascript files:")
    subprocess.run(["rm", "-rfv", "public/js/"])
    subprocess.run(["rm", "-v", "server.js"])
    subprocess.run(["rm", "-v", "public/particles/particles_app.js"])
    print()
    print(">> All done!")
    print()
    menu()

def refresh_database():
    print("> Removing databse")
    subprocess.run(["rm", "-rfv", "public/database/"])
    print(">> Removed database!")
    print("> Making database folder")
    subprocess.run(["mkdir", "-pv", "public/database/"])
    print(">> Made new database folder!")
    print()
    
    print("> Generating new database")
    print("> Running server")
    generation = subprocess.Popen(["node", "server.js"])
    
    time.sleep(1.25)
    if generation.poll() is None:
        generation.terminate()

    print("[DEBUG] Server thread has been killed!")
    print(">> Generated new database")
    print()
    print(">>All done!")
    print()
    menu()
    

    print()
    print(">> All done! ")
    print()
    menu()

def menu():
    print("PROJECT TOOL:")
    print("#############")

    print("(1) remove compiled code")
    print("(2) compile source ")
    print("(3) remove and remake database")
    print("(4) exit ")

    choice = int(input())
    print()

    if choice == 1:
        print("##########################")
        print()
        remove_compiled()

    if choice == 2:
        print("##########################")
        print()
        compile()

    if choice == 3:
        print("##########################")
        print()
        refresh_database()

    if choice == 4:
        print("##########################")
        print()
        print("Goodbye!")
        exit()

menu()


