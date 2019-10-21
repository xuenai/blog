import React from 'react';

import './footer.scss';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hitokoto: ''
    }
  }
  componentDidMount() {
    // 获取一言
    fetch('https://v1.hitokoto.cn/')
      .then(res => res.json())
      .then(res => {
        this.setState({
          hitokoto: res.hitokoto
        })
      })
      .catch(error => console.log('error', error))
  }
  render() {
    let { hitokoto } = this.state;
    if (!hitokoto) {
      hitokoto = ' '
    }
    return (
      <div className="footer">
        <div className="footer-inner">
          <p className="copyright">Copyright© 2019 By justpeth</p>
          <p>蜀ICP备19027770号</p>
          <p>{hitokoto}</p>
        </div>
      </div>
    )
  }
}

export default Footer;