import * as React from 'react'
import { Vector3 } from 'three'

import { Setup } from '../Setup'
import { PivotControls, Box } from '../../src'
import { Meta, StoryObj } from '@storybook/react'

export default {
  title: 'Gizmos/PivotControls',
  component: PivotControls,
  decorators: [(storyFn) => <Setup cameraPosition={new Vector3(0, 0, 2.5)}>{storyFn()}</Setup>],
} satisfies Meta<typeof PivotControls>

type Story = StoryObj<typeof PivotControls>

function UsePivotScene(props: React.ComponentProps<typeof PivotControls>) {
  return (
    <>
      <PivotControls {...props}>
        <Box>
          <meshStandardMaterial />
        </Box>
      </PivotControls>
      <directionalLight position={[10, 10, 5]} />
    </>
  )
}

export const UsePivotSceneSt = {
  args: {
    depthTest: false,
    anchor: [-1, -1, -1],
    scale: 0.75,
  },
  render: (args) => <UsePivotScene {...args} />,
  name: 'Default',
} satisfies Story
