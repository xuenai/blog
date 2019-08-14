import React, { RefObject } from "react";
import injectSheet, { StyledComponentProps } from "react-jss";

const styles = {
  "search-box": {
    alignSelf: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    width: 160,
    height: 40,
    padding: 4,
  },
  search: {
    position: "relative",
    width: 16,
    height: 16,
    border: "2px solid var(--color)",
    borderRadius: 8,
    transition: "all .3s ease .15s",
    cursor: "pointer",
    "& input": {
      position: "absolute",
      display: "flex",
      alignItems: "center",
      width: "100%",
      height: "100%",
      opacity: 0,
      backgroundColor: "transparent",
      transition: "opacity .15s ease",
      fontSize: "calc(var(--fontSizeBig) * 1px)",
      cursor: "pointer"
    }
  },
  "search--open": {
    width: "100%",
    border: "none",
    transitionDelay: ".1s",
    "& input": {
      position: 'relative',
      zIndex: 1,
      opacity: 1,
      cursor: 'text',
    }
  },
  "search-btn": {
    position: "absolute",
    top: "90%",
    left: "100%",
    width: 5,
    height: 2,
    borderRadius: 4,
    backgroundColor: "var(--color)",
    transform: "rotate(45deg)",
    transformOrigin: "top left",
    transition: "width .15s ease .45s"
  },
  "search-btn--open": {
    transitionDelay: "0s",
    width: 0
  },
  // 搜索的那个 √
  "correct-icon": {
    position: "absolute",
    right: -2,
    top: "50%",
    width: 16,
    height: 16,
    cursor: "pointer",
    transform: "translateY(-50%)",
    '&:hover':{
      '& span':{
        backgroundColor: 'var(--primary)',
      }
    },
    "& span": {
      position: "absolute",
      width: 0,
      height: 2,
      borderRadius: 2,
      transition: "all .25s ease",
      backgroundColor: "var(--color)"
    },
    "& span:first-child": {
      top: 2,
      right: 0,
      width: 0,
      transform: "rotate(-45deg)",
      transformOrigin: "center right"
    },
    "& span:nth-child(2)": {
      right: 10,
      bottom: 2,
      width: 0,
      transformOrigin: "center right",
      transform: "rotate(45deg)"
    }
  },
  "correct-icon--open": {
    "& span:first-child": {
      width: 15,
      transitionDelay: ".1s"
    },
    "& span:nth-child(2)": {
      width: 8,
      transitionDelay: ".35s"
    }
  }
};

type State = {
  isOpen: boolean;
  iptFocus: boolean;
};


class Search extends React.Component<StyledComponentProps, State> {
  textInput: string | ((instance: HTMLInputElement | null) => void) | RefObject<HTMLInputElement> | null | undefined;
  constructor(props: StyledComponentProps) {
    super(props);
    this.state = {
      isOpen: false,
      iptFocus: false
    };
    this.textInput = React.createRef()
  }
  focusInptHandle() {
    let { isOpen } = this.state;
    if (!isOpen) {
      this.setState({
        isOpen: true
      });
      (this.textInput as any).current.focus();
    }
  }
  onBlurHandle () {
    this.setState({
      isOpen: false
    })
  }
  onKeyupHandle (e: React.KeyboardEvent) {
    if (e.keyCode === 13) {
      this.searchHandle()
    }
  }
  searchHandle() {
    console.log(`search`);
    this.onBlurHandle();
  }
  render() {
    let cls = this.props.classes as any;
    let { isOpen } = this.state;
    return (
      <div
        className={cls["search-box"]}
      >
        <div
          className={
            isOpen ? `${cls.search} ${cls["search--open"]}` : cls.search
          }
          onClick={this.focusInptHandle.bind(this)}
        >
          <input
            type="text"
            placeholder="回车进行搜索..."
            className={isOpen ? cls["input--open"] : ""}
            onKeyUp={this.onKeyupHandle.bind(this)}
            ref={this.textInput}
            onBlur={this.onBlurHandle.bind(this)}
          />
          <span
            className={
              isOpen
                ? `${cls["search-btn"]} ${cls["search-btn--open"]}`
                : cls["search-btn"]
            }
          />
          <div
            className={
              isOpen
                ? `${cls["correct-icon"]} ${cls["correct-icon--open"]}`
                : cls["correct-icon"]
            }
          >
            <span />
            <span />
          </div>
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(Search);
