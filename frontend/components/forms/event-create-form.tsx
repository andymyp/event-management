import { z } from "zod";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { RefreshCcw } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { AppAction } from "@/lib/store/app-slice";
import { useRouter } from "next/navigation";
import { useCreateEvent } from "@/hooks/use-events";
import { DatetimePicker } from "@/components/customs/datetime-picker";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.date({ required_error: "Event date time is required" }),
  description: z.string().min(1, "Description is required"),
});

type FormValues = z.infer<typeof schema>;

export default function EventCreateForm() {
  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [date, setDate] = useState<Date | undefined>();

  const { mutateAsync, isPending } = useCreateEvent();

  useEffect(() => {
    dispatch(AppAction.setLoading(isPending));
  }, [isPending]);

  const { register, handleSubmit, setValue, formState, reset } =
    useForm<FormValues>({
      resolver: zodResolver(schema),
    });

  const handleDate = (date: Date | undefined) => {
    setDate(date);
    setValue("date", date!, { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await mutateAsync(data);
    reset();
    router.push("/dashboard/my-events");
  };

  const onError: SubmitErrorHandler<FormValues> = (errors) => {
    toast({
      variant: "error",
      description: Object.values(errors)[0].message,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="flex flex-col md:flex-row gap-4 p-4"
    >
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <Input
            {...register("title")}
            placeholder="Enter event title"
            type="text"
            className="w-full"
            name="title"
          />
          <DatetimePicker
            id="date"
            label="Pick event date time"
            date={date}
            setDate={handleDate}
          />
        </div>
        <Textarea
          {...register("description")}
          placeholder="Enter event description"
          className="w-full resize-none"
          name="description"
        />
        <Button
          type="submit"
          className="uppercase"
          disabled={formState.isSubmitting}
        >
          {formState.isSubmitting && (
            <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
          )}
          Create
        </Button>
      </div>
    </form>
  );
}
