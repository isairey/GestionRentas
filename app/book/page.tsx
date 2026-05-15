
import { Suspense } from 'react';
import BookSearch from './BookSearch';
export default function BookPage() {
  return (
    <Suspense fallback={<div>Loading book details...</div>}>
      <BookSearch />
    </Suspense>
  );
}

