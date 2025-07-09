import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  difficulty: z.enum(["principiante", "intermedio", "avanzado"]),
  category: z.enum(["fuerza", "hipertrofia", "resistencia", "funcional"]),
  targetSets: z.number().min(1).max(10),
  targetReps: z.string().min(1, "Las repeticiones son requeridas"),
  restTime: z.number().min(30).max(600),
});

interface CreateExerciseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateExercise: (exercise: any) => void;
}

export const CreateExerciseDialog = ({
  open,
  onOpenChange,
  onCreateExercise,
}: CreateExerciseDialogProps) => {
  const { toast } = useToast();
  const [primaryMuscles, setPrimaryMuscles] = useState<string[]>([]);
  const [secondaryMuscles, setSecondaryMuscles] = useState<string[]>([]);
  const [equipment, setEquipment] = useState<string[]>([]);
  const [instructions, setInstructions] = useState<string[]>([]);
  const [tips, setTips] = useState<string[]>([]);
  const [newPrimaryMuscle, setNewPrimaryMuscle] = useState("");
  const [newSecondaryMuscle, setNewSecondaryMuscle] = useState("");
  const [newEquipment, setNewEquipment] = useState("");
  const [newInstruction, setNewInstruction] = useState("");
  const [newTip, setNewTip] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      difficulty: "principiante",
      category: "fuerza",
      targetSets: 3,
      targetReps: "8-12",
      restTime: 90,
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    if (primaryMuscles.length === 0) {
      toast({
        title: "Error",
        description: "Debes añadir al menos un músculo principal",
        variant: "destructive",
      });
      return;
    }

    if (equipment.length === 0) {
      toast({
        title: "Error", 
        description: "Debes añadir al menos un tipo de equipo",
        variant: "destructive",
      });
      return;
    }

    const exercise = {
      id: Date.now().toString(),
      ...values,
      muscleGroups: {
        primary: primaryMuscles,
        secondary: secondaryMuscles,
      },
      equipment,
      instructions,
      tips,
      technique: [],
      variations: [],
      isCustom: true,
      createdBy: "usuario", // In a real app, this would be the current user
    };

    onCreateExercise(exercise);
    
    toast({
      title: "Ejercicio creado",
      description: "El ejercicio personalizado ha sido añadido a tu biblioteca",
    });

    // Reset form
    form.reset();
    setPrimaryMuscles([]);
    setSecondaryMuscles([]);
    setEquipment([]);
    setInstructions([]);
    setTips([]);
  };

  const addPrimaryMuscle = () => {
    if (newPrimaryMuscle && !primaryMuscles.includes(newPrimaryMuscle)) {
      setPrimaryMuscles([...primaryMuscles, newPrimaryMuscle]);
      setNewPrimaryMuscle("");
    }
  };

  const addSecondaryMuscle = () => {
    if (newSecondaryMuscle && !secondaryMuscles.includes(newSecondaryMuscle)) {
      setSecondaryMuscles([...secondaryMuscles, newSecondaryMuscle]);
      setNewSecondaryMuscle("");
    }
  };

  const addEquipment = () => {
    if (newEquipment && !equipment.includes(newEquipment)) {
      setEquipment([...equipment, newEquipment]);
      setNewEquipment("");
    }
  };

  const addInstruction = () => {
    if (newInstruction && !instructions.includes(newInstruction)) {
      setInstructions([...instructions, newInstruction]);
      setNewInstruction("");
    }
  };

  const addTip = () => {
    if (newTip && !tips.includes(newTip)) {
      setTips([...tips, newTip]);
      setNewTip("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Crear Ejercicio Personalizado</DialogTitle>
          <DialogDescription>
            Añade un nuevo ejercicio a tu biblioteca personal
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del Ejercicio</FormLabel>
                    <FormControl>
                      <Input placeholder="ej. Press de Banca" {...field} />
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe el ejercicio brevemente..."
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Muscles */}
            <div className="space-y-4">
              <div>
                <FormLabel>Músculos Principales</FormLabel>
                <div className="flex gap-2 mb-2">
                  <Input
                    placeholder="ej. Pectoral mayor"
                    value={newPrimaryMuscle}
                    onChange={(e) => setNewPrimaryMuscle(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addPrimaryMuscle())}
                  />
                  <Button type="button" onClick={addPrimaryMuscle} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {primaryMuscles.map((muscle, index) => (
                    <Badge key={index} variant="default">
                      {muscle}
                      <button
                        type="button"
                        onClick={() => setPrimaryMuscles(primaryMuscles.filter((_, i) => i !== index))}
                        className="ml-1 hover:bg-destructive rounded-full"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <FormLabel>Músculos Secundarios (Opcional)</FormLabel>
                <div className="flex gap-2 mb-2">
                  <Input
                    placeholder="ej. Tríceps"
                    value={newSecondaryMuscle}
                    onChange={(e) => setNewSecondaryMuscle(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSecondaryMuscle())}
                  />
                  <Button type="button" onClick={addSecondaryMuscle} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {secondaryMuscles.map((muscle, index) => (
                    <Badge key={index} variant="secondary">
                      {muscle}
                      <button
                        type="button"
                        onClick={() => setSecondaryMuscles(secondaryMuscles.filter((_, i) => i !== index))}
                        className="ml-1 hover:bg-destructive rounded-full"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Equipment */}
            <div>
              <FormLabel>Equipo Necesario</FormLabel>
              <div className="flex gap-2 mb-2">
                <Input
                  placeholder="ej. Mancuernas"
                  value={newEquipment}
                  onChange={(e) => setNewEquipment(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addEquipment())}
                />
                <Button type="button" onClick={addEquipment} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-1">
                {equipment.map((eq, index) => (
                  <Badge key={index} variant="outline">
                    {eq}
                    <button
                      type="button"
                      onClick={() => setEquipment(equipment.filter((_, i) => i !== index))}
                      className="ml-1 hover:bg-destructive rounded-full"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Exercise Parameters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoría</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="fuerza">Fuerza</SelectItem>
                        <SelectItem value="hipertrofia">Hipertrofia</SelectItem>
                        <SelectItem value="resistencia">Resistencia</SelectItem>
                        <SelectItem value="funcional">Funcional</SelectItem>
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
                    <FormLabel>Series Objetivo</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1" 
                        max="10"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
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
                    <FormLabel>Repeticiones</FormLabel>
                    <FormControl>
                      <Input placeholder="ej. 8-12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="restTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tiempo de Descanso (segundos)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="30" 
                      max="600"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Instructions (Optional) */}
            <div>
              <FormLabel>Instrucciones (Opcional)</FormLabel>
              <div className="flex gap-2 mb-2">
                <Input
                  placeholder="ej. Mantén la espalda recta durante todo el movimiento"
                  value={newInstruction}
                  onChange={(e) => setNewInstruction(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addInstruction())}
                />
                <Button type="button" onClick={addInstruction} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-1">
                {instructions.map((instruction, index) => (
                  <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                    <span className="text-sm">{index + 1}. {instruction}</span>
                    <button
                      type="button"
                      onClick={() => setInstructions(instructions.filter((_, i) => i !== index))}
                      className="text-destructive hover:bg-destructive hover:text-destructive-foreground rounded p-1"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips (Optional) */}
            <div>
              <FormLabel>Consejos (Opcional)</FormLabel>
              <div className="flex gap-2 mb-2">
                <Input
                  placeholder="ej. Exhala durante la fase concéntrica"
                  value={newTip}
                  onChange={(e) => setNewTip(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTip())}
                />
                <Button type="button" onClick={addTip} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-1">
                {tips.map((tip, index) => (
                  <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                    <span className="text-sm">💡 {tip}</span>
                    <button
                      type="button"
                      onClick={() => setTips(tips.filter((_, i) => i !== index))}
                      className="text-destructive hover:bg-destructive hover:text-destructive-foreground rounded p-1"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">
                Crear Ejercicio
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};