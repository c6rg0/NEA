import subprocess
import os
import time

subprocess.run(["clear"])

def remove_compiled():
    start = time.time()
    print("> Removing preexisting javascript files:")
    subprocess.run(["rm", "-rfv", "public/js/"])
    subprocess.run(["rm", "-rfv", "node_modules/routes/"])
    subprocess.run(["rm", "-rfv", "routes/"])
    subprocess.run(["rm", "-v", "server.js"])
    subprocess.run(["rm", "-v", "src/server.js"])
    subprocess.run(["rm", "-v", "public/particles/particles_app.js"])
    print()
    end = time.time()
    elapsed = round((end - start), 3)
    subprocess.run(["clear"])
    print(">> All clean! (completed in "+str(elapsed)+" seconds)")
    print()
    menu()

def compile():
    start = time.time()

    if os.path.isdir("public/js/"):
        print("> directory (public/js/) exists!")
        subprocess.run(["rm", "-rf", "public/js/"])
        print(">> (public/js/) has been removed")
        print()

    if os.path.isdir("routes/"):
        print("> directory (routes/) exists!")
        subprocess.run(["rm", "-rf", "routes/"])
        print(">> (routes/) has been removed")
        print()

    if os.path.isdir("node_modules/routes/"):
        print("> directory (routes/) exists!")
        subprocess.run(["rm", "-rf", "routes/"])
        print(">> (routes/) has been removed")
        print()

    print("> creating (public/js/)...")
    subprocess.run(["mkdir", "public/js/"])
    print(">> (public/js/) has been created")
    print()

    print("> Compiling source")

    print("[1/3] compiling server.ts. ")
    subprocess.run(["tsc", "src/server.ts", "--skipLibCheck"])
    print(">> done")

    print("[2/3] compiling play.ts.. ")
    subprocess.run(["tsc", "src/play.ts", "--skipLibCheck"])
    print(">> done")

    print("[3/3] compiling particles_app.ts...")
    subprocess.run(["tsc", "public/particles/particles_app.ts", "--skipLibCheck"])
    print(">> done")

    #print("[4/8] compiling create.ts.")
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
    subprocess.run(["cp", "-v", "src/routes/index.js", "node_modules/routes/index.js"])
    subprocess.run(["cp", "-v", "src/routes/browse.js", "node_modules/routes/browse.js"])
    subprocess.run(["cp", "-v", "src/routes/play.js", "node_modules/routes/play.js"])
    subprocess.run(["cp", "-v", "src/routes/create.js", "node_modules/routes/create.js"])

    subprocess.run(["rm", "-v", "src/server.js"])
    subprocess.run(["rm", "-v", "src/play.js"])
    #subprocess.run(["rm", "-v", "src/create.js"])
    #subprocess.run(["rm", "-v", "src/form.js"])
    subprocess.run(["rm", "-v", "src/routes/index.js"])
    subprocess.run(["rm", "-v", "src/routes/browse.js"])
    subprocess.run(["rm", "-v", "src/routes/play.js"])
    subprocess.run(["rm", "-v", "src/routes/create.js"])

    print()
    end = time.time()
    elapsed = round((end - start), 3)
    subprocess.run(["clear"])
    print(">> Compilation complete! (done in "+str(elapsed)+")")
    print()
    menu()



def refresh_database():
    start = time.time()
    print("> Removing databases")
    subprocess.run(["rm", "-v", "public/database/account.db"])
    subprocess.run(["rm", "-v", "public/database/quiz.db"])
    print(">> Removed databases!")
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
    end = time.time()
    elapsed = round((end - start), 3)
    subprocess.run(["clear"])
    print(">> Database rebuilt! (in "+str(elapsed)+" seconds)")
    print()
    menu()
    
def menu():
    print("PROJECT TOOL:")
    print("#############")

    print("(1) remove compiled code")
    print("(2) compile source ")
    print("(3) remove and remake database")
    print("(4) exit ")

    try:
        choice = int(input())
        print()

    except:
        subprocess.run(["clear"])
        print("Please enter a number (1-4)")
        print()
        menu()

    if choice == 1:
        print("##########################")
        print()
        subprocess.run(["clear"])
        print("Scrubing...")
        remove_compiled()

    if choice == 2:
        print("##########################")
        print()
        subprocess.run(["clear"])
        print("Building...")
        compile()

    if choice == 3:
        print("##########################")
        print()
        subprocess.run(["clear"])
        print("Remaking...")
        refresh_database()

    if choice == 4:
        print("##########################")
        print()
        print("Goodbye!")
        subprocess.run(["clear"])
        exit()
    



menu()


