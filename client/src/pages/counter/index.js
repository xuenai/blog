import React from "react";
import {useStore } from '@config';

function Counter() {
  const { count, increment, decrement, incrementAsync } = useStore('counter');
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
