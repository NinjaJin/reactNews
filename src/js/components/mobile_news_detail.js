import React from 'react';
import MobileHeader from './mobile_header';
import mobileFooter from './mobile_footer';
import CommonComments from './common_comments';
import {Row, Col, BackTop} from 'antd';

export default class MobileNewsDetail extends React.Component {
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
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.params.uniquekey, myFechOptions)
			.then(response=>response.json())
			.then(json=> {
				this.setState({newsItem: json});
				document.title = this.state.newsItem.title + "-React News";
			})
	}

	createMarkup() {
		return {__html: this.state.newsItem.pagecontent};
	}

	render() {
		return (
			<div id="mobileDetailsContainer">
				<MobileHeader></MobileHeader>
				<div className="ucmobileList"></div>
				<Row>
					<Col span={24} className="container">
						<div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
						<CommonComments uniquekey={this.props.params.uniquekey}></CommonComments>
					</Col>
				</Row>
				<mobileFooter></mobileFooter>
				<BackTop></BackTop>
			</div>
		);
	}

}
