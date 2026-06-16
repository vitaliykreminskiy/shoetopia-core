interface TableSkeletonProps {
  rows?: number;
  cols?: number;
}

export const TableSkeleton = ({ rows = 5, cols = 6 }: TableSkeletonProps) => (
  <tbody>
    {Array.from({ length: rows }).map((_, i) => (
      <tr key={i} className="border-t border-neutral-800">
        {Array.from({ length: cols }).map((_, j) => (
          <td key={j} className="px-3 py-2">
            <div className="h-3 bg-neutral-800 rounded animate-pulse" />
          </td>
        ))}
      </tr>
    ))}
  </tbody>
);
