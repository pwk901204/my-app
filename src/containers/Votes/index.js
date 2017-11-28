import React, { Component } from 'react';
import {connect} from "react-redux";
import style from './index.css';
import { SearchBar, ActivityIndicator } from 'antd-mobile';
import { Link } from 'react-router';
import ReactIScroll from 'react-iscroll';
import iScroll from 'iscroll/build/iscroll-probe.js';
import EnterBtn from 'components/EnterBtn';
import enter from 'images/enter3.png';
import Countdown from 'react-countdown-now';
import moment from 'moment';
import {Toast} from 'antd-mobile';

class Votes extends Component {
  constructor(props){
    super(props)
    this.state = {
      page: 1,
      listLoading: false,
      dataList: [],
      totalVote: '',
      listEnd: false,
      maxScrollY: 0,
      endTime: '',
      keyWord: '',
      searchLoading: false,
    }
    this.onScroll = this.onScroll.bind(this);
    this.getVoteList = this.getVoteList.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onClear = this.onClear.bind(this);
  }
  onSearch(val){
    let value = val.replace(/\s/g, "");
    if (value){
      this.setState({
        keyWord: value,
        page: 1,
        dataList: [],
        searchLoading: true,
      },()=>{
        this.getVoteList();
      });
    }
  }
  onClear(){
    this.setState({
      keyWord: '',
      page: 1,
      dataList: [],
      searchLoading: true,
    },()=>{
      this.getVoteList();
    });
  }
  onScroll(iScroll){
    if(iScroll.directionY > 0 && iScroll.maxScrollY >= iScroll.y){
      if(!this.state.listLoading){
        this.setState({
          listLoading: true
        });
        this.getVoteList();
      }
    }
  }
  onRefresh(iScroll){
    let maxScrollY = iScroll.maxScrollY;
    if(this.state.maxScrollY !== maxScrollY) {
      this.setState({maxScrollY: maxScrollY})
    }
  }
  getVoteList(){
    if(this.listEnd) return;
    let url = '';
    if(this.state.keyWord){
      url = global.url.readVote + '?token=' + this.props.userInfo.token + '&course_id=' + '37' + '&page=' + this.state.page + '&per_page=10&key=' + this.state.keyWord;
    } else {
      url = global.url.readVote + '?token=' + this.props.userInfo.token + '&course_id=' + '37' + '&page=' + this.state.page + '&per_page=10';
    }
    window.HOCFetch({ needToken: false })(url)
    .then(response => response.json())
    .then(data => {
      console.log(data, '~~~~~~~~~~~~~~~~~~~');
      // this.setState({
      //   loading: false
      // });

      if (data.vote_end_at) {
        let page = 0;
        let listEnd = false;
        let listLoading = false;
        if(this.state.page === data.meta.total_pages){
          page = this.state.page;
          listEnd = true;
          listLoading = true;
        } else {
          page = this.state.page + 1;
        }
        this.setState({
          dataList: this.state.dataList.concat(data.vote_users),
          totalVote: data.total_votes_count,
          listLoading: listLoading,
          listEnd: listEnd,
          page: page,
          endTime: data.vote_end_at,
          searchLoading: false,
        });
      } else {
        Toast.info('网络错误');
        this.setState({
          listLoading: false,
          searchLoading: false,
        });
      }
    });
  }
  componentDidMount(){
    this.getVoteList();
  }
  render() {
    let date = moment(this.state.endTime).toDate();
    return (
      <div className={style.votes + ' votes'}>
        <EnterBtn
          src={enter}
          title="排行榜"
          linkTo="/VotesRank"
          color="#df8600"
        />
        <ReactIScroll
          iScroll={iScroll}
          options={{ ...global.iscrollOptions, probeType: 3}}
          onScroll={this.onScroll}
          onRefresh={this.onRefresh}
        >
          <div>
            <SearchBar
              placeholder="请输入选手编号"
              autoFocus
              onChange={this.onSearch}
              onClear={this.onClear}
              disabled={this.state.searchLoading}
            />
            <div className={style.head}>
              <div className={style['pull-left']}>
                <p>累计投票</p>
                <span>{this.state.totalVote}</span>
              </div>
              <div className={style['pull-right']}>
                <p>投票倒计时</p>
                {
                  this.state.endTime &&
                  <Countdown
                    renderer={({
                      total,
                      days,
                      hours,
                      minutes,
                      seconds,
                      milliseconds,
                      completed
                    }) => {
                      if (completed) {
                        return <span>投票已截止</span>;
                      } else {
                        if (days > 0) {
                          return (
                            <span>
                              {days}天{hours}小时{minutes}分钟
                            </span>
                          );
                        } else {
                          return (
                            <span>
                              {hours}小时{minutes}分钟{seconds}秒
                            </span>
                          );
                        }
                      }
                    }}
                    date={date}
                  />
                }
              </div>
            </div>
            <ul className={style.body}>
              {
                this.state.dataList.map((item, index)=>{
                  return(
                    <li key={index}>
                      <Link to={'/votes/' + item.id}>
                        <div className={style.bg}>
                          <img src={item.avator_data.big} alt={item.user_name}></img>
                          <i>{item.no + '号'}</i>
                        </div>
                        <p>
                          {item.user_name}<span>{item.votes_count + '票'}</span>
                        </p>
                        <div className={style.btn}>
                          <span>投票</span>
                        </div>
                      </Link>
                    </li>
                  )
                })
              }
            </ul>
              {
                this.state.maxScrollY ?
                <div className={this.state.listLoading ? 'list_loading' : 'list_loading none'}>{this.state.listEnd ? '没有更多数据' : '加载中...'}</div>
                :
                null
              }
          </div>
        </ReactIScroll>
        <ActivityIndicator toast animating={this.state.searchLoading} />
      </div>
    );
  }
}

export default connect (
	(state)=>{
		return {
			userInfo:state.userInfo
		}
	},
	(dispatch)=>{
		return {

		}
	}
)(Votes);
