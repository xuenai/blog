import React from 'react';

import { List, Empty , Message, Button, Spin, Tooltip} from '@components';


const Home = () => {
  return (
    <div className="main-content">
      {/* <List></List> */}
      <Empty></Empty>
      <Button onClick={() => Message.error('This is a normal message')}></Button>
      <Spin></Spin>
      <Tooltip placement="top" overlay={<span>tooltip</span>}>
        <a href="#">hover</a>
      </Tooltip>
    </div>
  )
}

export default Home;