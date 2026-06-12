"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { createProperty, getProperties } from "@/lib/properties";
import { CreatePropertyRequest, Property } from "@/types/property";

const currencyFormatter = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
});

const initialForm: CreatePropertyRequest = {
    name: "",
    address: "",
    monthlyRent: 0,
};

export default function PropertiesPage() {
    const { token } = useAuth();
    const [properties, setProperties] = useState<Property[]>([]);
    const [form, setForm] = useState<CreatePropertyRequest>(initialForm);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const totalMonthlyRent = useMemo(
        () => properties.reduce((total, property) => total + property.monthlyRent, 0),
        [properties]
    );

    useEffect(() => {
        if (!token) {
            setProperties([]);
            setLoading(false);
            return;
        }

        let active = true;

        const loadProperties = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await getProperties(token);
                if (active) setProperties(data);
            } catch (err) {
                if (active) {
                    setError(err instanceof Error ? err.message : "No se pudieron cargar las propiedades.");
                }
            } finally {
                if (active) setLoading(false);
            }
        };

        loadProperties();

        return () => {
            active = false;
        };
    }, [token]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);

        if (!token) {
            setError("La sesion expiro. Inicia sesion de nuevo.");
            return;
        }

        if (!form.name.trim() || !form.address.trim() || form.monthlyRent <= 0) {
            setError("Completa el nombre, la direccion y una renta mayor a cero.");
            return;
        }

        setSaving(true);

        try {
            const created = await createProperty(token, {
                name: form.name.trim(),
                address: form.address.trim(),
                monthlyRent: form.monthlyRent,
            });

            setProperties((current) =>
                [...current, created].sort((a, b) => a.name.localeCompare(b.name))
            );
            setForm(initialForm);
            setSuccess("Propiedad creada correctamente.");
        } catch (err) {
            setError(err instanceof Error ? err.message : "No se pudo crear la propiedad.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-1">
                    <h1 className="text-2xl font-semibold text-[var(--foreground)]">
                        Propiedades
                    </h1>
                    <p className="text-sm text-[var(--muted-foreground)]">
                        Administra tus propiedades registradas.
                    </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-3 shadow-sm">
                        <p className="text-xs font-medium text-[var(--muted-foreground)]">
                            Propiedades
                        </p>
                        <p className="text-xl font-semibold text-[var(--foreground)]">
                            {properties.length}
                        </p>
                    </div>
                    <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-3 shadow-sm">
                        <p className="text-xs font-medium text-[var(--muted-foreground)]">
                            Renta mensual
                        </p>
                        <p className="text-xl font-semibold text-[var(--foreground)]">
                            {currencyFormatter.format(totalMonthlyRent)}
                        </p>
                    </div>
                </div>
            </div>

            {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            {success && (
                <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                    {success}
                </div>
            )}

            <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
                <div className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--card)] shadow-sm">
                    <div className="border-b border-[var(--border)] px-5 py-4">
                        <h2 className="text-base font-semibold text-[var(--foreground)]">
                            Listado
                        </h2>
                    </div>

                    {loading ? (
                        <div className="p-5 text-sm text-[var(--muted-foreground)]">
                            Cargando propiedades...
                        </div>
                    ) : properties.length === 0 ? (
                        <div className="p-5 text-sm text-[var(--muted-foreground)]">
                            Todavia no hay propiedades registradas.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[640px] text-left text-sm">
                                <thead className="bg-[var(--muted)] text-xs uppercase text-[var(--muted-foreground)]">
                                    <tr>
                                        <th className="px-5 py-3 font-semibold">Nombre</th>
                                        <th className="px-5 py-3 font-semibold">Direccion</th>
                                        <th className="px-5 py-3 text-right font-semibold">Renta mensual</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[var(--border)]">
                                    {properties.map((property) => (
                                        <tr key={property.id}>
                                            <td className="px-5 py-4 font-medium text-[var(--foreground)]">
                                                {property.name}
                                            </td>
                                            <td className="px-5 py-4 text-[var(--muted-foreground)]">
                                                {property.address}
                                            </td>
                                            <td className="px-5 py-4 text-right font-medium text-[var(--foreground)]">
                                                {currencyFormatter.format(property.monthlyRent)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 rounded-lg border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm"
                >
                    <div>
                        <h2 className="text-base font-semibold text-[var(--foreground)]">
                            Nueva propiedad
                        </h2>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-[var(--foreground)]">
                            Nombre
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={form.name}
                            maxLength={150}
                            onChange={(event) =>
                                setForm((current) => ({ ...current, name: event.target.value }))
                            }
                            className="w-full rounded-lg border border-[var(--input)] bg-white px-3 py-2 text-sm outline-none transition focus:border-[var(--primary)] focus:ring-4 focus:ring-blue-100"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="address" className="block text-sm font-medium text-[var(--foreground)]">
                            Direccion
                        </label>
                        <textarea
                            id="address"
                            value={form.address}
                            maxLength={300}
                            rows={3}
                            onChange={(event) =>
                                setForm((current) => ({ ...current, address: event.target.value }))
                            }
                            className="w-full resize-none rounded-lg border border-[var(--input)] bg-white px-3 py-2 text-sm outline-none transition focus:border-[var(--primary)] focus:ring-4 focus:ring-blue-100"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="monthlyRent" className="block text-sm font-medium text-[var(--foreground)]">
                            Renta mensual
                        </label>
                        <input
                            id="monthlyRent"
                            type="number"
                            min="1"
                            step="0.01"
                            value={form.monthlyRent || ""}
                            onChange={(event) =>
                                setForm((current) => ({
                                    ...current,
                                    monthlyRent: Number(event.target.value),
                                }))
                            }
                            className="w-full rounded-lg border border-[var(--input)] bg-white px-3 py-2 text-sm outline-none transition focus:border-[var(--primary)] focus:ring-4 focus:ring-blue-100"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={saving}
                        className="w-full rounded-lg bg-[var(--primary)] px-4 py-2.5 text-sm font-medium text-[var(--primary-foreground)] transition hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {saving ? "Guardando..." : "Crear propiedad"}
                    </button>
                </form>
            </section>
        </div>
    );
}
