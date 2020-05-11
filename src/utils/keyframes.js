import { keyframes } from '@emotion/core'

const colors = [
  '#e699a6',
  '#e699d2',
  '#cc99e6',
  '#9f99e6',
  '#99bfe6',
  '#99e6df',
  '#99e6b3',
  '#ace699',
  '#d9e699',
  '#e6c699',
]

export const changeColor = keyframes`
  0% {
    --color: ${colors[0]};
  }

  10% {
    --color: ${colors[1]};
  }
  2% {
    --color: ${colors[2]};
  }

  30% {
    --color: ${colors[3]};
  }

  40% {
    --color: ${colors[4]};
  }

  50% {
    --color: ${colors[5]};
  }

  60% {
    --color: ${colors[6]};
  }

  70% {
    --color: ${colors[7]};
  }

  80% {
  --color: ${colors[8]};
  }

  90% {
  --color: ${colors[9]};
  }

  100% {
  --color: ${colors[10]};
  }
`
