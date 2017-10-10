import React, { Component } from 'react';
import style from './index.css';
import {List, Icon, Button, WhiteSpace, Carousel ,InputItem, Toast, WingBlank, Tabs, Badge ,Picker} from 'antd-mobile';
import { createForm } from 'rc-form';
//import { district, provinceLite as province } from 'antd-mobile-demo-data';

const TabPane = Tabs.TabPane;
const seasons =[
	[
		{
		  label: '2013',
		  value: '2013',
		},
		{
		  label: '2014',
		  value: '2014',
		},
		],
		[
		{
		  label: '春',
		  value: '春',
		},
		{
		  label: '夏',
		  value: '夏',
		},
	],
];


class AddDoctorInfoForm extends Component {
	state={
		sValue: ['2013', '春'],
	}
	render() {
		const { getFieldProps } = this.props.form;
		return (
			<div>
				<List className={style.list}>
					<InputItem
						type="text"
						placeholder="填写姓名"
						labelNumber={4}
						clear={true}
						className={style.text}
					>
						姓名
					</InputItem>
					<Picker
						data={seasons}
						title="地区"
						cascade={false}
						value={this.state.sValue}
						onChange={v => this.setState({ sValue: v })}
					>
						<List.Item arrow="horizontal">地区</List.Item>
					</Picker>
					<Picker
						data={seasons}
						title="医院"
						cascade={false}
						value={this.state.sValue}
						onChange={v => this.setState({ sValue: v })}
					>
						<List.Item arrow="horizontal">医院</List.Item>
					</Picker>
					<Picker
						data={seasons}
						title="科室"
						cascade={false}
						value={this.state.sValue}
						onChange={v => this.setState({ sValue: v })}
					>
						<List.Item arrow="horizontal">科室</List.Item>
					</Picker>
					<Picker
						data={seasons}
						title="职称"
						cascade={false}
						value={this.state.sValue}
						onChange={v => this.setState({ sValue: v })}
					>
						<List.Item arrow="horizontal">职称</List.Item>
					</Picker>
				</List>
				<Button className={style.btn} type="primary" disabled >立即体验</Button>
			</div>
		);
	}
}
const AddDoctorInfoFormWrap = createForm()(AddDoctorInfoForm);


class AddDoctorInfo extends Component {
	render() {
		return (
			<div className={style.addDoctorInfo}>
				<p className={style.title}>为了提供给您更好的服务，请您填写真实信息</p>
				<WingBlank >
					<AddDoctorInfoFormWrap />
				</WingBlank>
			</div>
		);
	}
}
export default AddDoctorInfo;


// import { Picker, List, WhiteSpace } from 'antd-mobile';
// import { createForm } from 'rc-form';
// import arrayTreeFilter from 'array-tree-filter';

// import { district, provinceLite as province } from 'antd-mobile-demo-data';

// // 如果不是使用 List.Item 作为 children
// const CustomChildren = props => (
//   <div
//     onClick={props.onClick}
//     style={{ backgroundColor: '#fff', paddingLeft: '0.3rem' }}
//   >
//     <div style={{ display: 'flex', height: '0.9rem', lineHeight: '0.9rem', borderBottom: '1PX solid #ddd' }}>
//       <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{props.children}</div>
//       <div style={{ textAlign: 'right', color: '#888', marginRight: '0.3rem' }}>{props.extra}</div>
//     </div>
//   </div>
// );

// const seasons = [
//   [
//     {
//       label: '2013',
//       value: '2013',
//     },
//     {
//       label: '2014',
//       value: '2014',
//     },
//   ],
//   [
//     {
//       label: '春',
//       value: '春',
//     },
//     {
//       label: '夏',
//       value: '夏',
//     },
//   ],
// ];

// class Test extends React.Component {
//   state = {
//     data: [],
//     cols: 1,
//     pickerValue: [],
//     asyncValue: [],
//     sValue: ['2013', '春'],
//     visible: false,
//   };
//   onClick = () => {
//     setTimeout(() => {
//       this.setState({
//         data: province,
//       });
//     }, 120);
//   };

