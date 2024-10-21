import { Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { ConnectButton } from "thirdweb/react";
import { thirdWebClient } from "./layout";
import { polygonAmoy } from "thirdweb/chains";
import ConnectWallet from "@/components/ConnectWallet";

export default function Header() {
    return (
        <Navbar isBordered isBlurred={false}>
      <NavbarBrand>
        <Link href="/" className="font-bold text-2xl text-primary ">Tickets Inc.</Link>
      </NavbarBrand>
      <NavbarContent className="" justify="center">
      <NavbarItem>
        </NavbarItem>
        <NavbarItem>
         <Link href="/createticket">Create Event</Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
            <ConnectWallet/>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
    )
}