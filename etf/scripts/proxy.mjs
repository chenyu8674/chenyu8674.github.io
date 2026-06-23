import http from 'http'
import { URL } from 'url'

const PORT = 8787

const server = http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    if (req.method === 'OPTIONS') {
        res.writeHead(204)
        res.end()
        return
    }

    const reqUrl = new URL(req.url, `http://localhost:${PORT}`)

    if (reqUrl.pathname !== '/proxy') {
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.end('Not Found. Use /proxy?url=...')
        return
    }

    const target = reqUrl.searchParams.get('url')
    if (!target) {
        res.writeHead(400, { 'Content-Type': 'text/plain' })
        res.end('Missing url parameter')
        return
    }

    try {
        const targetUrl = new URL(target)
        let referer = 'https://finance.eastmoney.com/'
        if (targetUrl.hostname.includes('1234567.com.cn') || targetUrl.hostname.includes('fund.eastmoney.com')) {
            referer = 'https://fund.eastmoney.com/'
        } else if (targetUrl.hostname.includes('fundf10.eastmoney.com') || targetUrl.hostname.includes('api.fund.eastmoney.com')) {
            referer = 'https://fundf10.eastmoney.com/'
        }
        const response = await fetch(target, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Referer': referer
            }
        })
        const body = await response.arrayBuffer()
        const contentType = response.headers.get('content-type') || 'application/json'
        res.writeHead(response.status, { 'Content-Type': contentType })
        res.end(Buffer.from(body))
    } catch (err) {
        res.writeHead(502, { 'Content-Type': 'text/plain' })
        res.end(`Proxy error: ${err.message}`)
    }
})

server.listen(PORT, () => {
    console.log(`CORS proxy running at http://localhost:${PORT}/proxy?url=...`)
})
