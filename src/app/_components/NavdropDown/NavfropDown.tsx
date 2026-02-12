import { Button } from "@/components/ui/button"
import userIMG from '../../../assets/images/user.jpg'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import Link from "next/link"

export function DropdownMenuBasic({logout, isAppearMd}: {logout: any, isAppearMd: boolean}) {
  return (
    <div className={`${isAppearMd ? 'hidden md:block' : 'block md:hidden'} AN`}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="rounded-full overflow-hidden w-10 h-10 md:w-12 md:h-12 ring-0 border-0">
            <Image 
              src={userIMG} 
              alt="useIMG" 
              className="w-full h-full object-cover" 
              width={80} 
              height={80}
            />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup >
            <DropdownMenuItem className="pr-3 pl-2"><Link href={'/profile'}>Profile</Link></DropdownMenuItem>
            <DropdownMenuItem className="pr-3 pl-2"><Link href={'/wishlist'}>Wishlist</Link></DropdownMenuItem>
            <DropdownMenuItem className="pr-3 pl-2"><Link href={'/orders'}>Orders</Link></DropdownMenuItem>
            <DropdownMenuItem className="pr-3 pl-2" ><span className="hover:text-red-600 transition-colors "  onClick={logout}>Logout</span></DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}