import * as React from 'react'
import { Meta, StoryObj } from '@storybook/react'

import { Setup } from '../Setup'

import { Cylinder } from '../../src/core/shapes'
import { useTurntable } from '../useTurntable'

export default {
  title: 'Shapes/Cylinder',
  component: Cylinder,
  decorators: [(storyFn) => <Setup>{storyFn()}</Setup>],
} satisfies Meta<typeof Cylinder>

type Story = StoryObj<typeof Cylinder>

function CylinderScene(props: React.ComponentProps<typeof Cylinder>) {
  const ref = useTurntable<React.ElementRef<typeof Cylinder>>()

  return (
    <Cylinder ref={ref} {...props}>
      <meshStandardMaterial wireframe />
    </Cylinder>
  )
}

export const CylinderSt = {
  args: {},
  render: (args) => <CylinderScene {...args} />,
  name: 'Default',
} satisfies Story
