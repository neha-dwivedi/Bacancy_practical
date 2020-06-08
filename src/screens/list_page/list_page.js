//import react components here..
import React, { Component } from 'react'
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Modal,
  Alert
} from 'react-native'
import styles from "./styles"
import NetInfo from "@react-native-community/netinfo";
import SearchInput, { createFilter } from 'react-native-search-filter';
import DropDownPicker from 'react-native-dropdown-picker';

const KEYS_TO_FILTERS = ['author', 'title'];
const baseURL = "https://hn.algolia.com/api/v1/search_by_date?tags=story&page=1" // DEV
const { width, height } = Dimensions.get("window");

export default class List_page extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showProgress: true,
      list_data: [],
      searchTerm: '',
      index: 0,
      pageIndex: 0,
      isLastPage: false,
      default_date_filter: 'ASC',
      modalVisible: false,//state of modal set false
    }
  }

  //lifecycle method of react native
  componentDidMount() {
    this.fetchData();
  }

  // Default pageCount for pagination with minimum 10 items
  pageCount() { return 10 }

  //refresh the API call every 3 second
  refreshAPI(){
    setInterval(()=>{
      this.fetchData()
    },30000)
  }

  //calling the API for getting the data if net is available
  async fetchData() {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        fetch(baseURL, {
          method: 'GET'
        })
          .then((response) => response.json())
          //If response is in json then in success
          .then((responseJson) => {
            this.setState({list_data: responseJson.hits, showProgress:false})
            // check if the page is last page or not and then apply pagination
            let lastPage = response.data.length < this.pageCount()
            //check the page index and refersh the list
            if (this.state.pageIndex === 0) {
              this.setState({ list_data: responseJson.hits, pageIndex: responseJson.hits.length, isLastPage: lastPage })
            } else {
              var newData = this.state.list_data
              newData.push(...responseJson.hits)
              this.setState({ list_data: newData, pageIndex: newData.length, isLastPage: lastPage })
            }
          })
      }
      else {
        console.log('Bacancy', 'There are network issue')
      }
    });
  }

  //update the search box
  searchUpdated(term) {
    this.setState({ searchTerm: term })
  }
  //open the popup modal
  openModal(current_index) {
    this.setState({
      modalVisible: true,
      index: current_index
    })
  }

  // hide show the pop up view
  popupShowHide() {
    this.setState({ modalVisible: false })
  }

  //perform filter option in ascending and descending order
  filterTheData(item){
    this.setState({ showProgress: true })
    if(item.value == 'asc')
    this.state.list_data.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
    else
    this.state.list_data.sort((a, b) => (b.title > a.title) ? 1 : ((a.title > b.title) ? -1 : 0));
    setTimeout(() => {
      this.setState({ showProgress: false })
    }, 1000)
  }

  //Design:- render design here..
  render() {
    var clickedEvent = this.state.list_data[this.state.index]
    const searchData = this.state.list_data.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
    return (
      <View style={styles.container}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.popupShowHide()
          }}
        >
          <View style={styles.main_modal_view}>
            <View style={styles.modal_view}>
              <View style={styles.head_view}><Text style={styles.head_text}>Title - </Text>
                <Text style={styles.text_wrapping}> {clickedEvent ? clickedEvent.title : null}</Text>
              </View>

              <View style={styles.head_view}><Text style={styles.head_text}>Date - </Text>
                <Text style={styles.text_wrapping}> {clickedEvent ? clickedEvent.created_at : null}</Text>
              </View>

              <View style={styles.head_view}><Text style={styles.head_text}>Url - </Text>
                <Text style={styles.text_wrapping}> {clickedEvent ? clickedEvent.url : null}</Text>
              </View>

              <View style={styles.head_view}><Text style={styles.head_text}>Author - </Text>
                <Text style={styles.text_wrapping}> {clickedEvent ? clickedEvent.author : null}</Text>
              </View>

              <TouchableOpacity onPress={() => { this.popupShowHide() }} style={styles.btn_view}>
                <Text style={styles.btn_text}>Ok</Text>
              </TouchableOpacity>

            </View>
          </View>
        </Modal>
        <View style={styles.header_view}>
          <Text style={styles.header_text}> List
     </Text>
          <View style={styles.space}></View>
        </View>
        <SearchInput
          onChangeText={(term) => { this.searchUpdated(term) }}
          style={styles.searchInput}
          placeholder="Type author or title to search"
        />
        <View style={styles.filter_view}>
          <Text style={styles.filter_text}>Filter by - </Text>
          <DropDownPicker
            items={[
              { label: 'ASC', value: 'asc' },
              { label: 'DESC', value: 'desc' },
            ]}
            containerStyle={styles.filter_container}
            style={{ backgroundColor: '#fafafa' }}
            dropDownStyle={{ backgroundColor: '#fafafa', }}
            onChangeItem={item => {this.filterTheData(item)}}
          /></View>
        <ScrollView style={{ flex: 3 }}>
          {searchData.map((data, index) => {
            return (
              <TouchableOpacity onPress={() => this.openModal(index)} key={data.id}>
                <View style={styles.card}>
                  <Text>Title - {data.title}</Text>
                  <Text>Author - {data.author}</Text>
                  <Text>Url - {data.url}</Text>
                  <Text style={styles.searchSubject}>Created Date - {data.created_at}</Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
        {this.state.showProgress ? <View style={{
          height: height, width: width, position: 'absolute', justifyContent:
            'center', alignContent: 'center', alignItems: 'center', backgroundColor: 'rgba(223, 99, 54, 0.5)'
        }}>
          <ActivityIndicator size='large' color='white' style={{ paddingTop: 30 }}></ActivityIndicator>
        </View> : null}
      </View>
    );
  }
}