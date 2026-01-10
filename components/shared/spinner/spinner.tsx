export function Spinner() {
  return (
    <div className="flex-center">
      <div
        className="h-16 w-16 animate-spin rounded-full border-2 border-blue border-t-transparent"
        aria-label="Loading"
      />
    </div>
  );
}
