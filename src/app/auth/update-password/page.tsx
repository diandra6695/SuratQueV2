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
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as Yup from "yup";

const UpdatePassword = () => {
  const router = useRouter();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const [confirm, setConfirm] = useState(true);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Password is required!")
        .min(8, "Password minimum 8 character"),
      confirmPassword: Yup.string()
        .required("Confirm password is required!")
        .oneOf([Yup.ref("password"), ""], "Password not match"),
    }),
    onSubmit: async () => {
      const { confirmPassword } = formik.values;
      const supabase = supabaseBrowser();
      setLoginLoading(true);
      try {
        const { data, error } = await supabase.auth.updateUser({
          password: confirmPassword,
        });

        setLoginLoading(false);
        if (error) {
          setLoginError(error.message);
          return;
        }
        router.push("/dashboard");
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
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>Please enter your new password.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-3 mb-3"
            onSubmit={formik.handleSubmit}
          >
            <Input
              type="password"
              placeholder="New Password"
              name="password"
              onChange={handleFormInput}
              value={formik.values.password}
            />
            {formik.errors.password && formik.touched.password && (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}
            <Input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={handleFormInput}
              value={formik.values.confirmPassword}
            />
            {formik.errors.confirmPassword &&
              formik.touched.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {formik.errors.confirmPassword}
                </p>
              )}
            {loginError && <p className="text-red-500 text-sm">{loginError}</p>}

            {loginLoading ? (
              <Button disabled>Please wait</Button>
            ) : (
              <Button type="submit" className="w-full">
                <div className="flex gap-2">
                  <p>Update Password</p>
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

export default UpdatePassword;
