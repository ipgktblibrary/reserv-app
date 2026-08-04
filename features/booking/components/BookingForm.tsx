import { Chevron } from "@/features/misc/chevron";
import { ProgressStatus, ProjectType } from "@/features/misc/enums";
import { SelectBlock } from "@/features/misc/selectBloc";
import { getUserProfile } from "@/lib/auth";
import { useEffect, useState } from "react";
export type BookingFormState = {
  participants: number | "";
  projectType: ProjectType | "";
  progressStatus: ProgressStatus | "";
};
type Props = {
  form: BookingFormState;
  capacity: number;
  projectTypes: ProjectType[];
  onChange: (patch: Partial<BookingFormState>) => void;
  onSubmit: () => void;
};

export default function BookingForm({
  form,
  capacity,
  projectTypes,
  onChange,
  onSubmit,
}: Props) {
  function isProjectType(value: string): value is ProjectType {
    return Object.values(ProjectType).includes(value as ProjectType);
  }

  const [name, setName] = useState<string | null>(null);
  useEffect(() => {
    const load = async () => {
      const user = await getUserProfile();
      setName(user?.name ?? null);
    };

    load();
  }, []);

  return (
    <div className="mb-10 rounded-2xl border bg-white p-5">
      <h3 className="mb-4 text-base font-semibold text-neutral-900">
        Confirm Booking
      </h3>

      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        {/* NAME */}
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-gray-400">
            Nama
          </label>

          <div className="w-full rounded-xl border border-gray-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-500 select-none">
            {(name ?? "-").toUpperCase()}
          </div>
        </div>

        {/* PARTICIPANTS */}
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-gray-400">
            Peserta
          </label>

          <div className="relative w-full">
            <select
              className="w-full appearance-none rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 pr-10 text-sm focus:border-black focus:ring-2 focus:ring-black/10"
              value={form.participants}
              onChange={(e) =>
                onChange({
                  participants: e.target.value ? Number(e.target.value) : "",
                })
              }
              required
            >
              <option value="">Pilih bilangan peserta</option>

              {Array.from({ length: capacity }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? "Bilangan Peserta" : "Bilangan Peserta"}
                </option>
              ))}
            </select>

            <Chevron />
          </div>
        </div>

        {/* PROJECT TYPE */}
        <SelectBlock label="Tujuan Penggunaan Bilik">
          <select
            className="w-full appearance-none rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 pr-10 text-sm focus:border-black focus:ring-2 focus:ring-black/10"
            value={form.projectType}
            onChange={(e) => {
              if (isProjectType(e.target.value)) {
                onChange({ projectType: e.target.value });
              }
            }}
            required
          >
            <option value="">Pilih tujuan penggunaan bilik</option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <Chevron />
        </SelectBlock>

        <button
          type="submit"
          className="mt-2 w-full rounded-xl bg-[#6844C7] px-4 py-3 text-sm font-medium text-white shadow-md shadow-[#6844C7]/20 transition hover:bg-[#5B3CC4] hover:shadow-[#6844C7]/30 active:scale-[0.99]"
        >
          Tempah Sekarang
        </button>
      </form>
    </div>
  );
}
