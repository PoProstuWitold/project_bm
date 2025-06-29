export function basicAuth(req, res, next) {
	const auth = req.headers.authorization

	if (!auth || !auth.startsWith('Basic ')) {
		res.setHeader('WWW-Authenticate', 'Basic realm="Protected"')
		return res.status(401).send('Authentication required')
	}

	const base64 = auth.split(' ')[1]
	const [user, pass] = Buffer.from(base64, 'base64').toString().split(':')

	if (user === 'admin' && pass === 'secret') {
		next()
	} else {
		return res.status(403).send('Access denied')
	}
}