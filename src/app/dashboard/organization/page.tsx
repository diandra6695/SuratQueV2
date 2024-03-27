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
import { useFormik } from "formik";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField } from "@/components/ui/form";
import { useCreateOrganization } from "@/features/organization/useCreateOrganization";
import { redirect, useRouter } from "next/navigation";

const FormSchema = z.object({
  type: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
});
const Organization = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { mutate: createOrganization } = useCreateOrganization({
    onSuccess: () => {
      console.log("success");
      formik.resetForm();
      router.push("/dashboard");
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      type: "",
    },
    onSubmit: async () => {
      const { name } = formik.values;
      const type_organization = form.getValues("type");
      createOrganization({
        name,
        type_organization,
      });
    },
  });
  const handleFormInput = (e: any) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
  };
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
          <Form {...form}>
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-3 mb-3"
            >
              <Label htmlFor="name">Name</Label>
              <Input
                onChange={handleFormInput}
                type="text"
                placeholder="Organization Name"
                name="name"
              />
              <Label htmlFor="type">Type of organization</Label>
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="Select a organization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="startup">Startup</SelectItem>
                        <SelectItem value="agency">Agency</SelectItem>
                        <SelectItem value="company">Company</SelectItem>
                        <SelectItem value="N/A">N/A</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />

              <Button type="submit" className="w-full">
                <div className="flex gap-2">
                  <p>next</p>
                </div>
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Organization;
