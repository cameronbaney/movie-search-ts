interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  const visiblePages = 5;
  const halfRange = Math.floor(visiblePages / 2);

  const getPageNumbers = () => {
    let start = Math.max(1, currentPage - halfRange);
    let end = Math.min(totalPages, currentPage + halfRange);

    if (start === 1) {
      end = Math.min(totalPages, start + visiblePages - 1);
    } else if (end === totalPages) {
      start = Math.max(1, end - visiblePages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className="flex items-center justify-center space-x-2 py-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 border rounded ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white hover:bg-cyan-100 text-cyan-600"
        }`}
      >
        Prev
      </button>

      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded ${
            page === currentPage
              ? "btn-primary"
              : "bg-white hover:bg-cyan-100 text-cyan-600"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white hover:bg-cyan-100 text-cyan-600"
        }`}
      >
        Next
      </button>
    </div>
  );
}
