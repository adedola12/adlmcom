"use client";

import { useForm } from "react-hook-form";
import {
    Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { CommentValidation } from "@/lib/validations/thread";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { addCommentToThread } from "@/lib/actions/thread.actions";
// import { addComment} from "@/lib/actions/thread.actions"

interface Props {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
}

const Comment = ({ threadId, currentUserImg, currentUserId }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    await addCommentToThread(threadId, values.thread, JSON.parse(currentUserId), pathname);

    form.reset()
  };

  return (
    <Form {...form}>
      <form
        className="comment-form "
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="mt-10 flex gap-3 w-full items-center ">
              <FormLabel>
                <Image 
                src={currentUserImg}
                alt="Profile image"
                width={48}
                height={48}
                className="rounded-full object-cover"
                />
              </FormLabel>
              <FormControl className="border-none bg-transparent">
                <Input
                  type="text"
                  {...field}
                  placeholder="comment ..."
                  className="no-focus text-light-1 outline-none"
                />
              </FormControl>
             
            </FormItem>
          )}
        />
  
        <Button type="submit" className="comment-form_btn">
          comment
        </Button>
      </form>
    </Form>
  );
};



export default Comment;
