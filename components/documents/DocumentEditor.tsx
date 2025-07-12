"use client"

import { FC, useState } from 'react';
import { ArrowLeft, Share2} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { useRouter } from 'next/navigation';
import { AppSidebar } from '../dashboard/AppSidebar';
import { TiptapEditor } from '../editor/TipTapEditor';
import { ShareDialog } from './ShareDialog';

const DocumentEditor: FC = () => {
  const router = useRouter()
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

  const handleBack = () => {
    router.push("/dashboard")
  };

  const handleShare = () => {
    setIsShareDialogOpen(true);
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleShareDocument = async (email: string, role: 'editor' | 'viewer') => {
    // TODO
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex bg-background">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBack}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </Button>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-lg font-semibold border-none shadow-none focus-visible:ring-0 max-w-md bg-transparent"
                  placeholder="Untitled document"
                />
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  onClick={handleShare}
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </Button>
              </div>
            </div>
          </header>

          <main className="flex-1 bg-gray-50 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 min-h-screen shadow-sm">
              <TiptapEditor
                content={content}
                onChange={handleContentChange}
              />
            </div>
          </main>
          <ShareDialog
            isOpen={isShareDialogOpen}
            onClose={() => setIsShareDialogOpen(false)}
            onShare={handleShareDocument}
            documentTitle={"ABCD"}
          />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DocumentEditor;
