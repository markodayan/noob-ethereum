def rlp_encode(input):
  if isinstance(input,str):
    if len(input) == 1 and ord(input) < 0x80: return input
    else: return encode_length(len(input), 0x80) + input
  elif isinstance(input,list):
    output = ''
    for item in input: output += rlp_encode(item)
    return encode_length(len(output), 0xc0) + output

def encode_length(L,offset):
  if L < 56:
    return chr(L + offset)
  elif L < 256**8:
    BL = to_binary(L)
    return chr(len(BL) + offset + 55) + BL
  else:
    raise Exception("input too long")

def to_binary(x):
  print(x)
  if x == 0:
    return ''
  else:
    return to_binary(int(x / 256)) + chr(x % 256)

def add(x, y):
  return x + y

# x = rlp_encode("hello world")
# print(x)


y = to_binary(1201200210210210120027382674872347237422111111111119999999999999999999999999999111111111111111111112233434342343434324324234324234234324234234324324832482394238482349832843924823942384932483724592385789234574389574895723450692567702349678349068222314783289893478921012021012002012)
print(y)