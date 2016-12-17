'use strict';

import React , {Component} from 'react';

import {
  Platform,
  Switch,
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  BackAndroid,
  Dimensions,
  Modal,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight
} from'react-native';
import IcoButton from 'funshare/src/components/icobutton';
import Swiper from 'react-native-swiper';
import Routes from 'funshare/Routes';
import ImageViewer from 'react-native-image-zoom-viewer';
import firebase from 'firebase';
import FCM from 'react-native-fcm';
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
var modalheight = Dimensions.get('window').height/2 ;
var images=[];
var image=[] ;
const imagesViewer = [];
const styles = StyleSheet.create({
  wrapper: {

  },

  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  Mcontainer: {flex:1 ,  justifyContent: 'flex-end', }, 
  MinnerContainer: {flex:1,justifyContent:'flex-end' },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  item: {
    
    width:deviceWidth/4,
    height: 80,
    borderColor: '#efefef',
    borderWidth: 1,
    margin:8,
    borderRadius:10,
  },
  image: {
    flex:1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius:10,
    width:deviceWidth/4-2,
    height: 78 ,
  },
  textinput: {
    fontWeight:'bold',
    backgroundColor: 'white',
    color: 'black',
    fontSize: 13,
    flex:1
  },
  description: {
    textAlignVertical:'top',
    backgroundColor: 'white',
    alignItems:'flex-start',
    marginTop:0,
    color: 'black',
    fontSize: 13,
    flex: 1,
  },
})

export default class details extends Component { 
 rami() {

  var images= [null];
  return new Promise((next, error) => {

    var self = this; 
    var i = 0;
    var num=0;
    var uid = firebase.auth().currentUser.uid;
    firebase.database()
    .ref('items')
    .child(uid)
    .once('value')
    .then(function(snapshot) {
     num =snapshot.numChildren();
        // alert(num);
        snapshot.forEach(function(childSnapshot) {

          firebase.database()
          .ref('items')
          .child(uid).child(childSnapshot.key).once('value').then(function(snapshot) {
            var piclink = snapshot.val().itemPic;
            var desc = snapshot.val().description;
            var title = snapshot.val().title;
            var keyOfOfferedItem = snapshot.key;
            var uidOfOfferingUser = snapshot.val().uid ;
            
            images.push(
          <View style = {{flex:1}} Key={piclink} >
               <TouchableOpacity
               Key={piclink}
               activeOpacity={ 0.9 }
               style={ styles.item }
                       onPress={self.addtooffereditems.bind(this,desc,piclink,title,uidOfOfferingUser,keyOfOfferedItem,self)}
                       >

                       <View style = {{flex:1}} Key={piclink}>
                       <Image
                       Key={piclink}
                       resizeMode={Image.resizeMode.cover}
                       style={ styles.image }
                       source={{uri: piclink}}
                       /> 
                       </View>    
                       
                       </TouchableOpacity>
                       </View> );

            i++;
            if (i==num){


              next(images);
            }

          });
        })
      });
  }); 
}

_renderImage(){


 this.rami().then((images) => {
   image = images;



 });
    //alert(image.length);
    return image;

  }
  componentDidMount() {
      var self=this;

      BackAndroid.addEventListener('hardwareBackPress', () => {

        self.goBack();
        return true;

      });
      FCM.getFCMToken().then(token => {

        //console.log(token);
        // store fcm token in your server
      });
      this.notificationUnsubscribe = FCM.on('notification', (notif) => {
        // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
      });
      this.refreshUnsubscribe = FCM.on('refreshToken', (token) => {
        console.log(token)
        // fcm token may not be available on first load, catch it here
      });

      FCM.subscribeToTopic('/topics/foo-bar');
      FCM.unsubscribeFromTopic('/topics/foo-bar');


       
    
    
    }

componentWillMount() {
    

  }
   componentWillUnmount() {
    // prevent leaking
    this.refreshUnsubscribe();
    this.notificationUnsubscribe();
  }
  constructor(props) {
    super(props);
    
    this.state = {
      visible: false,
      title:this.props.title,
      desc:this.props.desc,
      piclink:this.props.piclink,
      gback:this.props.gback,
      uidOfLikedItem:this.props.uidOfLikedItem,
      keyOfWantedItem:this.props.keyOfWantedItem,
      
      modalVisible:false
     //profilePicture:"http://domaingang.com/wp-content/uploads/2012/02/example.png"
   }
 
   
 }
addtofavorite(){
 
  var offerData = {
            keyOfWantedItem: this.state.keyOfWantedItem,
            uidOfLikedItem: this.state.uidOfLikedItem,   
            created:firebase.database.ServerValue.TIMESTAMP
          };
  var uploadTask = firebase.database()
      .ref('profiles')
      .child(currentUserGlobal.uid)
      .child('favorite');

 
  var favoriteKey = uploadTask.push(offerData).key ;


}
addtooffereditems(desc,piclink,title,uidOfOfferingUser,keyOfOfferedItem,self){
 
  var offerData = {
            uidOfLikedItem: self.state.uidOfLikedItem,
            keyOfWantedItem: self.state.keyOfWantedItem,
            uidOfOfferingUser: uidOfOfferingUser,
            keyOfOfferedItem: keyOfOfferedItem,
            offerAccepted:0,
            offerConfirmedByOfferingUser:0,
            offerStatus:"pending approval",
            created:firebase.database.ServerValue.TIMESTAMP
          };
  var uploadTask1 = firebase.database()
          .ref('Offers')
          .child(uidOfOfferingUser);
  var offerKey = uploadTask1.push(offerData).key ;
  //console.log("offer key :",offerKey); 
    var notificationData = {
            uidOfLikedItem: self.state.uidOfLikedItem,
            keyOfWantedItem: self.state.keyOfWantedItem,
            uidOfOfferingUser: uidOfOfferingUser,
            keyOfOfferedItem: keyOfOfferedItem,
            offerAccepted:0,
            offerConfirmedByOfferingUser:0,
            offerStatus:"pending approval",
            offerKey:offerKey,
            created:firebase.database.ServerValue.TIMESTAMP,
            seen:0
          };
  var uploadTask2 = firebase.database()
          .ref('Notifications')
          .child(self.state.uidOfLikedItem)
          .child('Unseen'); 
  var notificationKey = uploadTask2.push(notificationData).key;

}

