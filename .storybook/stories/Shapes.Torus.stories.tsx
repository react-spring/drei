import * as React from 'react'
import { Meta, StoryObj } from '@storybook/react'

import { Setup } from '../Setup'

import { Torus } from '../../src/core/shapes'
import { useTurntable } from '../useTurntable'

export default {
  title: 'Shapes/Torus',
  component: Torus,
  decorators: [(storyFn) => <Setup>{storyFn()}</Setup>],
} satisfies Meta<typeof Torus>

type Story = StoryObj<typeof Torus>

function TorusScene(props: React.ComponentProps<typeof Torus>) {
  const ref = useTurntable<React.ElementRef<typeof Torus>>()

  return (
    <Torus ref={ref} {...props}>
      <meshStandardMaterial wireframe />
    </Torus>
  )
}

export const TorusSt = {
  args: {},
  render: (args) => <TorusScene {...args} />,
  name: 'Default',
} satisfies Story
