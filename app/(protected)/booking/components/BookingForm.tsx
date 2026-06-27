import { Chevron } from "@/features/misc/chevron";
import { ProgressStatus, ProjectType } from "@/features/misc/enums";
import { SelectBlock } from "@/features/misc/selectBloc";
export type BookingFormState = {
  fullName: string;
  participants: number | "";
  projectType: ProjectType | "";
  progressStatus: ProgressStatus | "";
};
type Props = {
  form: BookingFormState;
  capacity: number;
  projectTypes: ProjectType[];
  progressStatuses: ProgressStatus[];
  onChange: (patch: Partial<BookingFormState>) => void;
  onSubmit: () => void;
};

export default function BookingForm({
  form,
  capacity,
  projectTypes,
  progressStatuses,
  onChange,
  onSubmit,
}: Props) {
  function isProjectType(value: string): value is ProjectType {
    return Object.values(ProjectType).includes(value as ProjectType);
  }

  function isProgressStatus(value: string): value is ProgressStatus {
    return Object.values(ProgressStatus).includes(value as ProgressStatus);
  }

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
            Name
          </label>

          <input
            className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] px-4 py-3 text-sm text-gray-900 transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            value={form.fullName}
            placeholder="Enter name"
            onChange={(e) => onChange({ fullName: e.target.value })}
            required
          />
        </div>

        {/* PARTICIPANTS */}
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-gray-400">
            Participants
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
              <option value="">Select participants</option>

              {Array.from({ length: capacity }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? "participant" : "participants"}
                </option>
              ))}
            </select>

            <Chevron />
          </div>
        </div>

        {/* PROJECT TYPE */}
        <SelectBlock label="Project Type">
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
            <option value="">Select project type</option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <Chevron />
        </SelectBlock>

        {/* STATUS */}
        <SelectBlock label="Progress Status">
          <select
            className="w-full appearance-none rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 pr-10 text-sm focus:border-black focus:ring-2 focus:ring-black/10"
            value={form.progressStatus}
            onChange={(e) => {
              if (isProgressStatus(e.target.value)) {
                onChange({ progressStatus: e.target.value });
              }
            }}
            required
          >
            <option value="">Progress status</option>
            {progressStatuses.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <Chevron />
        </SelectBlock>

        <button
          type="submit"
          className="mt-2 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-blue-600/10 transition hover:bg-blue-500"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
}
