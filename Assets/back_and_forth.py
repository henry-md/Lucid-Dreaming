import pyautogui
import time
import keyboard

# stops screen saver from going on.
while not keyboard.is_pressed("q"): # can only press q an instant every 40 mins, so basically useless.
    pyautogui.move(1, 1)
    time.sleep(2)
    pyautogui.move(-1, -1)
    time.sleep(2) # screen saver comes on after 20 minutes of inactivity