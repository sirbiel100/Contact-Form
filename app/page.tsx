"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormEvent, useEffect, useState } from "react";
import { isValidEmail } from "@/utils/EmailRegex";
import { toast } from "sonner";

export default function Home() {
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    queryType: "",
    message: "",
    consent: false
  })

  const [errorMessage, setErrorMessage] = useState({
    firstName: "",
    lastName: "",
    email: "",
    queryType: "",
    message: "",
    consent: ""
  })

  const Submit = (e: any) => {
    e.preventDefault()

    let hasError: boolean = false

    let errors = {
      firstName: "",
      lastName: "",
      email: "",
      queryType: "",
      message: "",
      consent: ""
    };

    if (!input.firstName.trim()) {
      errors.firstName = "First name is required";
      hasError = true;
    }

    if (!input.lastName.trim()) {
      errors.lastName = "Last name is required";
      hasError = true;
    }

    if (!input.email.trim()) {
      errors.email = "Email is required";
      hasError = true;
    } else if (!isValidEmail(input.email)) {
      errors.email = "Enter a valid email";
      hasError = true;
    }

    if (!input.queryType) {
      errors.queryType = "Please select a query type";
      hasError = true;
    }

    if (!input.message.trim()) {
      errors.message = "Message is required";
      hasError = true;
    }

    if (!input.consent) {
      errors.consent = "You must consent before submitting";
      hasError = true;
    }

    setErrorMessage(errors);

    if (hasError) return;

    setInput({
      firstName: "",
      lastName: "",
      email: "",
      queryType: "",
      message: "",
      consent: false
    })

    toast.success("Message sent!", {
      description: "Thanks for completing the form. We'll be in touch soon!",
      style: { background: "#064e3b", color: "white" },
      duration: 5000,
    })
  }

  return (
    <form className="min-h-screen bg-green-50 flex items-center justify-center p-6" onSubmit={(e) => Submit(e)}>
      <Card className="w-full max-w-xl shadow-sm p-6">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold">Contact Us</CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* First Name + Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="first-name" className="mb-4">
                First Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="first-name"
                className={errorMessage.firstName ? "border-red-400 hover:border-red-700" : "hover:border-emerald-700"}
                value={input.firstName}
                onChange={(e) => setInput({ ...input, firstName: e.target.value })}
              />
              <span className="text-red-400">{errorMessage.firstName}</span>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="last-name" className="mb-4">
                Last Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="last-name"
                value={input.lastName}
                className={errorMessage.lastName ? "border-red-400 hover:border-red-700" : "hover:border-green-700"}
                onChange={(e) => setInput({ ...input, lastName: e.target.value })}
              />
              <span className="text-red-400">{errorMessage.lastName}</span>
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label htmlFor="email" className="mb-4">
              Email Address <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              className={errorMessage.email ? "border-red-400 hover:border-red-700" : "hover:border-green-700"}
              value={input.email} onChange={(e) => setInput({ ...input, email: e.target.value })}
            />
            <span className="text-red-400">{errorMessage.email}</span>
          </div>

          {/* Query Type */}
          <div className="space-y-2">
            <Label className="mb-4">
              Query Type <span className="text-destructive">*</span>
            </Label>
            <RadioGroup
              className="grid grid-cols-2 gap-3"
              value={input.queryType}
              onValueChange={(value) => setInput({ ...input, queryType: value })}
            >
              <div className={`flex items-center gap-2 border rounded-md px-4 py-3 transition ${input.queryType === "general" ? "border-emerald-600 bg-emerald-50" : ""}`}>
                <RadioGroupItem
                  id="general"
                  value="general"
                  className="cursor-pointer
                             data-[state=checked]:border-emerald-600
                             data-[state=checked]:bg-emerald-50
                             [&_[data-slot=radio-group-indicator]_span]:bg-emerald-600
                            "
                  defaultChecked={input.queryType === "general"}
                />
                <Label htmlFor="general" className="cursor-pointer font-normal">
                  General Enquiry
                </Label>
              </div>
              <div className={`flex items-center gap-2 border rounded-md px-4 py-3 transition ${input.queryType === "support" ? "border-emerald-600 bg-emerald-50" : ""}`} >
                <RadioGroupItem
                  id="support"
                  value="support"
                  className="cursor-pointer
                             data-[state=checked]:border-emerald-600
                             data-[state=checked]:bg-emerald-50
                             [&_[data-slot=radio-group-indicator]_span]:bg-emerald-600
                            "
                  defaultChecked={input.queryType === "support"}
                />
                <Label htmlFor="support" className="cursor-pointer font-normal">
                  Support Request
                </Label>
              </div>
              <span className="text-red-400">{errorMessage.queryType}</span>
            </RadioGroup>
          </div>

          {/* Message */}
          <div className="space-y-1.5">
            <Label htmlFor="message" className="mb-4">
              Message <span className="text-destructive">*</span>
            </Label>
            <Textarea
              value={input.message}
              onChange={(e) => setInput({ ...input, message: e.target.value })}
              id="message"
              className={errorMessage.message ? "border-red-400 hover:border-red-700 min-h-[100px] resize-none" : "min-h-[100px] resize-none hover:border-green-700"}
            />
            <span className="text-red-400">{errorMessage.message}</span>
          </div>

          {/* Consent Checkbox */}
          <div className="flex flex-col">
            <div className="flex col items-center gap-2 mb-2">
              <Checkbox
                id="consent"
                defaultChecked={input.consent}
                onCheckedChange={(checked) =>
                  setInput({ ...input, consent: checked === true })
                }
                className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
              />
              <Label htmlFor="consent" className="font-normal text-sm cursor-pointer">
                I consent to being contacted by the team{" "}
                <span className="text-destructive">*</span>
              </Label>
            </div>
            <span className="text-red-400">{errorMessage.consent}</span>
          </div>

          {/* Submit */}
          <Button
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white cursor-pointer p-5"
            size="lg"
            type="submit"
          >
            Submit
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
