import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  category: z.enum(["fuerza", "hipertrofia", "resistencia"]),
  days: z.array(z.string()).min(1, "Selecciona al menos un día"),
  estimatedDuration: z.string().min(1, "La duración estimada es requerida"),
});

interface CreateRoutineDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateRoutine: (routine: z.infer<typeof formSchema> & { exercises: number; isTemplate: boolean }) => void;
}

const daysOfWeek = [
  { id: "Lunes", label: "Lunes" },
  { id: "Martes", label: "Martes" },
  { id: "Miércoles", label: "Miércoles" },
  { id: "Jueves", label: "Jueves" },
  { id: "Viernes", label: "Viernes" },
  { id: "Sábado", label: "Sábado" },
  { id: "Domingo", label: "Domingo" },
];

export const CreateRoutineDialog = ({ open, onOpenChange, onCreateRoutine }: CreateRoutineDialogProps) => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "hipertrofia",
      days: [],
      estimatedDuration: "",
    },
  });

  const handleDayChange = (dayId: string, checked: boolean) => {
    const newDays = checked
      ? [...selectedDays, dayId]
      : selectedDays.filter(day => day !== dayId);
    
    setSelectedDays(newDays);
    form.setValue("days", newDays);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onCreateRoutine({
      ...values,
      exercises: 0, // Will be populated when adding exercises
      isTemplate: false,
    });
    
    // Reset form
    form.reset();
    setSelectedDays([]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Crear Nueva Rutina</DialogTitle>
          <DialogDescription>
            Crea una rutina personalizada para tus entrenamientos
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de la rutina</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Mi rutina de fuerza" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe brevemente tu rutina..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoría</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="fuerza">Fuerza</SelectItem>
                      <SelectItem value="hipertrofia">Hipertrofia</SelectItem>
                      <SelectItem value="resistencia">Resistencia</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="estimatedDuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duración estimada</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: 60 min" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="days"
              render={() => (
                <FormItem>
                  <FormLabel>Días de entrenamiento</FormLabel>
                  <div className="grid grid-cols-2 gap-2">
                    {daysOfWeek.map((day) => (
                      <div key={day.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={day.id}
                          checked={selectedDays.includes(day.id)}
                          onCheckedChange={(checked) => handleDayChange(day.id, checked as boolean)}
                        />
                        <label
                          htmlFor={day.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {day.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit">Crear Rutina</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};