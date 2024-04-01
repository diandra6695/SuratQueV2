import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NavbarDashboard = ({ data }: { data: any }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const handleLogout = async () => {
    const supabase = supabaseBrowser();
    queryClient.clear();
    await supabase.auth.signOut();
    router.push("/");
  };
  return (
    <nav className="h-[4rem] flex items-center px-10 justify-end w-full border fixed gap-5 z-20 bg-white">
      <h3>Halo, {data?.display_name}</h3>
      <DropdownMenu>
        <DropdownMenuTrigger className="after:border-0 focus:border-0">
          <Avatar>
            <AvatarImage src={data?.image_url || ""} />
            <AvatarFallback>{data?.email[0]}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-10 flex flex-col gap-1 p-2">
          <DropdownMenuItem className="block">
            <Link href="">Akun</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="bg-red-50 block">
            <Button
              variant={"ghost"}
              onClick={handleLogout}
              className=" text-red-500 m-0"
            >
              Logout
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default NavbarDashboard;
