import Link from 'next/link';
import React from 'react';

const NotFoundPage = () => {
  return (
    <div>
      <h1>Page Not Found</h1>

      <Link href={'/'}>Go Back</Link>
    </div>
  );
};

export default NotFoundPage;
