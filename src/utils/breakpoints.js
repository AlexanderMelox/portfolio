const breakpoints = [768, 1440]

const mq = breakpoints.map(bp => `@media (min-width: ${bp / 16}em)`)

export default mq
