import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section
      id="cta"
      className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-600 to-pink-600 text-white"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Start Noting Today
            </h2>
            <p className="mx-auto max-w-[600px] text-purple-100 md:text-xl">
              Join thousands of users who have already transformed their
              note-taking experience with Quiknote.
            </p>
          </div>
          <Button
            className="bg-white text-purple-600 hover:bg-gray-100"
            size="lg"
            asChild
          >
            <Link href="#">Sign Up for Free</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
