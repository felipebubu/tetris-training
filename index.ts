const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'));

app.use('/static', express.static(__dirname + '/public'));

app.get('/', (req: any, res: any) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
