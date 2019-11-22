import React from 'react';

import './footer.scss';

import { areEqual } from '@config'

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-inner">
        <p className="copyright">Copyright© 2019 By justpeth</p>
        <p><a className="footer-link" href="http://www.beian.miit.gov.cn/" rel="noopener noreferrer" target="_blank">蜀ICP备19027770号-1</a></p>
      </div>
    </div>
  )
}

export default React.memo(Footer, areEqual);