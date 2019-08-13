import React from 'react';
import injectSheet, {StyledComponentProps} from 'react-jss';


const styles = (theme:any) => ({
  search: {
    color: theme.color
  },
})

const Search = injectSheet(styles)((props: StyledComponentProps) => {
  // let {classes} = props;
  // console.log(classes)
  let cls = props.classes as any
  return (
    <div className={cls.search}>
      serarch
    </div>
  );
})

export default Search;