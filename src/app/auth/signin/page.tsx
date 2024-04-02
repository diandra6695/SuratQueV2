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
import { supabaseBrowser } from "@/lib/supabase/browser";
import { GithubLogo, GoogleLogo } from "@phosphor-icons/react";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async () => {
      const { email, password } = formik.values;
      const supabase = supabaseBrowser();
      await supabase.auth.signInWithPassword({
        email,
        password,
      });
      router.push("/dashboard");
    },
  });

  const handleLoginWithOAuth = (provider: "github" | "google") => {
    const supabase = supabaseBrowser();

    supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: location.origin + "/auth/callback?next=" + next,
      },
    });
  };
  const handleFormInput = (e: any) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
  };
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <Card className="w-[28rem]">
        <CardHeader className="text-center">
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Welcome Back</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-3 mb-3"
            onSubmit={formik.handleSubmit}
          >
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
            <Button type="submit" className="w-full">
              <div className="flex gap-2">
                <p>Sign In</p>
              </div>
            </Button>
            <p className="text-sm">
              <Link href={"/auth/signin"}>
                <span className="text-primary">Forgot Password</span>
              </Link>
            </p>
          </form>
          <div className="flex mb-5 items-center">
            <div className="w-full border h-0 border-borderCustom"></div>
            <p className="text-sm text-center text-neutral-400 p-2">or</p>
            <div className="w-full border h-0 border-borderCustom"></div>
          </div>
          <div className="flex gap-2">
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
          </div>
          <p className="text-sm mt-5 text-center text-neutral-400 p-2">
            {"Don't"} have an account?{" "}
            <Link href={"/auth/signup"}>
              <span className="text-primary">Sign Up</span>
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
