"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCreateUser } from "@/features/user/useCreateUser";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { GithubLogo, GoogleLogo } from "@phosphor-icons/react";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const router = useRouter();
  const [signUpError, setSignUpError] = useState<string | null>(null);
  const [registerWithEmailLoading, setRegisterWithEmailLoading] =
    useState(false);
  const [registerWithProviderLoading, setRegisterWithProviderLoading] =
    useState(false);
  const params = useSearchParams();
  const next = params.get("next");

  const { mutate: createUser } = useCreateUser({
    onSuccess: () => {
      router.push("/auth/signup/verification");
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async () => {
      const { email, password } = formik.values;
      const supabase = supabaseBrowser();
      try {
        setRegisterWithEmailLoading(true);
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: formik.values.name,
            },
            emailRedirectTo: location.origin + "/dashboard",
          },
        });

        let authError = null;

        if (
          data.user &&
          data.user.identities &&
          data.user.identities.length === 0
        ) {
          authError = {
            name: "AuthApiError",
            message: "User already exists",
          };
        } else if (error)
          authError = {
            name: error.name,
            message: error.message,
          };

        createUser({
          name: formik.values.name,
          email: formik.values.email,
        });

        setRegisterWithEmailLoading(false);
        router.push("/auth/signup/verification");
        if (authError !== null) {
          setSignUpError(authError.message);
          return;
        }
      } catch (error) {
        //sementara
        console.error(error);
      }
    },
  });

  const handleLoginWithOAuth = (provider: "github" | "google") => {
    const supabase = supabaseBrowser();
    setRegisterWithProviderLoading(true);
    supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: location.origin + "/auth/callback?next=" + next,
      },
    });
    setRegisterWithProviderLoading(false);
  };
  const handleFormInput = (e: any) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
  };
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <Card className="w-[28rem]">
        <CardHeader className="text-center">
          <CardTitle>Create New Account</CardTitle>
          <CardDescription>Lets get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-3 mb-3"
            onSubmit={formik.handleSubmit}
          >
            <Input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleFormInput}
              value={formik.values.name}
            />
            <Input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleFormInput}
              value={formik.values.email}
            />
            <Input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleFormInput}
              value={formik.values.password}
            />
            {signUpError && (
              <p className="text-red-500 text-sm">{signUpError}</p>
            )}
            {registerWithEmailLoading ? (
              <Button disabled>Please wait</Button>
            ) : (
              <Button type="submit" className="w-full">
                <div className="flex gap-2">
                  <p>Sign Up</p>
                </div>
              </Button>
            )}
            <p className="text-sm">
              Already have an account?{" "}
              <Link href={"/auth/signin"}>
                <span className="text-primary">Login</span>
              </Link>
            </p>
          </form>
          <div className="flex mb-5 items-center">
            <div className="w-full border h-0 border-borderCustom"></div>
            <p className="text-sm text-center text-neutral-400 p-2">or</p>
            <div className="w-full border h-0 border-borderCustom"></div>
          </div>
          <div className="flex gap-2">
            {registerWithProviderLoading ? (
              <Button disabled className="w-full">
                <div className="flex gap-2">
                  <GithubLogo weight="bold" size={20} />
                  <p>GitHub</p>
                </div>
              </Button>
            ) : (
              <Button
                onClick={() => handleLoginWithOAuth("github")}
                type="submit"
                className="w-full"
              >
                <div className="flex gap-2">
                  <GithubLogo weight="bold" size={20} />
                  <p>GitHub</p>
                </div>
              </Button>
            )}
            {registerWithProviderLoading ? (
              <Button disabled className="w-full">
                <div className="flex gap-2">
                  <GoogleLogo weight="bold" size={20} />
                  <p>Google</p>
                </div>
              </Button>
            ) : (
              <Button
                onClick={() => handleLoginWithOAuth("google")}
                type="submit"
                className="w-full"
              >
                <div className="flex gap-2">
                  <GoogleLogo weight="bold" size={20} />
                  <p>Google</p>
                </div>
              </Button>
            )}
          </div>
          <p className="text-sm mt-5 text-center text-neutral-400 p-2">
            By signing up you agree to our{" "}
            <span className="text-primary">
              Terms of Service and Privacy Policy
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
