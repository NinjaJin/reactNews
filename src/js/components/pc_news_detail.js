import React from 'react';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCNewsImageBlock from './pc_new_image_block';
import CommonComments from './common_comments';
import {Row, Col, BackTop} from 'antd';

export default class PCNewsDetail extends React.Component {
	constructor() {
		super();
		this.state = {
			newsItem: ''
		};
	};
	componentDidMount() {
		var myFechOptions = {
			method: 'GET'
		};
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey="+this.props.params.uniquekey,myFechOptions)
			.then(response=>response.json())
			.then(json=>{
				this.setState({newsItem: json});
				document.title = this.state.newsItem.title + "-React News";
			})
	}
	createMarkup() {
		return {__html: this.state.newsItem.pagecontent};
	}

	render() {
		return (
			<div>
				<PCHeader></PCHeader>
				<Row>
					<Col span={2}></Col>
					<Col span={14} className="container">
						<div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
						<CommonComments uniquekey={this.props.params.uniquekey}></CommonComments>
					</Col>
					<Col span={6}>
						<PCNewsImageBlock count="40" type="top" width="100%" cardTitle="相关新闻" imageWidth="142px"/>
					</Col>
					<Col span={2}></Col>
				</Row>
				<PCFooter></PCFooter>
				<BackTop></BackTop>
			</div>
		);
	}

}
