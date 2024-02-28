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

const Page = () => {
  const handleLoginWithOAuth = (provider: "github" | "google") => {
    const supabase = supabaseBrowser();

    supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: location.origin + "/auth/callback",
      },
    });
  };
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Auth</CardTitle>
          <CardDescription>Sign in with GitHub or Google</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-2">
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
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
