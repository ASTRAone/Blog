"use client";

import { createCategory, updateCategory } from "@/app/actions/categories";
import { DataTable } from "@/components/data-table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useCategories } from "@/hooks/use-categories";
import { Category } from "@/lib/generated/prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { columns } from "./columns";

const formSchema = z.object({
  name: z.string().min(3, "Name is required"),
});

type FormValues = z.infer<typeof formSchema>;

const CategoriesClient = ({ categories }: { categories: Category[] }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
    mode: "onBlur",
  });

  const { open, setOpen, category, setCategory } = useCategories();
  const router = useRouter();

  const [name] = form.watch(["name"]);

  useEffect(() => {
    if (category) {
      form.setValue("name", category.name);
    }
  }, [category, form]);

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form]);

  const onSubmit = async (data: FormValues) => {
    try {
      if (category?.id) {
        await updateCategory({
          id: category.id,
          name: data.name,
        });

        toast.success("Category updated successfully");
      } else {
        await createCategory(data.name);
        toast.success("New category created successfully");
      }

      router.refresh();
      form.reset();
      setCategory({ id: "", name: "" });
      setOpen(false);
    } catch (error) {
      toast.error((error as Error)?.message ?? "Something went wrong");
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="sm:max-w-[425px]"
          aria-labelledby="dialog-title"
          aria-describedby="dialog-description"
        >
          <DialogHeader>
            <DialogTitle id="dialog-title">
              {category?.id ? "Edit Category" : "Create Category"}
            </DialogTitle>
            <p id="dialog-description" className="sr-only">
              {category?.id ? "Edit existing category details" : "Create a new category"}
            </p>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              id="category-form"
              aria-label="Category form"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="category-name">Name</FormLabel>
                    <FormControl>
                      <Input
                        id="category-name"
                        aria-label="Category name"
                        aria-required="true"
                        aria-invalid={!!form.formState.errors.name}
                        aria-describedby={form.formState.errors.name ? "name-error" : undefined}
                        placeholder="Enter category name"
                        {...field}
                      />
                    </FormControl>
                    {form.formState.errors.name && (
                      <FormMessage id="name-error">
                        {form.formState.errors.name.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="cursor-pointer mt-4"
                form="category-form"
                disabled={!form.formState.isValid || form.formState.isSubmitting}
                aria-label={form.formState.isSubmitting ? "Saving changes" : "Save changes"}
                aria-busy={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Spinner className="size-6" aria-hidden="true" />
                    <span className="sr-only">Saving...</span>
                  </>
                ) : (
                  "Save changes"
                )}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <div className="flex flex-col p-8" role="main">
        <div className="flex w-full justify-between" aria-label="Page header">
          <Breadcrumb aria-label="Breadcrumb navigation">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard" aria-label="Go to dashboard">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator aria-hidden="true" />

              <BreadcrumbItem aria-current="page">
                <BreadcrumbPage>Categories</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <Button
            className="cursor-pointer"
            onClick={() => setOpen(true)}
            aria-label="Create new category"
          >
            Create new category
          </Button>
        </div>
      </div>

      <div className="p-8 flex flex-col">
        <div className="mb-4" role="region" aria-label="Categories information">
          <h2 className="text-2xl font-semibold" id="categories-heading">
            Categories
          </h2>
          <p className="text-gray-600" id="categories-description">
            Manage your content categories. Total categories: {categories.length}
          </p>
        </div>

        <div
          role="region"
          aria-labelledby="categories-heading"
          aria-describedby="categories-description"
        >
          <DataTable data={categories} columns={columns} aria-label="Categories table" />
        </div>

        {categories.length === 0 && (
          <div className="text-center py-8" role="alert" aria-live="polite">
            <p>No categories found. Create your first category.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default CategoriesClient;
