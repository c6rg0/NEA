import subprocess
import os

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
print("$ tsc public/ts/play.ts...")
subprocess.run(["tsc", "public/ts/play.ts"])
print(">> done")
#print("$ tsc public/ts/create.ts...")
#subprocess.run(["tsc", "public/ts/create.ts"])
#print(">> done")
#print("$ tsc public/ts/form.ts...")
#subprocess.run(["tsc", "public/ts/form.ts"])
#print(">> done")
print("> All the source files have been compiled!")
print()

print(">> cleaning up...")
subprocess.run(["cp", "-v", "public/ts/play.js", "public/js/play.js"])
#subprocess.run(["cp", "-v", "public/ts/create.js", "public/js/create.js"])
#subprocess.run(["cp", "-v", "public/ts/form.js", "public/js/form.js"])

subprocess.run(["rm", "-v", "public/ts/play.js"])
#subprocess.run(["rm", "-v", "public/ts/create.js"])
#subprocess.run(["rm", "-v", "public/ts/form.js"])
print()
print("> All done! ")

