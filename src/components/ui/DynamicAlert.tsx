"use client";

import { useEffect, useState } from "react";
import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const messages = [
  "Weather temperature updated for your favorite city!",
  "Cryptocurrency prices just got refreshed!",
  "Live market data fetched successfully!",
  "Latest weather info retrieved for your saved locations!",
  "Crypto market cap and 24h change updated!",
];

export default function DynamicAlert() {
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      setMessage(randomMsg);
      setShowAlert(true);

      setTimeout(() => setShowAlert(false), 3000);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {showAlert && (
        <Alert className="fixed top-4 right-4 w-[350px] shadow-lg z-50">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
    </>
  );
}
