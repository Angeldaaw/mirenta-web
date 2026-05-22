const stats = [
        { label: "Propiedades", value: 5, description: "Total registradas" },
        { label: "Rentas activas", value: 13, description: "Contratos Vigentes" },
        { label: "Pagos pendientes", value: 2, description: "Por revisar" },
        { label: "Ingresos del mes", value: "$22,231.23 MXN", description: "Ingresos acumulados" }
    ];

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h1 className="text-2xl font-semibold text-[var(--foreground)]">
                    Dashboard
                </h1>
                <p className="text-sm text-[var(--muted-foreground)]">
                    Bienvenido a tu panel de control.
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => (
                    <div 
                        key={stat.label} 
                        className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm"
                        >
                        <p className="text-sm text-[var(--muted-foreground)]">
                            {stat.label}
                        </p>
                        <p className="mt-2 text-2xl font-semibold text-[var(--foreground)]">
                            {stat.value}
                        </p>
                        <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                            {stat.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}