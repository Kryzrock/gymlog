import { toast as sonnerToast } from "sonner";

// Thin wrapper around sonner — swap the implementation here if needed.
export function useToast() {
  return {
    success: (message: string, description?: string) =>
      sonnerToast.success(message, { description }),
    error: (message: string, description?: string) =>
      sonnerToast.error(message, { description }),
    info: (message: string, description?: string) =>
      sonnerToast.info(message, { description }),
    warning: (message: string, description?: string) =>
      sonnerToast.warning(message, { description }),
  };
}
