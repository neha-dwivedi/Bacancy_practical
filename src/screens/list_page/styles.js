import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start'
  },
  searchItem:{
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.3)',
    padding: 10
  },
  searchSubject: {
    color: 'rgba(0,0,0,0.5)'
  },
  searchInput:{
    padding: 10,
    borderColor: '#CCC',
    borderWidth: 1
  },
    header_view: {
      flex:0.08,justifyContent:'center',backgroundColor:'#228B22'
    },
    header_text: {
      fontSize: 22, fontWeight: 'bold', color: 'white', textAlign: 'center',top:10,
      borderBottomColor: 'rgba(234,66,26,1)'
    },
    space:{
      height: 25, width: 25
    },
    card:{
      flexDirection:'column',backgroundColor:'#D3D3D3',flex:2, borderWidth:0,borderRadius:5, margin:10,padding:10
    },
    modal_view: {
      flex: 0.5, borderWidth: 0, top: '25%', borderRadius: 10, backgroundColor: 'white', margin: 20, padding:20
    },
    main_modal_view : {
      flex: 1, backgroundColor: 'rgba(223,99,54,0.5)', borderWidth: 0
    },
    head_view : {
      flexDirection:'row',margin:10
    },
    head_text : {
      fontWeight:'bold',fontSize:20
    },
    btn_view : {
      justifyContent:'center',borderRadius:10,flex:0.3, alignItems:'center',top:30,backgroundColor:'green', borderWidth:0
    },
    text_wrapping : {
      flex: 1, flexWrap: 'wrap'
    },
    btn_text : {
      fontSize:20,color:'white', fontWeight:'bold'
    },
    filter_container : {
      height: 40,borderWidth:0,flex:1,margin:12
    },
    filter_view : {
      flexDirection:'row',borderWidth:0
    },
    filter_text: {
      fontSize:20,fontWeight:'bold',padding:20
    },
  });
export default styles;
