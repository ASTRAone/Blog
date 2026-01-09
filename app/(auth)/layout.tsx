const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center w-full h-dvh">
      {children}
    </div>
  );
};
export default AuthLayout;
