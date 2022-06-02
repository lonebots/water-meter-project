# library import
from picamera import PiCamera
import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BOARD)
import time

# define pinout to control relay
relay_pin = 7 #gpio_4
directory = "/home/pi/Desktop/projectasixtythree/integration/integration_results/meter_reading"
photo_count = 0

# initialize relay
print("relay OFF")
GPIO.setup(relay_pin,GPIO.OUT)
GPIO.output(relay_pin,GPIO.HIGH) #turn off the relay
print("initialize relay")

# switich ON relay
GPIO.output(relay_pin,GPIO.LOW) 
print("relay ON")
#time.sleep(5)

#intialize camera
camera = PiCamera()
time.sleep(2)
camera.resolution = (1280,720)
camera.vflip = True
camera.contrast = 10
print("initialize camera")

# take photo
camera.capture(directory+str(photo_count)+".jpeg")
print("photo capture")

# switch OFF relay
GPIO.output(relay_pin,GPIO.HIGH)
print("relay OFF")

# cleanup the pin signals
GPIO.cleanup()
print("done")
