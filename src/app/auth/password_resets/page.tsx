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
import * as Yup from "yup";

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
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required!"),
    }),
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

        router.push("/auth/password_resets/verification");

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
    <div className="w-full min-h-screen flex justify-center items-center bg-backgroudSecondary">
      <Card className="w-[28rem] border-none shadow p-2">
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
              // required
              className="bg-backgroudSecondary"
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleFormInput}
              value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}

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
        </CardContent>
      </Card>
    </div>
  );
};

export default PasswordResets;
