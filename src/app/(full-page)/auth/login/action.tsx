"use server";

import { COOKIE_ACCESS_TOKEN_KEY } from "@/src/app/lib/constant";
import { setCookie } from "@/src/app/lib/cookies";
import { redirect } from "next/navigation";
import { z } from "zod";

interface ValidateFromType {
  email?: string;
  password?: string;
}

export interface ActionLoginState {
  validate?: ValidateFromType;
  success?: boolean;
}

const schema = z.object({
  email: z
    .string({ invalid_type_error: "email empty !!!" })
    .min(1, "email empty !!!")
    .email("error account"),
  password: z
    .string({ invalid_type_error: "password is not valid!" })
    .min(8, "password is not valid!")
    .max(20, "password is not valid!"),
});

// acount test =)))))) 
const DEFAULT_EMAIL = "thanhcuong@gmail.com";
const DEFAULT_PASSWORD = "thanhcuong";


async function simulatedLogin(email: string, password: string) {
  if (email === DEFAULT_EMAIL && password === DEFAULT_PASSWORD) {
    return {
      access_token: "test_access_token",
      roles: ["ADMIN"],
    };
  }
  return undefined;
}

export async function login(_: ActionLoginState, formData: FormData) {

  let email = formData.get("email")?.toString();
  let password = formData.get("password")?.toString();
  if (!email) email = DEFAULT_EMAIL;
  if (!password) password = DEFAULT_PASSWORD;

  const validatedFields = schema.safeParse({ email, password });

  if (!validatedFields.success) {
    console.log("Validation failed:", validatedFields.error.formErrors.fieldErrors);
    return {
      validate: {
        email: validatedFields.error.formErrors.fieldErrors.email?.[0],
        password: validatedFields.error.formErrors.fieldErrors.password?.[0],
      },
      success: false,
    };
  }


  const loginResult = await simulatedLogin(email, password);
  console.log("Login result:", loginResult);

  if (loginResult?.roles.includes("ADMIN")) {
    setCookie(COOKIE_ACCESS_TOKEN_KEY, loginResult.access_token);
    redirect("/");
  } else {
    return {
      validate: {
        email: "account is not have permission",
      },
    };
  }
}

export interface LoginResponse {
  access_token: string;
  roles: Array<string>;
}

export interface LoginRequest {
  email: string;
  password: string;
}
