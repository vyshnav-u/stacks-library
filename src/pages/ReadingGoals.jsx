import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const API_URL = "https://stacks-server-uw69.onrender.com/books";

export default function ReadingGoals() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dailyGoal, setDailyGoal] = useState(
        Number(localStorage.getItem("dailyPageGoal")) || 20
    );
    const [goalInput, setGoalInput] = useState(dailyGoal);

    useEffect(() => {
        getBooks();
    }, []);

    const getBooks = async () => {
        try {
            setLoading(true);

            const response = await axios.get(API_URL);

            setBooks(response.data);
        } catch (error) {
            console.log("Error fetching books:", error);
        } finally {
            setLoading(false);
        }
    };

    const saveDailyGoal = () => {
        const newGoal = Number(goalInput);

        if (newGoal <= 0) {
            return;
        }

        setDailyGoal(newGoal);
        localStorage.setItem("dailyPageGoal", newGoal);
    };

    const totalPages = books.reduce(
        (total, book) => total + Number(book.pages || 0),
        0
    );

    const totalPagesRead = books.reduce(
        (total, book) => total + Number(book.pagesRead || 0),
        0
    );

    const pagesRemaining = Math.max(totalPages - totalPagesRead, 0);

    const completedBooks = books.filter(
        (book) => Number(book.pagesRead) >= Number(book.pages)
    );

    const currentlyReading = books.filter(
        (book) =>
            Number(book.pagesRead) > 0 &&
            Number(book.pagesRead) < Number(book.pages)
    );

    const notStarted = books.filter(
        (book) => Number(book.pagesRead || 0) === 0
    );

    const overallProgress =
        totalPages > 0
            ? Math.round((totalPagesRead / totalPages) * 100)
            : 0;

    const averageProgress =
        books.length > 0
            ? Math.round(
                  books.reduce((total, book) => {
                      if (!book.pages) {
                          return total;
                      }

                      return (
                          total +
                          (Number(book.pagesRead || 0) /
                              Number(book.pages)) *
                              100
                      );
                  }, 0) / books.length
              )
            : 0;

    const readingBooks = [...currentlyReading].sort((a, b) => {
        const progressA =
            Number(a.pagesRead || 0) / Number(a.pages || 1);

        const progressB =
            Number(b.pagesRead || 0) / Number(b.pages || 1);

        return progressB - progressA;
    });

    return (
        <div
            className="min-h-screen w-full bg-[#14110F] text-[#F2EEE4]"
            style={{
                backgroundImage:
                    "radial-gradient(circle, rgba(201,162,75,0.18) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
            }}
        >
            <Navbar />

            <section className="px-8 pt-12 sm:px-14 sm:pt-20">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-[180px_1fr_auto] lg:items-end">
                    <div className="text-[11px] font-bold uppercase leading-relaxed text-[#C9A24B]">
                        Reading
                        <br />
                        Progress
                        <br />
                        Goals
                        <br />
                        2026.
                    </div>

                    <div>
                        <h1 className="font-serif text-[14vw] font-extrabold uppercase leading-[0.88] tracking-tight sm:text-[9vw]">
                            Reading
                            <br />

                            <span className="pl-10 sm:pl-20">
                                Goals
                            </span>
                        </h1>

                        <p className="mt-6 max-w-lg text-[11px] font-bold leading-relaxed text-[#F2EEE4]/60">
                            Track your reading progress using the actual
                            pages you have read from every book in your
                            library.
                        </p>
                    </div>

                    <button
                        onClick={getBooks}
                        className="rounded-full border border-[#C9A24B] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[#C9A24B] transition hover:bg-[#C9A24B] hover:text-black"
                    >
                        Refresh
                    </button>
                </div>
            </section>

            <section className="mt-16 px-8 sm:mt-24 sm:px-14">
                <div className="grid grid-cols-2 gap-8 border-t border-[#3a3529] pt-6 md:grid-cols-3 lg:grid-cols-6">
                    <div>
                        <p className="text-[9px] uppercase tracking-[0.15em] text-[#F2EEE4]/40">
                            Pages Read
                        </p>

                        <p className="mt-2 font-serif text-4xl text-[#C9A24B]">
                            {totalPagesRead}
                        </p>
                    </div>

                    <div>
                        <p className="text-[9px] uppercase tracking-[0.15em] text-[#F2EEE4]/40">
                            Total Pages
                        </p>

                        <p className="mt-2 font-serif text-4xl">
                            {totalPages}
                        </p>
                    </div>

                    <div>
                        <p className="text-[9px] uppercase tracking-[0.15em] text-[#F2EEE4]/40">
                            Remaining
                        </p>

                        <p className="mt-2 font-serif text-4xl">
                            {pagesRemaining}
                        </p>
                    </div>

                    <div>
                        <p className="text-[9px] uppercase tracking-[0.15em] text-[#F2EEE4]/40">
                            Completed
                        </p>

                        <p className="mt-2 font-serif text-4xl">
                            {completedBooks.length}
                        </p>
                    </div>

                    <div>
                        <p className="text-[9px] uppercase tracking-[0.15em] text-[#F2EEE4]/40">
                            Reading
                        </p>

                        <p className="mt-2 font-serif text-4xl">
                            {currentlyReading.length}
                        </p>
                    </div>

                    <div>
                        <p className="text-[9px] uppercase tracking-[0.15em] text-[#F2EEE4]/40">
                            Not Started
                        </p>

                        <p className="mt-2 font-serif text-4xl">
                            {notStarted.length}
                        </p>
                    </div>
                </div>
            </section>

            <section className="mt-16 px-8 sm:px-14">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
                    <div className="border border-[#3a3529] bg-[#181411] p-7 sm:p-10">
                        <div className="flex items-start justify-between gap-6">
                            <div>
                                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#C9A24B]">
                                    Library Progress
                                </p>

                                <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
                                    {overallProgress}%
                                </h2>
                            </div>

                            <p className="font-mono text-[10px] uppercase text-[#F2EEE4]/40">
                                {totalPagesRead} / {totalPages}
                            </p>
                        </div>

                        <div className="mt-8 h-3 w-full overflow-hidden bg-[#3a3529]">
                            <div
                                className="h-full bg-[#C9A24B] transition-all duration-500"
                                style={{
                                    width: `${Math.min(
                                        overallProgress,
                                        100
                                    )}%`,
                                }}
                            />
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                            <p className="text-[10px] uppercase tracking-wider text-[#F2EEE4]/40">
                                Overall collection progress
                            </p>

                            <p className="font-serif text-xl text-[#C9A24B]">
                                {pagesRemaining} pages left
                            </p>
                        </div>
                    </div>

                    <div className="border border-[#3a3529] bg-[#181411] p-7 sm:p-10">
                        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#C9A24B]">
                            Daily Target
                        </p>

                        <h2 className="mt-3 font-serif text-4xl">
                            {dailyGoal}
                            <span className="ml-2 text-lg text-[#F2EEE4]/40">
                                pages
                            </span>
                        </h2>

                        <p className="mt-3 text-[10px] leading-relaxed text-[#F2EEE4]/40">
                            Set how many pages you want to aim for each
                            reading day.
                        </p>

                        <div className="mt-7 flex gap-3">
                            <input
                                type="number"
                                min="1"
                                value={goalInput}
                                onChange={(e) =>
                                    setGoalInput(e.target.value)
                                }
                                className="min-w-0 flex-1 border border-[#3a3529] bg-transparent px-4 py-3 text-sm outline-none focus:border-[#C9A24B]"
                            />

                            <button
                                onClick={saveDailyGoal}
                                className="bg-[#C9A24B] px-5 text-[9px] font-bold uppercase tracking-wider text-black transition hover:bg-[#F2EEE4]"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mt-6 px-8 sm:px-14">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="border border-[#3a3529] p-7">
                        <p className="text-[9px] uppercase tracking-[0.15em] text-[#F2EEE4]/40">
                            Books Finished
                        </p>

                        <div className="mt-5 flex items-end justify-between">
                            <p className="font-serif text-5xl text-[#C9A24B]">
                                {completedBooks.length}
                            </p>

                            <p className="text-[10px] uppercase tracking-wider text-[#F2EEE4]/40">
                                of {books.length} books
                            </p>
                        </div>
                    </div>

                    <div className="border border-[#3a3529] p-7">
                        <p className="text-[9px] uppercase tracking-[0.15em] text-[#F2EEE4]/40">
                            Average Book Progress
                        </p>

                        <div className="mt-5 flex items-end justify-between">
                            <p className="font-serif text-5xl text-[#C9A24B]">
                                {averageProgress}%
                            </p>

                            <p className="text-[10px] uppercase tracking-wider text-[#F2EEE4]/40">
                                across library
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-8 py-20 sm:px-14 sm:py-28">
                <div className="mb-10 flex items-end justify-between border-b border-[#3a3529] pb-6">
                    <div>
                        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#C9A24B]">
                            In Progress
                        </p>

                        <h2 className="mt-2 font-serif text-4xl sm:text-5xl">
                            Keep reading.
                        </h2>
                    </div>

                    <p className="hidden text-[9px] uppercase tracking-wider text-[#F2EEE4]/40 sm:block">
                        {currentlyReading.length} active books
                    </p>
                </div>

                {loading ? (
                    <p className="text-sm text-[#F2EEE4]/50">
                        Loading books...
                    </p>
                ) : readingBooks.length === 0 ? (
                    <div className="border border-[#3a3529] p-10 text-center">
                        <p className="font-serif text-2xl">
                            No books currently being read.
                        </p>

                        <p className="mt-2 text-[10px] text-[#F2EEE4]/40">
                            Update the pages read on a book to start
                            tracking it here.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-5">
                        {readingBooks.map((book, index) => {
                            const progress =
                                book.pages > 0
                                    ? Math.round(
                                          (book.pagesRead /
                                              book.pages) *
                                              100
                                      )
                                    : 0;

                            const remaining = Math.max(
                                book.pages - book.pagesRead,
                                0
                            );

                            return (
                                <div
                                    key={book.id}
                                    className="grid grid-cols-[40px_60px_1fr] items-center gap-4 border-b border-[#3a3529] pb-5 sm:grid-cols-[50px_70px_1fr_120px]"
                                >
                                    <p className="font-mono text-[10px] text-[#C9A24B]">
                                        {String(index + 1).padStart(
                                            2,
                                            "0"
                                        )}
                                    </p>

                                    <img
                                        src={book.image}
                                        alt={book.title}
                                        className="aspect-[3/4] w-full object-cover"
                                    />

                                    <div>
                                        <p className="text-[8px] uppercase tracking-wider text-[#C9A24B]">
                                            {book.genre}
                                        </p>

                                        <h3 className="mt-1 font-serif text-xl">
                                            {book.title}
                                        </h3>

                                        <p className="mt-1 text-[9px] text-[#F2EEE4]/40">
                                            {book.author}
                                        </p>

                                        <div className="mt-4 h-1.5 w-full bg-[#3a3529]">
                                            <div
                                                className="h-full bg-[#C9A24B]"
                                                style={{
                                                    width: `${Math.min(
                                                        progress,
                                                        100
                                                    )}%`,
                                                }}
                                            />
                                        </div>

                                        <div className="mt-2 flex justify-between text-[8px] uppercase tracking-wider text-[#F2EEE4]/40">
                                            <span>
                                                {book.pagesRead} pages
                                            </span>

                                            <span>
                                                {remaining} remaining
                                            </span>
                                        </div>
                                    </div>

                                    <div className="hidden text-right sm:block">
                                        <p className="font-serif text-3xl text-[#C9A24B]">
                                            {progress}%
                                        </p>

                                        <p className="mt-1 text-[8px] uppercase tracking-wider text-[#F2EEE4]/40">
                                            Complete
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>

            <section className="px-4 pb-16 pt-8 sm:px-8">
                <div className="flex select-none items-center justify-center">
                    <span className="mr-2 inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[#C9A24B] sm:mr-3 sm:h-24 sm:w-24">
                        <span className="block h-5 w-5 rounded-full bg-[#C9A24B] sm:h-8 sm:w-8" />
                    </span>

                    <h2 className="font-serif text-[17vw] leading-none tracking-tight sm:text-[10vw]">
                        Stacks
                    </h2>
                </div>
            </section>
        </div>
    );
}