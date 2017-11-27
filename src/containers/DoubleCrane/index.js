import React, { Component } from 'react';
import style from './index.css';
import {Link} from 'react-router';
import {WhiteSpace, Tabs, List} from 'antd-mobile';
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";
import EnterBtn from 'components/EnterBtn'
import enter from 'images/enter2.png';
const TabPane = Tabs.TabPane;
const Item = List.Item;

export default class DoubleCrane extends Component {
	render() {
		return (
			<div className={style.DoubleCrane}>
				<EnterBtn src={enter} title='投票' linkTo='/Votes' color='#ff6666'/>
				<img src="https://ss3.bdstatic.com/lPoZeXSm1A5BphGlnYG/skin/114.jpg?2" alt="" className='banner'/>					
				<Tabs defaultActiveKey="1">
		      <TabPane key="1" tab='大赛信息'>
			      <div className={style.warp}>
			      	<ReactIScroll
								iScroll={iScroll}
								options={{...global.iscrollOptions}}
							>
								<div>
									<WhiteSpace size='sm'/>
									<div className={style.sessionbox}>
					      		<div className={style.session}>
											<h2>比赛介绍</h2>
											<p>各位心内科，心外科，急诊科，重症医学科，老年科，麻醉科以及心电相关临床一线同道：为推动临床一线的医师学习心电图及电生理知识，提高诊断与处理各种常见及疑难临床问题的综合能力。 “第一届“华润双鹤杯”网络心电图及电生理知识巅峰赛”将于12月闪亮登场！参加这次大赛，您不但可以通过努力公平地与国内最顶尖的心电及电生理专家教授PK，而且还有机会得大奖。机会难得，可不要错过哦。注意，大家都是在同一起跑线上，谁怕谁？</p>
					      		</div>
					      		<div className={style.session}>
											<h2>比赛规则</h2>
											<p>①此次比赛将通过国际心血管病学会(ISCVD)和麦迪森公众号发放试题；</p>
											<p>②共5道试题，为解析题；解析可以在规定的时间内修改，答题时间为1周；</p>
											<p>③通过麦迪森系统答题系统答题，所以参赛人员请务必提前注册；</p>
											<p>④试题公布后，参赛人员可以翻书，查阅资料、文献等；并鼓励参赛人员与心电专业医生结对答题， 也可请教国内国际心电和电生理专家；</p>
											<p>⑤得奖的解析将公示，以求透明和公平。每个参赛人员的解析都会经过二级评审（评委，裁判）。当有不分上下的解析， 将根据最后提交时间评判。</p>
					      		</div>
					      		<div className={style.session}>
											<h2>奖项设置</h2>
											<p>回答正确并附有精彩解析的将获重奖:</p>
											<p>一等奖一名，奖金1万元（人民币）；</p>
											<p>二等奖两名，奖金各5千元；</p>
											<p>三等奖三名，奖金各3千元。</p>
											<p>同时比赛还设20个鼓励奖（500元），主要奖励副主任医师以下参赛人员。不参赛者，也会有若干名抽奖机会奥。礼品<span role='img' aria-label='1'>🎁🎁</span> 多多，就等你拿哈！<span role='img' aria-label='1'>🎉🎉🎉</span></p>
					      		</div>
				      		</div>
								</div>
		      		</ReactIScroll>
			      </div>
		      </TabPane>
		      <TabPane key="2" tab='试题列表'>
			      <div className={style.warp}>
			        <ReactIScroll
									iScroll={iScroll}
									options={{...global.iscrollOptions}}
								>
									<div>
										<WhiteSpace size='sm'/>
										<Link to={"/TestQuestionDetail/1"}>
						      		<List className="my-list">
								        <Item extra='0人已作答'>第 1 题</Item>
								        <Item arrow="horizontal">试题等待更新，请勿作答！</Item>
								      </List>
								      <WhiteSpace size='sm'/>
					      		</Link>
									</div>
			      		</ReactIScroll>
	      		</div>
		      </TabPane>
		      <TabPane key="3" tab='评委介绍'>
			      <div className={style.warp}>
			        <ReactIScroll
									iScroll={iScroll}
									options={{...global.iscrollOptions}}
								>
									<div>
										<WhiteSpace size='sm'/>
										<h4><i></i>特邀裁判长</h4>
										<ul className={style.rater_item_1}>
				              <li>
				                <img src="//doctor.mdshealth.cn//upload/store/921ea9916a81519a073cae9a4d8385f0.png" alt="921ea9916a81519a073cae9a4d8385f0"/>
				                <p>严干新</p>
				                <span>Thomas Jefferson大学医学院教授， 美国Lankenau医学中心教授，西安交通大学博士生导师；兼任Temple大学医学院、上海交通大学新华医院、郑州大学省人民医院、厦门大学医学院及湖北文理学院教授。多个国际知名医学杂志审稿和多个跨国制药集团技术顾问及美国心脏学会专业委员。他的心电生理研究成果被写入美国医科大学教材，成为心脏科医生必须掌握的知识，他被美国心脏学界称为心脏电生理领域的巨人。</span>
				              </li>
				              <li>
				                <img src="//doctor.mdshealth.cn//upload/store/32395e591ce546c6763a5e5e0ca30b54.png" alt="32395e591ce546c6763a5e5e0ca30b54"/>
				                <p>马长生</p>
				                <span>首都医科大学附属北京安贞医院心脏内科中心主任、主任医师、教授、博士生导师，国家心血管临床医学研究中心主任、北京市心血管疾病防治办公室主任、首都医科大学心脏病学系主任、中国医师协会心内科医师分会会长、中华医学会心血管病分会副主任委员，JCE、Europace、JICE、 CMJ等国内外30余种学术期刊的编委。</span>
				              </li>
				          	</ul>
				          	<h4><i></i>特邀裁判</h4>
				          	<ul className={style.rater_item_2}>
				              <li>
				                <img src="//doctor.mdshealth.cn//upload/store/15a316a70d248da6da65c422b03ae440.jpg" alt="15a316a70d248da6da65c422b03ae440"/>
				                <p>董建增</p>
				                <div style={{'-webkit-box-orient':'vertical'}}>首都医科大学附属北京安贞医院首都医科大学附属北京安贞医院</div>
				              </li>
				              <li>
				                <img src="//doctor.mdshealth.cn//upload/store/15a316a70d248da6da65c422b03ae440.jpg" alt="15a316a70d248da6da65c422b03ae440"/>
				                <p>董建增</p>
				                <div style={{'-webkit-box-orient':'vertical'}}>首都医科大学附属北京安贞医院</div>
				              </li>
				              <li>
				                <img src="//doctor.mdshealth.cn//upload/store/15a316a70d248da6da65c422b03ae440.jpg" alt="15a316a70d248da6da65c422b03ae440"/>
				                <p>董建增</p>
				                <div style={{'-webkit-box-orient':'vertical'}}>首都医科大学附属北京安贞医院首都医科大学附属北京安贞医院</div>
				              </li>
				              <li>
				                <img src="//doctor.mdshealth.cn//upload/store/15a316a70d248da6da65c422b03ae440.jpg" alt="15a316a70d248da6da65c422b03ae440"/>
				                <p>董建增</p>
				                <div style={{'-webkit-box-orient':'vertical'}}>首都医科大学附属北京安</div>
				              </li>
				          	</ul>
				          	<h4><i></i>特邀评委</h4>
				          	<ul className={style.rater_item_3}>
				              <li>
				                <p>欧加福</p>
				                <span>圣路易斯华盛顿大学</span>
				              </li>
				              <li>
				                <p>刘念</p>
				                <span>首都医科大学附属北京安贞医院</span>
				              </li>
				              <li>
				                <p>顾春英</p>
				                <span>天津市第五中心医院</span>
				              </li>
				          	</ul>
									</div>
			      		</ReactIScroll>
	      		</div>
		      </TabPane>
		    </Tabs>
			</div>
		);
	}
}
