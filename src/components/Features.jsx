import { Cloud, Zap, Share2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export default function Features() {
  return (
    <section
      id="features"
      className="w-full py-12 md:py-24 lg:py-32 bg-gray-800"
    >
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-purple-400">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <Zap className="h-8 w-8 mb-2 text-purple-500" />
              <CardTitle className="text-purple-400">Quick Capture</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Instantly jot down your ideas with our lightning-fast interface.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <Cloud className="h-8 w-8 mb-2 text-purple-500" />
              <CardTitle className="text-purple-400">Sync Everywhere</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Access your notes from any device with seamless cloud
                synchronization.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <Share2 className="h-8 w-8 mb-2 text-purple-500" />
              <CardTitle className="text-purple-400">Easy Sharing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Collaborate with others by sharing your notes with just a click.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
