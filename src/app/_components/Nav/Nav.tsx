'use client'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import logo from '../../../assets/images/freshcart-logo.svg'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import { DropdownMenuBasic } from '../NavdropDown/NavfropDown'
import { Badge } from '@/components/ui/badge'
import { useQuery } from '@tanstack/react-query'
import { CartResponse } from '@/app/_type/cartResponseInterface'
import { Spinner } from '@/components/ui/spinner'

gsap.registerPlugin(useGSAP)
export default function Nav() {
  const [navPadding, setnavPadding] = useState('p-5')
  const { status, data } = useSession()
  const [isOpen, setisOpen] = useState(false)
  const pathName = usePathname()
  const { data: cartData, isError, error, isLoading } = useQuery<CartResponse>({
    queryFn: async () => {
      const resp = await fetch('/api/cart')
      if (!resp.ok) {
        throw new Error('Failed to fetch cart')
      }
      const payload = await resp.json()
      return payload
    },
    queryKey: ['get-cart']
  })

  const navRef = useRef(null)
  const mobileMenuRef = useRef(null)


  const path = [
    { href: '/', content: 'Home' },
    { href: '/categories', content: 'categories' },
    { href: '/brands', content: 'Brands' },
  ]

  const authPath = [
    { href: '/login', content: 'Login' },
    { href: '/regestier', content: 'Register' },
  ]

  function chekPathName(name: string) {
    if (name == pathName) {
      return 'active'
    } else {
      return ' '
    }
  }

  function logout() {
    signOut({
      callbackUrl: '/login'
    })
  }

  function animatePhone() {
    if (!isOpen) {
      gsap.fromTo('.phoneAN', {
        opacity: 0,
        x: -80,
        duration: 1,
      }, {
        x: 0,
        opacity: 1,
        ease: 'power4.out',
        stagger: 0.1,
      })
    }
  }

  useGSAP(() => {
    gsap.from('.AN', {
      opacity: 0,
      y: 50,
      stagger: 0.1,
      duration: 0.6,
      ease: 'back(2.5)'
    })
  })

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setnavPadding('p-2')
      } else {
        setnavPadding('p-6')
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav ref={navRef} className="bg-gray-100 w-full sticky top-0 left-0 right-0 z-50">
      <div className={`max-w-7xl px-4 md:px-8 flex flex-wrap md:flex-nowrap items-center justify-between mx-auto transition-all duration-400 ease-out ${navPadding}`}>

        {/* Logo */}
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse shrink-0">
          <Image
            src={logo}
            alt='logo'
            width={200}
            height={100}
            className='AN w-32 sm:w-39 md:w-40 h-auto shrink'
          />
        </a>

        <div className='flex justify-center items-center gap-3 md:hidden'>
          <button
            onClick={() => { setisOpen(!isOpen);  }}
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex stroke-0 AN items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base hover:bg-neutral-secondary-soft hover:text-heading cursor-pointer"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only stroke-0">Open main menu</span>
            <svg onClick={animatePhone} className="w-6 h-6 stroke-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="M5 7h14M5 12h14M5 17h14" />
            </svg>
          </button>

          {status == 'authenticated' && <DropdownMenuBasic isAppearMd={false} logout={logout} />}

          {status == 'authenticated' && (
            <Link href={'/cart'} className='relative'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
              <Badge className='absolute -top-3.5 -right-4'>{cartData?.numOfCartItems}</Badge>
            </Link>
          )}
        </div>

        <div
          ref={mobileMenuRef}
          className={`${isOpen ? 'max-h-96' : 'max-h-0'} overflow-hidden transition-all duration-200 w-full md:max-h-none md:overflow-visible md:flex md:max-w-2xl md:mx-8`}
        >
          <ul className="font-medium  flex flex-col p-4 md:p-0 mt-4 rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-4 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary md:items-center">
            {path.map((elm) => {
              return (
                <li key={elm.content}>
                  <Link href={elm.href} className={`${chekPathName(elm.href)} phoneAN AN block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 whitespace-nowrap`}>
                    {elm.content}
                  </Link>
                </li>
              )
            })}
          </ul>
          <ul className="md:hidden font-medium border-t-2 border-gray-300 flex flex-col p-4 md:p-0 mt-4 rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-4 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary md:items-center">
            {status !== 'authenticated' && authPath.map((elm) => {
              return (
                <li key={elm.content}>
                  <Link href={elm.href} className={`${chekPathName(elm.href)} phoneAN AN block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 whitespace-nowrap`}>
                    {elm.content}
                  </Link>
                </li>
              )
            })}
          </ul>


        </div>

        <div className='hidden md:flex justify-center items-center gap-5 shrink-0'>
          <ul className="font-medium border-t-2 border-gray-300 flex flex-col p-4 md:p-0 mt-4 rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-4 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary md:items-center">
            {status !== 'authenticated' && authPath.map((elm) => {
              return (
                <li key={elm.content}>
                  <Link href={elm.href} className={`${chekPathName(elm.href)} phoneAN AN block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 whitespace-nowrap`}>
                    {elm.content}
                  </Link>
                </li>
              )
            })}
          </ul>
          {status == 'authenticated' && <DropdownMenuBasic isAppearMd={true} logout={logout} />}

          {status == 'authenticated' && (
            <Link href={'/cart'} className='relative'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 AN">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
              <Badge className='absolute -top-3.5 -right-4'>
                {cartData?.numOfCartItems ?? <Spinner className="size-3" />}
              </Badge>
            </Link>
          )}
        </div>

      </div>
    </nav>
  )
}