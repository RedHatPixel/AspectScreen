import Link from 'next/link';

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    buildUrl: (overrides: Record<string, string | null>) => string;
};

const SIBLINGS = 1;

const getPageRange = (current: number, total: number): (number | '…')[] => {
    const pages: (number | '…')[] = [];

    const left = Math.max(2, current - SIBLINGS);
    const right = Math.min(total - 1, current + SIBLINGS);

    pages.push(1);
    if (left > 2) pages.push('…');
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < total - 1) pages.push('…');
    if (total > 1) pages.push(total);

    return pages;
};

const Pagination = ({ currentPage, totalPages, buildUrl }: PaginationProps) => {
    if (totalPages <= 1) return null;

    const pages = getPageRange(currentPage, totalPages);

    const navLinkBase =
        'flex h-9 min-w-9 items-center justify-center rounded-full border border-white/10 px-3 text-sm transition select-none';
    const activeNav = 'bg-purple-600 border-purple-600 text-white font-semibold';
    const inactiveNav = 'bg-white/5 text-white/70 hover:bg-white/15 hover:text-white';
    const disabledNav = 'pointer-events-none opacity-30 bg-white/5 text-white/40';

    return (
        <nav
            aria-label="Pagination"
            className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80"
        >
            <p className="text-white/50">
                Page <span className="text-white font-medium">{currentPage}</span> of{' '}
                <span className="text-white font-medium">{totalPages}</span>
            </p>

            <div className="flex flex-wrap items-center gap-1.5">
                <Link
                    href={buildUrl({ page: String(currentPage - 1) })}
                    aria-disabled={currentPage <= 1}
                    className={`${navLinkBase} px-4 ${currentPage <= 1 ? disabledNav : inactiveNav}`}
                >
                    ← Prev
                </Link>

                {pages.map((p, i) =>
                    p === '…' ? (
                        <span key={`ellipsis-${i}`} className="flex h-9 w-6 items-center justify-center text-white/30 select-none">
                            …
                        </span>
                    ) : (
                        <Link
                            key={p}
                            href={buildUrl({ page: String(p) })}
                            aria-current={p === currentPage ? 'page' : undefined}
                            className={`${navLinkBase} ${p === currentPage ? activeNav : inactiveNav}`}
                        >
                            {p}
                        </Link>
                    ),
                )}

                <Link
                    href={buildUrl({ page: String(Math.min(totalPages, currentPage + 1)) })}
                    aria-disabled={currentPage >= totalPages}
                    className={`${navLinkBase} px-4 ${currentPage >= totalPages ? disabledNav : inactiveNav}`}
                >
                    Next →
                </Link>
            </div>
        </nav>
    );
};

export default Pagination;