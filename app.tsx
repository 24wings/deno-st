import type { ComponentType } from 'https://esm.sh/react'
import {React} from './dep.ts'

export default function App({ Page, pageProps }: { Page: ComponentType<any>, pageProps: any }) {
  return (
    <main>
      <head>
        <title>Hello World - Aleph.js</title>
      </head>
      <Page {...pageProps} />
    </main>
  )
}

