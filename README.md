withings-baby-monitor
=====================

a cordova app that gets the RTMP stream URL for your baby monitor

if you're not already logged into withings, you'll be presented with a login screen

once you're logged in, you'll be greeted with an rtmp url that looks something like this:

`rtmp://212.83.131.103:1935/00:24:e4:09:91:44-32499ab4add77cb1359dc08ef969eba5/gentilflash.swf`

you can use this url to watch your camera with rtmpdump and vlc, e.g.:

`rtmpdump -V -r "rtmp://..." -o - | /Applications/VLC.app/Contents/MacOS/VLC -`
