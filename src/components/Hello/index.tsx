import React, { ReactElement } from 'react'

interface HelloProps {
  compiler:string,
  framework:string
}

export default function Hello(props: HelloProps): ReactElement {
  return (
    <h1>Hello from {props.compiler} and {props.framework}!</h1>
  );
}
