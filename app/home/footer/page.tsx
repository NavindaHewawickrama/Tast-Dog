import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-4 bg-primary text-white">
      <div className="flex justify-between container mx-auto px-4">
        <div className="flex space-x-10">
          <Link href="/home" className="hover:underline">
            Home
          </Link>
          <Link href="/settings" className="hover:underline">
            Settings
          </Link>
          <Link href="https://tastydog.com.au/about-us" rel="noopener noreferrer" target="_blank" className="hover:underline">
            About
            </Link>
            <Link href="https://tastydog.com.au/contact-us"  rel="noopener noreferrer" target="_blank" className="hover:underline">
            Contact
            </Link>
        </div>
        <div className="flex space-x-10">
          <Link href="https://tastydog.com.au/privacy-policy"  rel="noopener noreferrer" target="_blank" className="hover:underline">
            Privacy Policy
          </Link>
          <Link  href="https://tastydog.com.au/terms-and-conditions"   rel="noopener noreferrer" target="_blank" className="hover:underline">
            Terms and Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}
