import { NavMenu } from "@/components/navbar";
import { authSession } from "@/lib/auth-utils";

const BlogLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await authSession();

  return (
    <>
      <div className="relative w-full">
        <NavMenu
          userName={session?.user.name}
          userImage={session?.user.image as string}
        />
        {children}
      </div>
    </>
  );
};
export default BlogLayout;
