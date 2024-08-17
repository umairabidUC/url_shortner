import { Manrope } from 'next/font/google'
import { cn } from '@/lib/utils'
import Provider from '@/lib/Provider'
import Sidebar from './components/Sidebar'
import { AntdRegistry } from '@ant-design/nextjs-registry';
import StoreProvider from '@/app/storeProvider';
const fontHeading = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
})

const fontBody = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

export default function Layout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en" className='dark'>
        <body
          className={cn(
            'antialiased',
            fontHeading.variable,
            fontBody.variable
          )}
        >

          <Provider>
            <AntdRegistry>
              <Sidebar>
                {children}
              </Sidebar>
            </AntdRegistry>
          </Provider>

        </body>
      </html>
    </StoreProvider>
  )
}