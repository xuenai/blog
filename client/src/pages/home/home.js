import React from 'react';

import { List, Empty, Message, Button, Tooltip, Popover, Popconfirm} from '@components';

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

const Home = () => {
  return (
    <div className="main-content">
      {/* <List></List> */}
      <Empty></Empty>
      <Button onClick={() => Message.error('This is a normal message')}></Button>
      <Tooltip trigger="click" placement="top" overlay={<span>tooltip</span>}>
        <a href="#">hover</a>
      </Tooltip>
      <div>
        <Popover content={content} title="Title">
          <Button>14</Button>
        </Popover>
      </div>
      <div>
      <Popconfirm title="Are you sure delete this task?" onCancel={e =>console.log('cancel')} onConfirm={e =>console.log('onConfirm')} >
        <span>popconfirm</span>
      </Popconfirm>
      </div>
    </div>
  )
}

export default Home;