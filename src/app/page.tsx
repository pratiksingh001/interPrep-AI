"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Home() {
   const { data: session } = authClient.useSession();
   const [name, setName] = useState("");
   const [email, seEmail] = useState("");
   const [password, setPassword] = useState("");

   const onSubmit = () => {
      authClient.signUp.email(
         {
            name,
            email,
            password,
         },
         {
            onError: () => {
               window.alert("Something went wrong");
            },
            onSuccess: () => {
               window.alert("User created successfully");
            },
         }
      );
   };
   const onLogin = () => {
      authClient.signIn.email(
         {
            email,
            password,
         },
         {
            onError: () => {
               window.alert("Something went wrong");
            },
            onSuccess: () => {
               window.alert("User login successfully");
            },
         }
      );
   };

   if (session) {
      return (
         <div>
            <h1>Welcome {session.user?.name}</h1>
            <Button onClick={() => authClient.signOut()}>Sign Out</Button>
         </div>
      );
   }

   return (
      <div className="flex flex-col gap-y-10">
         <div className="p-4 flex flex-col gap-4">
            <Input
               type="text"
               placeholder="Name"
               value={name}
               onChange={e => setName(e.target.value)}
            />
            <Input
               type="text"
               placeholder="Email"
               value={email}
               onChange={e => seEmail(e.target.value)}
            />
            <Input
               type="password"
               placeholder="Password"
               value={password}
               onChange={e => setPassword(e.target.value)}
            />
            <Button onClick={onSubmit}>Create</Button>
         </div>
         <div className="p-4 flex flex-col gap-4">
            <Input
               type="text"
               placeholder="Email"
               value={email}
               onChange={e => seEmail(e.target.value)}
            />
            <Input
               type="password"
               placeholder="Password"
               value={password}
               onChange={e => setPassword(e.target.value)}
            />
            <Button onClick={onLogin}>Login</Button>
         </div>
      </div>
   );
}
