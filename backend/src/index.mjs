import { app } from './app.mjs'

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
	console.log(`API is listening on port ${PORT}. GLHF!`)
})
