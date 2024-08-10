"use client"

import React from 'react'
import Link from 'next/link'
import {Skeleton} from "@/app/components"
import { AiFillBug } from "react-icons/ai";
import { usePathname } from 'next/navigation';
import classnames from "classnames"
import { useSession } from 'next-auth/react';
import { 
    Box, 
    Container, 
    Flex,
    DropdownMenu,
    Text,
    Avatar
} from '@radix-ui/themes';

const NavBar = () => {

  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>
            <NavLinks/>
          </Flex>
            <AuthStatus/>
        </Flex>
      </Container>
    </nav>
  )
}

const NavLinks = ()=>{

    const currentPath = usePathname();

    const links = [
        {label: 'Dashboard', href:'/'},
        {label: 'Issues', href:'/issues/list'}
    ];


    return(
        <ul className="flex space-x-6">
            {links.map((link) => (
            <li key={link.href}>
                <Link
                className={classnames({
                    "text-zinc-900": link.href === currentPath,
                    "text-zinc-500": link.href !== currentPath,
                    "hover:text-zinc-800 transition-colors":
                    true,
                })}
                href={link.href}
                >
                {link.label}
                </Link>
            </li>
            ))}
        </ul>
    )
}


const AuthStatus = ()=>{

    const {status, data: session} = useSession();

    if(status==="loading") return <Skeleton width="3rem"/>

    if(status==="unauthenticated"){
        return <Link className='nav-link' href="/api/auth/signin">Login</Link>
    }

    return (
        <Box>
            {status === "authenticated" && (
                <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                <Avatar
                    src={session.user!.image!}
                    fallback="?"
                    size="2"
                    radius="full"
                    className="cursor-pointer"
                />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                <DropdownMenu.Label>
                    <Text size="2">
                    {session.user!.email}
                    </Text>
                </DropdownMenu.Label>
                <DropdownMenu.Item>
                    <Link href="/api/auth/signout">Log out</Link>
                </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
            )}
        </Box>
    )
}




export default NavBar;