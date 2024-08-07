import { Manrope } from 'next/font/google'
import { cn } from '@/lib/utils'
import Provider from '@/lib/Provider'

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
    <html lang="en" className='dark'>
      <body 
        className={cn(
          'antialiased',
          fontHeading.variable,
          fontBody.variable
        )}
      >
        
        <Provider>
        {children}
        </Provider>
        
      </body>
    </html>
  )
}