withings-baby-monitor
=====================

streams withings baby monitor

# pseudocode

```
step 1: login 

step 2: extract session_key from cookie

step 3: convert this giant curl command and insert sesion key:
curl 'https://healthmate.withings.com/baby/service/presence' -H 'Cookie: carrousselTuto=0; __utma=50172960.960976500.1414417444.1414417444.1414488797.2; __utmz=50172960.1414417444.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); w_ar=5; _BabenkoCommerce_GeoRedirect_withingsurl=store_us; frontend=sbeg52ahhvdj554qqirv8k3e76; session_key=3705-c3564859-0eeabb03; language=en_DE; current_user=5168021' -H 'Origin: https://healthmate.withings.com' -H 'Accept-Encoding: gzip,deflate' -H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8' -H 'Accept: */*' -H 'Referer: https://healthmate.withings.com/' -H 'X-Requested-With: XMLHttpRequest' -H 'Connection: keep-alive' -H 'DNT: 1' --data 'action=get&sessionid=3705-c3564859-0eeabb03&deviceid=618916' --compressed

step 4: build the rtmp url and produce the equivalent of this for the given platform
  rtmpdump -V -r "rtmp://212.83.131.103:1935/00:24:e4:09:91:44-32499ab4add77cb1359dc08ef969eba5/gentilflash.swf" -o - | /Applications/VLC.app/Contents/MacOS/VLC -
```
