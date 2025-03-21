import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation } from "@apollo/client";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { toastNotification } from "@/helpers/helpers";

import { Pencil } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import EditInput from "@/components/input/EditInput";
import { IFaq } from "shared/src/interfaces";
import { createfaqSchema, faqSchema } from "@/validation/faq/faq.schema";
import {
  CREATE_MUTATION_FAQ,
  UPDATE_MUTATION_FAQ,
} from "@/graphql/mutations/faq.mutation";

interface Props {
  updateFaqData?: IFaq;
  refetchFaqs: () => void;
}

export function FaqDialogue({ updateFaqData, refetchFaqs }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<createfaqSchema>({
    resolver: zodResolver(faqSchema),
    mode: "onChange",
    defaultValues: updateFaqData || { question: "", answer: "" },
  });

  const [createFaq, { loading, error }] = useMutation(CREATE_MUTATION_FAQ, {
    onCompleted: () => {
      refetchFaqs();
      form.reset();
      toast({
        title: "FAQs created success",
        variant: "success",
      });
    },
  });

  const [updateFaq, { loading: updateLoading }] = useMutation(
    UPDATE_MUTATION_FAQ,
    {
      onCompleted: () => {
        refetchFaqs();
        form.reset();
        toast({
          title: "FAQs updated success",
          variant: "success",
        });
      },
    }
  );

  useEffect(() => {
    if (error) {
      toastNotification(error);
    }
  }, [error]);

  useEffect(() => {
    if (updateFaqData) {
      form.setValue("question", updateFaqData.question || "");
      form.setValue("answer", updateFaqData.answer || "");
    }
  }, [updateFaqData, form]);

  const onSubmit = async (data: createfaqSchema) => {
    const faqInput = {
      question: data.question,
      answer: data.answer,
    };
    if (updateFaqData?.id) {
      console.log("🚀 ~ onSubmit ~ updateFaqData:", updateFaqData)
      await updateFaq({
        variables: { faqId: updateFaqData.id, faqInput },
      });
    } else {
      await createFaq({
        variables: { faqInput },
      });
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        {updateFaqData ? (
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={() => setIsDialogOpen(true)}
          >
            <Pencil className="w-4 h-4" />
          </Button>
        ) : (
          <Button variant={"outline"} onClick={() => setIsDialogOpen(true)}>
            Create New Faq
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              {updateFaqData ? "Edit FAQ" : "Create New Faq"}{" "}
              <DialogDescription>
                {updateFaqData
                  ? "Update FAQ details here"
                  : "Create New Faq here"}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <EditInput
                  control={form.control}
                  name="question"
                  error={form.formState.errors.question}
                  placeholder="Question"
                  label="Question"
                />

                <EditInput
                  control={form.control}
                  name="answer"
                  error={form.formState.errors.answer}
                  placeholder="Answer"
                  label="Answer"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                disabled={loading || updateLoading}
                loading={loading || updateLoading}
              >
                {updateFaqData ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
