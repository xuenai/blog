import React from "react";

import {useStore} from '@config';

function Home() {
  const { count, increment } = useStore('counter'); // Use other model

  return (
    <>
      <h1>Home</h1>
      <p>
        Count: <code>{count}</code>
      </p>
      <footer>
        <button onClick={increment}>+ Count</button>
      </footer>
    </>
  );
}

export default Home;