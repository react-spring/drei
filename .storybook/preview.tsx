import React from 'react'
import type { Preview } from '@storybook/react'

import './index.css'

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
  },

  tags: ['autodocs'],
}
export default preview
