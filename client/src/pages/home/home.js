import React, {useState} from 'react';

import { List } from '@components';


const Home = () => {
  let [state, setState] = useState({
    current: 1
  })
  return (
    <div className="main-content">
      <List list={[]}></List>
      {/* <Page current={data.ownArticles.current} total={data.ownArticles.totalPage} onChange={e => {setCurrent(e); refetch();}}></Page> */}
    </div>
  )
}

export default Home;