import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import hero from "../assets/hero.png"

const API_URL = "https://stacks-server-uw69.onrender.com/books";

export default function LibraryHero() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        getBooks();
    }, []);

    const getBooks = async () => {
        try {
            const response = await axios.get(API_URL);
            setBooks(response.data);
        } catch (error) {
            console.log("Error fetching books:", error);
        }
    };

    const totalPagesRead = books.reduce(
        (total, book) => total + Number(book.pagesRead || 0),
        0
    );

    const completedBooks = books.filter(
        (book) => Number(book.pagesRead) >= Number(book.pages)
    );

    const currentlyReading = books.filter(
        (book) =>
            Number(book.pagesRead) > 0 &&
            Number(book.pagesRead) < Number(book.pages)
    );

    const recommendedBooks = books.filter(
        (book) => book.recommended
    );

    const currentBook = currentlyReading[0];

    const currentProgress = currentBook
        ? Math.round(
              (Number(currentBook.pagesRead) /
                  Number(currentBook.pages)) *
                  100
          )
        : 0;

    return (
        <div
            className="relative w-full bg-[#14110F] text-[#F2EEE4] overflow-hidden"
            style={{
                backgroundImage:
                    "radial-gradient(circle, rgba(201,162,75,0.18) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
            }}
        >
            <Navbar />

            <div className="w-full p-8 sm:p-14">
                <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr_520px] gap-10 sm:gap-8">
                    <div className="font-serif text-md sm:text-xl font-bold leading-[0.85] uppercase text-[#C9A24B]">
                        stacks
                        <br />
                        read
                        <br />
                        track
                        <br />
                        repeat.
                    </div>

                    <div>
                        <h2 className="font-serif font-extrabold uppercase leading-[0.95] tracking-tight text-4xl sm:text-5xl md:text-6xl">
                            Discover
                            <br />
                            endless
                            <br />
                            stories
                            <br />
                            and
                            <br />
                            <span className="block pl-10 sm:pl-16">
                                expand
                            </span>
                            <span className="block pl-10 sm:pl-16">
                                your
                            </span>
                            <span className="block pl-10 sm:pl-16">
                                mind.
                            </span>
                        </h2>

                        <p className="mt-5 text-[11px] text-[#F2EEE4]/40 leading-relaxed max-w-[190px]">
                            Your simple place to collect books,
                            track pages and keep reading.
                        </p>
                    </div>
                    <div>
                        <img className="" src={hero} alt="" />
                    </div>

                 
                </div>

                <div className="flex md:justify-end">
                    <div className="md:max-w-4xl w-full">
                        <div className="mt-14 flex items-center gap-4">
                            <span className="text-[11px] font-bold uppercase">
                                About
                            </span>

                            <span className="flex-1 h-px bg-white/30" />
                        </div>

                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl">
                            <p className="text-[11px] font-bold leading-relaxed">
                                Stacks gives you one place to organise
                                your books and keep track of what you
                                are currently reading.
                            </p>

                            <p className="text-[11px] font-bold leading-relaxed">
                                Update your pages as you read and your
                                progress automatically changes across
                                the site.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <section className="px-8 sm:px-14 pt-12 sm:pt-16">
                <p className="font-serif text-3xl sm:text-4xl leading-tight">
                    {books.length} Books,
                </p>

                <p className="font-serif text-3xl sm:text-4xl leading-tight">
                    {completedBooks.length} Completed,
                </p>

                <p className="font-serif text-3xl sm:text-4xl leading-tight text-[#C9A24B]">
                    {totalPagesRead} Pages Read.
                </p>
            </section>

            <section className="px-8 sm:px-14 mt-20">
                <div className="flex items-end justify-between border-b border-[#3a3529] pb-5">
                    <div>
                        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#C9A24B]">
                            Built for readers
                        </p>

                        <h2 className="mt-2 font-serif text-4xl sm:text-5xl">
                            Everything you need.
                        </h2>
                    </div>

                    <p className="hidden md:block text-[10px] uppercase tracking-wider text-[#F2EEE4]/40">
                        Read • Track • Discover
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-b border-[#3a3529]">
                    <div className="py-8 sm:pr-8 border-b sm:border-b-0 sm:border-r border-[#3a3529]">
                        <span className="font-mono text-[9px] text-[#C9A24B]">
                            01
                        </span>

                        <h3 className="mt-5 font-serif text-2xl">
                            Your Library
                        </h3>

                        <p className="mt-3 text-[10px] leading-relaxed text-[#F2EEE4]/50 max-w-[220px]">
                            Add books, edit details and keep your
                            collection organised in one place.
                        </p>
                    </div>

                    <div className="py-8 sm:px-8 border-b lg:border-b-0 lg:border-r border-[#3a3529]">
                        <span className="font-mono text-[9px] text-[#C9A24B]">
                            02
                        </span>

                        <h3 className="mt-5 font-serif text-2xl">
                            Page Tracking
                        </h3>

                        <p className="mt-3 text-[10px] leading-relaxed text-[#F2EEE4]/50 max-w-[220px]">
                            Enter the page you reached and see exactly
                            how much of each book is complete.
                        </p>
                    </div>

                    <div className="py-8 sm:pr-8 lg:px-8 border-b sm:border-b-0 sm:border-r border-[#3a3529]">
                        <span className="font-mono text-[9px] text-[#C9A24B]">
                            03
                        </span>

                        <h3 className="mt-5 font-serif text-2xl">
                            Reading Goals
                        </h3>

                        <p className="mt-3 text-[10px] leading-relaxed text-[#F2EEE4]/50 max-w-[220px]">
                            See completed books, total pages and the
                            progress of your entire library.
                        </p>
                    </div>

                    <div className="py-8 sm:pl-8">
                        <span className="font-mono text-[9px] text-[#C9A24B]">
                            04
                        </span>

                        <h3 className="mt-5 font-serif text-2xl">
                            Recommendations
                        </h3>

                        <p className="mt-3 text-[10px] leading-relaxed text-[#F2EEE4]/50 max-w-[220px]">
                            Mark your favourite books so you can easily
                            find the stories worth recommending.
                        </p>
                    </div>
                </div>
            </section>

            <section className="px-8 sm:px-14 mt-24">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 items-center">
                    <div>
                        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#C9A24B]">
                            Reading in progress
                        </p>

                        <h2 className="mt-3 font-serif text-5xl sm:text-6xl leading-[0.95]">
                            Keep the
                            <br />
                            pages moving.
                        </h2>

                        <p className="mt-6 text-[11px] leading-relaxed text-[#F2EEE4]/50 max-w-sm">
                            Every page you update in your library
                            becomes part of your reading progress.
                            Nothing extra to manage.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-px bg-[#3a3529] border border-[#3a3529]">
                        <div className="bg-[#14110F] p-7">
                            <p className="text-[9px] uppercase tracking-wider text-[#F2EEE4]/40">
                                Books
                            </p>

                            <p className="mt-3 font-serif text-5xl">
                                {books.length}
                            </p>
                        </div>

                        <div className="bg-[#14110F] p-7">
                            <p className="text-[9px] uppercase tracking-wider text-[#F2EEE4]/40">
                                Reading
                            </p>

                            <p className="mt-3 font-serif text-5xl text-[#C9A24B]">
                                {currentlyReading.length}
                            </p>
                        </div>

                        <div className="bg-[#14110F] p-7">
                            <p className="text-[9px] uppercase tracking-wider text-[#F2EEE4]/40">
                                Finished
                            </p>

                            <p className="mt-3 font-serif text-5xl">
                                {completedBooks.length}
                            </p>
                        </div>

                        <div className="bg-[#14110F] p-7">
                            <p className="text-[9px] uppercase tracking-wider text-[#F2EEE4]/40">
                                Recommended
                            </p>

                            <p className="mt-3 font-serif text-5xl">
                                {recommendedBooks.length}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-8 sm:px-14 mt-24">
                <div className="border-t border-[#3a3529] py-16 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10">
                    <div>
                        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#C9A24B]">
                            Simple by design
                        </p>
                    </div>

                    <div>
                        <h2 className="font-serif text-4xl sm:text-6xl leading-tight max-w-3xl">
                            Your books shouldn't feel like another
                            thing you have to manage.
                        </h2>

                        <p className="mt-6 max-w-lg text-[11px] leading-relaxed text-[#F2EEE4]/50">
                            Add a book, read it, update your pages and
                            keep going. Stacks handles the numbers and
                            keeps your progress together.
                        </p>
                    </div>
                </div>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-3 gap-8 px-8 sm:px-14 pt-10 sm:pt-16 font-mono text-[11px] uppercase tracking-[0.1em]">
                <div>
                    <p className="text-[#F2EEE4]/50 mb-2">
                        Explore
                    </p>

                    <ul className="space-y-1">
                        <li>
                            <a
                                href="#"
                                className="underline decoration-[#C9A24B]/40 hover:text-[#C9A24B]"
                            >
                                Library
                            </a>
                        </li>

                        <li>
                            <a
                                href="#"
                                className="underline decoration-[#C9A24B]/40 hover:text-[#C9A24B]"
                            >
                                Reading Goals
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <p className="text-[#F2EEE4]/50 mb-2">
                        Your reading
                    </p>

                    <p className="text-[#C9A24B]">
                        {currentlyReading.length} books in progress
                    </p>
                </div>

                <div>
                    <p className="text-[#F2EEE4]/50 mb-2">
                        Pages logged
                    </p>

                    <p>{totalPagesRead} pages</p>
                </div>
            </section>

            <div className="px-4 sm:px-8 pt-20 sm:pt-28 flex items-center justify-center select-none">
                <span className="inline-flex items-center justify-center rounded-full border-2 border-[#C9A24B] w-14 h-14 sm:w-24 sm:h-24 mr-1 sm:mr-3 shrink-0">
                    <span className="block rounded-full bg-[#C9A24B] w-5 h-5 sm:w-8 sm:h-8" />
                </span>

                <h1 className="font-serif text-[16vw] sm:text-[9vw] leading-none tracking-tight whitespace-nowrap">
                    Stacks
                </h1>
            </div>

            <div className="mt-10 border-t border-[#3a3529] px-8 sm:px-14 py-4 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.15em] text-[#F2EEE4]/60">
                <span className="inline-flex items-center justify-center rounded-full border-2 border-[#C9A24B] w-3.5 h-3.5 shrink-0">
                    <span className="block rounded-full bg-[#C9A24B] w-1 h-1" />
                </span>

                <p className="truncate">
                    Read • Track pages • Finish books • Build your collection
                </p>

                <span className="inline-flex items-center justify-center rounded-full border-2 border-[#C9A24B] w-3.5 h-3.5 shrink-0">
                    <span className="block rounded-full bg-[#C9A24B] w-1 h-1" />
                </span>
            </div>
        </div>
    );
}