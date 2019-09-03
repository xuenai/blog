import React from "react";
import {useModule, setModule} from '@model';

import model from './model';
setModule("counter", model);

function Counter() {
  const { count, increment, decrement, incrementAsync } = useModule('counter');
  return (
    <>
      <h1>Counter</h1>
      <p>
        Count: <code>{count}</code>
      </p>
      <footer>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
        <button onClick={incrementAsync}>
          + Async{incrementAsync.loading && "..."}
        </button>
      </footer>
    </>
  );
}

export default Counter;
