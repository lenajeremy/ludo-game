import os
allHTMLFiles = []
os.chdir('/home/jerryscript/Desktop/BOOM/')
for path, directories, files in os.walk(os.getcwd()):
  for file in files:
    if file.endswith('html'):
      allHTMLFiles.append(file)

print(allHTMLFiles)
print(len(allHTMLFiles))