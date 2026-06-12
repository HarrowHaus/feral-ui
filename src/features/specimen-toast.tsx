export function SpecimenToast({ value }: { value: string | null }) {
  if (!value) return null;
  return (
    <div className="feral-toast-stack specimen-toast-stack" role="status" aria-live="polite">
      <div className="feral-toast feral-ornament-acid specimen-toast">
        <strong>Specimen bagged.</strong>
        <span>{value}</span>
      </div>
    </div>
  );
}
