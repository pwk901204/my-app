import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from './index.css';
import { Icon } from 'antd-mobile';
import ReactIScroll from 'react-iscroll';
import moment from 'moment';
import iScroll from 'iscroll/build/iscroll-probe.js';
import { Toast, Popup, InputItem, SearchBar, List } from 'antd-mobile';

class Partner extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
  }
  render() {
    return (
      <div className={style.partner_page}>
        <div className={style.notice}>
          <p><span>友情提示：</span>心电专业医师不能单独参赛，结对双方只允许一方提交答案，另一方的答案视为无效</p>
        </div>
        <div className={style.input_wrap}>
          <InputItem
            clear
            placeholder="请选择结对医师"
            extra={<Icon type="right" />}
          >姓名</InputItem>
          <div
            className={style.input_shade}
            onClick={() => {
              Popup.show(<PopupContent token={this.props.userInfo.token} onClose={() => {
                Popup.hide();
              }} />, {
                className: style.search_popup
              });
            }}
          ></div>
        </div>
        <div className={style.to_exam}>
          <div className={style.confirm_to_exam}>确认并答题</div>
          <div className={style.skip_to_exam}>跳过并答题</div>
        </div>
      </div>
    );
  }
}

class PopupContent extends Component{
  constructor(props){
    super(props)
    this.state = {
      focused: false,
      cancel_text: '取消',
      doctor_arr: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.searchPartner = this.searchPartner.bind(this);
  }
  onChange(val){
    let value = val.replace(/\s/g, '');
    let txt = value ? '搜索' : '取消';
    this.setState({cancel_text: txt});
  }
  onSubmit(val){
    let value = val.replace(/\s/g, '');
    if(value){
      this.searchPartner(value);
    } else {
      Popup.hide();
    }
  }
  onHandleClick(){
    Popup.hide();
  }
  componentDidMount(){
    this.setState({ focused: true });
  }
  searchPartner(key){
    let data = {
      token: this.props.token,
      key: key,
      type: 'Doctor',
      limit: 10
    };
    data = JSON.stringify(data);
    window
      .HOCFetch({ needToken: true })(global.url.searchPartner, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: data
      })
      .then(response => response.json())
      .then(data => {
        console.log(data, '~~~~~~~~~~~~~~~~~~~~~~')
        // if (data.vote_end_at) {
        //   this.setState({
        //     listData: data.vote_users,
        //     endTime: data.vote_end_at
        //   });
        // } else {
        //   Toast.info('网络错误');
        // }
      });
  }
  render(){
    return(
      <ReactIScroll
        iScroll={iScroll}
        options={{ ...global.iscrollOptions }}
      >
        <div>
          <SearchBar
            placeholder="请输入医师姓名"
            cancelText={this.state.cancel_text}
            focused={this.state.focused}
            onBlur={()=>{this.setState({ focused: false })}}
            onSubmit={this.onSubmit}
            onCancel={this.onSubmit}
            onChange={this.onChange}
          />
        {
          this.state.doctor_arr.length ?
          <List>

          </List>
          :
          null
        }
          <List>
            <List.Item
              className={style.list}
              onClick={this.onHandleClick}
            >
              <span className={style.list_name}>张三</span> 北京大学人民医院 主任医师
            </List.Item>
            <List.Item
              className={style.list}
              onClick={this.onHandleClick}
            >
              <span className={style.list_name}>张三</span> 北京大学人民医院 主任医师
            </List.Item>
            <List.Item
              className={style.list}
              onClick={this.onHandleClick}
            >
              <span className={style.list_name}>张三</span> 北京大学人民医院 主任医师
            </List.Item>
            <List.Item
              className={style.list}
              onClick={this.onHandleClick}
            >
              <span className={style.list_name}>张三</span> 北京大学人民医院 主任医师
            </List.Item>
            <List.Item
              className={style.list}
              onClick={this.onHandleClick}
            >
              <span className={style.list_name}>张三</span> 北京大学人民医院 主任医师
            </List.Item>
            <List.Item
              className={style.list}
              onClick={this.onHandleClick}
            >
              <span className={style.list_name}>张111</span> 北京大学人民医院 主任医师
            </List.Item>
            <List.Item
              className={style.list}
              onClick={this.onHandleClick}
            >
              <span className={style.list_name}>张三</span> 北京大学人民医院 主任医师
            </List.Item>
            <List.Item
              className={style.list}
              onClick={this.onHandleClick}
            >
              <span className={style.list_name}>张三</span> 北京大学人民医院 主任医师
            </List.Item>
            <List.Item
              className={style.list}
              onClick={this.onHandleClick}
            >
              <span className={style.list_name}>张三</span> 北京大学人民医院 主任医师
            </List.Item>
            <List.Item
              className={style.list}
              onClick={this.onHandleClick}
            >
              <span className={style.list_name}>张三</span> 北京大学人民医院 主任医师
            </List.Item>
            <List.Item
              className={style.list}
              onClick={this.onHandleClick}
            >
              <span className={style.list_name}>张三</span> 北京大学人民医院 主任医师
            </List.Item>
            <List.Item
              className={style.list}
              onClick={this.onHandleClick}
            >
              <span className={style.list_name}>张三</span> 北京大学人民医院 主任医师
            </List.Item>
            <List.Item
              className={style.list}
              onClick={this.onHandleClick}
            >
              <span className={style.list_name}>张三</span> 北京大学人民医院 主任医师
            </List.Item>
            <List.Item
              className={style.list}
              onClick={this.onHandleClick}
            >
              <span className={style.list_name}>张三</span> 北京大学人民医院 主任医师
            </List.Item>
            <List.Item
              className={style.list}
              onClick={this.onHandleClick}
            >
              <span className={style.list_name}>张三</span> 北京大学人民医院 主任医师
            </List.Item>
            <List.Item
              className={style.list}
              onClick={this.onHandleClick}
            >
              <span className={style.list_name}>张三</span> 北京大学人民医院 主任医师
            </List.Item>
            <List.Item
              className={style.list}
              onClick={this.onHandleClick}
            >
              <span className={style.list_name}>张三</span> 北京大学人民医院 主任医师
            </List.Item>
            <List.Item
              className={style.list}
              onClick={this.onHandleClick}
            >
              <span className={style.list_name}>张三</span> 北京大学人民医院 主任医师
            </List.Item>
          </List>
        </div>
      </ReactIScroll>
    )
  }
}


export default connect(
  state => {
    return {
      userInfo: state.userInfo
    };
  }
)(Partner);
