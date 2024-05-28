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
import useUser from "@/app/auth/hook/useUser";
import { useGetUser } from "@/features/user/useGetUser";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { useGetOrganization } from "@/features/organization/useGetOrganization";
import * as Yup from "yup";

const FormSchema = z.object({
  type: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
});
const Organization = () => {
  const { data, isLoading } = useUser();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const userEmail = data?.email;

  const { data: userFromDatabase, isLoading: getUserFromDatabaseIsLoading } =
    useGetUser();

  const userSec = userFromDatabase?.data.user;

  // filter userSec mach with userName
  const filteredUser = getUserFromDatabaseIsLoading
    ? []
    : userSec?.filter((user: any) => user.email === userEmail);

  const idUserFromDatabase = filteredUser[0]?.id;
  const { refetch: refetchOrganization } =
    useGetOrganization(idUserFromDatabase);

  const { mutate: createOrganization, isPending } = useCreateOrganization({
    onSuccess: () => {
      formik.resetForm();
      toast.success("Organization created successfully");
      refetchOrganization();
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      type: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please enter a name"),
    }),
    onSubmit: async () => {
      const { name } = formik.values;
      const type_organization = form.getValues("type");
      createOrganization({
        user_id: idUserFromDatabase,
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
    <div className="">
      <div>
        <CardHeader className="text-center">
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
              {formik.errors.name && formik.touched.name && (
                <p className="text-red-500 text-sm">{formik.errors.name}</p>
              )}
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
              {isPending ? (
                <Button disabled className="w-full">
                  <div className="flex gap-2">
                    <p>Loading...</p>
                  </div>
                </Button>
              ) : (
                <Button type="submit" className="w-full">
                  <div className="flex gap-2">
                    <p>Create</p>
                  </div>
                </Button>
              )}
            </form>
          </Form>
        </CardContent>
      </div>
    </div>
  );
};

export default Organization;
