import React, { useRef } from 'react';
import './notFound.scss';
import image from '@assets/images/404-bg.jpg';

const imgMoveFunction = (e, ref) => {
  e.persist();
  let lMouseX = Math.max(-100, Math.min(100, document.documentElement.clientWidth / 2 - e.clientX));
  let lMouseY = Math.max(-100, Math.min(100, document.documentElement.clientHeight / 2 - e.clientY));
  let lFollowX = (20 * lMouseX) / 100;
  let lFollowY = (10 * lMouseY) / 100;
  let translate = 'translate(' + lFollowX + 'px, ' + lFollowY + 'px) scale(1.2)';
  ref.current.style.transform = translate;
}

const NotFound = () => {
  const imgRef = useRef(null);
  return (
    <div className='not-found' onClick={e => imgMoveFunction(e, imgRef)} onMouseMove={e => imgMoveFunction(e, imgRef)}>
      <h1>404</h1>
      <h2>Page not found</h2>
      <p>I tried it, but I failed...</p>
      {/* <a>back to home</a> */}
      <img src={image} alt="not found" ref={imgRef} />
    </div>
  )
}

export default NotFound;