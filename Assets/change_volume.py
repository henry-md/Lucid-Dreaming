from pydub import AudioSegment
from pydub.playback import play
# brew install ffmpeg

song = AudioSegment.from_mp3("./dream_check.mp3")
song_v2 = song - 9 # 1.5 bars
# play(song_v2)   #Play song

#save louder song 
song_v2.export("./dream_check_quiet.mp3", format='mp3')