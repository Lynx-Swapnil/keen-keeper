import React from 'react';
import Link from 'next/link';
import { FaFacebookF } from 'react-icons/fa';
import { FiCircle } from 'react-icons/fi';
import { RiTwitterXLine } from 'react-icons/ri';

const Footer = () => {
    return (
        <footer className="mt-16 border-t border-[#2b6a58] bg-[#1f5a48] text-white">
            <div className="mx-auto w-full max-w-6xl px-6 py-12 text-center">
                <h2 className="text-6xl font-extrabold tracking-tight">KeenKeeper</h2>

                <p className="mx-auto mt-4 max-w-3xl text-sm text-[#d4e6de]">
                    Your personal shelf of meaningful connections. Browse, tend, and nurture
                    the relationships that matter most.
                </p>

                <h3 className="mt-8 text-2xl font-semibold">Social Links</h3>

                <div className="mt-4 flex items-center justify-center gap-3">
                    <Link
                        href="#"
                        aria-label="Social profile"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1f2937] transition-transform hover:scale-105"
                    >
                        <FiCircle className="text-base" />
                    </Link>
                    <Link
                        href="#"
                        aria-label="Facebook"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1f2937] transition-transform hover:scale-105"
                    >
                        <FaFacebookF className="text-base" />
                    </Link>
                    <Link
                        href="#"
                        aria-label="X"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1f2937] transition-transform hover:scale-105"
                    >
                        <RiTwitterXLine className="text-base" />
                    </Link>
                </div>

                <div className="mt-10 border-t border-[#2b6a58] pt-6">
                    <div className="flex flex-col items-center justify-between gap-4 text-sm text-[#a7c4ba] sm:flex-row">
                        <p>&copy; 2026 KeenKeeper. All rights reserved.</p>

                        <nav className="flex items-center gap-8" aria-label="Footer links">
                            <Link href="#" className="hover:text-white">
                                Privacy Policy
                            </Link>
                            <Link href="#" className="hover:text-white">
                                Terms of Service
                            </Link>
                            <Link href="#" className="hover:text-white">
                                Cookies
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;