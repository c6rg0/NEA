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
    print("> Removing node_module:")
    subprocess.run(["rm", "-rfv", "node_modules/"])
    print("~ DONE")
    end = time.time()
    elapsed = round((end - start), 3)
    subprocess.run(["clear"])
    print(">> All clean! (completed in "+str(elapsed)+" seconds)")
    print()
    menu()

# Broken
def refresh_database():
    start = time.time()
    print("> Removing databases")
    subprocess.run(["rm", "-v", "database/"])
    subprocess.run(["rm", "-v", "public/database/"])
    print(">> Removed databases!")
    print("> Making database folder")
    subprocess.run(["mkdir", "-pv", "database/"])
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
    print("#############")
    print("PROJECT TOOL:")
    print("#############")

    print("(1) remove compiled code")
    print("(2) remove and remake database")
    print("(q) exit ")

    try:
        choice = str(input())
        print()

    except:
        subprocess.run(["clear"])
        print("Please enter 1, 2 or q.")
        print()
        menu()

    if choice == "1":
        print("##########################")
        print()
        subprocess.run(["clear"])
        print("Scrubing...")
        remove_compiled()

    if choice == "2":
        print("##########################")
        print()
        subprocess.run(["clear"])
        print("Remaking...")
        refresh_database()

    if choice == "q" or "Q":
        print("##########################")
        print()
        print("Goodbye!")
        subprocess.run(["clear"])
        exit()
    
menu()
