import { Vote } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-gray-50 dark:bg-gray-900 mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2 font-bold text-lg">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Vote className="h-4 w-4" />
            </div>
            <span>BallotBuddy</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-md">
            Your Friendly AI Election Assistant. Empowering citizens with accessible,
            understandable, and engaging election education.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <span>Built for Hackathon 2026 🚀</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} BallotBuddy. Made with ❤️ for democracy.
          </p>
        </div>
      </div>
    </footer>
  );
}
