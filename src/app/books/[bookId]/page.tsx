export default function Book({ params }: { params: { bookId: string } }) {
  return <div>Book {params.bookId}</div>;
}
