import { useEffect, useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { MUSCLE_GROUPS, EQUIPMENT_TYPES } from "@/lib/constants";
import { genId } from "@/lib/utils";
import type { Exercise } from "@/types";

const formSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  difficulty: z.enum(["principiante", "intermedio", "avanzado"]),
  category: z.enum(["fuerza", "hipertrofia", "funcional", "cardio"]),
  targetSets: z.coerce.number().min(1).max(10),
  targetReps: z.string().min(1, "Las repeticiones son requeridas"),
  restTime: z.coerce.number().min(15).max(600),
});

type FormValues = z.infer<typeof formSchema>;

interface ExerciseFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  exercise?: Exercise | null;
  onCreate: (data: Omit<Exercise, "id" | "isCustom">) => void;
  onUpdate: (id: string, data: Partial<Omit<Exercise, "id">>) => void;
}

const EMPTY_FORM: FormValues = {
  name: "",
  description: "",
  difficulty: "principiante",
  category: "fuerza",
  targetSets: 3,
  targetReps: "8-12",
  restTime: 90,
};

export function ExerciseFormModal({
  open,
  onOpenChange,
  exercise,
  onCreate,
  onUpdate,
}: ExerciseFormModalProps) {
  const toast = useToast();
  const isEditing = !!exercise;

  const [primaryMuscles, setPrimaryMuscles] = useState<string[]>([]);
  const [secondaryMuscles, setSecondaryMuscles] = useState<string[]>([]);
  const [equipment, setEquipment] = useState<string[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: EMPTY_FORM,
  });

  // Populate form when editing
  useEffect(() => {
    if (open && exercise) {
      form.reset({
        name: exercise.name,
        description: exercise.description,
        difficulty: exercise.difficulty,
        category: exercise.category,
        targetSets: exercise.targetSets,
        targetReps: exercise.targetReps,
        restTime: exercise.restTime,
      });
      setPrimaryMuscles(exercise.muscleGroups.primary);
      setSecondaryMuscles(exercise.muscleGroups.secondary);
      setEquipment(exercise.equipment);
    } else if (open && !exercise) {
      form.reset(EMPTY_FORM);
      setPrimaryMuscles([]);
      setSecondaryMuscles([]);
      setEquipment([]);
    }
  }, [open, exercise, form]);

  const addToList = (value: string, list: string[], setList: (v: string[]) => void) => {
    if (value && !list.includes(value)) {
      setList([...list, value]);
    }
  };

  const removeFromList = (index: number, list: string[], setList: (v: string[]) => void) => {
    setList(list.filter((_, i) => i !== index));
  };

  const handleSubmit = (values: FormValues) => {
    if (primaryMuscles.length === 0) {
      toast.error("Añadí al menos un músculo principal");
      return;
    }
    if (equipment.length === 0) {
      toast.error("Añadí al menos un tipo de equipo");
      return;
    }

    const payload: Omit<Exercise, "id" | "isCustom"> = {
      ...values,
      muscleGroups: { primary: primaryMuscles, secondary: secondaryMuscles },
      equipment,
      technique: exercise?.technique ?? [],
      instructions: exercise?.instructions ?? [],
      tips: exercise?.tips ?? [],
      variations: exercise?.variations ?? [],
    };

    if (isEditing && exercise) {
      onUpdate(exercise.id, payload);
      toast.success("Ejercicio actualizado");
    } else {
      onCreate(payload);
      toast.success("Ejercicio creado");
    }

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Ejercicio" : "Nuevo Ejercicio"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Modificá los datos del ejercicio personalizado."
              : "Añadí un ejercicio a tu biblioteca personal."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
            {/* Name + Difficulty */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="ej. Curl con mancuernas" {...field} />
                    </FormControl>
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
            </div>

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describí brevemente el ejercicio..."
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Primary muscles */}
            <div className="space-y-2">
              <FormLabel>Músculos principales *</FormLabel>
              <Select value="" onValueChange={(v) => addToList(v, primaryMuscles, setPrimaryMuscles)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccioná un músculo para agregar" />
                </SelectTrigger>
                <SelectContent>
                  {MUSCLE_GROUPS.filter((m) => !primaryMuscles.includes(m)).map((m) => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {primaryMuscles.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {primaryMuscles.map((m, i) => (
                    <Badge key={i} variant="default" className="gap-1">
                      {m}
                      <button type="button" onClick={() => removeFromList(i, primaryMuscles, setPrimaryMuscles)}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Secondary muscles */}
            <div className="space-y-2">
              <FormLabel>Músculos secundarios (opcional)</FormLabel>
              <Select value="" onValueChange={(v) => addToList(v, secondaryMuscles, setSecondaryMuscles)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccioná un músculo para agregar" />
                </SelectTrigger>
                <SelectContent>
                  {MUSCLE_GROUPS.filter((m) => !secondaryMuscles.includes(m)).map((m) => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {secondaryMuscles.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {secondaryMuscles.map((m, i) => (
                    <Badge key={i} variant="secondary" className="gap-1">
                      {m}
                      <button type="button" onClick={() => removeFromList(i, secondaryMuscles, setSecondaryMuscles)}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Equipment */}
            <div className="space-y-2">
              <FormLabel>Equipo necesario *</FormLabel>
              <Select value="" onValueChange={(v) => addToList(v, equipment, setEquipment)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccioná equipo para agregar" />
                </SelectTrigger>
                <SelectContent>
                  {EQUIPMENT_TYPES.filter((eq) => !equipment.includes(eq)).map((eq) => (
                    <SelectItem key={eq} value={eq}>{eq}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {equipment.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {equipment.map((eq, i) => (
                    <Badge key={i} variant="outline" className="gap-1">
                      {eq}
                      <button type="button" onClick={() => removeFromList(i, equipment, setEquipment)}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Category + Sets + Reps + Rest */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="col-span-2 sm:col-span-1">
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
                name="targetSets"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Series</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} max={10} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="targetReps"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reps</FormLabel>
                    <FormControl>
                      <Input placeholder="8-12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="restTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descanso (s)</FormLabel>
                    <FormControl>
                      <Input type="number" min={15} max={600} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit">{isEditing ? "Guardar cambios" : "Crear ejercicio"}</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
