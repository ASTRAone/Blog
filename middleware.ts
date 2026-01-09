// middleware.ts
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Получаем сессию
  const session = await auth.api.getSession({
    headers: {
      cookie: request.headers.get("cookie") || "",
    },
  });

  // Защищенные роуты (требуют авторизации)
  const protectedRoutes = [
    "/saved-posts",
    "/dashboard",
    "/posts",
    "/categories",
  ];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Роуты для неавторизованных пользователей
  const authRoutes = ["/sign-in", "/sign-up", "/forgot-password"];
  const isAuthRoute = authRoutes.includes(pathname);

  // Если пользователь не авторизован и пытается получить доступ к защищенному роуту
  if (!session && isProtectedRoute) {
    const signInUrl = new URL("/sign-in", request.url);
    // Добавляем редирект обратно после входа
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Если пользователь авторизован и пытается получить доступ к auth роутам
  if (session && isAuthRoute) {
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Исключаем статические файлы и API роуты
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
