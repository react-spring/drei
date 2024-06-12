/* eslint react-hooks/exhaustive-deps: 1 */
import * as React from 'react'
import * as THREE from 'three'
import type { Color } from '@react-three/fiber'

import { Text3D } from './Text3D'
import { Center } from './Center'

export type ExampleProps = {
  /** Text font to use */
  font: string
  /** Text color */
  color?: Color
  /** Debug mode */
  debug?: boolean
  /** Text bevel size */
  bevelSize?: number
} & React.ComponentProps<'group'>

export type ExampleApi = {
  incr: (x?: number) => void
  decr: (x?: number) => void
}

/**
 * A simple counter example component. Click to increment, meta-click to decrement.
 */
export const Example = /* @__PURE__ */ React.forwardRef<ExampleApi, ExampleProps>(
  ({ font, color = '#cbcbcb', bevelSize = 0.04, debug = false, children, ...props }, fref) => {
    const [counter, setCounter] = React.useState(0)

    const incr = React.useCallback((x = 1) => setCounter(counter + x), [counter])
    const decr = React.useCallback((x = 1) => setCounter(counter - x), [counter])

    // ref-API
    const api = React.useMemo<ExampleApi>(() => ({ incr, decr }), [incr, decr])
    React.useImperativeHandle(fref, () => api, [api])

    return (
      <group {...props}>
        <React.Suspense fallback={null}>
          <Center top cacheKey={JSON.stringify({ counter, font })}>
            <Text3D bevelEnabled bevelSize={bevelSize} font={font}>
              {debug ? <meshNormalMaterial wireframe /> : <meshStandardMaterial color={color} />}
              {counter}
            </Text3D>
          </Center>
        </React.Suspense>
        {children}
      </group>
    )
  }
)