 setImage(){
  imagesViewer= []
  var link = {url: this.state.piclink}
  imagesViewer.push(link)
  var visible = !this.state.visible
  this.setState({visible: visible});
}
_setModalVisible = (visible) => {
  this.setState({modalVisible: visible});
}
renderImages(){
  var images = []

  images.push(



    <TouchableOpacity
    Key={this.state.piclink}
    onPress = {() => this.setImage()}
    style = {{flex:1}}
    >
    <Image
    Key={this.state.piclink+"8"}
    style={{flex:1,width:null, height:null}}
    source={{uri: this.state.piclink}}>
    <View Key={this.state.piclink+"7"} style = {{flex:0.8}}>
    <View Key={this.state.piclink+"6"} style= {{
      
      position:'absolute',
      justifyContent:'center',

      width:50,
      height:50,

    }}>

    <TouchableHighlight
     Key={this.state.piclink+"1"}
    underlayColor = {'rgba(0, 0, 0, 0.2)'}
    style= {{flex:1 }}
    onPress={this.goBack.bind(this)}
    >  
    <Image
    Key={this.state.piclink+"5"}
    source={require('funshare/src/img/arrow.png')}
    style={{width:25, height:25, margin:10}}
    />
    </TouchableHighlight>
    </View>

    </View>
    <View  Key={this.state.piclink+"2"} style = {{flex:0.2,alignItems:'flex-start' , backgroundColor:'rgba(0, 0, 0, 0.5)' }}>
    <View  Key={this.state.piclink+"3"} style = {{flexDirection:'row' ,flex:1 , margin:5}}>
    
    
    <Text  Key={this.state.piclink+"4"} style = {{fontSize:16, fontWeight:'bold' , color:'white'}} >User name</Text>
    
    </View>
    </View>
    </Image> 

    </TouchableOpacity>

    )
    return images;
  }
  goBack(){

    if(this.state.gback=="wishlist")
      this.props.replaceRoute(Routes.wishlist());
    else
      this.props.replaceRoute(Routes.Home());
  }

