import React, { useState, useEffect } from 'react';
import { history } from 'umi';
import { NavBar, Icon,TabBar } from 'antd-mobile';
import styles from './index.less';
import { connect } from 'dva';
const layout = (props:any) => {
  const [selectedTab, setSelectedTab] = useState('');
  const {dispatch,system} = props;
  useEffect(() => {
    let pathname = props.location.pathname;
    if(pathname==='/index'){
      setSelectedTab('blueTab');
    }else if(pathname==='/products'){
      setSelectedTab('redTab');
    }
    if(system.userInfo&&!system.userInfo.name){
      dispatch({
        type: 'system/userInfo',
        payload: {},
      });
    }
  },[props.location]);
  return <div className={styles.layout}>
          <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => window.history.back()}
          rightContent={[
            <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
            <Icon key="1" type="ellipsis" />,
          ]}
        >{system.userInfo.name}</NavBar>
          <div className={styles.ctx}>
            {props.children}
          </div>
          <div>
            <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
          >
            <TabBar.Item
              title="Life"
              key="Life"
              icon={<div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' }}
              />}
              selectedIcon={<div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }}
              />
              }
              selected={selectedTab === 'blueTab'}
              badge={1}
              onPress={() => {
                props.history.push('/index')
              }}
              data-seed="logId"
            >
            </TabBar.Item>
            <TabBar.Item
              title="Life"
              key="Life"
              icon={<div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat' }}
              />}
              selectedIcon={<div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat' }}
              />
              }
              selected={selectedTab === 'redTab'}
              badge={1}
              onPress={() => {
                props.history.push('/products')
              }}
              data-seed="logId"
            >
            </TabBar.Item>
            </TabBar>

          </div>
        </div>;
}

export default connect(({ system }:any) => ({
  system,
}))(layout)