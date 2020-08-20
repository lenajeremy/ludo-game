def pigTranslator(string):
  def changeString(string):
    newstring = ''
    newstring+= string[1:len(string)] + string[0] + 'ay';
    return newstring
  
  returnString = ''
  for word in list(map(lambda x: changeString(x), string.split(' '))):
    returnString+=word + ' '
  return returnString.rstrip()
      
encrypted = pigTranslator('This is some really shitty stuff');

def decryptor(string):
  normalString = ''
  
  def decrypt_word(word):
    return word[-3] + word[0:len(word) -3] + ' '
  
  for word in string.split(' '):
    normalString +=decrypt_word(word)
    
  return normalString.rstrip()


print(encrypted)
print(decryptor(encrypted))

import json
students = {
  "boys": ['jeremiah', 'justin', 'indigo', 'latency'],
  'girls': ['inter', 'pishawa', 'olamide', 'oldare']
}
import os
print(os.getcwd())
print(os.listdir(os.getcwd()))

