import { z } from "zod";

export const addClientSchema = z.object({
  clientName: z.string().min(1, "Client Name is required"),
  businessName: z.string().min(1, "Business Name is required"),
  phoneNumber: z
    .string()
    .refine((text)=> {
           if(!text.length){
               return true;
          }
           return /^\d{10}$/.test(text);
       },{
           message:"phone number not valid"
      }),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  logoURL: z.string(),
  address: z.string(),
});

//.instanceof(FileList)