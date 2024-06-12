import * as React from 'react'
import { Meta, StoryObj } from '@storybook/react'

import { Setup } from '../Setup'

import { Plane } from '../../src/core/shapes'
import { useTurntable } from '../useTurntable'

export default {
  title: 'Shapes/Plane',
  component: Plane,
  decorators: [(storyFn) => <Setup>{storyFn()}</Setup>],
} satisfies Meta<typeof Plane>

type Story = StoryObj<typeof Plane>

function PlaneScene(props: React.ComponentProps<typeof Plane>) {
  const ref = useTurntable<React.ElementRef<typeof Plane>>()

  return (
    <Plane ref={ref} {...props}>
      <meshStandardMaterial wireframe />
    </Plane>
  )
}

export const PlaneSt = {
  args: {},
  render: (args) => <PlaneScene {...args} />,
  name: 'Default',
} satisfies Story
