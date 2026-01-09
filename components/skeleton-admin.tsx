"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const SkeletonAdmin = () => {
  return (
    <div className="space-y-6 p-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-20 bg-gray-200" />
          <Skeleton className="h-4 w-4 rounded-full bg-gray-200" />
          <Skeleton className="h-4 w-28 bg-gray-200" />
        </div>
        <Skeleton className="h-10 w-44 bg-gray-200" />
      </div>

      <div className="rounded-md border">
        <div className="border-b p-4">
          <Skeleton className="h-5 w-36 bg-gray-200" />
        </div>

        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-[250px] bg-gray-200" />
            <Skeleton className="h-10 w-[150px] bg-gray-200" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-10 bg-gray-200 rounded-md" />
            <Skeleton className="h-10 w-10 bg-gray-200 rounded-md" />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              {[...Array(4)].map((_, i) => (
                <TableHead key={i}>
                  <Skeleton className="h-4 w-20 bg-gray-200" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {[...Array(4)].map((_, cellIndex) => (
                  <TableCell key={cellIndex}>
                    <Skeleton
                      className={`h-4 ${
                        cellIndex === 0 ? "w-8" : "w-32"
                      } bg-gray-200`}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between p-4 border-t">
          <Skeleton className="h-4 w-40 bg-gray-200" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-20 bg-gray-200" />
            <div className="flex items-center gap-1">
              <Skeleton className="h-9 w-9 bg-gray-200" />
              <Skeleton className="h-9 w-9 bg-gray-200" />
              <Skeleton className="h-9 w-9 bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
