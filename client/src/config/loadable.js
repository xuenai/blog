import React from 'react';
import Loadable from 'react-loadable';

import { Loading } from '@components';

//通用的过场组件
const loadingComponent = () => {
  return (
    <Loading title="页面装载中...">loading</Loading>
  )
}

//过场组件默认采用通用的，若传入了loading，则采用传入的过场组件
export default (loader, loading = loadingComponent) => {
  return Loadable({
    loader,
    loading
  });
}