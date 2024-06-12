import * as React from 'react'
import { Meta, StoryObj } from '@storybook/react'

import { Setup } from '../Setup'

import { Sphere } from '../../src/core/shapes'
import { useTurntable } from '../useTurntable'

export default {
  title: 'Shapes/Sphere',
  component: Sphere,
  decorators: [(storyFn) => <Setup>{storyFn()}</Setup>],
} satisfies Meta<typeof Sphere>

type Story = StoryObj<typeof Sphere>

function SphereScene(props: React.ComponentProps<typeof Sphere>) {
  const ref = useTurntable<React.ElementRef<typeof Sphere>>()

  return (
    <Sphere ref={ref} {...props}>
      <meshStandardMaterial wireframe />
    </Sphere>
  )
}

export const SphereSt = {
  args: {},
  render: (args) => <SphereScene {...args} />,
  name: 'Default',
} satisfies Story
