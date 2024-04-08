import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";
import React, {Dispatch, SetStateAction} from "react";

export  const SearchBar = ({query, setQuery}: {query: string; setQuery: Dispatch<SetStateAction<string>>}) => {
    const formSchema = z.object({
        query: z.string().min(0).max(200),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            query: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setQuery(values.query)
    }

    return <div>
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex items-center gap-4"
            >
                <FormField
                    control={form.control}
                    name="query"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Enter your file names" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    className="flex gap-1.5"
                    type="submit"
                    disabled={form.formState.isSubmitting}
                >
                    {form.formState.isSubmitting && (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    )}
                    Search
                </Button>
            </form>
        </Form>
    </div>
}