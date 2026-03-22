"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Building, Crown, Plus, Sparkles, Ticket } from "lucide-react";
// import { SignInButton, useAuth, UserButton, useUser } from "@clerk/nextjs";
// import { Authenticated, Unauthenticated } from "convex/react";
import { BarLoader } from "react-spinners";
import { useStoreUser } from "@/hooks/use-store-user";
// import { useOnboarding } from "@/hooks/use-onboarding";
// import OnboardingModal from "./onboarding-modal";
// import SearchLocationBar from "./search-location-bar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
// import UpgradeModal from "./upgrade-modal";
import { Badge } from "./ui/badge";
import {
  SignIn,
  SignInButton,
  SignUpButton,
  UserButton,
  SignedOut,
  Show,
} from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";

export default function Header() {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const { isLoading } = useStoreUser();

  //   const { showOnboarding, handleOnboardingComplete, handleOnboardingSkip } =
  //     useOnboarding();

  //   const { has } = useAuth();
  //   const hasPro = has?.({ plan: "pro" });

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-xl z-20 border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {" "}
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/spott.png"
              alt="Spott logo"
              width={500}
              height={500}
              className="w-full h-11"
              priority
            />
            {/* <span className="text-purple-500 text-2xl font-bold">spott*</span> */}
            {/* {hasPro && (
              <Badge className="bg-linear-to-r from-pink-500 to-orange-500 gap-1 text-white ml-3">
                <Crown className="w-3 h-3" />
                Pro
              </Badge>
            )} */}
          </Link>
          {/* Search & Location - Desktop Only */}
          <div className="hidden md:flex flex-1 justify-center">
            {/* <SearchLocationBar /> */}
          </div>
          {/* Right Side Actions */}
          <div className="flex items-center">
            <Button
              variant={"ghost"}
              size="sm"
              onClick={() => setShowUpgradeModal(true)}
            >
              Pricing
            </Button>

            <Button variant="ghost" size="sm" asChild className={"mr-2"}>
              <Link href="explore"> Explore </Link>
            </Button>
            <Authenticated>
              <Button size="lg" asChild className="flex gap-2 mr-4">
                <Link
                  href="/create-event"
                  className="flex items-center justify-between"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline"> Create Event </span>
                </Link>
              </Button>
              <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Link
                    label="My tickets"
                    labelIcon={<Ticket size={16} />}
                    href="/my-tickets"
                  />
                  <UserButton.Link
                    label="My Events"
                    labelIcon={<Building size={16} />}
                    href="/my-events"
                  />
                  <UserButton.Action label="manageAccount" />
                </UserButton.MenuItems>
              </UserButton>
            </Authenticated>
            <Unauthenticated>
              <SignInButton mode="modal">
                <button size="sm">Sign in</button>
              </SignInButton>
              <SignUpButton>
                <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </Unauthenticated>
          </div>
        </div>

        {/* Mobile Search & Location - Below Header */}
        <div className="md:hidden border-t px-3 py-3">
          {/* <SearchLocationBar /> */}
        </div>

        {isLoading && (
          <div className="absolute bottom-0 left-0 w-full">
            <BarLoader width={"100%"} color="#a855f7" />
          </div>
        )}
      </nav>
    </>
  );
}
