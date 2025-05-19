import { betterAuth } from "better-auth";
import pool from "@/lib/db";    

export const auth = betterAuth({
   database: pool
});
