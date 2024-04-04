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
import { useState } from "react";

const PasswordResets = () => {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async () => {
      const { email } = formik.values;
      const supabase = supabaseBrowser();
      setLoginLoading(true);
      try {
        const { data, error } = await supabase.auth.resetPasswordForEmail(
          email,
          {
            redirectTo: location.origin + "/auth/update-password",
          }
        );

        setLoginLoading(false);
        if (error) {
          setLoginError(error.message);
          return;
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handleFormInput = (e: any) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
  };
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <Card className="w-[28rem]">
        <CardHeader className="text-center">
          <CardTitle>Forgot Password?</CardTitle>
          <CardDescription>
            Enter the email address you used when you joined and we’ll send you
            instructions to reset your password.
          </CardDescription>
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

            {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
            {loginLoading ? (
              <Button disabled>Please wait</Button>
            ) : (
              <Button type="submit" className="w-full">
                <div className="flex gap-2">
                  <p>Send Reset Instructions</p>
                </div>
              </Button>
            )}
          </form>
          <p className="text-sm mt-5 text-center text-neutral-400 p-2">
            {"Don't"} have an account?
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PasswordResets;
