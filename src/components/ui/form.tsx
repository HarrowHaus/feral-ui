import * as React from "react";
import { Alert, AlertDescription, AlertIcon, AlertTitle } from "./alert";
import { cn } from "../../lib/cn";

export function FormSection({ className, ...props }: React.HTMLAttributes<HTMLFieldSetElement>) {
  return <fieldset className={cn("feral-form-section", className)} {...props} />;
}
export function FormLegend({ className, ...props }: React.HTMLAttributes<HTMLLegendElement>) {
  return <legend className={cn("feral-form-legend", className)} {...props} />;
}
export function ErrorSummary({ title = "Fix this little disaster", errors }: { title?: string; errors: string[] }) {
  return (
    <Alert tone="pink" role="alert">
      <AlertIcon>!</AlertIcon>
      <div>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>
          <ul className="feral-error-list">{errors.map((error) => <li key={error}>{error}</li>)}</ul>
        </AlertDescription>
      </div>
    </Alert>
  );
}
