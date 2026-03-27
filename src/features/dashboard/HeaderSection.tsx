function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Buenos días";
  if (hour < 18) return "Buenas tardes";
  return "Buenas noches";
}

export function HeaderSection() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground">{getGreeting()}</p>
        <h1 className="text-2xl font-black tracking-tight">Hola 👋</h1>
      </div>
      <div className="h-10 w-10 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
        <span className="text-sm font-bold text-primary">G</span>
      </div>
    </div>
  );
}
