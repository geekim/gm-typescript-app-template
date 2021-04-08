
import React, { ReactElement } from 'react'
import Hello from './components/Hello';

export default function App (): ReactElement {
  return (
    <Hello compiler="TypeScript" framework="React" />
  );
}
