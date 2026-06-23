'use client';

import { Pagination } from '@heroui/react';
import { useRouter, useSearchParams } from 'next/navigation';

export function PaginationBasic({ totalPages }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get('category') || 'all';
  const currentPage = parseInt(searchParams.get('page') || '1');

  const handlePageChange = newPage => {
    if (newPage < 1 || newPage > totalPages) return;

    router.push(`/browse?category=${currentCategory}&page=${newPage}`);
  };

  if (totalPages <= 1) return null;

  return (
    <Pagination className="flex items-center justify-center mt-12">
      <Pagination.Content className="flex flex-row items-center bg-[#140e0c] p-2 rounded-xl border border-orange-950/40 gap-2">
        {/* Previous Button */}
        <Pagination.Item>
          <Pagination.Previous
            isDisabled={currentPage === 1}
            onPress={() => handlePageChange(currentPage - 1)}
            className="text-neutral-400 hover:text-[#e6bfa3] hover:bg-orange-950/30 transition-all cursor-pointer rounded-lg px-3 flex items-center"
          >
            <Pagination.PreviousIcon />
            <span className="text-sm font-medium ml-1">Previous</span>
          </Pagination.Previous>
        </Pagination.Item>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
          <Pagination.Item key={p}>
            <Pagination.Link
              isActive={p === currentPage}
              onPress={() => handlePageChange(p)}
              className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-all text-sm cursor-pointer
                ${
                  p === currentPage
                    ? 'bg-[#e05320] text-white shadow-lg shadow-[#e05320]/20'
                    : 'text-neutral-400 hover:bg-orange-950/30 hover:text-[#e6bfa3]'
                }`}
            >
              {p}
            </Pagination.Link>
          </Pagination.Item>
        ))}

        {/* Next Button */}
        <Pagination.Item>
          <Pagination.Next
            isDisabled={currentPage === totalPages}
            onPress={() => handlePageChange(currentPage + 1)}
            className="text-neutral-400 hover:text-[#e6bfa3] hover:bg-orange-950/30 transition-all cursor-pointer rounded-lg px-3 flex items-center"
          >
            <span className="text-sm font-medium mr-1">Next</span>
            <Pagination.NextIcon />
          </Pagination.Next>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  );
}
