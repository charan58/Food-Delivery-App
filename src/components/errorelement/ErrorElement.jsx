import React from 'react'
import {useRouteError} from 'react-router-dom';
function ErrorElement() {
  console.log(useRouteError);
  return (
    <div>
      <h1>{useRouteError}</h1>
    </div>
  )
}

export default ErrorElement
