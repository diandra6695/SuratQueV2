// import { supabaseBrowser } from "@/lib/supabase/browser";
import { supabaseServer } from "@/lib/supabase/server";
import { useQuery } from "@tanstack/react-query";

const initUser = {
  created_at: "",
  display_name: "",
  email: "",
  id: "",
  image_url: "",
};

const useUserServer = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const supabase = supabaseServer();
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        const { data: user } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", data.session.user.id)
          .single();
        return user;
      }
      return initUser;
    },
  });
};

export default useUserServer;
