import React from 'react';
import injectSheet from 'react-jss';

const styles = {
  'list-item': {
    '&:nth-child(n)': {
      backgroundColor: 'var(--bg)',
    },
    '&:nth-child(2n)': {
      backgroundColor: 'var(--bgBase)',
    }
  },
  'list-item-inner': {
    position: 'relative',
    maxWidth: 680,
    margin: '0 auto',
    padding: '70px 20px 65px',
    textAlign: 'center',
  },
  'item-title': {
    paddTop: 30,
    '& p': {
      fontSize: 20,
      color: 'var(--black)',
    }
  },
  'item-meta': {
    paddingTop: 4,
    color: 'var(--color)',
  },
  'item-meta-hr': {
    display: 'inline-block',
    paddingTop: 20,
    width:55,
    borderBottom: '2px solid var(--color)',
  },
  'item-content': {
    padding: '20px 0',
    fontSize: 'calc(var(--fontSizeBig) * 1px)',
  },
  'item-readmore': {
    fontSize: 'calc(var(--fontSizeBig) * 1px)',
  }
}

const Item = injectSheet(styles)(({classes}) => {
  return (
    <div className={classes['list-item']}>
      <div className={classes['list-item-inner']}>
        <div className={classes['list-item-img']}></div>
        <div className={classes['item-title']}>
          <p>这是一个标题</p>
        </div>
        <p className={classes['item-meta']}>published on 2019.08.25</p>
        <span className={classes['item-meta-hr']}></span>
        <div className={classes['item-content']}>
          <p>这是个文章的简介阿萨德刚大三所规定的水电费</p>
        </div>
        <div className={classes['item-readmore']}>
          <span >阅读全文</span>
        </div>
      </div>
    </div>
  )
})

export default Item