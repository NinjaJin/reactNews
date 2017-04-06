import React from 'react';
import MobileHeader from './mobile_header';
import mobileFooter from './mobile_footer';
import {Row, Col, Card, notification} from 'antd';
import {Menu, Icon, Modal, Tabs, message, Form, Input, Button, Checkbox} from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class MobileUserCenter extends React.Component {
	render() {
		return (
			<div>
				<MobileHeader></MobileHeader>
				<Row>
					<Col span={24}>
						<Tabs>
							<TabPane tab="我的收藏列表" key="1">

							</TabPane>
							<TabPane tab="我的评论列表" key="2">

							</TabPane>
							<TabPane tab="头像设置" key="3">

							</TabPane>
						</Tabs>
					</Col>
				</Row>
				<mobileFooter></mobileFooter>
			</div>
		);
	}
}