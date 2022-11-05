import logger from 'pino'
import dayjs = require('dayjs')

const log = logger({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
        }
    },
    prettifier: true,
    base: {
        pid: false
    },
    timestamp: () => `,"time":"${dayjs().format()}"`
})

export default log