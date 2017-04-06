import React from 'react';
import { Router, Route, Link } from 'react-router';
import {Row, Col} from 'antd';
import {Menu, Icon, Modal, Tabs, message, Form, Input, Button, Checkbox} from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class MobileHeader extends React.Component {
	constructor() {
		super();
		this.state = {
			current: 'top',
			modalVisible: false,
			action: 'login',
			hasLogined: false,
			userNickName: '',
			userid: 0
		};
	}

	componentWillMount() {
		if(localStorage.userid!='') {
			this.setState({hasLogined: true});
			this.setState({userNickName: localStorage.userNickName,userid: localStorage.userid})
		}
	}

	setModalVisible(value) {
		this.setState({modalVisible: value});
	};

	handleClick(e) {
		if (e.key == "register") {
			this.setState({current: 'register'});
			this.setState({modalVisible: true});
		} else {
			this.setState({current: e.key});
		}
	};

	callback(key) {
		console.log(key);
		if (key == 1) {
			this.setState({action: 'login'});
		} else if (key == 2) {
			this.setState({action: 'register'});
		}
	}

	handleSubmit(e) {
		//页面开始向API进行提交数据
		e.preventDefault();
		var myFetchOptions = {
			method: 'GET'
		};
		var formData = this.props.form.getFieldsValue();
		console.log(formData);
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action + "&username="+formData.userName+"&password="+formData.password+"&r_userName=" + formData.r_userName + "&r_password=" + formData.r_password + "&r_confirmPassword=" + formData.r_confirmPassword, myFetchOptions)
			.then(response=>response.json())
			.then(json=> {
				this.setState({userNickName: json.NickUserName, userid: json.UserId});
				localStorage.userid = json.UserId;
				localStorage.userNickName = json.NickUserName;
			});
		if (this.state.action == "login") {
			this.setState({hasLogined: true});
		}
		message.success("请求成功！");
		this.setModalVisible(false);
	};

	login(e) {
		this.setModalVisible(true);
	}

	render() {
		let {getFieldDecorator} = this.props.form;
		const userShow = this.state.hasLogined ?
			<Link to={`usercenter`}>
				<Icon type="inbox"/>
			</Link>
			:
			<Icon type="setting" onClick={this.login.bind(this)}/>
		return (
			<div id="mobileheader">
				<header>
					<img src="./src/images/logo.png" alt="logo"/>
					<span>ReactNews</span>
					{userShow}
				</header>
				<Modal title="用户中心" wrapClassName="vertical-center" visible={this.state.modalVisible}
				       onCancel={()=>this.setModalVisible(false)} onOk={()=>this.setModalVisible(false)} okText="关闭">
					<Tabs type="card" onChange={this.callback.bind(this)}>
						<TabPane tab="登录" key="1">
							<Form horizontal onSubmit={this.handleSubmit.bind(this)}>
								<FormItem label="账户">
									{getFieldDecorator('userName', {
										rules: [{required: true, message: 'Please input your username!'}],
									})(
										<Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="请输入您的帐号"/>
									)}
								</FormItem>
								<FormItem label="密码">
									{getFieldDecorator('password', {
										rules: [{required: true, message: 'Please input your username!'}],
									})(
										<Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
										       placeholder="请输入您的密码"/>
									)}
								</FormItem>
								<Button type="primary" htmlType="submit">登录</Button>
							</Form>
						</TabPane>
						<TabPane tab="注册" key="2">
							<Form horizontal onSubmit={this.handleSubmit.bind(this)}>
								<FormItem label="账户">
									{getFieldDecorator('r_userName', {
										rules: [{required: true, message: 'Please input your username!'}],
									})(
										<Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="请输入您的帐号"/>
									)}
								</FormItem>
								<FormItem label="密码">
									{getFieldDecorator('r_password', {
										rules: [{required: true, message: 'Please input your password!'}],
									})(
										<Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password" placeholder="请输入您的密码"/>
									)}
								</FormItem>
								<FormItem label="确认密码">
									{getFieldDecorator('r_confirmPassword', {
										rules: [{required: true, message: 'Please input your password!'}],
									})(
										<Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password" placeholder="请再次输入您的密码"/>
									)}
								</FormItem>
								<Button type="primary" htmlType="submit">注册</Button>
							</Form>
						</TabPane>
					</Tabs>
				</Modal>
			</div>
		);
	}
}

export default MobileHeader = Form.create({})(MobileHeader);