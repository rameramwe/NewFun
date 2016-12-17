//This is the screen where it contains the chats with everybody
'use strict';
import React from 'react'; 
import{
  AppRegistry,
  AsyncStorage,
  Dimensions,
  Image,
  NativeModules,
  PropTypes,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ListView,
  Platform,
  Modal,
  Text
} from 'react-native';
import IcoButton from 'funshare/src/components/icobutton';
import IconBadge from 'react-native-icon-badge';
import StyleVars from 'funshare/StyleVars';
import Login from './login';
import firebase from 'firebase';
import Routes from 'funshare/Routes';
import DataStore from 'funshare/DataStore';
import Actions from 'funshare/Actions';
import SharedStyles from 'funshare/SharedStyles';
import IconButton from 'funshare/src/components/icotextButton';
var piclinks=[];

var deviceheight = Dimensions.get('window').height ;
const styles = StyleSheet.create({
   li: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  liText: {
    color: '#333',
    fontSize: 16,
  },
   separator: {
    alignSelf: 'flex-end',
     borderBottomWidth:1 , borderBottomColor:'#dcdcdc',
  
    width: Dimensions.get("window").width-100,
    
  },
 

  item: {


    flex:1,
    marginBottom:5,
    
  },

  container: {
    flex:1,
  },
  inputContainer: {
    margin:20, 
    marginTop:10,
    marginBottom:0   
  },
  input: {
    textAlign: 'center',
    fontSize: 18,
    color: '#FF4470',
    fontWeight: 'bold',
  },
  username: {
    textAlign: 'center',
    fontSize: 23,
    fontWeight: 'bold',
  },
  profilePictureContainer: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center"
  },
  btnContainer:{
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'row',
    marginBottom: 5
  },
  profilePicture: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 5,
  },
  footer: {
    bottom: 0,
    left: 0,
    right: 0,
    height: 48,
    alignItems: "center",
    marginTop:37,
    paddingVertical: 15,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.5)"
  },
  footerText: {
    color: "white",
    fontSize: 14
  },
  IContainer:{
    alignItems:'flex-start',
    padding:3,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  image:{
    height:60,
    width:60,
    borderRadius:30
  }
});

class AcceptedOffers extends React.Component {
  componentDidMount() {
     this.renderRow(); 
   } 
  constructor(props) {
    super(props);
    this.state = {
     animationType: 'fade',
     modalVisible: false,
     transparent: true,
     picOfWantedItem:null,
     picOfOfferedItem:null,
      dataSource: new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2,
  }) 
   };
 }


 goToHome()
 {
  this.props.replaceRoute(Routes.Home());
}
finishDeal(){
  
}

renderRow() {

    var images= [];
    return new Promise((next, error) => {

      var self = this; 
      var i = 0;
      var num=0;
      var uid = firebase.auth().currentUser.uid;
      firebase.database()
      .ref('Notifications')
      .child(uid)
      .child('Accepted')
      .once('value')
      .then(function(snapshot) {
       num =snapshot.numChildren();
        
        snapshot.forEach(function(childSnapshot) {
         var picOfWantedItem= "http://orig01.deviantart.net/ace1/f/2010/227/4/6/png_test_by_destron23.png";
         var picOfOfferedItem="http://orig01.deviantart.net/ace1/f/2010/227/4/6/png_test_by_destron23.png";
         var lastMessage=null;
         var oldRef=firebase.database()
         .ref('Notifications')
         .child(uid)
         .child('Unseen').child(childSnapshot.key);
         var newRef=firebase.database()
         .ref('Notifications')
         .child(uid)
         .child('Seen').child(childSnapshot.key);
         var snapVal=null;
         firebase.database()
         .ref('Notifications')
         .child(uid)
         .child('Accepted').child(childSnapshot.key).once('value').then(function(snapshot) {
          snapVal=snapshot.val();
          firebase.database().ref('items').child(snapshot.val().uidOfOfferingUser)
          .child(snapshot.val().keyOfOfferedItem).once('value').then(function(snapshot1){
           // console.log(snapshot1);
             picOfOfferedItem= snapshot1.val().itemPic;
          }).then(function(){
            firebase.database().ref('items').child(snapshot.val().uidOfLikedItem)
          .child(snapshot.val().keyOfWantedItem).once('value').then(function(snapshot2){
           // console.log(snapshot2);
             picOfWantedItem= snapshot2.val().itemPic;
    
          
              
          }).then(function(){
                      firebase.database()
              .ref('Offers')
              .child(snapshot.val().uidOfOfferingUser)
              .child(snapshot.val().offerKey)
              .child('OfferMessages').child('0').once('value').then(function(snapshot3) {
                
                if(snapshot3.val()===null)lastMessage="Start talking Now !!";
                else
                lastMessage=snapshot3.val().text;

              }).then(function(){
            var iteminfo = {
                     created: snapshot.val().created ,
                     keyOfOfferedItem: snapshot.val().keyOfOfferedItem ,
                     keyOfWantedItem: snapshot.val().keyOfWantedItem ,  
                     itemkey: snapshot.key ,
                     offerAccepted: snapshot.val().offerAccepted,
                     offerConfirmedByOfferingUser: snapshot.val().offerConfirmedByOfferingUser,
                     offerKey: snapshot.val().offerKey,
                     offerStatus: snapshot.val().offerStatus,
                     seen: snapshot.val().seen,
                     uidOfLikedItem: snapshot.val().uidOfLikedItem,
                     uidOfOfferingUser: snapshot.val().uidOfOfferingUser,
                     picOfOfferedItem:picOfOfferedItem,
                     picOfWantedItem:picOfWantedItem,
                     lastMessage:lastMessage,
                      }


                    // console.log(iteminfo);
         // alert(itemcategory)
          piclinks.push(iteminfo);
          images.push(

                <View  style={{flex:1}}>

                <View style = {{flex:1,paddingTop:8, paddingBottom:12, paddingLeft:20, flexDirection:'row' ,backgroundColor:'white'}} >

                <View style = {{flex:0.6 , flexDirection:'row', justifyContent:'flex-start' , alignItems:'center'}}>
                <Image
                style={ styles.image }
                source={{uri:picOfWantedItem}}
                /> 
 
                </View>

                <View style = {{flex:0.4 , flexDirection:'row', justifyContent:'center'}}>
          

                  <TouchableOpacity
                  style = {{flex:0.5 , justifyContent:'center' , alignItems:'center'}}
                  onPress={self.goChat.bind(self, iteminfo)}
                  >
                  <View>
                  <Text
                  style={{fontSize:20 , fontWeight:'bold'}}>

                 {iteminfo.lastMessage}
                  </Text> 
                  </View>
                  </TouchableOpacity>

                  </View>

                  </View>
                  </View>

                          );
                  i++;
            if (i==num){

             self.setState({
              dataSource: self.state.dataSource.cloneWithRows(images)
    
            });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
            next(images);
          }

           });

          })






        });
         
          
          

            

        });

      })

   
    });

  }); 
}


