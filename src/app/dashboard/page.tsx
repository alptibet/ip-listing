"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function DashboardPage() {
  const handleClick = function() {
    toast({
      title: "Test Toast",
      description: "Test Toast",
    });
  };
  const { toast } = useToast();
  return <Button onClick={handleClick}>Show Toast!</Button>;
}
