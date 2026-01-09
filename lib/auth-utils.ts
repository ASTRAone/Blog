import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

export const authSession = async () => {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");

    const session = await auth.api.getSession({
      headers: { cookie: cookieHeader },
    });

    return session;
  } catch (error) {
    return null;
  }
};

export const requireAuth = async () => {
  const session = await authSession();

  if (!session) {
    redirect("/sign-in");
  }

  return session;
};

export const requireNoAuth = async () => {
  const session = await authSession();

  if (session) {
    redirect("/");
  }
};
