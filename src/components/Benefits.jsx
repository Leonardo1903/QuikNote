import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Brain, Clock, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function Benefits() {
  return (
    <section
      id="benefits"
      className="w-full py-12 md:py-24 lg:py-32 bg-gray-900"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-purple-400 mb-4">
            Boost Your Productivity
          </h2>
          <p className="max-w-[800px] mx-auto text-gray-300 md:text-xl">
            Discover how Quiknote can transform your note-taking experience and
            supercharge your productivity.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="bg-gray-800/60 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <Brain className="h-8 w-8 mb-2 text-purple-500" />
              <CardTitle className="text-purple-400">
                Organize Your Thoughts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Effortlessly structure your ideas and keep your thoughts
                organized in one place.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/60 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <Clock className="h-8 w-8 mb-2 text-purple-500" />
              <CardTitle className="text-purple-400">Save Time</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Quickly capture and retrieve information, saving you valuable
                time in your daily tasks.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/60 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <Sparkles className="h-8 w-8 mb-2 text-purple-500" />
              <CardTitle className="text-purple-400">
                Enhance Creativity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Stimulate your creative process by easily connecting ideas and
                inspirations.
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-center">
          <Button
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 text-white"
            asChild
          >
            <Link href="#cta">Start Boosting Your Productivity</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
