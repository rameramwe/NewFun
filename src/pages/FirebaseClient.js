
 import firebase from 'firebase';
const API_URL = "https://fcm.googleapis.com/fcm/send";

class FirebaseClient {

  constructor() {
    this.sendData = this.sendData.bind(this);
    this.sendNotification = this.sendNotification.bind(this);
    this.sendNotificationWithData = this.sendNotificationWithData.bind(this);
  }

  sendNotification(token, title1,body1) {
    let body = {
    	"to": token,
      "notification":{
    		"title": title1,
    		"body": body1,
    		"sound": "default",
    		"click_action": "fcm.ACTION.HELLO"
    	},
    	"priority": "high"
    }

    this._send(JSON.stringify(body), "notification");
  }

  sendData(token) {
    let body = {
    	"to": token,
      "data":{
    		"title": "Simple FCM Client",
    		"body": "This is a notification with only DATA.",
    		"sound": "default",
    		"click_action": "fcm.ACTION.HELLO",
    		"remote": true
    	},
    	"priority": "normal"
    }

    this._send(JSON.stringify(body), "data");
  }

  sendNotificationWithData(token) {
    let body = {
      "to": token,
      "notification":{
    		"title": "Simple FCM Client",
    		"body": "This is a notification with NOTIFICATION and DATA (NOTIF).",
    		"sound": "default",
    		"click_action": "fcm.ACTION.HELLO"
    	},
    	"data":{
    		"title": "Simple FCM Client",
    		"body": "This is a notification with NOTIFICATION and DATA (DATA)",
    		"click_action": "fcm.ACTION.HELLO",
    		"remote": true
    	},
    	"priority": "high"
    }

    this._send(JSON.stringify(body), "notification-data");
  }

  _send(body, type) {
  	let headers = new Headers({
  		"Content-Type": "application/json",
  		"Content-Length": parseInt(body.length),
      "Authorization": "key=AAAAvJ7ftho:APA91bGLjKE855bjv6NhnE7xWbUH9789u0ai4aYlF_22MEXE7fnLZgYY9z_0mTYSaZhfDFeE6s19dwpRdDdVSmAZxCppF5nxw8msWc3DbD6SDVLA87b77wO2uwpqOB-VLwhWltiykKL9eKhxuRLS0-TsbmidDg_2bw" 
  	});

  	fetch(API_URL, { method: "POST", headers, body })
  		.then(response => console.log("Send " + type + " response", response))
  		.catch(error => console.log("Error sending " + type, error));

  }

}

let firebaseClient = new FirebaseClient();
export default firebaseClient;