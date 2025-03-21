import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { IFaq } from "shared/src/interfaces";

export function CarFaqs({ faqs }: { faqs: IFaq[] }) {
  return (
    <Card>
      <CardHeader className="bg-muted/25">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 mb-5 text-2xl">
            <p className="text-2xl font-bold mt-5">
              Frequently Asked Questions
            </p>
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            <div className="px-8">
              <Accordion type="single" collapsible className="w-full text-xl">
                {faqs?.map((faq) => (
                  <AccordionItem
                    key={faq?.id?.toString()}
                    value={`item-${faq.id}`}
                  >
                    <AccordionTrigger>{faq?.question}</AccordionTrigger>
                    <AccordionContent>{faq?.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
