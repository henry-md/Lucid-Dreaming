# Lucid-Dreaming
- Plays soft but distinct music on a certain time interval given by user input, with the goal of aiding lucid dreaming.
- The idea is that hopefully the music gets incorporated into the dream, and you're able to recognize this and realize you're dreaming.
- In order to play the sound when it's supposed to -- late at night -- the computer would have to (1) not shut off, and (2) not go into sleep mode. To stop both, I created a back_and_forth.py python script that vibrates your mouse 1px back and forth every second so that the computer doesn't go to sleep. Note that even if you choose the settings option 'shut off never,' it will still go into sleep mode and distort the sound.
