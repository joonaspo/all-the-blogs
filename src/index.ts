import app from './app'
import { PORT } from './utils/config'
import { logInfo } from './utils/logger'

app.listen(PORT, () => logInfo(`Server started on port ${PORT}`))