  render() {


    return (

    <View style={{flex:1}}>


    <Modal
    animationType={'fade'}
    transparent={true}
    visible={this.state.modalVisible}
    onRequestClose={() => {this._setModalVisible.bind(this, false)}}
    >

    <View style={ {flex:1 ,justifyContent:'flex-end' } }>

    <View style= {{height:modalheight , backgroundColor:   'rgba(0, 0, 0, 0.7)'}} >
    <Text style={{color:'white', fontSize:16 , marginLeft:8}}>Meine offered Objekte</Text>

    <View>
    <ScrollView
    horizontal={true}
    style= {{ height: 400}} >
    
    <View style = {{ flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: "center" }}>
      {this._renderImage()}
      </View>
      </ScrollView>
      </View>

      <View style={{position:'absolute', bottom:10 ,flex:1,marginLeft:20,marginRight:20,flexDirection:'row',alignItems:'center', justifyContent:'center'}}>


      <View style={{flex:0.12,alignItems:'center'}}>
      </View>

      <View style={{flex:0.25,alignItems:'center'}}>
      <IcoButton
      onPress={this._setModalVisible.bind(this, false)}
      source={require('funshare/src/img/dislike.png')}
      icostyle={{width:60, height:60}}
      />
      </View>
      <View style={{flex:0.25,alignItems:'center' , marginTop:5}}>

      </View>

      <View style={{flex:0.25,alignItems:'center'}}>
      <IcoButton
      source={require('funshare/src/img/like.png')}
      onPress={this._setModalVisible.bind(this, true)}
      icostyle={{width:60, height:60}}
      />
      </View>

      <View style={{flex:0.12,alignItems:'center'}}>
      </View>

      </View>

      </View>
      </View>
      </Modal>


      <Modal visible={this.state.visible}  onRequestClose={() =>{this._setModalVisible.bind(this, false)}} transparent={true}>
      <View style = {{ height:40,
       backgroundColor:   'rgba(0, 0, 0, 1)'}}>
       <View style= {{
         margin:10,
         flexDirection:'row',
       }}>

       <IcoButton
       source={require('funshare/src/img/arrow.png')}
       onPress={()=>this.setImage()}
       icostyle={{width:25, height:25}}
       />
         </View>
       </View>
       <ImageViewer visible={true} imageUrls={imagesViewer}/>

       </Modal>
       <View style={{flex:.5}}>

       <Swiper style={styles.wrapper}
       height={deviceHeight/2}
       onMomentumScrollEnd={this._onMomentumScrollEnd}
       >

       {this.renderImages()}



       </Swiper>
       </View>

       <View style= {{flex:.5}}>
       <View style ={{flex:0.8 , flexDirection:'row' , marginTop:0 ,borderBottomWidth:1, borderColor:'#a9a9a9'}}>
       <TextInput
       multiline={true}
       numberOfLines = {2}
       //value={this.state.desc}
       value={this.state.desc}
       style={styles.textinput}
       editable={false}
       underlineColorAndroid="transparent"
       />

       </View>


       <View style ={{flex:3 , marginTop:0 ,borderBottomWidth:1, borderColor:'#a9a9a9'}}>
       <TextInput
       ref={(ref) => this.description = ref}
       value={this.state.title}
       editable={false}
       placeholderTextColor= '#a9a9a9'
       selectionColor='#6495ed'
       style={styles.description}
       autoCapitalize="none"
       autoCorrect={false}
       multiline={true}
       numberOfLines = {4}
       underlineColorAndroid="transparent"
       />
       </View>

       <View style={{position:'absolute', bottom:10 ,flex:1,marginLeft:20,marginRight:20,flexDirection:'row',alignItems:'center', justifyContent:'center'}}>


       <View style={{flex:0.12,alignItems:'center'}}>
       </View>

       <View style={{flex:0.25,alignItems:'center'}}>
       <IcoButton
       onPress={() => this.goBack()}
       source={require('funshare/src/img/dislike.png')}
       icostyle={{width:60, height:60}}
       />
       </View>
       <View style={{flex:0.25,alignItems:'center' , marginTop:5}}>
       <IcoButton
       onPress= {this.addtofavorite.bind(this)}
       source={require('funshare/src/img/wuncbt.png')}
       icostyle={{width:50, height:50}}
       />
       </View>

       <View style={{flex:0.25,alignItems:'center'}}>
       <IcoButton
       source={require('funshare/src/img/like.png')}
       onPress={this._setModalVisible.bind(this, true)}
       icostyle={{width:60, height:60}}
       />
       </View>

       <View style={{flex:0.12,alignItems:'center'}}>
       </View>

       </View>



       </View>
       </View>

       );
     }
   }