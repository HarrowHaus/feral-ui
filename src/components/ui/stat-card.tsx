import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Badge } from "./badge";

export function StatCard({ title, value, delta, tone = "paper" }: { title: string; value: string; delta?: string; tone?: "paper" | "acid" | "pink" | "ultra" | "tang" }) {
  return (
    <Card tone={tone} radius={tone === "acid" || tone === "ultra" ? "none" : "default"}>
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle style={{ fontSize: 34 }}>{value}</CardTitle>
      </CardHeader>
      {delta ? <CardContent><Badge tone={tone === "pink" ? "acid" : "pink"}>{delta}</Badge></CardContent> : null}
    </Card>
  );
}
