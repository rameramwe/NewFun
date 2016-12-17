'use strict';

import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  Switch,
  PropTypes,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Text,
  TouchableHighlight,
  AppRegistry,
  allert,
  BackAndroid
} from 'react-native';
import Share, {ShareSheet, Button} from 'react-native-share';
import IcoButton from 'funshare/src/components/icobutton';
import Routes from 'funshare/Routes';
import StyleVars from 'funshare/StyleVars';
  //import Button from 'funshare/src/components/button';
  import InputButton from 'funshare/src/components/icotextButton';
  import fetchblob from 'funshare/src/components/fetchblob';
  import firebase from 'firebase';
  var ImagePicker = require('react-native-image-picker');
  var deviceheight = Dimensions.get('window').height ;
  var devicewidth = Dimensions.get('window').width ;
  var Accordion = require('react-native-accordion');
  var mmv = 'funshare/src/img/arrowright.png';
  var images = [];
  var dummypicms=null;
  
  
  export default class addstuff extends Component {

    constructor(props) {
      super(props);
      this.state = {
       dummypic: null,
       title:null,
       description:null,
       falseSwitchIsOn:false,
       picPath1:null,
       open:false,
       category: null,
       visible: false,
       base64:null
     }
   }

   onCancel() {
    console.log("CANCEL")
    this.setState({visible:false});
  }
  onOpen() {
    console.log("OPEN")
    this.setState({visible:true});
  }
  _onInputButtonPressed(a,b) {

   this.setState({
    category:a,

    open:false

  });
 }

 calluploadphoto() {
  if(images.length<5)
  {
   fetchblob.uploadphoto().then((picSetup) => {
    dummypicms=picSetup.source;
    this.setState({
      dummypic:picSetup.source,  
      picPath1:picSetup.picPath,
      base64:picSetup.base64  
    });  
  }, function(error) {
    alert("can't upload the photo")
  });
 }
}
remove(images, item) {
  for(var i = arr.length; i--;) {
    if(images[i] === item) {
      arr.splice(i, 1);
    }
  }
}
componentDidMount(){
  images=[]
}
calluploadphoto1(){

}
goBack(){
  this.props.replaceRoute(Routes.mystuff());
}
renderImages(){

  var self =dummypicms;
  dummypicms=null;
  images.push(
    <TouchableOpacity
    >
    <Image
    source={self}
    style={{margin:4,width:40, height:40}}
    />
    </TouchableOpacity>
    )
  
  
  return images;
}

render()
{

  let shareOptions = {
    title: "Funshare",
    message: "My First App",
    url: "https://web.facebook.com/mohammad.sakka2",
      subject: "Share Link" //  for email
    };

    var shareImageBase64 = {
      title: this.state.title,
      message: this.state.description,
      url: this.state.base64,
      subject: "Share with Funshare" //  for email
    };

    var smallcontainer ={flex:1,alignItems:'flex-start'  };
    if (this.state.picPath1)
      smallcontainer={flex:1,alignItems:'flex-start' , backgroundColor:   'rgba(0, 0, 0, 0.5)' }
    var issellected ={ 

     flex: 0.5 ,
     flexDirection: "row",
     backgroundColor: '#00D77F',
     borderRadius:3,
     margin:7 ,


   }  ;
   var header=(
    <View style={{flex:2 ,flexDirection:"row" }}>

    <Image

    source={require('funshare/src/img/category.jpg')}

    style = {{flex:.1 ,width:25, height:25, marginRight:15}}
    />
    <Text style={{flex:.9 ,fontSize:17, fontWeight:"bold"}}>KATEGORIE AUSWÄHLEN</Text>

    </View>
    );


    var container = (
    <View style={{flex:1 }}>
    <View style={{flex:1 ,flexDirection:'row'}}>
    <InputButton
    value={"Hotswop"}
    container={this.state.category =="hotswop" ? issellected : null}
    source={require('funshare/src/img/categories/hotswop.png')}
    onPress={this._onInputButtonPressed.bind(this,"hotswop","funshare/src/img/categories/hotswop.png")}
    />
    <InputButton
    value={"Campus"}
    container={this.state.category =="campus" ? issellected : null}
    source={require('funshare/src/img/categories/campus.png')}
    onPress={this._onInputButtonPressed.bind(this, "campus","funshare/src/img/categories/campus.png")}
    />
    </View>
    <View style={{flexDirection:'row'}}>
    <InputButton
    value={"Design"}
    container={this.state.category =="design" ? issellected : null}
    source={require('funshare/src/img/categories/design.png')}
    onPress={this._onInputButtonPressed.bind(this,"design","funshare/src/img/categories/design.png")}
    />
    <InputButton
    value={"Family"}
    container={this.state.category =="family" ? issellected : null}
    source={require('funshare/src/img/categories/family.png')}
    onPress={this._onInputButtonPressed.bind(this, "family","funshare/src/img/categories/family.png")}
    />
    </View>
    <View style={{flexDirection:'row'}}>
    <InputButton
    value={"Events"}
    container={this.state.category =="events" ? issellected : null}
    source={require('funshare/src/img/categories/events.png')}
    onPress={this._onInputButtonPressed.bind(this,"events","funshare/src/img/categories/events.png")}
    />
    <InputButton
    value={"Fashion"}
    container={this.state.category =="fashion" ? issellected : null}
    source={require('funshare/src/img/categories/fashion.png')}
    onPress={this._onInputButtonPressed.bind(this, "fashion","funshare/src/img/categories/fashion.png")}
    />
    </View>
    <View style={{flexDirection:'row'}}>
    <InputButton
    value={"Green"}
    container={this.state.category =="green" ? issellected : null}
    source={require('funshare/src/img/categories/green.png')}
    onPress={this._onInputButtonPressed.bind(this,"green","funshare/src/img/categories/green.png")}
    />
    <InputButton
    value={"Food"}
    container={this.state.category =="food" ? issellected : null}
    source={require('funshare/src/img/categories/food.png')}
    onPress={this._onInputButtonPressed.bind(this, "food","funshare/src/img/categories/food.png")}
    />
    </View>
    <View style={{flexDirection:'row'}}>
    <InputButton
    value={"Mashine"}
    container={this.state.category =="mashine" ? issellected : null}
    source={require('funshare/src/img/categories/mashine.png')}
    onPress={this._onInputButtonPressed.bind(this,"mashine","funshare/src/img/categories/mashine.png")}
    />
    <InputButton
    value={"Musik"}
    container={this.state.category =="musik" ? issellected : null}
    source={require('funshare/src/img/categories/musik.png')}
    onPress={this._onInputButtonPressed.bind(this, "musik","funshare/src/img/categories/musik.png")}
    />
    </View>
    <View style={{flexDirection:'row'}}>
    <InputButton
    value={"Hipster"}
    container={this.state.category =="mustache" ? issellected : null}
    source={require('funshare/src/img/categories/mustache.png')}
    onPress={this._onInputButtonPressed.bind(this,"mustache","funshare/src/img/categories/mustache.png")}
    />
    <InputButton
    value={"Trödel"}
    source={require('funshare/src/img/categories/trodel.png')}
    container={this.state.category =="trödel" ? issellected : null}
    onPress={this._onInputButtonPressed.bind(this, "trödel","funshare/src/img/categories/trodel.png")}
    />
    </View>
    <View style={{flexDirection:'row'}}>
    <InputButton
    value={"Vintage"}
    container={this.state.category =="vintage" ? issellected : null}
    source={require('funshare/src/img/categories/vintage.png')}
    onPress={this._onInputButtonPressed.bind(this,"vintage","funshare/src/img/categories/vintage.png")}
    />
    <InputButton
    value={"Over18"}
    container={this.state.category =="over18" ? issellected : null}
    source={require('funshare/src/img/categories/over18.png')}
    onPress={this._onInputButtonPressed.bind(this, "over18","funshare/src/img/categories/over18.png")}
    />
    </View>
    <View style={{flexDirection:'row'}}>
    <InputButton
    value={"Sammler"}
    container={this.state.category =="sammler" ? issellected : null}
    source={require('funshare/src/img/categories/sammler.png')}
    onPress={this._onInputButtonPressed.bind(this,"sammler","funshare/src/img/categories/sammler.png")}
    />
    <InputButton
    value={"Sport"}
    container={this.state.category =="sport" ? issellected : null}
    source={require('funshare/src/img/categories/sport.png')}
    onPress={this._onInputButtonPressed.bind(this, "sport","funshare/src/img/categories/sport.png")}
    />
    </View>
    <View style={{flexDirection:'row'}}>
    <InputButton
    value={"TechniK"}
    container={this.state.category =="technic" ? issellected : null}
    source={require('funshare/src/img/categories/technic.png')}
    onPress={this._onInputButtonPressed.bind(this,"technic","funshare/src/img/categories/technic.png")}
    />
    <InputButton
    value={"Travel"}
    container={this.state.category =="travel" ? issellected : null}
    source={require('funshare/src/img/categories/travel.png')}
    onPress={this._onInputButtonPressed.bind(this, "travel","funshare/src/img/categories/travel.png")}
    />
    </View>
    </View>
    );
    return ( 
    <View style={styles.container}>
    <ScrollView style={{ flex:1 , height:deviceheight-90}}>
    <View style = {{  flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }} >




    <View style = {styles.firstcontaner}>
    <Image
    resizeMode={Image.resizeMode.cover}
    source={require('funshare/src/img/background1.png')}
    style = {styles.imageContainer}>
    <View style= {{

      position:'absolute',
      justifyContent:'center',

      width:40,
      height:40,

    }}>

    <TouchableHighlight
    underlayColor = {'rgba(0, 0, 0, 0.2)'}
    style= {{flex:1 }}
    onPress={this.goBack.bind(this)}
    >  
    <Image
    source={require('funshare/src/img/arrow.png')}
    style={{width:20, height:20, margin:10}}
    />
    </TouchableHighlight>
    </View>


    <View style = {{ flex:1,
      alignItems: 'center', marginTop:(deviceheight/6)-20 } }>
      <IcoButton
      source={require('funshare/src/img/Icons_camera.png')}
      onPress={this.calluploadphoto.bind(this)}
      icostyle={{width:40, height:40}}
      />
      </View>

      <View style = {smallcontainer}>
      <View style = {{flexDirection:'row' ,flex:1 }}>


      {this.renderImages()}

      </View>
      </View>

      </Image>
      </View>


      </View>
      <View style={styles.CContainer}>
      <View style ={{height:50 ,marginTop:1 ,borderBottomWidth:1, borderColor:'#dcdcdc'}}>
      <TextInput
      placeholder="Was tauchst du.."
      placeholderTextColor= '#a9a9a9'
      selectionColor='#6495ed'
      style={styles.textinput}
      autoCapitalize="none"
      autoCorrect={false}
      numberOfLines = {1}
      returnKeyType="next"
      underlineColorAndroid="transparent"
      onChangeText={(title) => this.setState({title})}
      onSubmitEditing={() => this.description.focus()}
      />
      </View>

      <View style ={{flex:1, borderBottomWidth:1, borderColor:'#dcdcdc'}}>
      <TextInput
      underlineColorAndroid="transparent"
      ref={(ref) => this.description = ref}
      placeholder="Beschreibe es.."
      placeholderTextColor= '#a9a9a9'
      selectionColor='#6495ed'
      style={styles.description}
      autoCapitalize="none"
      autoCorrect={false}
      multiline={true}
      onChangeText={(description) => this.setState({description})}
      />
      </View>

      </View>

      <View>



      <View style = {{}} >

      <View>
      <Accordion
      expanded={this.state.open}
      header={header}
      style={{flex:1}}
      onPress={this.change.bind(this)}
      content={container}
      easing="easeOutCubic"
      />

      </View>

      <View style ={{height:50, flexDirection:"row",backgroundColor:"#EDEDEF"}}>
      <Switch onValueChange={(value) => this.setState({falseSwitchIsOn: value})} style={{margin:10}} value={this.state.falseSwitchIsOn} />
      <Text style={{marginLeft:20, marginTop:15}}>Auf Facebook teilen</Text>
      </View>

      </View>

      </View>


      </ScrollView>
      <View style ={{ justifyContent:'flex-end'}}>
      <TouchableOpacity
      style={styles.button}
      onPress={this.finish.bind(this)}
      >
      <Text style={styles.buttontext}>Tauch einstellen</Text>
      </TouchableOpacity>
      </View>
      </View>

      );
    }
    change(){
      var m = !this.state.open;
      this.setState({ open: m });
    }

    finish(){
      images=[];
      var save= this;
      var shareImageBase64 = {
        title: this.state.title,
        message: this.state.description,
        url: this.state.base64,
        subject: "Share Link" //  for email
      };

      if(this.state.title &&this.state.picPath1&&this.state.description&&this.state.category ){
        if(this.state.falseSwitchIsOn)
        {
         setTimeout(() => {
          Share.shareSingle(Object.assign(shareImageBase64, {
            "social": "facebook"
          }));
        },500);

      }
      fetchblob.upload1(this.state.picPath1,this.state.title,this.state.description,
      this.state.category).then(( ) => {
       save.goBack();
     }, function(error) {
      alert(error)
    });
    
    

  }
  else  alert("Bitte füllen Sie alle Felder");
  
}


}



var styles = StyleSheet.create({

 container: {
  flex:1,
  alignItems:'stretch',

},
button:{
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: 9,
  paddingHorizontal: 15,
  overflow: "hidden",
  backgroundColor:  '#00D77F',


},
buttontext:{
  color: "white",
  fontSize: 20,
  fontWeight: "500"
},

edit: {
  position: 'absolute',
  height:10,
  width:10,
  top:0,
  left:0
},
firstcontaner:{
  flex:1,
  height: (deviceheight/3) ,
  width:devicewidth
},
imageContainer:{


  flex:1 ,
  width: null,
  height: null 

  
},
CContainer:{
  flex:1,
  height: deviceheight-(deviceheight/3)-166 ,
  
},

image: {
  flex:1,
  position: 'absolute',
  height: (deviceheight/3) ,
  width:deviceheight/3
},
textinput: {
  backgroundColor: 'white',
  color: 'black',
  fontSize: 15,
  flex: 1,

},
description: {
  textAlignVertical:'top',
  backgroundColor: 'white',
  color: 'black',
  fontSize: 15,
  flex: 1,
},



footer: {
  alignItems:'flex-end',
}
});

AppRegistry.registerComponent('addstuff', () => addstuff);