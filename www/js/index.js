/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);

        var loginURL = 'https://account.withings.com/connectionuser/account_login'

        var ref = window.open(loginURL, '_blank', 'location=yes');

        window.ref = ref;

        var interval = setInterval(function() {
          try {
            var key = extractKey(ref);
            clearInterval(interval);
            console.log('got session key, move to step 3', key);
            getStreamURL('618916', key, function(err, url) {
              if (err) throw err;
              ref.window.close();
              alert(url)
            })
          } catch (err) {
            console.log('session key not set yet', err.stack);
          }
        }, 1000)
    }
};

var extractKey = function(ref){
  var pat = /session_key=(.+);/;
  var sessionKey = ref.window.document.cookie.match(pat)[1].split(';')[0];
  return sessionKey;
}

var getStreamURL = function(deviceId, key, callback) {
  var http = new XMLHttpRequest();
  var url = 'https://healthmate.withings.com/baby/service/presence';
  var params = "action=get&sessionid="+key+"&deviceid="+deviceId;
  http.open("POST", url, true);
  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
  http.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  http.onreadystatechange = function() {
    if (http.readyState == 4) {
      var data = JSON.parse(http.responseText);
      var ip = data.body.device.proxy_ip
      var hash = data.body.device.kp_hash
      var url = "rtmp://"+ip+":1935/"+hash+"/gentilflash.swf"
      callback(null, url)
    }
  }
  http.send(params);
}

app.initialize();
