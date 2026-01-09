import { SignInForm } from "@/components/singin-form";
import { requireNoAuth } from "@/lib/auth-utils";

const SignInPage = async () => {
  await requireNoAuth();

  return <SignInForm />;
};
export default SignInPage;
