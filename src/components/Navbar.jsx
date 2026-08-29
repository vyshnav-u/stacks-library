import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <div>
            <nav className="flex flex-wrap items-center justify-between gap-4 px-8 sm:px-14 pt-8">

                <Link
                    to="/"
                    className="flex items-center gap-2 font-serif text-lg tracking-wide"
                >
                    <span className="inline-flex items-center justify-center rounded-full border-2 border-[#C9A24B] w-5 h-5">
                        <span className="block rounded-full bg-[#C9A24B] w-2 h-2" />
                    </span>
                    Stacks
                </Link>

                <div className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.15em] text-[#F2EEE4]/80">
                    <span className="inline-flex items-center justify-center rounded-full border-2 border-[#C9A24B] w-3.5 h-3.5 hidden sm:inline-flex">
                        <span className="block rounded-full bg-[#C9A24B] w-1 h-1" />
                    </span>

                    <Link
                        to="/books"
                        className="hover:text-[#C9A24B] transition-colors"
                    >
                        Books
                    </Link>

                    

                    <Link
                        to="/reading-goals"
                        className="hover:text-[#C9A24B] transition-colors"
                    >
                        Reading Goals
                    </Link>
                </div>

                <div className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.15em] text-[#F2EEE4]/80">
                    <span className="inline-flex items-center justify-center rounded-full border-2 border-[#C9A24B] w-3.5 h-3.5 hidden sm:inline-flex">
                        <span className="block rounded-full bg-[#C9A24B] w-1 h-1" />
                    </span>

                    <a href="#" className="hover:text-[#C9A24B] transition-colors">
                        ///
                    </a>

                    
                </div>

                <button className="rounded-full bg-[#F2EEE4] text-[#14110F] font-mono text-[11px] uppercase tracking-[0.15em] px-4 py-2 hover:bg-[#C9A24B] transition-colors">
                    Start
                </button>

            </nav>
        </div>
    )
}

export default Navbar