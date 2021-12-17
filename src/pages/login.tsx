import React from 'react';
import { Button,List, InputItem, WhiteSpace } from 'antd-mobile';
import { createForm } from 'rc-form';
import { connect } from 'dva';

class BasicInputExample extends React.Component {
  componentDidMount() {
    // this.autoFocusInst.focus();
  }
  render() {
    const { dispatch, products,history,form } = this.props as any;
    const { getFieldProps,getFieldValue } = form as any;
    console.log(123,this.props);
    
    const submit =()=>{
      let phone = getFieldValue('phone');
      let password = getFieldValue('password');
      dispatch({
        type: 'system/userInfo',
        payload: {phone,password},
      });
      history.push('/index')
    }
    return (
      <div>
        <h1>Page login</h1>

        <WhiteSpace />
        <List renderHeader={() => 'Format'}>
          <InputItem
            {...getFieldProps('phone')}
            type="phone"
            placeholder="186 1234 1234"
          >手机号码</InputItem>
          <InputItem
            {...getFieldProps('password')}
            type="password"
            placeholder="****"
          >密码</InputItem>
        </List>
        <WhiteSpace />
        <Button onClick={submit} type="primary">登录</Button>
      </div>
    );
  }
}


const BasicInputExampleWrapper = createForm()(connect(({ system }:any) => ({
  system,
}))(BasicInputExample));
export default BasicInputExampleWrapper