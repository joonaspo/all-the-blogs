import app from './app'
import { PORT } from './utils/config'
import { info } from './utils/logger'

app.listen(PORT, () => info(`Server started on port ${PORT}`))
