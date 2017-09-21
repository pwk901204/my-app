import React, { Component } from 'react';
//import logo from './logo.svg';
import style from './App.css';

import { Tabs, WhiteSpace, Badge } from 'antd-mobile';

const TabPane = Tabs.TabPane;

function callback(key) {
  console.log('onChange', key);
}
function handleTabClick(key) {
  console.log('onTabClick', key);
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2 className={style.title}>
            Welcome to React<p>1231231</p>
          </h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <Tabs
          defaultActiveKey="2"
          onChange={callback}
          onTabClick={handleTabClick}
        >
          <TabPane tab={<Badge text={'3'}>First Tab</Badge>} key="1">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '5rem',
                backgroundColor: '#fff'
              }}
            >
              Content of First Tab
            </div>
          </TabPane>
          <TabPane tab={<Badge text={'今日(20)'}>Second Tab</Badge>} key="2">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '5rem',
                backgroundColor: '#fff'
              }}
            >
              Content of Second Tab
            </div>
          </TabPane>
          <TabPane tab={<Badge dot>Third Tab</Badge>} key="3">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '5rem',
                backgroundColor: '#fff'
              }}
            >
              Content of Third Tab
            </div>
          </TabPane>
        </Tabs>
        <WhiteSpace />
      </div>
    );
  }
}

export default App;
