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
import fetchblob from 'funshare/src/components/fetchblob';
import firebase from 'firebase';
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
var images=[];
var dummypicms=null;
const styles = StyleSheet.create({
  wrapper: {

  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  textinput: {

    backgroundColor: 'white',
    color: 'black',
    fontSize: 15,
    flex:1
  },
  description: {
   textAlignVertical:'top',
   backgroundColor: 'white',
   alignItems:'flex-start',
   marginTop:0,
   color: 'black',
   fontSize: 15,
   flex: 1,
 },
})
const imagesViewer = [];
export default class fuck extends Component {

 componentDidMount() {
  var self=this;
  BackAndroid.addEventListener('hardwareBackPress', () => {

    self.props.replaceRoute(Routes.mystuff());
    return true;

  });

}
constructor(props) {
  super(props);
  this.state = {
    visible: false,
    icategory:this.props.iteminfo.itemcategory,

    title:this.props.iteminfo.title,
    desc:this.props.iteminfo.desc,
    piclink:this.props.iteminfo.piclink,
    dummypic:{uri:this.props.iteminfo.piclink},
    picPath1:null,
    base64:null,
    itemkey:this.props.iteminfo.itemkey,
  }
  this.setImage();
}
setImage(){

  imagesViewer= []
  var link = {url: this.state.piclink}
  imagesViewer.push(link)
  var visible = !this.state.visible
  this.setState({visible: visible});
}
renderImages(){
  var images = []
  var self =dummypicms;

  images.push(


    <TouchableOpacity
    activeOpacity={1}  
    onPress = {() => this.setImage()}
    style = {{flex:1}}
    >
    <Image
    resizeMode={Image.resizeMode.stretch}
    style={{flex:1,width:null, height:null}}
    source={this.state.dummypic}>
    <View style= {{position:'absolute',
    alignItems:'center', justifyContent:'center',
    top:5,
    right:5,
    width:60,
    height:60,

  }}>
  <TouchableOpacity

  style= {{flex:1 }}
  onPress={this.calluploadphoto.bind(this)}
  >  
  <Image
  source={require('funshare/src/img/Icons_camera.png')}
  style={{width:30, height:30 }}
  />
  </TouchableOpacity>
  </View>
  

  </Image> 
  </TouchableOpacity>
  )
  return images;
}
calluploadphoto() {

 fetchblob.uploadphoto().then((picSetup) => {
  dummypicms=picSetup.source;
  this.setState({
   piclink:picSetup.source,
   dummypic:picSetup.source,  
   picPath1:picSetup.picPath,
   base64:picSetup.base64  
 });  

}, function(error) {
  alert("can't upload the photo")
});

}
update(){
/*update({
    description: this.state.desc,
    title: this.state.title,
    starCount: 0,
    itemPic: this.state.piclink,
    category:this.state.icategory,

  });
*/
}
remove(){
  var save=this;
 var uid=currentUserGlobal.uid;
  firebase.database()
  .ref('items').child(uid).child(this.state.itemkey).remove().then(function(){
    save.goBack();

  });
  


}
finish(){

  if(this.state.title &&this.state.picPath1&&this.state.description ){

   fetchblob.upload1(this.state.picPath1,this.state.title,this.state.description,
   this.state.category).then(( ) => {
     save.goBack();
   }, function(error) {
    alert("cann't save")
  });
}
else alert("mother sharmootah go add a pic and a title and a description ot i'll come and fuck you"); 
}

removeItem(){
  var uid = firebase.auth().currentUser.uid;
  firebase.database()
  .ref('items')
  .child(uid).child(this.state.key).remove();
}

goBack(){
  this.props.replaceRoute(Routes.mystuff());
}

_setModalVisible = (visible) => {
  this.setState({modalVisible: visible});
}

render() {
  const TopNavigation = () => (
  <View style={{ paddingTop:15,paddingBottom:10,padding:15 , flexDirection: 'row', backgroundColor: '#FF5C7E'}}>
  <View style={{ flex:0.2 , justifyContent:'center' , margin:5  }}>
  <TouchableOpacity
  onPress={this.goBack.bind(this)}
  style={{flex:1, justifyContent:'center'}}
  >
  <Image 
  source={require('funshare/src/img/arrow.png')}
  style={{width:20, height:20}}
  />

  </TouchableOpacity>
  </View>
  <View style={{ flex:0.2}}/>
  <View style={{ flex:0.2 , alignItems:'center', justifyContent:'center' , margin:5  }}>

  </View>

  <View style={{ flex:0.4 ,flexDirection:'row', alignItems:'flex-end', justifyContent:'center' , margin:5  }}>
  <TouchableOpacity
  style={styles.buttonStyle}
  onPress={this.remove.bind(this)}
  >
  <View style= {{alignItems:'center' , justifyContent:'center'}}>
  <Text style= {{fontSize:20 ,marginRight:5, fontWeight:'bold' , color:'white'}} >
  Delete
  </Text>
  </View>
  </TouchableOpacity>
  <TouchableOpacity
  style={styles.buttonStyle}
  onPress={this.update.bind(this)}
  >
  <View style= {{alignItems:'center' , justifyContent:'center'}}>
  <Text style= {{fontSize:20 , fontWeight:'bold' , color:'white'}} >
  Save
  </Text>
  </View>
  </TouchableOpacity>


  </View>

  </View>
  );


  return (

  <View style={{flex:1}}>

  <ScrollView
  style={{flex:1}}
  >
  <TopNavigation/>
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

   <View style={{height:deviceHeight/3}}>

   <Swiper style={styles.wrapper}
   height={deviceHeight/2}
   onMomentumScrollEnd={this._onMomentumScrollEnd}
   >

   {this.renderImages()}



   </Swiper>
   </View>

   <View style= {{ height:(deviceHeight-(deviceHeight/3)-90)}}>
   <View style ={{flex:2, marginTop:0 ,borderBottomWidth:1, borderColor:'#a9a9a9'}}>
 

   <TextInput
   onChangeText={(text) => this.setState({title: text})} 
   maxLength={87}
   multiline={true}
   numberOfLines = {2}
   value={this.state.title}
   editable={true} 
   placeholderTextColor= '#a9a9a9'
   selectionColor='#6495ed'
   style={styles.textinput}
   autoCapitalize="none"
   autoCorrect={false}
   returnKeyType="next"
   underlineColorAndroid="transparent"
   onSubmitEditing={() => this.description.focus()}
   />
   </View>


   <View style ={{flex:6 , marginTop:0 ,borderBottomWidth:1, borderColor:'#a9a9a9'}}>
   <TextInput
   ref={(ref) => this.description = ref}
   onChangeText={(text) => this.setState({desc: text})} 
   value={this.state.desc}
   maxLength={300}
   editable={true}
   placeholderTextColor= '#a9a9a9'
   selectionColor='#6495ed'
   style={styles.description}
   autoCapitalize="none"
   autoCorrect={false}
   multiline={true}
   underlineColorAndroid="transparent"
   />
   </View>
   </View>

   </ScrollView>

   </View>

   );
 }
}
