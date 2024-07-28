"use client"
import Script from "next/script";
import Login from "./login";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
       <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() =>
          console.log(`script loaded correctly, window.FB has been populated`)
        }
      />
       <Login/>
    </div>
  );
}
