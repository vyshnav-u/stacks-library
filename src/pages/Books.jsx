import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const API_URL = "https://stacks-server-uw69.onrender.com/books";

export default function Books() {
    const [books, setBooks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingBook, setEditingBook] = useState(null);
    const [selectedBook, setSelectedBook] = useState(null);
    const [pagesInput, setPagesInput] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const [form, setForm] = useState({
        title: "",
        author: "",
        genre: "",
        rating: "",
        pages: "",
        image: "",
    });

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

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const openAddForm = () => {
        setEditingBook(null);

        setForm({
            title: "",
            author: "",
            genre: "",
            rating: "",
            pages: "",
            image: "",
        });

        setShowForm(true);
    };

    const openEditForm = (book) => {
        setEditingBook(book);

        setForm({
            title: book.title,
            author: book.author,
            genre: book.genre,
            rating: book.rating,
            pages: book.pages,
            image: book.image,
        });

        setShowForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingBook) {
                const updatedBook = {
                    ...editingBook,
                    title: form.title,
                    author: form.author,
                    genre: form.genre,
                    rating: Number(form.rating),
                    pages: Number(form.pages),
                    image: form.image,
                };

                const response = await axios.put(
                    `${API_URL}/${editingBook.id}`,
                    updatedBook
                );

                setBooks(
                    books.map((book) =>
                        book.id === editingBook.id ? response.data : book
                    )
                );

                if (selectedBook?.id === editingBook.id) {
                    setSelectedBook(response.data);
                }
            } else {
                const newBook = {
                    title: form.title,
                    author: form.author,
                    genre: form.genre,
                    rating: Number(form.rating),
                    pages: Number(form.pages),
                    pagesRead: 0,
                    image: form.image,
                    recommended: false,
                };

                const response = await axios.post(API_URL, newBook);
                setBooks([...books, response.data]);
            }

            setShowForm(false);
        } catch (error) {
            console.log("Error saving book:", error);
        }
    };

    const deleteBook = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);

            setBooks(books.filter((book) => book.id !== id));

            if (selectedBook?.id === id) {
                setSelectedBook(null);
            }
        } catch (error) {
            console.log("Error deleting book:", error);
        }
    };

    const toggleRecommended = async (id) => {
        const bookToUpdate = books.find((book) => book.id === id);

        if (!bookToUpdate) return;

        const newRecommendedValue = !bookToUpdate.recommended;

        try {
            const response = await axios.patch(`${API_URL}/${id}`, {
                recommended: newRecommendedValue,
            });

            setBooks(
                books.map((book) =>
                    book.id === id ? response.data : book
                )
            );

            if (selectedBook?.id === id) {
                setSelectedBook(response.data);
            }
        } catch (error) {
            console.log("Error updating recommendation:", error);
        }
    };

    const openBookDetails = (book) => {
        setSelectedBook(book);
        setPagesInput(book.pagesRead || 0);
    };

    const updatePagesRead = async () => {
        if (!selectedBook) return;

        let pages = Number(pagesInput);

        if (pages < 0) {
            pages = 0;
        }

        if (pages > selectedBook.pages) {
            pages = selectedBook.pages;
        }

        try {
            const response = await axios.patch(
                `${API_URL}/${selectedBook.id}`,
                {
                    pagesRead: pages,
                }
            );

            setBooks(
                books.map((book) =>
                    book.id === selectedBook.id ? response.data : book
                )
            );

            setSelectedBook(response.data);
            setPagesInput(response.data.pagesRead);
        } catch (error) {
            console.log("Error updating reading progress:", error);
        }
    };

    const recommendedCount = books.filter(
        (book) => book.recommended
    ).length;

    const categories = [
        "All",
        ...new Set(
            books
                .map((book) => book.genre?.trim())
                .filter(Boolean)
        ),
    ];

    const filteredBooks =
        selectedCategory === "All"
            ? books
            : books.filter(
                  (book) =>
                      book.genre?.trim().toLowerCase() ===
                      selectedCategory.toLowerCase()
              );

    return (
        <div
            className="min-h-screen w-full bg-[#14110F] text-[#F2EEE4] overflow-hidden"
            style={{
                backgroundImage:
                    "radial-gradient(circle, rgba(201,162,75,0.18) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
            }}
        >
            <Navbar />

            <section className="px-8 sm:px-14 pt-12 sm:pt-20">
                <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr_auto] gap-8 items-end">
                    <div className="text-[11px] font-bold uppercase leading-relaxed text-[#C9A24B]">
                        Library
                        <br />
                        Collection
                        <br />
                        Available
                        <br />
                        Now.
                    </div>

                    <div>
                        <h1 className="font-serif font-extrabold uppercase leading-[0.88] tracking-tight text-[12vw] sm:text-[9vw]">
                            Available
                            <br />
                            <span className="pl-10 sm:pl-20">
                                Books
                            </span>
                        </h1>

                        <p className="mt-6 max-w-md text-[11px] font-bold leading-relaxed text-[#F2EEE4]/60">
                            Explore our collection, manage your books and
                            recommend the stories worth reading.
                        </p>
                    </div>

                    <button
                        onClick={openAddForm}
                        className="rounded-full bg-[#C9A24B] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-black hover:bg-[#F2EEE4] transition"
                    >
                        + Add Book
                    </button>
                </div>
            </section>

            <section className="px-8 sm:px-14 mt-16 sm:mt-24">
                <div className="border-t border-[#3a3529] pt-6 grid grid-cols-2 sm:grid-cols-4 gap-8">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.15em] text-[#F2EEE4]/40">
                            Total Books
                        </p>

                        <p className="mt-2 font-serif text-4xl">
                            {books.length}
                        </p>
                    </div>

                    <div>
                        <p className="text-[10px] uppercase tracking-[0.15em] text-[#F2EEE4]/40">
                            Categories
                        </p>

                        <p className="mt-2 font-serif text-4xl">
                            {Math.max(categories.length - 1, 0)}
                        </p>
                    </div>

                    <div>
                        <p className="text-[10px] uppercase tracking-[0.15em] text-[#F2EEE4]/40">
                            Recommended
                        </p>

                        <p className="mt-2 font-serif text-4xl text-[#C9A24B]">
                            {recommendedCount}
                        </p>
                    </div>

                    <div>
                        <p className="text-[10px] uppercase tracking-[0.15em] text-[#F2EEE4]/40">
                            Showing
                        </p>

                        <p className="mt-2 font-serif text-4xl">
                            {filteredBooks.length}
                        </p>
                    </div>
                </div>
            </section>

            <section className="px-8 sm:px-14 mt-16">
                <div className="border-y border-[#3a3529] py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                    <div className="font-mono text-[10px] uppercase tracking-[0.15em]">
                        <span className="text-[#C9A24B]">
                            {String(filteredBooks.length).padStart(2, "0")}
                        </span>

                        <span className="mx-3 text-[#F2EEE4]/30">
                            /
                        </span>

                        <span>
                            {selectedCategory === "All"
                                ? "All Books"
                                : selectedCategory}
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() =>
                                    setSelectedCategory(category)
                                }
                                className={`border px-4 py-2 text-[10px] uppercase tracking-wider transition ${
                                    selectedCategory === category
                                        ? "border-[#C9A24B] bg-[#C9A24B] text-black"
                                        : "border-[#3a3529] text-[#F2EEE4] hover:border-[#C9A24B]"
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-8 sm:px-14 py-16 sm:py-24">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C9A24B]">
                            Collection / 2026
                        </p>

                        <h2 className="mt-2 font-serif text-4xl sm:text-5xl">
                            Browse the shelves.
                        </h2>
                    </div>

                    <p className="hidden sm:block font-mono text-[10px] uppercase tracking-wider text-[#F2EEE4]/40">
                        {filteredBooks.length} results
                    </p>
                </div>

                {filteredBooks.length === 0 ? (
                    <div className="border-y border-[#3a3529] py-20 text-center">
                        <p className="font-serif text-3xl text-[#F2EEE4]/40">
                            No books found.
                        </p>

                        <button
                            onClick={() => setSelectedCategory("All")}
                            className="mt-5 text-[9px] uppercase tracking-[0.2em] text-[#C9A24B]"
                        >
                            View all books
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-12">
                        {filteredBooks.map((book, index) => (
                            <article
                                key={book.id}
                                className="group cursor-pointer"
                                onClick={() => openBookDetails(book)}
                            >
                                <div className="relative border border-white/20 p-1 aspect-[3/4] overflow-hidden bg-[#211D19]">
                                    <img
                                        src={book.image}
                                        alt={book.title}
                                        className="h-full w-full object-cover grayscale-[20%] transition duration-500 group-hover:scale-105"
                                    />

                                    <span className="absolute top-2 left-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#14110F] text-[8px] font-bold text-[#C9A24B]">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    <span className="absolute top-2 right-2 bg-[#C9A24B] px-2 py-1.5 text-[8px] font-bold text-black">
                                        ★ {book.rating}
                                    </span>

                                    {book.recommended && (
                                        <span className="absolute bottom-2 left-2 bg-[#F2EEE4] px-2 py-1 text-[7px] font-bold uppercase tracking-wider text-[#14110F]">
                                            Recommended
                                        </span>
                                    )}

                                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition group-hover:opacity-100">
                                        <span className="rounded-full border border-[#C9A24B] bg-[#14110F] px-4 py-2 text-[8px] font-bold uppercase tracking-wider text-[#C9A24B]">
                                            update
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-3">
                                    <h3 className="font-serif text-lg leading-tight">
                                        {book.title}
                                    </h3>

                                    <p className="mt-1 truncate text-[9px] font-bold text-[#F2EEE4]/50">
                                        {book.author}
                                    </p>

                                    <div className="mt-3 flex items-center justify-between border-t border-[#3a3529] pt-2">
                                        <span className="text-[8px] uppercase tracking-wider text-[#C9A24B]">
                                            {book.genre}
                                        </span>

                                        <span className="text-[8px] text-[#F2EEE4]/40">
                                            {book.pagesRead || 0}/{book.pages}
                                        </span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>

            {selectedBook && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-6"
                    onClick={() => setSelectedBook(null)}
                >
                    <div
                        className="w-full max-w-3xl bg-[#181411] border border-[#3a3529] p-6 sm:p-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#C9A24B]">
                                    Library / Book Details
                                </p>

                                <h2 className="mt-2 font-serif text-3xl sm:text-4xl">
                                    {selectedBook.title}
                                </h2>

                                <p className="mt-1 text-[11px] text-[#F2EEE4]/50">
                                    {selectedBook.author}
                                </p>
                            </div>

                            <button
                                onClick={() => setSelectedBook(null)}
                                className="text-2xl text-[#F2EEE4]/40 hover:text-[#C9A24B]"
                            >
                                ×
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-8">
                            <img
                                src={selectedBook.image}
                                alt={selectedBook.title}
                                className="w-full aspect-[3/4] object-cover"
                            />

                            <div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <p className="text-[9px] uppercase tracking-wider text-[#F2EEE4]/40">
                                            Author
                                        </p>

                                        <p className="mt-1 font-serif text-xl">
                                            {selectedBook.author}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-[9px] uppercase tracking-wider text-[#F2EEE4]/40">
                                            Genre
                                        </p>

                                        <p className="mt-1 font-serif text-xl text-[#C9A24B]">
                                            {selectedBook.genre}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-[9px] uppercase tracking-wider text-[#F2EEE4]/40">
                                            Rating
                                        </p>

                                        <p className="mt-1 font-serif text-xl">
                                            ★ {selectedBook.rating}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-[9px] uppercase tracking-wider text-[#F2EEE4]/40">
                                            Total Pages
                                        </p>

                                        <p className="mt-1 font-serif text-xl">
                                            {selectedBook.pages}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 border-t border-[#3a3529] pt-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-[9px] uppercase tracking-wider text-[#F2EEE4]/40">
                                                Reading Progress
                                            </p>

                                            <p className="mt-1 font-serif text-3xl text-[#C9A24B]">
                                                {selectedBook.pagesRead || 0}

                                                <span className="text-base text-[#F2EEE4]/40">
                                                    {" "}
                                                    / {selectedBook.pages} pages
                                                </span>
                                            </p>
                                        </div>

                                        <p className="font-mono text-sm text-[#F2EEE4]/50">
                                            {selectedBook.pages
                                                ? Math.round(
                                                      ((selectedBook.pagesRead ||
                                                          0) /
                                                          selectedBook.pages) *
                                                          100
                                                  )
                                                : 0}
                                            %
                                        </p>
                                    </div>

                                    <div className="mt-4 h-2 w-full bg-[#3a3529]">
                                        <div
                                            className="h-full bg-[#C9A24B]"
                                            style={{
                                                width: `${
                                                    selectedBook.pages
                                                        ? ((selectedBook.pagesRead ||
                                                              0) /
                                                              selectedBook.pages) *
                                                          100
                                                        : 0
                                                }%`,
                                            }}
                                        />
                                    </div>

                                    <div className="mt-6">
                                        <label className="text-[9px] uppercase tracking-wider text-[#F2EEE4]/40">
                                            Update Pages Read
                                        </label>

                                        <div className="mt-2 flex gap-3">
                                            <input
                                                type="number"
                                                min="0"
                                                max={selectedBook.pages}
                                                value={pagesInput}
                                                onChange={(e) =>
                                                    setPagesInput(
                                                        e.target.value
                                                    )
                                                }
                                                className="flex-1 border border-[#3a3529] bg-transparent px-4 py-3 text-sm outline-none focus:border-[#C9A24B]"
                                            />

                                            <button
                                                onClick={updatePagesRead}
                                                className="bg-[#C9A24B] px-5 py-3 text-[9px] font-bold uppercase tracking-wider text-black hover:bg-[#F2EEE4]"
                                            >
                                                Update
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex flex-wrap gap-5 border-t border-[#3a3529] pt-5">
                                    <button
                                        onClick={() =>
                                            toggleRecommended(selectedBook.id)
                                        }
                                        className="text-[9px] uppercase tracking-wider text-[#C9A24B]"
                                    >
                                        {selectedBook.recommended
                                            ? "★ Recommended"
                                            : "☆ Recommend"}
                                    </button>

                                    <button
                                        onClick={() =>
                                            openEditForm(selectedBook)
                                        }
                                        className="text-[9px] uppercase tracking-wider text-[#F2EEE4]/50 hover:text-[#C9A24B]"
                                    >
                                        Edit Book
                                    </button>

                                    <button
                                        onClick={() =>
                                            deleteBook(selectedBook.id)
                                        }
                                        className="text-[9px] uppercase tracking-wider text-red-400/60 hover:text-red-400"
                                    >
                                        Delete Book
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showForm && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 px-6">
                    <div className="w-full max-w-lg bg-[#181411] border border-[#3a3529] p-8">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#C9A24B]">
                                    Library / Manage
                                </p>

                                <h2 className="mt-2 font-serif text-3xl">
                                    {editingBook
                                        ? "Edit Book"
                                        : "Add Book"}
                                </h2>
                            </div>

                            <button
                                onClick={() => setShowForm(false)}
                                className="text-xl text-[#F2EEE4]/50 hover:text-[#C9A24B]"
                            >
                                ×
                            </button>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >
                            <input
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="Book title"
                                required
                                className="w-full border-b border-[#3a3529] bg-transparent py-3 text-sm outline-none placeholder:text-[#F2EEE4]/30 focus:border-[#C9A24B]"
                            />

                            <input
                                name="author"
                                value={form.author}
                                onChange={handleChange}
                                placeholder="Author"
                                required
                                className="w-full border-b border-[#3a3529] bg-transparent py-3 text-sm outline-none placeholder:text-[#F2EEE4]/30 focus:border-[#C9A24B]"
                            />

                            <input
                                name="genre"
                                value={form.genre}
                                onChange={handleChange}
                                placeholder="Genre"
                                required
                                className="w-full border-b border-[#3a3529] bg-transparent py-3 text-sm outline-none placeholder:text-[#F2EEE4]/30 focus:border-[#C9A24B]"
                            />

                            <input
                                name="rating"
                                value={form.rating}
                                onChange={handleChange}
                                type="number"
                                min="0"
                                max="5"
                                step="0.1"
                                placeholder="Rating"
                                required
                                className="w-full border-b border-[#3a3529] bg-transparent py-3 text-sm outline-none placeholder:text-[#F2EEE4]/30 focus:border-[#C9A24B]"
                            />

                            <input
                                name="pages"
                                value={form.pages}
                                onChange={handleChange}
                                type="number"
                                min="1"
                                placeholder="Total pages"
                                required
                                className="w-full border-b border-[#3a3529] bg-transparent py-3 text-sm outline-none placeholder:text-[#F2EEE4]/30 focus:border-[#C9A24B]"
                            />

                            <input
                                name="image"
                                value={form.image}
                                onChange={handleChange}
                                placeholder="Book cover image URL"
                                required
                                className="w-full border-b border-[#3a3529] bg-transparent py-3 text-sm outline-none placeholder:text-[#F2EEE4]/30 focus:border-[#C9A24B]"
                            />

                            <button
                                type="submit"
                                className="w-full bg-[#C9A24B] py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-black hover:bg-[#F2EEE4] transition"
                            >
                                {editingBook
                                    ? "Save Changes"
                                    : "Add Book"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <section className="px-4 sm:px-8 pt-8 pb-16 flex items-center justify-center select-none">
                <span className="inline-flex items-center justify-center rounded-full border-2 border-[#C9A24B] w-14 h-14 sm:w-24 sm:h-24 mr-2 sm:mr-3 shrink-0">
                    <span className="block rounded-full bg-[#C9A24B] w-5 h-5 sm:w-8 sm:h-8" />
                </span>

                <h2 className="font-serif text-[17vw] sm:text-[10vw] leading-none tracking-tight">
                    Stacks
                </h2>
            </section>

            <div className="border-t border-[#3a3529] px-8 sm:px-14 py-4 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.15em] text-[#F2EEE4]/60">
                <span className="inline-flex items-center justify-center rounded-full border-2 border-[#C9A24B] w-3.5 h-3.5 shrink-0">
                    <span className="block rounded-full bg-[#C9A24B] w-1 h-1" />
                </span>

                <p className="truncate">
                    Browse books • Discover stories • Build your shelf • Track your reading • Find your next favorite
                </p>

                <span className="inline-flex items-center justify-center rounded-full border-2 border-[#C9A24B] w-3.5 h-3.5 shrink-0">
                    <span className="block rounded-full bg-[#C9A24B] w-1 h-1" />
                </span>
            </div>
        </div>
    );
}