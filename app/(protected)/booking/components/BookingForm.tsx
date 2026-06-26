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

// export default function BookingForm({
//   form,
//   capacity,
//   projectTypes,
//   progressStatuses,
//   onChange,
//   onSubmit,
// }: Props) {
//   function isProjectType(value: string): value is ProjectType {
//     return Object.values(ProjectType).includes(value as ProjectType);
//   }

//   function isProgressStatus(value: string): value is ProgressStatus {
//     return Object.values(ProgressStatus).includes(value as ProgressStatus);
//   }
//   return (
//     <div className="mb-10 rounded-2xl border bg-white p-5">
//       <h3 className="text-base font-semibold text-neutral-900 mb-4">
//         Confirm Bookings
//       </h3>

//       <form
//         className="space-y-5"
//         onSubmit={(e) => {
//           e.preventDefault();
//           onSubmit();
//         }}
//       >
//         <label
//           htmlFor="email"
//           className="block text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2"
//         >
//           Name
//         </label>
//         <input
//           className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
//           value={form.fullName}
//           placeholder="Masukkan Nama"
//           onChange={(e) => onChange({ fullName: e.target.value })}
//           required
//         />
//         <label
//           htmlFor="email"
//           className="block text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2"
//         >
//           Select Participants
//         </label>
//         <div className="relative w-full">
//           <select
//             className="w-full appearance-none rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 pr-10 text-sm focus:border-black focus:ring-2 focus:ring-black/10"
//             value={form.participants}
//             onChange={(e) => onChange({ participants: Number(e.target.value) })}
//             required
//           >
//             <option value="" disabled>
//               Select number of participants
//             </option>

//             {Array.from({ length: capacity }, (_, i) => i + 1).map((num) => (
//               <option key={num} value={num}>
//                 {num} {num === 1 ? "participant" : "participants"}
//               </option>
//             ))}
//           </select>

//           <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500">
//             <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//               <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
//             </svg>
//           </div>
//         </div>
//         <label
//           htmlFor="email"
//           className="block text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2"
//         >
//           Select Project Type
//         </label>

//         <div className="relative w-full">
// <select
//   className="w-full appearance-none rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 pr-10 text-sm focus:border-black focus:ring-2 focus:ring-black/10"
//   value={form.projectType}
//   onChange={(e) => {
//     if (isProjectType(e.target.value)) {
//       onChange({ projectType: e.target.value });
//     }
//   }}
//   required
// >
//   <option value="">Select project type</option>
//   {projectTypes.map((type) => (
//     <option key={type} value={type}>
//       {type}
//     </option>
//   ))}
// </select>
//           <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500">
//             <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//               <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
//             </svg>
//           </div>
//         </div>

//         <label
//           htmlFor="email"
//           className="block text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2"
//         >
//           Select Progress Status
//         </label>

//         <div className="relative w-full">
// <select
//   className="w-full appearance-none rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 pr-10 text-sm focus:border-black focus:ring-2 focus:ring-black/10"
//   value={form.progressStatus}
//   onChange={(e) => {
//     if (isProgressStatus(e.target.value)) {
//       onChange({ progressStatus: e.target.value });
//     }
//   }}
//   required
// >
//   <option value="">Progress status</option>
//   {progressStatuses.map((type) => (
//     <option key={type} value={type}>
//       {type}
//     </option>
//   ))}
// </select>
//           <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500">
//             <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//               <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
//             </svg>
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm py-3 px-4 rounded-xl shadow-lg shadow-blue-600/10 transition duration-200 mt-2"
//         >
//           Confirm Booking
//         </button>
//       </form>
//     </div>
//   );
// }

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
function SelectBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-gray-400">
        {label}
      </label>
      <div className="relative w-full">{children}</div>
    </div>
  );
}

function Chevron() {
  return (
    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500">
      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
      </svg>
    </div>
  );
}
