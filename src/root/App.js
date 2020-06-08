import React, { Component } from 'react'
import { Scene, Actions, Router, Stack, Tabs } from 'react-native-router-flux'
import list_page from './../screens/list_page/list_page'

import styles from "./styles"
//for hide the warnings
console.disableYellowBox = true;

export default class App extends Component {

 render() {
    return (
      <Router
        navigationBarStyle={styles.navBar}
        titleStyle={styles.navTitle}
        sceneStyle={styles.routerScene}
      >
        <Scene key="root" >
          <Stack key="list_page" hideNavBar>
            <Scene key="list_page" component={list_page} />
          </Stack>
       </Scene>
      </Router>
    )
  }
}