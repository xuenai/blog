import React from 'react';
import injectSheet from 'react-jss';

const styles = {
  'list-item': {
    width: 400,
  }
}

const Aside = injectSheet(styles)(({classes}) => {
  return (
    <div className={classes['list-item']}>List</div>
  )
})

export default Aside