_setModalVisible = (visible,picOfOfferedItem,picOfWantedItem,newRef,snapVal,oldRef) => {
  if (newRef){
    newRef.set( snapVal, function(error) {
               if( !error ) {  oldRef.remove(); }
               else if( typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
          });
  }
  

  this.setState({modalVisible: visible ,picOfOfferedItem:picOfOfferedItem , picOfWantedItem:picOfWantedItem });
}
goChat(iteminfo){
  this.props.replaceRoute(Routes.OfferChat(iteminfo));
}

render() {
 const TopNavigation = () => (
  <View style={{ padding: 10, flexDirection: 'row', backgroundColor: '#FF5C7E' }}>


  <View style={{ flex:0.4 , alignItems:'flex-start', justifyContent:'center' , margin:5  }}>
  <IcoButton

  source={require('funshare/src/img/swop.png')}
  onPress={this.goToHome.bind(this)}
  icostyle={{width:35, height:35}}
  />
  </View>
  <View style={{ flex:0.2 , alignItems:'center', justifyContent:'center'   }}>
  <IcoButton
  source={require('funshare/src/img/f.png')}
  icostyle={{width:45, height:45}}
  />
  </View>

  <View style={{ flex:0.4 , justifyContent:'center' , margin:5  }}>
  </View>
  </View>
  );
 return (
  <View style = {styles.container}>  
  <TopNavigation/>  
  <ScrollView>
  <View style ={{flex:2,flexDirection:'row',  alignItems:'center',
  justifyContent:'center'
}}>

<Modal
animationType={this.state.animationType}
transparent={this.state.transparent}
visible={this.state.modalVisible}
onRequestClose={() => {this._setModalVisible(false)}}
>

<View style={ {flex:1} }>

<View style= {{ height:deviceheight, backgroundColor:   'rgba(0, 0, 0, 0.9)'}} >
<View style= {{alignItems:'center'}} >
<Text style={{color:'white', fontSize:40,fontWeight:'bold',marginTop:25}}>Glückwunsch</Text>
<Text style={{color:'white', fontSize:30,fontWeight:'bold',marginTop:25}}>it's a Deal!</Text>
</View>

<View style = {{alignItems:'center' , marginTop:25}}>
<Image 
resizeMode={Image.resizeMode.contain}
source={require('../img/Logo.png')}
style={{height:40, width:40}}                                
/>

</View>


<View style = {{flexDirection:'row', flex:1 ,justifyContent:'center' }}>
<View style = {{  flex:0.5 ,alignItems:'center' }}>
<Image  
source={{uri:this.state.picOfWantedItem}}
style={{height:100 , width:100 , borderRadius:50}}                                
/>
</View>
<View style = {{  flex:0.5 ,alignItems:'center' }}>
<Image 
 
source={{uri:this.state.picOfOfferedItem}}
style={{height:100 , width:100 , borderRadius:50}}                                
/>
</View>
</View>
<View style={{position:'absolute', bottom:30 ,flex:1,marginLeft:20,marginRight:20,flexDirection:'row',alignItems:'center', justifyContent:'center'}}>



<View style={{flexDirection:'row',flex:0.5 }}>
<Text style={{color:'white', fontSize:15 ,marginTop:18  }}>Abbrechen</Text>
<IcoButton
onPress={this._setModalVisible.bind(this, false)}
source={require('funshare/src/img/dislike.png')}
icostyle={{width:60, height:60}}
/>
</View>

<View style={{flexDirection:'row',flex:0.5 }}>

<IcoButton
source={require('funshare/src/img/like.png')}
onPress={this.finishDeal.bind(this)}
icostyle={{width:60, height:60}}
/>
<Text style={{color:'white', fontSize:15 ,marginTop:18  }}>Bestätigen</Text>
</View>



</View>

</View>
</View>
</Modal>

  <ListView
  dataSource={this.state.dataSource}
  renderRow={(rowData) => <View>{rowData}</View>}
  // renderSeparator={() => <View style={styles.separator} />}
   renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
  contentContainerStyle={{flex:1,paddingTop:20 ,backgroundColor:'white',}}/>








  </View>

  </ScrollView>
  </View>

  );
}

}


export default AcceptedOffers;