// Cloudflare Workers 部署用（可选，比公共代理更稳定）
// 部署后在 etf.html 中设置：CUSTOM_PROXY_URL = 'https://你的域名.workers.dev/?url='
export default {
    async fetch(request) {
        const reqUrl = new URL(request.url)
        const target = reqUrl.searchParams.get('url')
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }

        if (request.method === 'OPTIONS') {
            return new Response(null, { status: 204, headers: corsHeaders })
        }

        if (!target) {
            return new Response('Missing url parameter. Use ?url=...', { status: 400, headers: corsHeaders })
        }

        try {
            const targetUrl = new URL(target)
            let referer = 'https://finance.eastmoney.com/'
            if (targetUrl.hostname.includes('1234567.com.cn') || targetUrl.hostname.includes('fund.eastmoney.com')) {
                referer = 'https://fund.eastmoney.com/'
            } else if (targetUrl.hostname.includes('fundf10.eastmoney.com') || targetUrl.hostname.includes('api.fund.eastmoney.com')) {
                referer = 'https://fundf10.eastmoney.com/'
            } else if (targetUrl.hostname.includes('finmindtrade.com')) {
                referer = 'https://finmindtrade.com/'
            }

            const upstream = await fetch(target, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    'Referer': referer
                }
            })
            const body = await upstream.arrayBuffer()
            const headers = new Headers(corsHeaders)
            const contentType = upstream.headers.get('content-type')
            if (contentType) headers.set('Content-Type', contentType)

            return new Response(body, { status: upstream.status, headers })
        } catch (err) {
            return new Response('Proxy error: ' + err.message, { status: 502, headers: corsHeaders })
        }
    }
}
