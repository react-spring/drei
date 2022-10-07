import * as React from 'react'
import { addEffect, addAfterEffect } from '@react-three/fiber'

export function useIntersect<T extends THREE.Object3D>(onChange: (visible: boolean) => void) {
  const ref = React.useRef<T>(null!)
  const check = React.useRef(false)
  const temp = React.useRef(false)
  const callback = React.useRef(onChange)
  React.useEffect(() => void (callback.current = onChange), [onChange])
  React.useEffect(() => {
    const obj = ref.current
    if (obj) {
      // Stamp out frustum check pre-emptively
      const unsub1 = addEffect(() => {
        check.current = false
        return true
      })
      // If the object is inside the frustum three will call onRender
      const oldOnRender = obj.onBeforeRender
      obj.onBeforeRender = () => (check.current = true)
      // Compare the check value against the temp value, if it differs set state
      const unsub2 = addAfterEffect(() => {
        if (check.current !== temp.current) callback.current?.((temp.current = check.current))
        return true
      })
      return () => {
        obj.onBeforeRender = oldOnRender
        unsub1()
        unsub2()
      }
    }
  }, [])
  return ref
}
