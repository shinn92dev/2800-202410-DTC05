"use client";

import React from "@clerk/nextjs";
import Modal from "@/components/global/Modal";
import PolicyContent from "@/components/global/PolicyContent";
import GoogleIcon from "@/components/global/icons/GoogleIcon";
import { useState } from "react";
import SignupForm from "@/components/signup/SignupForm";
import Link from "next/link";
import Image from "next/image";

export default function SignupWrapper() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="min-h-screen">
            <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
                <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                    <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                        <div className="mt-12 flex flex-col items-center">
                            <Image
                                src="/images/logo/my_body_buddy_logo.png"
                                alt="My Body Buddy Logo"
                                width={100}
                                height={100}
                                quality={100}
                                className="mx-auto"
                            />
                            <h1 className="text-2xl xl:text-3xl font-extrabold mt-8">
                                Sign up🏃‍♂️
                            </h1>
                            <div className="w-full flex-1 mt-5">
                                <div className="mb-2 flex justify-center">
                                    <p>
                                        Already have an account?&nbsp;
                                        <Link
                                            href="/login"
                                            className="hover:underline text-red-300"
                                        >
                                            Log In here
                                        </Link>
                                    </p>
                                </div>
                                <SignupForm />

                                {/* <div className="my-7 border-b text-center">
                                    <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                        Or sign up with Google
                                    </div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 hover:bg-indigo-200 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none focus:shadow-sm focus:shadow-outline">
                                        <div className="bg-white p-2 rounded-full">
                                            <GoogleIcon width={4} />
                                        </div>
                                        <span className="ml-4">
                                            Sign Up with Google
                                        </span>
                                    </button>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                        <div
                            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                            style={{
                                backgroundImage:
                                    "url('https://www.sheknows.com/wp-content/uploads/2021/08/body-weight-workouts.png')",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                            }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
