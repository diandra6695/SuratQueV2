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
import { useSearchParams } from "next/navigation";

const Page = () => {
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
      await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: location.origin + "/auth/callback?next=" + next,
        },
      });
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
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Auth</CardTitle>
          <CardDescription>Sign in with GitHub or Google</CardDescription>
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
                <p>next</p>
              </div>
            </Button>
          </form>
          <div className="flex flex-col gap-2">
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
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
