import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Checkbox, CheckboxRow, Field, Input, Label } from "../components/ui";

export function LoginBlock() {
  return (
    <Card className="block-auth" tone="paper" tilt="left" radius="none">
      <CardHeader><CardTitle>Sign in</CardTitle><CardDescription>Securely enter the tiny circus.</CardDescription></CardHeader>
      <CardContent className="site-stack">
        <Field><Label htmlFor="block-email">Email</Label><Input id="block-email" placeholder="you@example.com" /></Field>
        <Field><Label htmlFor="block-password">Password</Label><Input id="block-password" type="password" /></Field>
        <CheckboxRow><Checkbox defaultChecked /> Remember this device, the brave little toaster.</CheckboxRow>
      </CardContent>
      <CardFooter><Button tone="ink">Sign in</Button><Button tone="paper">SSO</Button></CardFooter>
    </Card>
  );
}