//   onPickerChange = (val) => {
//     console.log(val);
//     let colNum = 1;
//     const d = [...this.state.data];
//     const asyncValue = [...val];
//     if (val[0] === 'zj') {
//       d.forEach((i) => {
//         if (i.value === 'zj') {
//           colNum = 2;
//           if (!i.children) {
//             i.children = [{
//               value: 'zj-nb',
//               label: '宁波',
//             }, {
//               value: 'zj-hz',
//               label: '杭州',
//             }];
//             asyncValue.push('zj-nb');
//           } else if (val[1] === 'zj-hz') {
//             i.children.forEach((j) => {
//               if (j.value === 'zj-hz') {
//                 j.children = [{
//                   value: 'zj-hz-xh',
//                   label: '西湖区',
//                 }];
//                 asyncValue.push('zj-hz-xh');
//               }
//             });
//             colNum = 3;
//           }
//         }
//       });
//     } else {
//       colNum = 1;
//     }
//     this.setState({
//       data: d,
//       cols: colNum,
//       asyncValue,
//     });
//   };
//   getSel() {
//     const value = this.state.pickerValue;
//     if (!value) {
//       return '';
//     }
//     const treeChildren = arrayTreeFilter(district, (c, level) => c.value === value[level]);
//     return treeChildren.map(v => v.label).join(',');
//   }
//   // setVal() {
//   //   this.props.form.setFieldsValue({
//   //     district: ['340000', '340800', '340822'],
//   //   });
//   // },
//   render() {
//     const { getFieldProps } = this.props.form;
//     return (<div>
//       <WhiteSpace size="lg" />
//       <List style={{ backgroundColor: 'white' }} className="picker-list">
//         <Picker extra="请选择(可选)"
//           data={district}
//           title="选择地区"
//           {...getFieldProps('district', {
//             initialValue: ['340000', '341500', '341502'],
//           })}
//           onOk={e => console.log('ok', e)}
//           onDismiss={e => console.log('dismiss', e)}
//         >
//           <List.Item arrow="horizontal">选择地区（多列，联动）</List.Item>
//         </Picker>
//         <Picker
//           data={seasons}
//           title="选择季节"
//           cascade={false}
//           extra="请选择(可选)"
//           value={this.state.sValue}
//           onChange={v => this.setState({ sValue: v })}
//         >
//           <List.Item arrow="horizontal">选择季节（多列，不联动）</List.Item>
//         </Picker>
//         <Picker data={district} cols={1} {...getFieldProps('district3')} className="forss">
//           <List.Item arrow="horizontal">选择地区（单列）</List.Item>
//         </Picker>
//         <Picker
//           data={this.state.data}
//           cols={this.state.cols}
//           value={this.state.asyncValue}
//           onPickerChange={this.onPickerChange}
//         >
//           <List.Item arrow="horizontal" onClick={this.onClick}>选择地区（多列，异步加载）</List.Item>
//         </Picker>
//         <Picker
//           title="选择地区"
//           extra="请选择(可选)"
//           data={district}
//           value={this.state.pickerValue}
//           onChange={v => this.setState({ pickerValue: v })}
//         >
//           <CustomChildren>选择地区（自定义 children）</CustomChildren>
//         </Picker>
//         <List.Item extra={this.getSel()}>
//           <div onClick={() => this.setState({ visible: true })}>外部控制 visible</div>
//         </List.Item>
//         <Picker
//           visible={this.state.visible}
//           data={district}
//           value={this.state.pickerValue}
//           onChange={v => this.setState({ pickerValue: v })}
//           onOk={() => this.setState({ visible: false })}
//           onDismiss={() => this.setState({ visible: false })}
//         />
//       </List>
//     </div>);
//   }
// }

// const TestWrapper = createForm()(Test);

// ReactDOM.render(<TestWrapper />, mountNode);





