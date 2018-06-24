import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render () {
    return (
      <html>
        <Head>
          <title>Open Explorer</title>
          <link rel='stylesheet' href='/_next/static/style.css' />
          <meta name="description" content="Open Explorer, explorations social media" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}