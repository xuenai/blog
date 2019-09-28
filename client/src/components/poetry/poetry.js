import React, {Component} from 'react';
import * as jinrishici from 'jinrishici';

class Poetry extends Component{
  constructor (props) {
    super(props);
    this.state = {
      content: '',
      title: '',
    }
  }
  componentDidMount () {
    jinrishici.load(res => {
      if (res.status === 'success') {
        let {content, origin} = res.data;
        let title = `——[${origin.dynasty}] ${origin.author} 《${origin.title}》`
        this.setState({
          content,
          title
        })
      }
    })
  }
  render () {
    let {content, title} = this.state;
    return (
      <div>
        <p>{content}</p>
        <p>{title}</p>
      </div>
    )
  }
}

export default Poetry;