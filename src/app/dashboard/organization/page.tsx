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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Organization = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Create a new organization</CardTitle>
          <CardDescription>
            For example, you can use the name of your company or department.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-3 mb-3">
            <Label htmlFor="name">Name</Label>
            <Input type="text" placeholder="Organization Name" name="name" />
            <Label htmlFor="type">Type of organization</Label>
            <Select>
              <SelectTrigger className="">
                <SelectValue placeholder="Select a organization" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="apple">Personal</SelectItem>
                  <SelectItem value="banana">Education</SelectItem>
                  <SelectItem value="blueberry">Startup</SelectItem>
                  <SelectItem value="grapes">Agency</SelectItem>
                  <SelectItem value="pineapple">Company</SelectItem>
                  <SelectItem value="pineapple">N/A</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Button type="submit" className="w-full">
              <div className="flex gap-2">
                <p>next</p>
              </div>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Organization;
