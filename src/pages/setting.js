  'use strict';
  import React, { Component } from 'react';
  import  {
    AppRegistry,
    Text,
    TextInput,
    View,
    StyleSheet,
    Image,
    ScrollView,
    Switch,
    BackAndroid,
    AsyncStorage,
    Dimensions,
    TouchableOpacity
  } from 'react-native';
  import IcoButton from 'funshare/src/components/icobutton';
  import Panel from 'funshare/src/components/panel'; 
  import Routes from 'funshare/Routes';
  import IcotextButton from 'funshare/src/components/icotextButton';
  import firebase from 'firebase';
  var deviceheight = Dimensions.get('window').height ;
  var devicewidth = Dimensions.get('window').width ;
  var Accordion = require('react-native-accordion');




  import style from '../styles/common-styles.js';

  var styles = StyleSheet.create({
    button   : {
     flex:1,
      backgroundColor: '#fff',
      padding:8,
      marginLeft:10,
      marginRight:10,
      marginTop:3,
      marginBottom:5,
      alignItems:'center',
      overflow:'hidden'
    },
    button1  : {
      backgroundColor: '#fff',
      padding:8,
      flex:1,

      overflow:'hidden',
      borderBottomWidth:0.5
    } 
  });


  export default class setting extends Component {


componentDidMount(){
   
     var self=this;
  BackAndroid.addEventListener('hardwareBackPress', () => {
   
    self.props.replaceRoute(Routes.Home1(currentUserGlobal));
    return true;
    
  });
 
}
 

    constructor(props){
      super(props);
      this.state={
      
       Mitteilungen:true,
       Neuigkeiten: true,
       Nachricht:true,
       Deal: true,
        
     }
     
     
   }
logout() {
     var  save=this;
    firebase.auth().signOut().then(function() {
      save.props.replaceRoute(Routes.login());
    }, function(error) {
      alert("Sign-out failed");
    });
  }
    terminate_user(){
      //please check this to fix bug https://firebase.google.com/docs/auth/web/manage-users#re-authenticate_a_user
      var  save=this;
        var user = firebase.auth().currentUser;

        user.delete().then(function() {
         save.props.replaceRoute(Routes.login());
        }, function(error) {
          // An error happened.
        });
    }
   goToProfile(){

    this.props.replaceRoute(Routes.Home1(currentUserGlobal));

  }

  goToSearch(){

    this.props.replaceRoute(Routes.search());

  }
  goToHome1()
  {
    this.props.replaceRoute(Routes.Home1(currentUserGlobal));
  }
  render() {
   const TopNavigation = () => (
    <View style={{ padding: 10, flexDirection: 'row', backgroundColor: '#00D77F' }}>
    <View style={{ flex:0.2 , justifyContent:'center' , margin:5  }}>
    <TouchableOpacity
    onPress={this.goToHome1.bind(this)}
    style={styles.buttonStyle}
    >
    <Image 
    source={require('funshare/src/img/arrow.png')}
    style={{width:20, height:20}}
    />

    </TouchableOpacity>
    </View>
   <View style={{ flex:0.2}}/>
    <View style={{ flex:0.2 , alignItems:'center', justifyContent:'center' }}>
    <Image
    resizeMode={Image.resizeMode.contain}
    source={require('funshare/src/img/settings.png')}
    style={{width:35, height:35}}
    />
    </View>

    <View style={{ flex:0.4 , alignItems:'flex-end', justifyContent:'center' , margin:5  }}>
    <TouchableOpacity
    style={styles.buttonStyle}
    onPress={this.goToHome1.bind(this)}
    >
    <View style= {{alignItems:'center' , justifyContent:'center'}}>
    <Text style= {{fontSize:20 , fontWeight:'bold' , color:'white'}} >
    Fertig
    </Text>
    </View>
    </TouchableOpacity>

    </View>

    </View>
    );
   var profileheader = (
     <View style={{flex:1,  flexDirection:"row" }}>
    
    <Image
    
    source={require('funshare/src/img/seprofile.png')}

    style = {{width:25, height:25, marginRight:15}}
    />
    <Text style={{fontSize:17, fontWeight:"bold"}}>Profile</Text>
    
    </View>
    );
    var sucheheader = (
    <View style={{flex:1,  flexDirection:"row" }}>
 
    <Image
    
    source={require('funshare/src/img/sesearch.png')}

    style = {{width:25, height:25, marginRight:15}}
    />
    <Text style={{fontSize:17, fontWeight:"bold"}}>Suche</Text>
    </View>
    );
   var header=
   (
    <View style={{flex:1,  flexDirection:"row" }}>
   
    <Image
    
    source={require('funshare/src/img/messenger.png')}

    style = {{width:25, height:25, marginRight:15}}
    />
    <Text style={{fontSize:17, fontWeight:"bold"}}>Mitteilungen</Text>
    </View>
 
    );
   var supportheader=
   (
       <View style={{flex:1,  flexDirection:"row" }}>
 
    <Image
  
    source={require('funshare/src/img/support.png')}

    style = {{width:25, height:25, marginRight:15}}
    />
    <Text style={{fontSize:17, fontWeight:"bold"}}>Support</Text>
    </View>
     
    );
   var rechheader=
   (
        <View style={{flex:1,  flexDirection:"row" }}>
 
    <Image
 
    source={require('funshare/src/img/law.png')}

    style = {{width:25, height:25, marginRight:15}}
    />
    <Text style={{fontSize:17, fontWeight:"bold"}}>Rechtliches</Text>
    </View>
  
 
    );
   var recht= (
    <View style = {{flex:1}}>
     <View style={{ marginLeft: 40 , marginBottom:4 , padding:4, flexDirection:'row' , borderBottomWidth:0.5 , borderBottomColor:'#dcdcdc'}}>
    <View style ={{flex:0.9}}>
    <Text style={{fontSize:16}}>Nutzungsbedingungen</Text>
    </View>
    <View style = {{ alignItems:'flex-end', marginRight:15}}>
     <Image 
    source={require('funshare/src/img/Icons_arrow.png')}
    style={{width:20, height:20 }}
    />
    </View>
    </View>
    <View style={{flex:1  , marginLeft: 40 , marginBottom:4 , padding:4, flexDirection:'row' , borderBottomWidth:0.5 , borderBottomColor:'#dcdcdc'}}>
    <View style ={{flex:0.9}}>
    <Text style={{fontSize:16}}>Datenschutzerklärung</Text>
    </View>
    <View style = {{ alignItems:'flex-end', marginRight:15}}>
     <Image 
    source={require('funshare/src/img/Icons_arrow.png')}
    style={{width:20, height:20 }}
    />
    </View>
    </View>
    </View>
    );
    var support= (
    <View style = {{flex:1}}>
    <Text style={{fontSize:16}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
    </View>
    );

    var mit = (
    <View style = {{flex:1}}>
    <View style={{flex:1, margin:5 ,marginLeft: 40 , flexDirection:'row' , borderBottomWidth:0.5 , borderBottomColor:'#dcdcdc'}}>
    <View style={{flex:0.5 ,  justifyContent:'flex-start'}}>
    <Text style={{fontSize:16 }}>Neues Angebot</Text>
    </View>
    <View style={{flex:0.5, justifyContent:'flex-end' }}>
    <Switch onValueChange={(value) => this.setState({Mitteilungen: value})} style={{margin:5}} value={this.state.Mitteilungen} />
    </View>
    </View>

    <View style={{flex:1,margin:5, marginLeft: 40 , flexDirection:'row' , borderBottomWidth:0.5 , borderBottomColor:'#dcdcdc'}}>
    <View style={{flex:0.5 , justifyContent:'flex-start'}}>
    <Text style={{fontSize:16}}>Neuer Deal</Text>
    </View>
    <View style={{flex:0.5, justifyContent:'flex-end' }}>
    <Switch onValueChange={(value) => this.setState({Deal: value})} style={{margin:5}} value={this.state.Deal} />
    </View>
    </View>

    <View style={{flex:1, margin:5,marginLeft: 40 , flexDirection:'row' , borderBottomWidth:0.5 , borderBottomColor:'#dcdcdc'}}>
    <View style={{flex:0.5 , justifyContent:'flex-start'}}>
    <Text style={{fontSize:16}}>Neue Nachricht</Text>
    </View>
    <View style={{flex:0.5, justifyContent:'flex-end' }}>
    <Switch onValueChange={(value) => this.setState({Nachricht: value})} style={{margin:5}} value={this.state.Nachricht} />
    </View>
    </View>

    <View style={{flex:1, margin:5,marginLeft: 40 , flexDirection:'row' , borderBottomWidth:0.5 , borderBottomColor:'#dcdcdc'}}>
    <View style={{flex:0.5 , justifyContent:'flex-start'}}>
    <Text style={{fontSize:16}} >Neuigkeiten</Text>
    </View>
    <View style={{flex:0.5, justifyContent:'flex-end' }}>
    <Switch onValueChange={(value) => this.setState({Neuigkeiten: value})} style={{margin:5}} value={this.state.Neuigkeiten} />
    </View>
    </View>
    </View>
    );

    return (

    <View
    style = {{flex:1}}
    >
    <TopNavigation/>
    <ScrollView
    style={{flex:1}}
    >
    <View style={{flex:1,marginBottom:deviceheight/15, marginTop:deviceheight/15 }}>
   

        <Accordion

    header={profileheader}
    onPress={this.goToProfile.bind(this)}
    easing="easeOutCubic"
    />
      <Accordion

    header={sucheheader}
    onPress={this.goToSearch.bind(this)}
    easing="easeOutCubic"
    />
    

    </View>
    
    <View style= {{flex:1,marginBottom:deviceheight/15 , backgroundColor:'#fff'}}>

    <Accordion

    header={header}
    //onPress={this.change.bind(this)}
    content={mit}
    easing="easeOutCubic"
    />

    <Accordion

    header={rechheader}
    //onPress={this.change.bind(this)}
    content={recht}
    easing="easeOutCubic"
    />

    <Accordion

    header={supportheader}
    //onPress={this.change.bind(this)}
    content={support}
    easing="easeOutCubic"
    />



    </View>
 
  



    <View style = {{flex:1}}>
    <TouchableOpacity 
    style={styles.button} 
    onPress={this.logout.bind(this)}
    >
    <Text style={{fontWeight:'bold',fontSize:18}}> Abmelden</Text>
    </TouchableOpacity>
    <TouchableOpacity 
    style={styles.button} 
    onPress={this.terminate_user.bind(this)}
    >
    <Text style={{fontSize:18, color:'red'}}> Konto Löschen</Text>
    </TouchableOpacity>
    </View>

     </ScrollView>
     <View style={{marginTop:3,alignItems:'center' , justifyContent:'flex-end'}}><Text style={{ fontSize:15}}> Version 1.0 </Text></View>
   
    </View>

    );
  }
}

AppRegistry.registerComponent('setting', () => setting);