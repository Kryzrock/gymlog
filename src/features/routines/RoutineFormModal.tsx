import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/useToast";
import type { Routine, Exercise } from "@/types";

const formSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().default(""),
  category: z.enum(["fuerza", "hipertrofia", "funcional", "cardio"]),
  difficulty: z.enum(["principiante", "intermedio", "avanzado"]),
  estimatedDuration: z.coerce.number().min(1).max(300),
  exerciseIds: z.array(z.string()).min(1, "Seleccioná al menos un ejercicio"),
});

type FormValues = z.infer<typeof formSchema>;

interface RoutineFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  routine?: Routine | null;
  exercises: Exercise[];
  onCreate: (data: Omit<Routine, "id" | "isTemplate" | "createdAt" | "updatedAt">) => void;
  onUpdate: (id: string, data: Partial<Omit<Routine, "id" | "createdAt">>) => void;
}

const EMPTY_FORM: FormValues = {
  name: "",
  description: "",
  category: "fuerza",
  difficulty: "intermedio",
  estimatedDuration: 60,
  exerciseIds: [],
};

export function RoutineFormModal({
  open,
  onOpenChange,
  routine,
  exercises,
  onCreate,
  onUpdate,
}: RoutineFormModalProps) {
  const toast = useToast();
  const isEditing = !!routine;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: EMPTY_FORM,
  });

  const selectedIds = form.watch("exerciseIds");

  useEffect(() => {
    if (open && routine) {
      form.reset({
        name: routine.name,
        description: routine.description,
        category: routine.category,
        difficulty: routine.difficulty,
        estimatedDuration: routine.estimatedDuration,
        exerciseIds: routine.exerciseIds,
      });
    } else if (open && !routine) {
      form.reset(EMPTY_FORM);
    }
  }, [open, routine, form]);

  const toggleExercise = (id: string) => {
    const current = form.getValues("exerciseIds");
    const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
    form.setValue("exerciseIds", next, { shouldValidate: true });
  };

  const handleSubmit = (values: FormValues) => {
    if (isEditing && routine) {
      onUpdate(routine.id, values);
      toast.success("Rutina actualizada");
    } else {
      onCreate(values);
      toast.success("Rutina creada");
    }
    onOpenChange(false);
  };

  // Group exercises by primary muscle for better UX
  const exercisesByMuscle = exercises.reduce<Record<string, Exercise[]>>((acc, ex) => {
    const group = ex.muscleGroups.primary[0] ?? "Otros";
    if (!acc[group]) acc[group] = [];
    acc[group].push(ex);
    return acc;
  }, {});

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Rutina" : "Nueva Rutina"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Modificá los datos de tu rutina."
              : "Creá una rutina seleccionando ejercicios de tu biblioteca."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="ej. Push — Pecho y Hombros" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción (opcional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describí brevemente el objetivo de esta rutina..."
                      className="min-h-[70px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category + Difficulty + Duration */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoría</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="fuerza">Fuerza</SelectItem>
                        <SelectItem value="hipertrofia">Hipertrofia</SelectItem>
                        <SelectItem value="funcional">Funcional</SelectItem>
                        <SelectItem value="cardio">Cardio</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dificultad</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="principiante">Principiante</SelectItem>
                        <SelectItem value="intermedio">Intermedio</SelectItem>
                        <SelectItem value="avanzado">Avanzado</SelectItem>
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
                    <FormLabel>Duración (min)</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} max={300} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Exercise selector */}
            <FormField
              control={form.control}
              name="exerciseIds"
              render={() => (
                <FormItem>
                  <div className="flex items-center justify-between mb-2">
                    <FormLabel>Ejercicios *</FormLabel>
                    {selectedIds.length > 0 && (
                      <Badge variant="secondary">{selectedIds.length} seleccionados</Badge>
                    )}
                  </div>
                  <ScrollArea className="h-60 border border-border rounded-md p-3">
                    <div className="space-y-4">
                      {Object.entries(exercisesByMuscle).map(([muscle, exList]) => (
                        <div key={muscle}>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                            {muscle}
                          </p>
                          <div className="space-y-2">
                            {exList.map((ex) => (
                              <div key={ex.id} className="flex items-center gap-3">
                                <Checkbox
                                  id={`ex-${ex.id}`}
                                  checked={selectedIds.includes(ex.id)}
                                  onCheckedChange={() => toggleExercise(ex.id)}
                                />
                                <label
                                  htmlFor={`ex-${ex.id}`}
                                  className="text-sm leading-tight cursor-pointer flex-1"
                                >
                                  {ex.name}
                                  <span className="text-xs text-muted-foreground ml-2">
                                    {ex.targetSets}×{ex.targetReps}
                                  </span>
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Footer */}
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit">{isEditing ? "Guardar cambios" : "Crear rutina"}</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
