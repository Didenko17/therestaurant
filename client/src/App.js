import { Layout, Menu, Breadcrumb } from 'antd';
import React from "react";
import SignUp from './components/SignUp'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;



function App() {
  return (
    <>
      <Layout>
        <Router>
          <Header className="header">
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
              <Menu.Item key="1">
                <Link to={'/auth/signup'}>Sign Up</Link>
              </Menu.Item>
              <Menu.Item key="2">nav 2</Menu.Item>
              <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
          </Header>
        </Router>
        <Layout>
          <Sider width={200}  className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu key="sub1" title="Фастфуд">
                <Menu.Item key="1">KFC</Menu.Item>
                <Menu.Item key="2">Mc'Donalds</Menu.Item>
                <Menu.Item key="3">Burger King</Menu.Item>
                <Menu.Item key="4">Subway</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title="Грузинская кухня">
                <Menu.Item key="5">Ткемали</Menu.Item>
                <Menu.Item key="6">Хачапури у Ивана</Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" title="Украинская кухня">
                <Menu.Item key="9">Эники-Беники</Menu.Item>
                <Menu.Item key="10">Пузата хата</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 486
              }}
            >
            <Router >
              <Switch>
                <Route exact path='/api/signup' component={SignUp}/>
              </Switch>
            </Router>
            </Content>
          </Layout>
        </Layout>
      </Layout>,
    </>
  );
}

export default App;