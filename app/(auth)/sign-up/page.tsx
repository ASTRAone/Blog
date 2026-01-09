import { SignUpForm } from "@/components/signup-form";
import { requireNoAuth } from "@/lib/auth-utils";

const SignUpPage = async () => {
  await requireNoAuth();

  return <SignUpForm />;
};
export default SignUpPage;
