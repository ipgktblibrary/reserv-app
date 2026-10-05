"use client";

import { useEffect, useState } from "react";
import { Check, Info, UserRound } from "lucide-react";

import { useUserProfile } from "@/features/profile/useProfile";
import { useLogout } from "@/features/hooks/useLogout";
import { updateProfile } from "@/features/profile/updateProfile";

type Title = "En." | "Cik." | "Puan." | "Dr." | "Prof.";

const TITLES: Title[] = ["En.", "Cik.", "Puan.", "Dr.", "Prof."];

function formatName(value: string): string {
  return value
    .replace(/[^a-zA-Z\s]/g, "")
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function parseExistingName(name: string): {
  title: Title | "";
  firstName: string;
  lastName: string;
} {
  const parts = name.trim().split(/\s+/);
  const possibleTitle = parts[0];

  const title = TITLES.find(
    (item) => item.replace(".", "") === possibleTitle.replace(".", ""),
  );

  if (title) {
    return {
      title,
      firstName: parts[1] ?? "",
      lastName: parts.slice(2).join(" "),
    };
  }

  return {
    title: "",
    firstName: parts[0] ?? "",
    lastName: parts.slice(1).join(" "),
  };
}

export default function ProfilePage() {
  const { name } = useUserProfile();
  const logout = useLogout();

  const [title, setTitle] = useState<Title | "">("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!name) {
      return;
    }

    const parsed = parseExistingName(name);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTitle(parsed.title);
    setFirstName(parsed.firstName);
    setLastName(parsed.lastName);
  }, [name]);

  const formattedFirstName = formatName(firstName);
  const formattedLastName = formatName(lastName);

  const formattedTitle = title.replace(".", "");

  const fullName = [formattedTitle, formattedFirstName, formattedLastName]
    .filter(Boolean)
    .join(" ");

  const hasChanges = fullName !== (name ?? "");

  const isValid = formattedFirstName.length > 0 && formattedLastName.length > 0;

  async function handleSave() {
    if (!isValid || !hasChanges || isSaving) {
      return;
    }

    setIsSaving(true);

    try {
      // TODO:
      // Replace this with your actual profile update repository.
      //
      await updateProfile({
        name: fullName,
      });

      console.log("Saving profile name:", fullName);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-6 sm:px-6 sm:py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-950">
          Profil
        </h1>

        <p className="mt-1 text-sm text-gray-500">Kemaskini nama anda.</p>
      </div>

      <div className="space-y-6">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Panggilan
          </label>

          <div className="relative">
            <UserRound className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

            <select
              id="title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value as Title | "");
              }}
              className="h-12 w-full appearance-none rounded-xl border border-gray-200 bg-white pl-12 pr-10 text-sm text-gray-950 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
            >
              <option value="">Pilih panggilan</option>

              {TITLES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* First Name */}
        <div>
          <label
            htmlFor="first-name"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Nama pertama
          </label>

          <div className="relative">
            <UserRound className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

            <input
              id="first-name"
              type="text"
              value={firstName}
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
              maxLength={50}
              autoComplete="given-name"
              placeholder="Masukkan nama pertama"
              className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-12 pr-4 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
            />
          </div>
        </div>
        {/* Last Name */}
        <div>
          <label
            htmlFor="last-name"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Nama akhir
          </label>

          <div className="relative">
            <UserRound className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

            <input
              id="last-name"
              type="text"
              value={lastName}
              onChange={(event) => {
                setLastName(event.target.value);
              }}
              maxLength={100}
              autoComplete="family-name"
              placeholder="Enter your last name"
              className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-12 pr-4 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
            />
          </div>
        </div>

        {/* Naming rules */}
        <div className="flex gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />

          <div className="text-xs leading-relaxed text-blue-800">
            <p className="font-semibold">Panduan nama</p>

            <p className="mt-1">
              Gunakan huruf dan ruang (space) sahaja. Huruf pertama setiap
              perkataan akan ditukar kepada huruf besar secara automatik.
            </p>
          </div>
        </div>

        {/* Preview */}
        {fullName && (
          <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
            <p className="text-xs font-medium text-gray-500">Pratonton nama</p>

            <p className="mt-1 text-sm font-semibold text-gray-950">
              {fullName}
            </p>
          </div>
        )}

        {/* Save */}
        <button
          type="button"
          onClick={handleSave}
          disabled={!isValid || !hasChanges || isSaving}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-black px-5 text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 sm:w-auto"
        >
          {isSaving ? (
            "Saving..."
          ) : (
            <>
              <Check className="h-4 w-4" />
              Save changes
            </>
          )}
        </button>

        {/* Logout */}
        <button
          type="button"
          onClick={async () => {
            await logout();
          }}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-red-700 px-5 text-sm font-semibold text-white transition hover:bg-red-800 active:scale-[0.99] sm:w-auto"
        >
          Log Keluar
        </button>
      </div>
    </main>
  );
}
