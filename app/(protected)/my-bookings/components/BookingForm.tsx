import { ProgressStatus, ProjectType } from "@/features/misc/enums";
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
      <h3 className="text-base font-semibold text-neutral-900 mb-4">
        Confirm Booking
      </h3>

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <input
          className="w-full rounded-xl border px-3 py-3 text-sm"
          value={form.fullName}
          placeholder="Full name"
          onChange={(e) => onChange({ fullName: e.target.value })}
          required
        />

        <select
          className="w-full rounded-xl border px-3 py-3 text-sm"
          value={form.participants}
          onChange={(e) => onChange({ participants: Number(e.target.value) })}
          required
        >
          <option value="">Select participants</option>
          {Array.from({ length: capacity }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              {num} {num === 1 ? "Participant" : "Participants"}
            </option>
          ))}
        </select>

        <select
          className="w-full rounded-xl border px-3 py-3 text-sm bg-white"
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

        <select
          className="w-full rounded-xl border px-3 py-3 text-sm bg-white"
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

        <button
          type="submit"
          className="w-full rounded-xl bg-black py-3 text-sm font-medium text-white "
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
}
