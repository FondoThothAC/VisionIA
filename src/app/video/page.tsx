import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Film, Wand2 } from "lucide-react";
import PageHeader from "@/components/page-header";

export default function VideoPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Video Overview Generation"
        description="Automatically create a compelling video overview of your business plan. Perfect for investor pitches and marketing."
      />

      <Card>
        <CardHeader>
          <CardTitle>Generate Your Video</CardTitle>
          <CardDescription>Click the button below to start the video generation process.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-80 bg-muted/50 rounded-lg border-2 border-dashed">
            <Film className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-6">Your generated video will appear here.</p>
            <Button>
              <Wand2 className="mr-2 h-4 w-4" />
              Generate Video
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
