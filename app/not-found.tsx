import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { RocketIcon } from "lucide-react";
import Link from "next/link";

const NotFound = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <RocketIcon className="text-9x" size={400} />
        </EmptyMedia>

        <EmptyTitle className="text-9xl font-semibold">404</EmptyTitle>
        <EmptyDescription className="text-lg">
          Ooops! This page you are looking is not found
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
        <div className="flex gap-2">
          <Link href="/">
            <Button className="cursor-pointer">Back to home</Button>
          </Link>
        </div>
      </EmptyContent>
    </Empty>
  );
};
export default NotFound;
