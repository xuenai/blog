import React, {useState} from 'react';

import { List } from '@components';


const Home = () => {
  let [state, setState] = useState({
    current: 1
  })
  return (
    <div className="main-content">
      <List list={[]}></List>
    </div>
  )
}

export default Home;