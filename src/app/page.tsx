import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="row">
      <div className="col-6">
        <h1 className="header">SELAMAT DATANG TEMAN TEMAN DI SURATQUE...</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex sit
          blanditiis incidunt eos rem magni voluptate eligendi nemo maiores
          officiis.
        </p>
      </div>
      <Link href="/auth">
        <Button className="col-6" variant="default">
          Login
        </Button>
      </Link>
      <div className="col-6 auth-widget"></div>
    </div>
  );
}
