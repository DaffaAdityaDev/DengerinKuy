import dynamic from 'next/dynamic';
import React from 'react';

function NoSsr(props) {
  return (
    <React.Fragment>
      {props.children}
    </React.Fragment>
  )
}

export default dynamic(() => Promise.resolve(NoSsr), {
    ssr: false
});