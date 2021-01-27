import * as React from 'react'
import {
  Plane,
  Vector3,
  Vector4,
  Matrix4,
  PerspectiveCamera,
  RGBFormat,
  Mesh,
  LinearFilter,
  WebGLRenderTarget,
} from 'three'
import { useFrame, useThree } from 'react-three-fiber'
import { BlurPass } from './materials/BlurPass'

export type ReflectorProps = Omit<JSX.IntrinsicElements['mesh'], 'args'> & {
  resolution?: number
  blur?: [number, number] | number
  args?: [number, number]
  mirror: boolean
}

export function Reflector({
  resolution = 512,
  blur = [0, 0],
  args = [12, 12],
  mirror,
  children,
  ...props
}: ReflectorProps) {
  blur = Array.isArray(blur) ? blur : [blur, blur]
  const hasBlur = blur[0] + blur[1] > 0
  const meshRef = React.useRef<Mesh>(null!)
  const [reflectorPlane] = React.useState(() => new Plane())
  const [normal] = React.useState(() => new Vector3())
  const [reflectorWorldPosition] = React.useState(() => new Vector3())
  const [cameraWorldPosition] = React.useState(() => new Vector3())
  const [rotationMatrix] = React.useState(() => new Matrix4())
  const [lookAtPosition] = React.useState(() => new Vector3(0, 0, -1))
  const [clipPlane] = React.useState(() => new Vector4())
  const [view] = React.useState(() => new Vector3())
  const [target] = React.useState(() => new Vector3())
  const [q] = React.useState(() => new Vector4())
  const [textureMatrix] = React.useState(() => new Matrix4())
  const [virtualCamera] = React.useState(() => new PerspectiveCamera())
  const { gl, scene, camera } = useThree()

  const beforeRender = React.useCallback(() => {
    reflectorWorldPosition.setFromMatrixPosition(meshRef.current.matrixWorld)
    cameraWorldPosition.setFromMatrixPosition(camera.matrixWorld)
    rotationMatrix.extractRotation(meshRef.current.matrixWorld)
    normal.set(0, 0, 1)
    normal.applyMatrix4(rotationMatrix)
    view.subVectors(reflectorWorldPosition, cameraWorldPosition)
    // Avoid rendering when reflector is facing away
    if (view.dot(normal) > 0) return
    view.reflect(normal).negate()
    view.add(reflectorWorldPosition)
    rotationMatrix.extractRotation(camera.matrixWorld)
    lookAtPosition.set(0, 0, -1)
    lookAtPosition.applyMatrix4(rotationMatrix)
    lookAtPosition.add(cameraWorldPosition)
    target.subVectors(reflectorWorldPosition, lookAtPosition)
    target.reflect(normal).negate()
    target.add(reflectorWorldPosition)
    virtualCamera.position.copy(view)
    virtualCamera.up.set(0, 1, 0)
    virtualCamera.up.applyMatrix4(rotationMatrix)
    virtualCamera.up.reflect(normal)
    virtualCamera.lookAt(target)
    virtualCamera.far = camera.far // Used in WebGLBackground
    virtualCamera.updateMatrixWorld()
    virtualCamera.projectionMatrix.copy(camera.projectionMatrix)
    // Update the texture matrix
    textureMatrix.set(0.5, 0.0, 0.0, 0.5, 0.0, 0.5, 0.0, 0.5, 0.0, 0.0, 0.5, 0.5, 0.0, 0.0, 0.0, 1.0)
    textureMatrix.multiply(virtualCamera.projectionMatrix)
    textureMatrix.multiply(virtualCamera.matrixWorldInverse)
    textureMatrix.multiply(meshRef.current.matrixWorld)
    // Now update projection matrix with new clip plane, implementing code from: http://www.terathon.com/code/oblique.html
    // Paper explaining this technique: http://www.terathon.com/lengyel/Lengyel-Oblique.pdf
    reflectorPlane.setFromNormalAndCoplanarPoint(normal, reflectorWorldPosition)
    reflectorPlane.applyMatrix4(virtualCamera.matrixWorldInverse)
    clipPlane.set(reflectorPlane.normal.x, reflectorPlane.normal.y, reflectorPlane.normal.z, reflectorPlane.constant)
    const projectionMatrix = virtualCamera.projectionMatrix
    q.x = (Math.sign(clipPlane.x) + projectionMatrix.elements[8]) / projectionMatrix.elements[0]
    q.y = (Math.sign(clipPlane.y) + projectionMatrix.elements[9]) / projectionMatrix.elements[5]
    q.z = -1.0
    q.w = (1.0 + projectionMatrix.elements[10]) / projectionMatrix.elements[14]
    // Calculate the scaled plane vector
    clipPlane.multiplyScalar(2.0 / clipPlane.dot(q))
    // Replacing the third row of the projection matrix
    projectionMatrix.elements[2] = clipPlane.x
    projectionMatrix.elements[6] = clipPlane.y
    projectionMatrix.elements[10] = clipPlane.z + 1.0
    projectionMatrix.elements[14] = clipPlane.w
  }, [])

  const [renderTarget, fbo1, fbo2, blurpass, reflectorProps] = React.useMemo(() => {
    const parameters = {
      minFilter: LinearFilter,
      magFilter: LinearFilter,
      format: RGBFormat,
      encoding: gl.outputEncoding,
    }
    const fbo1 = new WebGLRenderTarget(resolution, resolution, parameters)
    const fbo2 = new WebGLRenderTarget(resolution, resolution, parameters)
    const blurpass = new BlurPass({ gl, resolution, width: blur[0], height: blur[1] })
    const reflectorProps = { mirror, textureMatrix, tDiffuse: hasBlur ? fbo2.texture : fbo1.texture }
    return [renderTarget, fbo1, fbo2, blurpass, reflectorProps]
  }, [gl, resolution, mirror, blur, hasBlur, textureMatrix])

  useFrame(() => {
    meshRef.current.visible = false
    beforeRender()
    gl.setRenderTarget(fbo1)
    gl.render(scene, virtualCamera)
    if (hasBlur) blurpass.render(gl, fbo1, fbo2)
    meshRef.current.visible = true
    gl.setRenderTarget(null)
  })

  return (
    <mesh ref={meshRef} {...props}>
      <planeBufferGeometry args={args} />
      {children ? children('meshReflectorMaterial', reflectorProps) : <meshReflectorMaterial {...reflectorProps} />}
    </mesh>
  )
}
