import { RoundedBox } from "@/components/shared/rounded-block/rounded-block";

export default function NotFound() {
  return (
    <RoundedBox
      paddingless
      className="flex flex-col items-center mt-12.5 py-80 bg-white"
    >
      <h1 className="text-2xl font-semibold">404 — Страница не найдена</h1>
      <p className="mt-2 text-gray-500">Запрашиваемый ресурс не существует</p>
    </RoundedBox>
  );
}
