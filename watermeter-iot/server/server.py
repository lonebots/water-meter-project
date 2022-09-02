import requests
import os

#directory = "/home/projecta63/Desktop/project/ocr/"
directory = ""

with open(directory + "ocr_result.txt","r+") as file:
    ocr_result_list = file.read().splitlines()
    print("file read success")
 
digitcount_dic={}

final_value=""

final_ocr_list = [x for x in ocr_result_list if len(x) == 8 ]

#print(final_ocr_list)
#print(ocr_result_list)
        
for i in range(8):
    for j in ocr_result_list:
        if j[i] in final_ocr_list:
            digitcount_dic[j[i]] +=1
        else:    
            digitcount_dic[j[i]] =1        
    max_digit_count_result = max(digitcount_dic, key = digitcount_dic.get)
    final_value += max_digit_count_result
    digitcount_dic={}
print(final_value)


# #access your data
# current_reading = final_value
# consumer_no = 9874562
# role = "admin"

# data={"currentReading":current_reading,"consumerNumber":consumer_no,"role":role}
# #Construct the cURL bash
# http_address = "http://65.0.75.156/api/munci/raspi"
# max_digit_count_result=requests.post(http_address,data)
# #Invoke the command
# print(max_digit_count_result.text)


# close the file
file.close()
os.remove(directory+"ocr_result.txt") # remove the file
